import { Player, GameState } from '@/types/game'

interface StatsPanelProps {
  player: Player
  gameState: GameState
}

export default function StatsPanel({ player, gameState }: StatsPanelProps) {
  const getTimeString = () => {
    const time = gameState.timeOfDay
    if (time < 0.25 || time > 0.75) return 'Night'
    if (time < 0.4 || time > 0.6) return 'Dusk/Dawn'
    return 'Day'
  }

  const getSeasonColor = () => {
    switch (gameState.season) {
      case 'spring': return 'text-green-400'
      case 'summer': return 'text-yellow-400'
      case 'autumn': return 'text-orange-400'
      case 'winter': return 'text-blue-400'
      default: return 'text-white'
    }
  }

  return (
    <div className="ui-element bg-gray-800 p-4 rounded-lg border border-gray-600 space-y-3">
      {/* Health */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium flex items-center">
            ❤️ Health
          </span>
          <span className="text-sm">{Math.round(player.health)}/100</span>
        </div>
        <div className="w-32 bg-gray-700 rounded-full h-3">
          <div
            className="health-bar"
            style={{ width: `${Math.max(0, player.health)}%` }}
          />
        </div>
      </div>

      {/* Hunger */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium flex items-center">
            🍖 Hunger
          </span>
          <span className="text-sm">{Math.round(player.hunger)}/100</span>
        </div>
        <div className="w-32 bg-gray-700 rounded-full h-3">
          <div
            className="hunger-bar"
            style={{ width: `${Math.max(0, player.hunger)}%` }}
          />
        </div>
      </div>

      {/* Sanity */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium flex items-center">
            🧠 Sanity
          </span>
          <span className="text-sm">{Math.round(player.sanity)}/100</span>
        </div>
        <div className="w-32 bg-gray-700 rounded-full h-3">
          <div
            className="sanity-bar"
            style={{ width: `${Math.max(0, player.sanity)}%` }}
          />
        </div>
      </div>

      {/* Game Info */}
      <div className="border-t border-gray-600 pt-3 text-sm space-y-1">
        <div className="flex justify-between">
          <span>Day:</span>
          <span className="font-medium">{gameState.currentDay}</span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span className="font-medium">{getTimeString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Season:</span>
          <span className={`font-medium capitalize ${getSeasonColor()}`}>
            {gameState.season}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Level:</span>
          <span className="font-medium">{player.level}</span>
        </div>
      </div>
    </div>
  )
}