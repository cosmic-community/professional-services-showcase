import { Player, GameState, GameItem, GameObject, GameCallbacks } from '@/types/game'
import { itemDatabase } from '@/lib/itemDatabase'
import { craftingRecipes } from '@/lib/craftingRecipes'

export default class GameEngine {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private callbacks: GameCallbacks
  private isRunning: boolean = false
  private lastFrameTime: number = 0
  
  // Game state
  private player: Player = {
    x: 400,
    y: 300,
    health: 100,
    hunger: 100,
    sanity: 100,
    inventory: [],
    selectedSlot: 0,
    level: 1,
    experience: 0
  }

  private gameState: GameState = {
    isRunning: false,
    isPaused: false,
    currentDay: 1,
    timeOfDay: 0.5,
    season: 'spring'
  }

  // Game objects
  private gameObjects: GameObject[] = []
  private keys: Set<string> = new Set()

  // Movement
  private playerSpeed: number = 3
  private isMoving: boolean = false

  constructor(canvas: HTMLCanvasElement, callbacks: GameCallbacks) {
    this.canvas = canvas
    this.callbacks = callbacks
    
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Could not get 2D rendering context')
    }
    this.ctx = ctx

    this.setupEventListeners()
    this.generateInitialWorld()
  }

  private setupEventListeners() {
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase())
      this.handleKeyDown(e)
    })
    
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase())
    })

    // Focus events
    window.addEventListener('blur', () => {
      this.keys.clear()
    })
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key.toLowerCase()) {
      case 'c':
        // Toggle crafting (handled by UI)
        break
      case 'tab':
        event.preventDefault()
        // Toggle inventory (handled by UI)
        break
    }
  }

  private generateInitialWorld() {
    // Generate trees
    for (let i = 0; i < 50; i++) {
      this.gameObjects.push({
        id: `tree_${i}`,
        x: Math.random() * (this.canvas.width - 100) + 50,
        y: Math.random() * (this.canvas.height - 100) + 50,
        type: 'tree',
        icon: '🌲',
        health: 100,
        maxHealth: 100,
        drops: [
          { type: 'wood', quantity: Math.floor(Math.random() * 3) + 2 },
          { type: 'leaves', quantity: Math.floor(Math.random() * 2) + 1 }
        ]
      })
    }

    // Generate rocks
    for (let i = 0; i < 30; i++) {
      this.gameObjects.push({
        id: `rock_${i}`,
        x: Math.random() * (this.canvas.width - 100) + 50,
        y: Math.random() * (this.canvas.height - 100) + 50,
        type: 'rock',
        icon: '🪨',
        health: 150,
        maxHealth: 150,
        drops: [
          { type: 'stone', quantity: Math.floor(Math.random() * 2) + 1 },
          { type: 'flint', quantity: Math.random() > 0.7 ? 1 : 0 }
        ]
      })
    }

    // Generate berry bushes
    for (let i = 0; i < 20; i++) {
      this.gameObjects.push({
        id: `berry_${i}`,
        x: Math.random() * (this.canvas.width - 100) + 50,
        y: Math.random() * (this.canvas.height - 100) + 50,
        type: 'berry_bush',
        icon: '🫐',
        health: 50,
        maxHealth: 50,
        drops: [
          { type: 'berries', quantity: Math.floor(Math.random() * 3) + 1 }
        ]
      })
    }
  }

  public start() {
    this.isRunning = true
    this.gameState.isRunning = true
    this.callbacks.onGameStateUpdate(this.gameState)
    this.callbacks.onPlayerUpdate(this.player)
    this.gameLoop()
  }

  public stop() {
    this.isRunning = false
    this.gameState.isRunning = false
  }

  private gameLoop = (timestamp: number = 0) => {
    if (!this.isRunning) return

    const deltaTime = timestamp - this.lastFrameTime
    this.lastFrameTime = timestamp

    if (!this.gameState.isPaused) {
      this.update(deltaTime)
    }
    
    this.render()
    requestAnimationFrame(this.gameLoop)
  }

  private update(deltaTime: number) {
    this.updatePlayer()
    this.updateGameTime(deltaTime)
    this.updatePlayerStats(deltaTime)
  }

  private updatePlayer() {
    let newX = this.player.x
    let newY = this.player.y
    this.isMoving = false

    // Handle movement
    if (this.keys.has('w') || this.keys.has('arrowup')) {
      newY -= this.playerSpeed
      this.isMoving = true
    }
    if (this.keys.has('s') || this.keys.has('arrowdown')) {
      newY += this.playerSpeed
      this.isMoving = true
    }
    if (this.keys.has('a') || this.keys.has('arrowleft')) {
      newX -= this.playerSpeed
      this.isMoving = true
    }
    if (this.keys.has('d') || this.keys.has('arrowright')) {
      newX += this.playerSpeed
      this.isMoving = true
    }

    // Clamp to canvas bounds
    newX = Math.max(25, Math.min(this.canvas.width - 25, newX))
    newY = Math.max(25, Math.min(this.canvas.height - 25, newY))

    // Update player position
    if (newX !== this.player.x || newY !== this.player.y) {
      this.player.x = newX
      this.player.y = newY
      this.callbacks.onPlayerUpdate({ x: newX, y: newY })
    }
  }

  private updateGameTime(deltaTime: number) {
    // One game day = 10 minutes real time
    const timeIncrement = deltaTime / (10 * 60 * 1000)
    this.gameState.timeOfDay += timeIncrement

    if (this.gameState.timeOfDay >= 1) {
      this.gameState.timeOfDay = 0
      this.gameState.currentDay += 1
      this.callbacks.onMessage(`Day ${this.gameState.currentDay} begins!`, 'info')

      // Season change every 20 days
      if (this.gameState.currentDay % 20 === 0) {
        const seasons: Array<'spring' | 'summer' | 'autumn' | 'winter'> = 
          ['spring', 'summer', 'autumn', 'winter']
        const currentIndex = seasons.indexOf(this.gameState.season)
        this.gameState.season = seasons[(currentIndex + 1) % seasons.length]
        this.callbacks.onMessage(`${this.gameState.season} has arrived!`, 'info')
      }

      this.callbacks.onGameStateUpdate(this.gameState)
    }
  }

  private updatePlayerStats(deltaTime: number) {
    // Hunger decreases over time
    this.player.hunger -= deltaTime / 30000 // Lose hunger over time
    
    // Health decreases if starving
    if (this.player.hunger <= 0) {
      this.player.health -= deltaTime / 5000
      this.player.hunger = 0
    }

    // Sanity decreases at night and in winter
    const isNight = this.gameState.timeOfDay < 0.2 || this.gameState.timeOfDay > 0.8
    const isWinter = this.gameState.season === 'winter'
    
    if (isNight || isWinter) {
      this.player.sanity -= deltaTime / 20000
    } else {
      // Recover sanity during day
      this.player.sanity += deltaTime / 40000
    }

    // Clamp stats
    this.player.health = Math.max(0, Math.min(100, this.player.health))
    this.player.hunger = Math.max(0, Math.min(100, this.player.hunger))
    this.player.sanity = Math.max(0, Math.min(100, this.player.sanity))

    // Check for death
    if (this.player.health <= 0) {
      this.callbacks.onMessage('You died! Game Over!', 'error')
      this.gameState.isPaused = true
      this.callbacks.onGameStateUpdate(this.gameState)
    }

    this.callbacks.onPlayerUpdate({
      health: this.player.health,
      hunger: this.player.hunger,
      sanity: this.player.sanity
    })
  }

  private render() {
    // Clear canvas
    this.ctx.fillStyle = this.getBackgroundColor()
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Render game objects
    this.renderGameObjects()
    
    // Render player
    this.renderPlayer()

    // Render day/night overlay
    this.renderTimeOverlay()
  }

  private getBackgroundColor(): string {
    const time = this.gameState.timeOfDay
    const season = this.gameState.season
    
    let baseColor: [number, number, number]
    
    switch (season) {
      case 'spring':
        baseColor = [34, 139, 34] // Forest green
        break
      case 'summer':
        baseColor = [50, 150, 50] // Brighter green
        break
      case 'autumn':
        baseColor = [139, 69, 19] // Brown
        break
      case 'winter':
        baseColor = [176, 196, 222] // Light steel blue
        break
      default:
        baseColor = [34, 139, 34]
    }

    // Apply time-of-day lighting
    let lightFactor = 1
    if (time < 0.2 || time > 0.8) {
      lightFactor = 0.3 // Night
    } else if (time < 0.3 || time > 0.7) {
      lightFactor = 0.6 // Dusk/Dawn
    }

    const [r, g, b] = baseColor.map(c => Math.floor(c * lightFactor))
    return `rgb(${r}, ${g}, ${b})`
  }

  private renderGameObjects() {
    this.gameObjects.forEach(obj => {
      this.ctx.save()
      this.ctx.font = '32px serif'
      this.ctx.textAlign = 'center'
      this.ctx.fillText(obj.icon, obj.x, obj.y)
      
      // Health bar for damaged objects
      if (obj.health < obj.maxHealth) {
        const barWidth = 40
        const barHeight = 4
        const healthRatio = obj.health / obj.maxHealth
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        this.ctx.fillRect(obj.x - barWidth/2, obj.y - 25, barWidth, barHeight)
        
        this.ctx.fillStyle = healthRatio > 0.5 ? 'green' : healthRatio > 0.25 ? 'yellow' : 'red'
        this.ctx.fillRect(obj.x - barWidth/2, obj.y - 25, barWidth * healthRatio, barHeight)
      }
      
      this.ctx.restore()
    })
  }

  private renderPlayer() {
    this.ctx.save()
    this.ctx.font = '36px serif'
    this.ctx.textAlign = 'center'
    
    // Player character
    const playerIcon = this.isMoving ? '🏃' : '🧑'
    this.ctx.fillText(playerIcon, this.player.x, this.player.y)
    
    this.ctx.restore()
  }

  private renderTimeOverlay() {
    const time = this.gameState.timeOfDay
    let alpha = 0
    
    if (time < 0.2 || time > 0.8) {
      alpha = 0.7 // Night
    } else if (time < 0.3 || time > 0.7) {
      alpha = 0.3 // Dusk/Dawn
    }
    
    if (alpha > 0) {
      this.ctx.fillStyle = `rgba(0, 0, 50, ${alpha})`
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  public handleMouseClick(x: number, y: number, button: 'left' | 'right') {
    // Find nearby objects
    const clickRadius = 50
    const nearbyObjects = this.gameObjects.filter(obj => {
      const distance = Math.sqrt((obj.x - x) ** 2 + (obj.y - y) ** 2)
      return distance <= clickRadius
    })

    if (nearbyObjects.length > 0) {
      const target = nearbyObjects[0]
      this.harvestObject(target)
    }
  }

  private harvestObject(obj: GameObject) {
    // Check if player is close enough
    const distance = Math.sqrt((obj.x - this.player.x) ** 2 + (obj.y - this.player.y) ** 2)
    if (distance > 80) {
      this.callbacks.onMessage('Too far away!', 'warning')
      return
    }

    // Deal damage to object
    obj.health -= 25

    if (obj.health <= 0) {
      // Give drops to player
      obj.drops?.forEach(drop => {
        this.addItemToInventory(drop.type, drop.quantity)
      })

      // Remove object
      this.gameObjects = this.gameObjects.filter(o => o.id !== obj.id)
      
      // Give experience
      this.player.experience += 10
      if (this.player.experience >= this.player.level * 100) {
        this.player.level += 1
        this.player.experience = 0
        this.callbacks.onMessage(`Level up! You are now level ${this.player.level}!`, 'info')
      }
      
      this.callbacks.onPlayerUpdate({
        level: this.player.level,
        experience: this.player.experience
      })
    }
  }

  private addItemToInventory(itemType: string, quantity: number) {
    const itemData = itemDatabase[itemType]
    if (!itemData) return

    // Find existing stack or empty slot
    let slot = this.player.inventory.findIndex(item => item && item.type === itemType)
    
    if (slot === -1) {
      slot = this.player.inventory.findIndex(item => !item)
    }

    if (slot !== -1) {
      if (this.player.inventory[slot]) {
        this.player.inventory[slot].quantity += quantity
      } else {
        this.player.inventory[slot] = {
          ...itemData,
          quantity
        }
      }
      
      this.callbacks.onInventoryUpdate([...this.player.inventory])
      this.callbacks.onMessage(`+${quantity} ${itemData.name}`, 'info')
    } else {
      this.callbacks.onMessage('Inventory full!', 'warning')
    }
  }

  public useSelectedItem() {
    const item = this.player.inventory[this.player.selectedSlot]
    if (!item) return

    if (item.type === 'berries') {
      // Eat berries to restore hunger
      this.player.hunger = Math.min(100, this.player.hunger + 25)
      item.quantity -= 1
      
      if (item.quantity <= 0) {
        this.player.inventory[this.player.selectedSlot] = null
      }
      
      this.callbacks.onMessage('Ate berries! +25 Hunger', 'info')
      this.callbacks.onInventoryUpdate([...this.player.inventory])
      this.callbacks.onPlayerUpdate({ hunger: this.player.hunger })
    }
  }

  public interactWithNearby() {
    // Find nearby interactive objects
    this.callbacks.onMessage('No nearby objects to interact with', 'info')
  }

  public craftItem(itemType: string): boolean {
    const recipe = craftingRecipes.find(r => r.result.type === itemType)
    if (!recipe) return false

    // Check if player has required materials
    const hasAllMaterials = recipe.requirements.every(req => {
      const playerItem = this.player.inventory.find(item => item?.type === req.type)
      return playerItem && playerItem.quantity >= req.quantity
    })

    if (!hasAllMaterials) return false

    // Remove materials from inventory
    recipe.requirements.forEach(req => {
      const slot = this.player.inventory.findIndex(item => item?.type === req.type)
      if (slot !== -1 && this.player.inventory[slot]) {
        this.player.inventory[slot].quantity -= req.quantity
        if (this.player.inventory[slot].quantity <= 0) {
          this.player.inventory[slot] = null
        }
      }
    })

    // Add crafted item
    this.addItemToInventory(recipe.result.type, recipe.result.quantity)
    
    return true
  }
}