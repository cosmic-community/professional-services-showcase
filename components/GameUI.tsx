'use client'

import { useState } from 'react'
import { Player, GameState } from '@/types/game'
import Inventory from '@/components/Inventory'
import CraftingPanel from '@/components/CraftingPanel'
import StatsPanel from '@/components/StatsPanel'

interface GameUIProps {
  player: Player
  gameState: GameState
  onCraftItem: (itemType: string) => void
  onInventorySlotSelect: (slot: number) => void
}

export default function GameUI({ 
  player, 
  gameState, 
  onCraftItem,
  onInventorySlotSelect 
}: GameUIProps) {
  const [showCrafting, setShowCrafting] = useState(false)
  const [showInventory, setShowInventory] = useState(false)

  const toggleCrafting = () => {
    setShowCrafting(!showCrafting)
    setShowInventory(false)
  }

  const toggleInventory = () => {
    setShowInventory(!showInventory)
    setShowCrafting(false)
  }

  return (
    <>
      {/* Stats Panel - Top Left */}
      <div className="absolute top-4 left-4">
        <StatsPanel player={player} gameState={gameState} />
      </div>

      {/* Quick Controls - Top Right */}
      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={toggleInventory}
          className="ui-element px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
        >
          Inventory (Tab)
        </button>
        <button
          onClick={toggleCrafting}
          className="ui-element px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-600 transition-colors"
        >
          Crafting (C)
        </button>
      </div>

      {/* Hotbar - Bottom Center */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2 bg-gray-800 p-3 rounded-lg border border-gray-600">
          {Array.from({ length: 9 }, (_, i) => {
            const item = player.inventory[i]
            return (
              <div
                key={i}
                className={`inventory-slot ${player.selectedSlot === i ? 'selected' : ''}`}
                onClick={() => onInventorySlotSelect(i)}
              >
                {item && (
                  <>
                    <div className="item-icon text-2xl">{item.icon}</div>
                    {item.quantity > 1 && (
                      <div className="item-count">{item.quantity}</div>
                    )}
                  </>
                )}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                  {i + 1}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Instructions - Bottom Right */}
      <div className="absolute bottom-4 right-4 text-sm text-gray-400 space-y-1 bg-gray-800 p-3 rounded border border-gray-600">
        <div>WASD - Move</div>
        <div>Space - Use Item</div>
        <div>E - Interact</div>
        <div>Click - Attack/Gather</div>
        <div>1-9 - Select Item</div>
        <div>ESC - Pause</div>
      </div>

      {/* Inventory Modal */}
      {showInventory && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="ui-element">
            <Inventory
              player={player}
              onClose={() => setShowInventory(false)}
              onSlotSelect={onInventorySlotSelect}
            />
          </div>
        </div>
      )}

      {/* Crafting Modal */}
      {showCrafting && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="ui-element">
            <CraftingPanel
              player={player}
              onClose={() => setShowCrafting(false)}
              onCraftItem={onCraftItem}
            />
          </div>
        </div>
      )}

      {/* Pause Screen */}
      {gameState.isPaused && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="ui-element bg-gray-800 p-8 rounded-lg border border-gray-600 text-center">
            <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
            <p className="text-gray-300 mb-6">Press ESC to continue</p>
            <div className="space-y-2">
              <div>Day: {gameState.currentDay}</div>
              <div>Season: {gameState.season}</div>
              <div>Time: {gameState.timeOfDay < 0.25 || gameState.timeOfDay > 0.75 ? 'Night' : 'Day'}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}