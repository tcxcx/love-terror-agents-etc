'use server'

import supabase from "@/utils/supabase/client";

export async function initializeGame(gameId: string, peanutLink?: string) {
  const existingGame = await getGameState(gameId);
  if (!existingGame) {
    const { data, error } = await supabase
      .from("games")
      .insert([
        {
          id: gameId,
          ascii_game: false,
          roses_game: false,
          guess_game: false,
          poem_game: false,
          peanut_link: peanutLink
        }
      ])
      .select()
      .single();

    if (error) throw new Error('Failed to create game state');
    return data;
  }
  return existingGame;
}

export async function getGameState(gameId: string) {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", gameId)
    .single();

  if (error) throw new Error('Failed to fetch game state');
  return data;
}

export async function updateGameState(gameId: string, updates: any) {
  const { data, error } = await supabase
    .from("games")
    .update(updates)
    .eq("id", gameId)
    .select()
    .single();

  if (error) throw new Error('Failed to update game state');
  return data;
}

export async function completeAsciiGame(gameId: string) {
  return updateGameState(gameId, { ascii_game: true });
}

export async function completeGuessingGame(gameId: string) {
  return updateGameState(gameId, { guess_game: true });
}

export async function completePoemGame(gameId: string) {
  return updateGameState(gameId, { poem_game: true });
}

export async function completeRosesGame(gameId: string) {
  return updateGameState(gameId, { roses_game: true });
}
