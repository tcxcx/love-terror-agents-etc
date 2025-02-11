
'use server'

import {createGameState, updateGameState } from '@/utils/supabase/mutations';
import { getGameState } from '@/utils/supabase/queries';

export async function initializeGame() {
  const existingGame = await getGameState();
  if (!existingGame) {
    return createGameState();
  }
  return existingGame;
}

export async function completeAsciiGame(gameId: string) {
  return updateGameState(gameId, {
    ascii_game: true
  });
}

export async function completeGuessingGame(gameId: string) {
  return updateGameState(gameId, {
    guess_game: true
  });
}

export async function completePoemGame(gameId: string) {
  return updateGameState(gameId, {
    poem_game: true
  });
}

export async function completeRosesGame(gameId: string) {
  return updateGameState(gameId, {
    roses_game: true
  });
}