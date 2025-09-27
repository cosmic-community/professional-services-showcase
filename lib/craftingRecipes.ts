interface CraftingRecipe {
  result: {
    type: string
    name: string
    icon: string
    quantity: number
  }
  requirements: Array<{
    type: string
    name: string
    icon: string
    quantity: number
  }>
}

export const craftingRecipes: CraftingRecipe[] = [
  // Tools
  {
    result: {
      type: 'axe',
      name: 'Axe',
      icon: '🪓',
      quantity: 1
    },
    requirements: [
      { type: 'wood', name: 'Wood', icon: '🪵', quantity: 2 },
      { type: 'flint', name: 'Flint', icon: '🔶', quantity: 1 }
    ]
  },
  
  {
    result: {
      type: 'pickaxe',
      name: 'Pickaxe',
      icon: '⛏️',
      quantity: 1
    },
    requirements: [
      { type: 'wood', name: 'Wood', icon: '🪵', quantity: 2 },
      { type: 'flint', name: 'Flint', icon: '🔶', quantity: 2 }
    ]
  },
  
  {
    result: {
      type: 'spear',
      name: 'Spear',
      icon: '🗡️',
      quantity: 1
    },
    requirements: [
      { type: 'wood', name: 'Wood', icon: '🪵', quantity: 1 },
      { type: 'flint', name: 'Flint', icon: '🔶', quantity: 1 }
    ]
  },
  
  // Structures
  {
    result: {
      type: 'campfire',
      name: 'Campfire',
      icon: '🔥',
      quantity: 1
    },
    requirements: [
      { type: 'wood', name: 'Wood', icon: '🪵', quantity: 3 },
      { type: 'stone', name: 'Stone', icon: '🪨', quantity: 2 }
    ]
  },
  
  {
    result: {
      type: 'chest',
      name: 'Chest',
      icon: '📦',
      quantity: 1
    },
    requirements: [
      { type: 'wood', name: 'Wood', icon: '🪵', quantity: 8 }
    ]
  },
  
  {
    result: {
      type: 'wall_wood',
      name: 'Wooden Wall',
      icon: '🧱',
      quantity: 4
    },
    requirements: [
      { type: 'wood', name: 'Wood', icon: '🪵', quantity: 4 }
    ]
  }
]