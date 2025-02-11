import { createClient } from '@/utils/supabase/client';
import { GameState } from '@/types';

export async function getGameState(): Promise<GameState | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('games')
    .select(`
      *,
      roses!roses_game_id_fkey (
        id,
        claimed,
        peanut_link,
        peanut_link!peanut_link_rose_id_fkey (
          id,
          link,
          claimed,
          claimed_at,
          claimed_by
        )
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
  const supabase = await createClient();
  
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


export async function getRoseAiGame(peanutLink: string): Promise<boolean> {
  const supabase = await createClient();
  
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
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('games')
    .select(`
      *,
      roses!roses_game_id_fkey (
        id,
        claimed,
        peanut_link,
        peanut_link!peanut_link_rose_id_fkey (
          id,
          link,
          claimed,
          claimed_at,
          claimed_by
        )
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

export async function getGameStateWithValentineInfo(): Promise<GameState | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('games')
    .select(`
      *,
      valentines_user (
        id,
        name,
        wallet_address
      ),
      roses!roses_game_id_fkey (
        id,
        claimed,
        valentines_name,
        secret_admirer_name,
        secret_question,
        secret_answer,
        clue_1,
        clue_2,
        clue_3,
        clue_4,
        clue_5,
        clue_6,
        clue_7,
        poem_text,
        date_site,
        date_details,
        calendly_link,
        system_prompt,
        peanut_link!peanut_link_rose_id_fkey (
          id,
          link,
          claimed,
          claimed_at,
          claimed_by
        )
      )
    `)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
    
  if (error) {
    console.error('Error fetching game state:', error);
    return null;
  }

  return {
    ...data,
    claimed: data.roses?.[0]?.claimed || false,
    valentineName: data.valentines_user?.name || '',
    systemPrompt: data.roses?.[0]?.system_prompt || ''
  };
}