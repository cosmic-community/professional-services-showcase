// Game item interface
export interface GameItem {
  type: string
  name: string
  icon: string
  quantity: number
  category: 'resource' | 'tool' | 'weapon' | 'food' | 'structure'
  stackable: boolean
  maxStack?: number
  durability?: number
  maxDurability?: number
  damage?: number
  hungerRestore?: number
  healthRestore?: number
}

// Player interface
export interface Player {
  x: number
  y: number
  health: number
  hunger: number
  sanity: number
  inventory: (GameItem | null)[]
  selectedSlot: number
  level: number
  experience: number
}

// Game state interface
export interface GameState {
  isRunning: boolean
  isPaused: boolean
  currentDay: number
  timeOfDay: number // 0-1, where 0.5 is noon
  season: 'spring' | 'summer' | 'autumn' | 'winter'
}

// Game object interface (trees, rocks, etc.)
export interface GameObject {
  id: string
  x: number
  y: number
  type: string
  icon: string
  health: number
  maxHealth: number
  drops?: Array<{
    type: string
    quantity: number
  }>
}

// Game message interface
export interface GameMessage {
  id: string
  text: string
  type: 'info' | 'warning' | 'error'
  timestamp: number
}

// Game callbacks interface
export interface GameCallbacks {
  onPlayerUpdate: (updates: Partial<Player>) => void
  onGameStateUpdate: (updates: Partial<GameState>) => void
  onInventoryUpdate: (inventory: (GameItem | null)[]) => void
  onMessage: (text: string, type?: 'info' | 'warning' | 'error') => void
}

// Cosmic CMS interfaces for game content
export interface GameCharacter {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description: string
    icon: string
    base_health: number
    base_hunger: number
    base_sanity: number
    special_abilities?: string[]
    starting_items?: Array<{
      type: string
      quantity: number
    }>
  }
}

export interface GameBiome {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description: string
    background_color: string
    spawn_objects: Array<{
      type: string
      spawn_rate: number
      max_count: number
    }>
    environmental_effects: {
      temperature_modifier: number
      sanity_modifier: number
      hunger_modifier: number
    }
  }
}

export interface GameRecipe {
  id: string
  slug: string
  title: string
  metadata: {
    result_item: string
    result_quantity: number
    requirements: Array<{
      item_type: string
      quantity: number
    }>
    crafting_station?: string
    unlock_level?: number
  }
}