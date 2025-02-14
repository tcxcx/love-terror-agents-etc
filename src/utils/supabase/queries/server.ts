import { cookies } from 'next/headers';
import { GameState } from '@/types';
import createSuperbaseServerClient from '@/utils/supabase/server';

export async function getGameStateServer(peanutLink: string): Promise<GameState | null> {
  const supabase = await createSuperbaseServerClient();
  
  const { data: rose, error: roseError } = await supabase
    .from('roses')
    .select('*')
    .eq('peanut_link', peanutLink)
    .single();

  if (roseError) {
    console.error("Error fetching rose:", roseError);
    return null;
  }

  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', rose.game_id)
    .single();
    
  if (error) {
    console.error("Error fetching game state:", error);
    return null;
  }
  console.log('Game state:', data);
  return data;
}