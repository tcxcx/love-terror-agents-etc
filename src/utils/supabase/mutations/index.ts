import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { GameState } from '@/utils/supabase/types';

export async function createGameState(): Promise<GameState | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('games')
    .insert([{ ascii_game: true }])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating game state:', error);
    return null;
  }
  
  return data;
  console.log("here is the data return for a created  game", data);
}

export async function updateGameState(
    id: string,
    updates: Partial<Omit<GameState, 'id' | 'created_at'>>
  ): Promise<GameState | null> {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { data, error } = await supabase
      .from('games')
      .update(updates)
      
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Error updating game state:', error);
      return null;
    }
    console.log("here is the data return for GAME STATE", data);

    return data;
  }