# Don't Starve - Survival Game

![Game Preview](https://images.unsplash.com/photo-1556942154-006c19b71fb4?w=1200&h=300&fit=crop&auto=format,compress)

A browser-based survival game inspired by Don't Starve. Gather resources, craft tools, manage your stats, and survive in a mysterious procedurally generated world. Built with Next.js, TypeScript, and Canvas rendering.

## 🎮 Game Features

- **Survival Mechanics** - Manage health, hunger, and sanity to stay alive
- **Resource Gathering** - Harvest wood, stone, berries, and other materials
- **Crafting System** - Create tools, weapons, and structures from gathered resources
- **Day/Night Cycle** - Experience changing times of day with different challenges
- **Seasonal Changes** - Adapt to spring, summer, autumn, and winter seasons
- **Inventory Management** - Organize items in a 9-slot hotbar and full inventory
- **Experience System** - Level up by gathering resources and surviving
- **Procedural World** - Randomly generated trees, rocks, and berry bushes
- **Interactive UI** - Comprehensive game interface with stats, crafting, and inventory

## 🎯 Game Controls

- **WASD** - Move your character
- **Mouse Click** - Harvest resources from objects
- **Space** - Use selected item
- **E** - Interact with nearby objects
- **1-9** - Select inventory slots
- **Tab** - Toggle inventory
- **C** - Toggle crafting menu
- **ESC** - Pause game

## 🛠️ Crafting Recipes

### Tools
- **Axe**: 2 Wood + 1 Flint
- **Pickaxe**: 2 Wood + 2 Flint
- **Spear**: 1 Wood + 1 Flint

### Structures
- **Campfire**: 3 Wood + 2 Stone
- **Chest**: 8 Wood
- **Wooden Wall**: 4 Wood

## 🌍 Game World

The game world consists of:
- **🌲 Trees** - Harvest for wood and leaves
- **🪨 Rocks** - Mine for stone and flint
- **🫐 Berry Bushes** - Gather berries to restore hunger
- **🧑 Player Character** - Your avatar in the world

## 📈 Survival Stats

- **❤️ Health** - Decreases when starving, causes death at 0
- **🍖 Hunger** - Decreases over time, eat berries to restore
- **🧠 Sanity** - Decreases at night and in winter, restore during day

## 🏗️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **HTML5 Canvas** - 2D game rendering
- **Tailwind CSS** - UI styling
- **Cosmic CMS** - Optional content management for game data
- **Custom Game Engine** - Built from scratch for Don't Starve-like mechanics

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Bun package manager

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. (Optional) Set up Cosmic CMS environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to start playing

## 🎮 Game Mechanics

### Resource Management
- Gather basic resources like wood, stone, and flint
- Use resources to craft tools and structures
- Manage limited inventory space efficiently

### Survival Systems
- Monitor health, hunger, and sanity levels
- Eat food to restore hunger and prevent health loss
- Stay near light sources at night to maintain sanity

### Progression
- Gain experience by harvesting resources
- Level up to unlock new crafting recipes
- Survive longer to see seasonal changes

### Environmental Hazards
- Night time reduces visibility and sanity
- Winter season increases sanity drain
- Starvation causes health to decrease over time

## 🔧 Game Architecture

### Core Components
- **GameEngine** - Main game loop, physics, and logic
- **Canvas Renderer** - 2D graphics and animations
- **Player Controller** - Input handling and movement
- **Inventory System** - Item management and storage
- **Crafting System** - Recipe management and item creation
- **Stats Manager** - Health, hunger, and sanity tracking

### File Structure