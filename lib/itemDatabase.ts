import { GameItem } from '@/types/game'

export const itemDatabase: Record<string, Omit<GameItem, 'quantity'>> = {
  // Resources
  wood: {
    type: 'wood',
    name: 'Wood',
    icon: '🪵',
    category: 'resource',
    stackable: true,
    maxStack: 99
  },
  
  stone: {
    type: 'stone',
    name: 'Stone',
    icon: '🪨',
    category: 'resource',
    stackable: true,
    maxStack: 99
  },
  
  flint: {
    type: 'flint',
    name: 'Flint',
    icon: '🔶',
    category: 'resource',
    stackable: true,
    maxStack: 99
  },
  
  leaves: {
    type: 'leaves',
    name: 'Leaves',
    icon: '🍃',
    category: 'resource',
    stackable: true,
    maxStack: 99
  },
  
  // Food
  berries: {
    type: 'berries',
    name: 'Berries',
    icon: '🫐',
    category: 'food',
    stackable: true,
    maxStack: 20,
    hungerRestore: 25
  },
  
  cooked_meat: {
    type: 'cooked_meat',
    name: 'Cooked Meat',
    icon: '🍖',
    category: 'food',
    stackable: true,
    maxStack: 10,
    hungerRestore: 50
  },
  
  // Tools
  axe: {
    type: 'axe',
    name: 'Axe',
    icon: '🪓',
    category: 'tool',
    stackable: false,
    durability: 100,
    maxDurability: 100
  },
  
  pickaxe: {
    type: 'pickaxe',
    name: 'Pickaxe',
    icon: '⛏️',
    category: 'tool',
    stackable: false,
    durability: 100,
    maxDurability: 100
  },
  
  spear: {
    type: 'spear',
    name: 'Spear',
    icon: '🗡️',
    category: 'weapon',
    stackable: false,
    durability: 75,
    maxDurability: 75,
    damage: 30
  },
  
  // Structures
  campfire: {
    type: 'campfire',
    name: 'Campfire',
    icon: '🔥',
    category: 'structure',
    stackable: true,
    maxStack: 10
  },
  
  chest: {
    type: 'chest',
    name: 'Chest',
    icon: '📦',
    category: 'structure',
    stackable: true,
    maxStack: 5
  },
  
  wall_wood: {
    type: 'wall_wood',
    name: 'Wooden Wall',
    icon: '🧱',
    category: 'structure',
    stackable: true,
    maxStack: 20
  }
}