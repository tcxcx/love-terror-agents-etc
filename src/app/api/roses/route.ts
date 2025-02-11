import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const roseData = await request.json();

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
    console.log(gameData, "gameData");
    console.log(gameError, "gameError");
    if (gameError) {
      return NextResponse.json(
        { error: "Error creating game state" },
        { status: 500 }
      );
    }

    // Then create the rose submission with the game_id
    const { data: submittedRose, error: roseError } = await supabase
      .from("roses")
      .insert([
        {
          ...roseData,
          game_id: gameData.id,
        },
      ])
      .select()
      .single();
    console.log(submittedRose, "submittedRose");
    console.log(roseError, "roseError");

    if (roseError) {
      return NextResponse.json(
        { error: "Error creating rose submission" },
        { status: 500 }
      );
    }

    return NextResponse.json(submittedRose);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
