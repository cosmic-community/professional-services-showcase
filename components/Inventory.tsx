import { Player } from '@/types/game'

interface InventoryProps {
  player: Player
  onClose: () => void
  onSlotSelect: (slot: number) => void
}

export default function Inventory({ player, onClose, onSlotSelect }: InventoryProps) {
  const inventorySlots = 36 // 4 rows of 9 slots

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Inventory</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-9 gap-2">
        {Array.from({ length: inventorySlots }, (_, i) => {
          const item = player.inventory[i]
          return (
            <div
              key={i}
              className={`inventory-slot ${player.selectedSlot === i ? 'selected' : ''}`}
              onClick={() => onSlotSelect(i)}
            >
              {item && (
                <>
                  <div className="item-icon text-lg">{item.icon}</div>
                  {item.quantity > 1 && (
                    <div className="item-count">{item.quantity}</div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <div>Items: {player.inventory.filter(item => item).length}/{inventorySlots}</div>
        <div>Level: {player.level} | XP: {player.experience}</div>
      </div>
    </div>
  )
}