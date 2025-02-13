
import supabase from "@/utils/supabase/client";
import { GameState, Rose } from "@/types";

export async function getGameState(peanut_link: string): Promise<GameState | null> {
  const { data, error } = await supabase
    .from("games")
    .select(
      `
      *
    `
    )
    .eq("peanut_link", peanut_link)
    .single();

  if (error) {
    console.error("Error fetching game state:", error);
    return null;
  }

  return data;
}

export async function checkRoseClaimed(peanutLink: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("roses")
    .select("claimed")
    .eq("peanut_link", peanutLink)
    .single();

  if (error) {
    console.error("Error checking rose claimed status:", error);
    return false;
  }

  return data?.claimed || false;
}

export async function getPeanutLinkStatus(link: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("peanut_link")
    .select("claimed")
    .eq("link", link)
    .single();

  if (error) {
    console.error("Error checking peanut link status:", error);
    return false;
  }

  return data?.claimed || false;
}

export async function getRoseByPeanutLink(
  peanutLink: string
): Promise<Rose | null> {
  const { data, error } = await supabase
    .from("roses")
    .select(
      `
      *,
      game_id
    `
    )
    .eq("peanut_link", peanutLink)
    .single();

  if (error) {
    console.error("Error fetching rose:", error);
    return null;
  }
  console.log('getRoseByPeanutLink', data);

  return data;
}

export async function getGameProgress(gameId: string): Promise<number> {
  const { data, error } = await supabase
    .from("games")
    .select("ascii_game, guess_game, poem_game, roses_game")
    .eq("id", gameId)
    .single();

  if (error) {
    console.error("Error fetching game progress:", error);
    return 0;
  }

  const completedSteps = [
    data.ascii_game,
    data.guess_game,
    data.poem_game,
    data.roses_game,
  ].filter(Boolean).length;

  return completedSteps;
}
