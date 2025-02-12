import { cookies } from 'next/headers';
import { GameState } from '@/types';
import createSuperbaseServerClient from '@/utils/supabase/server';

export async function getGameStateServer(peanutLink: string): Promise<GameState | null> {
  const cookieStore = cookies();
  const supabase = await createSuperbaseServerClient();
  
  const { data: rose, error: roseError } = await supabase
    .from('roses')
    .select('game_id')
    .eq('peanut_link', peanutLink)
    .single();

  if (roseError) {
    console.error("Error fetching rose:", roseError);
    return null;
  }

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
    .eq('id', rose.game_id)
    .single();
    
  if (error) {
    console.error("Error fetching game state:", error);
    return null;
  }

  return data;
}
