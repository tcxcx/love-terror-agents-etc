import { completeAsciiGame } from "@/actions/supabase/game";
import { initializeGame } from "@/actions/supabase/game";
import { getGameState } from "@/utils/supabase/queries";

async function handleAsciiArtComplete() {
    'use server'
    const gameState = await getGameState();
    if (gameState && !gameState.ascii_game) {
      await completeAsciiGame(gameState.id);
    }
  }
  
  async function checkGameProgress() {
    'use server'
    const gameState = await getGameState();
    if (!gameState) {
      return await initializeGame();
    }
    return gameState;
  }

  export { handleAsciiArtComplete, checkGameProgress };