
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

export async function completePasswordAuth(gameId: string) {
  return updateGameState(gameId, {
    password_auth: true
  });
}

export async function completePoem(gameId: string) {
  return updateGameState(gameId, {
    poem_revealed: true
  });
}

export async function completeNFT(gameId: string) {
  return updateGameState(gameId, {
    nft_minted: true
  });
}

export async function completeLocation(gameId: string) {
  return updateGameState(gameId, {
    location_revealed: true
  });
}

export async function completeScheduling(gameId: string) {
  return updateGameState(gameId, {
    date_scheduled: true
  });
}