import { Player } from '@/types/game'
import { craftingRecipes } from '@/lib/craftingRecipes'

interface CraftingPanelProps {
  player: Player
  onClose: () => void
  onCraftItem: (itemType: string) => void
}

export default function CraftingPanel({ player, onClose, onCraftItem }: CraftingPanelProps) {
  const canCraftItem = (recipe: typeof craftingRecipes[0]) => {
    return recipe.requirements.every(req => {
      const playerItem = player.inventory.find(item => item?.type === req.type)
      return playerItem && playerItem.quantity >= req.quantity
    })
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 w-96 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Crafting</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        {craftingRecipes.map((recipe) => {
          const canCraft = canCraftItem(recipe)
          
          return (
            <div
              key={recipe.result.type}
              className={`p-3 rounded border ${
                canCraft
                  ? 'border-green-500 bg-green-900 bg-opacity-20'
                  : 'border-gray-600 bg-gray-700 bg-opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{recipe.result.icon}</span>
                  <div>
                    <div className="font-medium">{recipe.result.name}</div>
                    <div className="text-sm text-gray-400">
                      x{recipe.result.quantity}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => canCraft && onCraftItem(recipe.result.type)}
                  disabled={!canCraft}
                  className="craft-button"
                >
                  Craft
                </button>
              </div>
              
              <div className="text-sm">
                <div className="text-gray-300 mb-1">Requires:</div>
                <div className="flex flex-wrap gap-2">
                  {recipe.requirements.map((req, i) => {
                    const playerItem = player.inventory.find(item => item?.type === req.type)
                    const hasEnough = playerItem && playerItem.quantity >= req.quantity
                    
                    return (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded ${
                          hasEnough ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {req.icon} {req.quantity} {req.name}
                        {playerItem ? ` (${playerItem.quantity})` : ' (0)'}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}