import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { GameState } from '@/utils/supabase/types';

export async function getGameState(): Promise<GameState | null> {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
    
  if (error) {
    console.error('Error fetching game state:', error);
    return null;
  }
  
  return data;
}