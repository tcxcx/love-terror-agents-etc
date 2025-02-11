import { completeAsciiGame } from "@/actions/supabase/game";
import { initializeGame } from "@/actions/supabase/game";
import { getGameState } from "@/utils/supabase/queries";

async function handleAsciiArtComplete(gameId: string) {
    'use server'
    const gameState = await getGameState(gameId);
    if (gameState && !gameState.ascii_game) {
      await completeAsciiGame(gameState.id);
    }
  }
  
  async function checkGameProgress(gameId: string) {
    'use server'
    const gameState = await getGameState(gameId);
    if (!gameState) {
      return await initializeGame(gameId);
    }
    return gameState;
  }

  export { handleAsciiArtComplete, checkGameProgress };