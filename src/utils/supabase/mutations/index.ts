import { createClient } from "@/utils/supabase/client";
import { PeanutLink, Rose, GameState } from "@/types";

// Claiming Process:
// 1. User claims peanut link
// 2. Create/get valentines_user record
// 3. Update rose claimed status
// 4. Update game state with valentines_user_id
// 5. All tables now properly linked

async function createOrGetValentinesUser(
  supabase: any,
  walletAddress: string,
  name: string
): Promise<number | null> {
  const { data: existingUser } = await supabase
    .from("valentines_user")
    .select("id")
    .eq("wallet_address", walletAddress)
    .single();

  if (existingUser) {
    return existingUser.id;
  }

  // Create new user if not found
  const { data: newUser, error } = await supabase
    .from("valentines_user")
    .insert([
      {
        wallet_address: walletAddress,
        name: name,
      },
    ])
    .select("id")
    .single();

  if (error) {
    console.error("Error creating valentines user:", error);
    return null;
  }

  return newUser.id;
}

export async function createGameState(
  walletAddress?: string,
  name?: string
): Promise<GameState | null> {
  const supabase = await createClient();

  let valentinesUserId = null;
  if (walletAddress && name) {
    valentinesUserId = await createOrGetValentinesUser(
      supabase,
      walletAddress,
      name
    );
  }

  const { data, error } = await supabase
    .from("games")
    .insert([
      {
        roses_game: false,
        ascii_game: false,
        guess_game: false,
        poem_game: false,
        valentines_user_id: valentinesUserId,
      },
    ])
    .select(
      `
      *,
      roses (
        id,
        claimed,
        peanut_link
      ),
      valentines_user (
        id,
        wallet_address,
        name
      )
    `
    )
    .single();

  if (error) {
    console.error("Error creating game state:", error);
    return null;
  }

  return {
    ...data,
    claimed: false,
  };
}

export async function setRoseClaimed(
  roseId: string,
  walletAddress: string,
  name: string
): Promise<boolean> {
  const supabase = await createClient();

  // Create or get valentines user
  const valentinesUserId = await createOrGetValentinesUser(
    supabase,
    walletAddress,
    name
  );
  if (!valentinesUserId) return false;

  // Update rose with claim info
  const { data: rose, error: roseError } = await supabase
    .from("roses")
    .update({
      claimed: true,
      claimed_at: new Date().toISOString(),
      claimed_by_wallet: walletAddress,
    })
    .eq("id", roseId)
    .select("game_id")
    .single();

  if (roseError) {
    console.error("Error updating rose claimed status:", roseError);
    return false;
  }

  // Update game with valentines user and rose status
  const { error: gameError } = await supabase
    .from("games")
    .update({
      roses_game: true,
      valentines_user_id: valentinesUserId,
    })
    .eq("id", rose.game_id);

  if (gameError) {
    console.error("Error updating game status:", gameError);
    return false;
  }

  return true;
}

export async function updateGameState(
  id: string,
  updates: Partial<Omit<GameState, "id" | "created_at" | "claimed">>
): Promise<GameState | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("games")
    .update(updates)
    .eq("id", id)
    .select(
      `
      *,
      roses (
        id,
        claimed,
        peanut_link
      ),
      valentines_user (
        id,
        wallet_address,
        name
      )
    `
    )
    .single();

  if (error) {
    console.error("Error updating game state:", error);
    return null;
  }

  return {
    ...data,
    claimed: data.roses?.length > 0 ? data.roses[0].claimed : false,
  };
}

export async function createRoseSubmission(
  roseData: Omit<Rose, "id" | "created_at" | "claimed">
): Promise<Rose | null> {
  const supabase = await createClient();

  // First create the game state
  const { data: gameData, error: gameError } = await supabase
    .from("games")
    .insert([
      {
        roses_game: true,
        ascii_game: false,
        guess_game: false,
        poem_game: false,
      },
    ])
    .select()
    .single();

  if (gameError) {
    console.error("Error creating game state:", gameError);
    return null;
  }

  // Then create the rose submission with the game_id
  const { data: submittedRose, error: roseError } = await supabase
    .from("roses")
    .insert([
      {
        ...roseData,
        game_id: gameData.id,
        claimed: false,
        wallet_address_created_by: roseData.wallet_address_created_by,
        peanut_link: roseData.peanut_link,
      },
    ])
    .select()
    .single();

  if (roseError) {
    console.error("Error creating rose submission:", roseError);
    return null;
  }

  return submittedRose;
}

export async function createPeanutLink(
  roseId: string,
  link: string
): Promise<PeanutLink | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("peanut_links")
    .insert([
      {
        rose_id: roseId,
        link: link,
        claimed: false,
        created_at: new Date().toISOString(),
      },
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
  walletAddress: string
): Promise<PeanutLink | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("peanut_link")
    .update({
      claimed: true,
      claimed_at: new Date().toISOString(),
      claimed_by: walletAddress,
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

export async function updateRoseClaimed(
  roseId: string,
  walletAddress: string
): Promise<Rose | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("roses")
    .update({
      claimed: true,
      claimed_at: new Date().toISOString(),
      claimed_by_wallet: walletAddress,
    })
    .eq("id", roseId)
    .select()
    .single();

  if (error) {
    console.error("Error updating rose claimed status:", error);
    return null;
  }

  return data;
}

export async function updatePeanutLinkClaimed(
  linkId: string,
  walletAddress: string
): Promise<PeanutLink | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("peanut_links")
    .update({
      claimed: true,
      claimed_at: new Date().toISOString(),
      claimed_by: walletAddress,
    })
    .eq("id", linkId)
    .select()
    .single();

  if (error) {
    console.error("Error updating peanut link claimed status:", error);
    return null;
  }

  return data;
}
