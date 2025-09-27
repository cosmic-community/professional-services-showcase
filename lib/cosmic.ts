import { createBucketClient } from '@cosmicjs/sdk'
import { GameCharacter, GameBiome, GameRecipe } from '@/types/game'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all game characters
export async function getGameCharacters(): Promise<GameCharacter[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'game-characters' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as GameCharacter[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching game characters:', error);
    throw new Error('Failed to fetch game characters');
  }
}

// Fetch single game character by slug
export async function getGameCharacter(slug: string): Promise<GameCharacter | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'game-characters', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as GameCharacter;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching game character:', error);
    throw new Error('Failed to fetch game character');
  }
}

// Fetch all game biomes
export async function getGameBiomes(): Promise<GameBiome[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'game-biomes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as GameBiome[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching game biomes:', error);
    throw new Error('Failed to fetch game biomes');
  }
}

// Fetch all game recipes
export async function getGameRecipes(): Promise<GameRecipe[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'game-recipes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as GameRecipe[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching game recipes:', error);
    throw new Error('Failed to fetch game recipes');
  }
}

// Save player progress
export async function savePlayerProgress(playerData: {
  player_name: string
  level: number
  experience: number
  current_day: number
  inventory: string
  stats: string
}): Promise<void> {
  try {
    await cosmic.objects.insertOne({
      title: `${playerData.player_name} - Day ${playerData.current_day}`,
      type: 'player-progress',
      metadata: playerData
    });
  } catch (error) {
    console.error('Error saving player progress:', error);
    throw new Error('Failed to save player progress');
  }
}