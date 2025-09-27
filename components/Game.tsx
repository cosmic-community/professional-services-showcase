'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import GameEngine from '@/lib/gameEngine'
import GameUI from '@/components/GameUI'
import { GameState, Player, GameItem, GameMessage } from '@/types/game'

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameEngineRef = useRef<GameEngine | null>(null)
  
  const [gameState, setGameState] = useState<GameState>({
    isRunning: false,
    isPaused: false,
    currentDay: 1,
    timeOfDay: 0.5, // 0 = midnight, 0.5 = noon, 1 = midnight
    season: 'spring'
  })

  const [player, setPlayer] = useState<Player>({
    x: 400,
    y: 300,
    health: 100,
    hunger: 100,
    sanity: 100,
    inventory: [],
    selectedSlot: 0,
    level: 1,
    experience: 0
  })

  const [messages, setMessages] = useState<GameMessage[]>([])

  const addMessage = useCallback((text: string, type: 'info' | 'warning' | 'error' = 'info') => {
    const message: GameMessage = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev.slice(-4), message]) // Keep last 5 messages
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== message.id))
    }, 3000)
  }, [])

  const handleInventoryUpdate = useCallback((newInventory: GameItem[]) => {
    setPlayer(prev => ({ ...prev, inventory: newInventory }))
  }, [])

  const handlePlayerUpdate = useCallback((updates: Partial<Player>) => {
    setPlayer(prev => ({ ...prev, ...updates }))
  }, [])

  const handleGameStateUpdate = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }))
  }, [])

  const handleCraftItem = useCallback((itemType: string) => {
    if (gameEngineRef.current) {
      const success = gameEngineRef.current.craftItem(itemType)
      if (success) {
        addMessage(`Crafted ${itemType}!`, 'info')
      } else {
        addMessage('Not enough resources!', 'error')
      }
    }
  }, [addMessage])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameEngineRef.current) return

    const { key } = event
    
    // Inventory selection (1-9)
    const slotNumber = parseInt(key)
    if (slotNumber >= 1 && slotNumber <= 9) {
      setPlayer(prev => ({ ...prev, selectedSlot: slotNumber - 1 }))
      return
    }

    // Game controls
    switch (key.toLowerCase()) {
      case ' ':
        event.preventDefault()
        gameEngineRef.current.useSelectedItem()
        break
      case 'e':
        gameEngineRef.current.interactWithNearby()
        break
      case 'tab':
        event.preventDefault()
        // Toggle inventory/crafting UI (handled by GameUI)
        break
      case 'escape':
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
        break
    }
  }, [])

  const handleMouseClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameEngineRef.current || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (event.button === 0) { // Left click
      gameEngineRef.current.handleMouseClick(x, y, 'left')
    } else if (event.button === 2) { // Right click
      event.preventDefault()
      gameEngineRef.current.handleMouseClick(x, y, 'right')
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const gameEngine = new GameEngine(
      canvas,
      {
        onPlayerUpdate: handlePlayerUpdate,
        onGameStateUpdate: handleGameStateUpdate,
        onInventoryUpdate: handleInventoryUpdate,
        onMessage: addMessage
      }
    )

    gameEngineRef.current = gameEngine
    gameEngine.start()

    setGameState(prev => ({ ...prev, isRunning: true }))

    // Event listeners
    window.addEventListener('keydown', handleKeyPress)
    canvas.addEventListener('contextmenu', (e) => e.preventDefault())

    return () => {
      gameEngine.stop()
      window.removeEventListener('keydown', handleKeyPress)
      gameEngineRef.current = null
    }
  }, [handleKeyPress, handlePlayerUpdate, handleGameStateUpdate, handleInventoryUpdate, addMessage])

  return (
    <div className="game-container">
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        className="game-canvas"
        onClick={handleMouseClick}
        onContextMenu={(e) => e.preventDefault()}
      />
      
      <div className="game-ui">
        <GameUI
          player={player}
          gameState={gameState}
          onCraftItem={handleCraftItem}
          onInventorySlotSelect={(slot) => setPlayer(prev => ({ ...prev, selectedSlot: slot }))}
        />
        
        {/* Messages */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 space-y-2 z-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-popup ${
                message.type === 'error' ? 'bg-red-900' : 
                message.type === 'warning' ? 'bg-yellow-900' : 'bg-gray-900'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}