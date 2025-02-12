
import { createClient } from '@/utils/supabase/client';
import { GameState, Rose } from '@/types';

export async function getGameState(gameId: string): Promise<GameState | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('games')
    .select(`
      *,
      roses (
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
        amount_roses,
        wallet_address_created_by,
        valentines_user_id,
        peanut_link
      )
    `)
    .eq('id', gameId)
    .single();
    
  if (error) {
    console.error("Error fetching game state:", error);
    return null;
  }

  return data;
}

export async function checkRoseClaimed(roseId: string): Promise<boolean> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("roses")
    .select("claimed")
    .eq("id", roseId)
    .single();

  if (error) {
    console.error("Error checking rose claimed status:", error);
    return false;
  }

  return data?.claimed || false;
}

export async function getPeanutLinkStatus(link: string): Promise<boolean> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('peanut_link')
    .select('claimed')
    .eq('link', link)
    .single();
    
  if (error) {
    console.error('Error checking peanut link status:', error);
    return false;
  }
  
  return data?.claimed || false;
}

export async function getRoseByPeanutLink(peanutLink: string): Promise<Rose | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('roses')
    .select(`
      *,
      game: game_id (
        id,
        ascii_game,
        guess_game,
        poem_game,
        roses_game
      )
    `)
    .eq('peanut_link', peanutLink)
    .single();

  if (error) {
    console.error("Error fetching rose:", error);
    return null;
  }

  return data;
}

export async function getGameProgress(gameId: string): Promise<number> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('games')
    .select('ascii_game, guess_game, poem_game, roses_game')
    .eq('id', gameId)
    .single();

  if (error) {
    console.error("Error fetching game progress:", error);
    return 0;
  }

  const completedSteps = [
    data.ascii_game,
    data.guess_game,
    data.poem_game,
    data.roses_game
  ].filter(Boolean).length;

  return completedSteps;
}