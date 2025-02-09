import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { GameState } from '@/utils/supabase/types';
import { Rose, PeanutLink } from '@/types';

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


export async function createRoseSubmission(roseData: Omit<Rose, 'id' | 'created_at' | 'claimed'>): Promise<Rose | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  // First create the game state
  const { data: gameData, error: gameError } = await supabase
    .from('games')
    .insert([{ 
      roses_game: true,
      ascii_game: false,
      guess_game: false,
      poem_game: false
    }])
    .select()
    .single();
    
  if (gameError) {
    console.error('Error creating game state:', gameError);
    return null;
  }

  // Then create the rose submission with the game_id
  const { data: submittedRose, error: roseError } = await supabase
    .from('roses')
    .insert([{ 
      ...roseData,
      game_id: gameData.id
    }])
    .select()
    .single();
    
  if (roseError) {
    console.error('Error creating rose submission:', roseError);
    return null;
  }

  return submittedRose;
}

export async function createPeanutLink(
  roseId: string, 
  link: string
): Promise<PeanutLink | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('peanut_links')
    .insert([{
      rose_id: roseId,
      link: link
    }])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating peanut link:', error);
    return null;
  }
  
  return data;
}

export async function claimPeanutLink(
  linkId: string,
  walletAddress: string
): Promise<PeanutLink | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from('peanut_link')
    .update({
      claimed: true,
      claimed_at: new Date().toISOString(),
      claimed_by: walletAddress
    })
    .eq('id', linkId)
    .select()
    .single();
    
  if (error) {
    console.error('Error claiming peanut link:', error);
    return null;
  }
  
  return data;
}