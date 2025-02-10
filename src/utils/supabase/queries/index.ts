import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { GameState } from '@/types';

export async function getGameState(): Promise<GameState | null> {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  
  // Get the latest game state with related rose and claim information
      // Add peanut_links to select
    const { data, error } = await supabase
      .from('games')
      .select(`
        *,
        roses (
          id,
          claimed,
          peanut_link,
          game_id,
          peanut_links (*)
        ),
        valentines_user (*)
      `)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
  if (error) {
    console.error('Error fetching game state:', error);
    return null;
  }

  const gameState = {
    ...data,
    claimed: data.roses?.length > 0 ? data.roses[0].claimed : false
  };
  
  return gameState;
}

export async function checkRoseClaimed(peanutLink: string): Promise<boolean> {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  
  // Check if rose with this peanut link exists and is claimed
  const { data, error } = await supabase
    .from('roses')
    .select('claimed')
    .eq('peanut_link', peanutLink)
    .single();
    
  if (error) {
    console.error('Error checking rose claimed status:', error);
    return false;
  }
  
  return data?.claimed || false;
}

export async function getGameStateByRoseId(roseId: string): Promise<GameState | null> {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('games')
    .select(`
      *,
      roses!inner (
        id,
        claimed,
        peanut_link
      )
    `)
    .eq('roses.id', roseId)
    .single();
    
  if (error) {
    console.error('Error fetching game state by rose:', error);
    return null;
  }

  return {
    ...data,
    claimed: data.roses[0].claimed
  };
}