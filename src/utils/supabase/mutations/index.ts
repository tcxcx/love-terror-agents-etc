import { createClient } from "@/utils/supabase/client";
import { Rose, GameState, PeanutLink } from "@/types";
export async function createGameState(peanutLink: string): Promise<GameState | null> {
  const supabase = await createClient();

  // First create the game state
  const { data: gameData, error: gameError } = await supabase
    .from("games")
    .insert([
      {
        roses_game: false,
        ascii_game: false,
        guess_game: false,
        poem_game: false,
        peanut_link: peanutLink
      }
    ])
    .select()
    .single();

  if (gameError) {
    console.error("Error creating game state:", gameError);
    return null;
  }

  // Then create the initial roses entry linked to this game
  const { data: roseData, error: roseError } = await supabase
    .from("roses")
    .insert([
      {
        game_id: gameData.id,
        peanut_link: peanutLink
      }
    ])
    .select()
    .single();

  if (roseError) {
    console.error("Error creating rose entry:", roseError);
    return null;
  }

  // Finally create the peanut link entry
  const { error: peanutError } = await supabase
    .from("peanut_link")
    .insert([
      {
        rose_id: roseData.id,
        link: peanutLink,
        claimed: false
      }
    ]);

  if (peanutError) {
    console.error("Error creating peanut link entry:", peanutError);
    return null;
  }

  return gameData;
}

export async function updateGameState(
  gameId: string,
  updates: Partial<GameState>
): Promise<GameState | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("games")
    .update(updates)
    .eq("id", gameId)
    .select()
    .single();

  if (error) {
    console.error("Error updating game state:", error);
    return null;
  }

  return data;
}

export async function createRoseSubmission(
  gameId: string,
  roseData: Omit<Rose, "id" | "created_at" | "claimed">
): Promise<Rose | null> {
  const supabase = await createClient();

  // Create new game state
  const gameState = await createGameState(gameId);
  if (!gameState) return null;

  // Create rose submission
  const { data: rose, error: roseError } = await supabase
    .from("roses")
    .insert([
      {
        ...roseData,
        game_id: gameState.id,
        claimed: false
      }
    ])
    .select()
    .single();

  if (roseError) {
    console.error("Error creating rose submission:", roseError);
    return null;
  }

  return rose;
}

export async function setRoseClaimed(
  roseId: string,
  walletAddress: string,
  valentinesUserId: number
): Promise<boolean> {
  const supabase = await createClient();

  // Start a transaction
  const { error: roseError } = await supabase
    .from("roses")
    .update({
      claimed: true,
      valentines_user_id: valentinesUserId
    })
    .eq("id", roseId);

  if (roseError) {
    console.error("Error updating rose claimed status:", roseError);
    return false;
  }

  // Get game_id from rose
  const { data: rose } = await supabase
    .from("roses")
    .select("game_id")
    .eq("id", roseId)
    .single();

  if (!rose?.game_id) return false;

  // Update game state
  const { error: gameError } = await supabase
    .from("games")
    .update({
      roses_game: true
    })
    .eq("id", rose.game_id);

  if (gameError) {
    console.error("Error updating game state:", gameError);
    return false;
  }

  return true;
}

export async function updateGameProgress(
  gameId: string,
  updates: Partial<GameState>
): Promise<GameState | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("games")
    .update(updates)
    .eq("id", gameId)
    .select()
    .single();

  if (error) {
    console.error("Error updating game progress:", error);
    return null;
  }

  return data;
}

export async function createPeanutLink(
  roseId: string,
  link: string,
  walletCreated: string
): Promise<PeanutLink | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("peanut_link")
    .insert([
      {
        rose_id: roseId,
        link: link,
        claimed: false,
        wallet_created: walletCreated
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating peanut link:", error);
    return null;
  }

  return data;
}

export async function claimPeanutLink(
  linkId: string,
  claimWallet: string
): Promise<PeanutLink | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("peanut_link")
    .update({
      claimed: true,
      claimed_at: new Date().toISOString(),
      claim_wallet: claimWallet
    })
    .eq("id", linkId)
    .select()
    .single();

  if (error) {
    console.error("Error claiming peanut link:", error);
    return null;
  }

  return data;
}