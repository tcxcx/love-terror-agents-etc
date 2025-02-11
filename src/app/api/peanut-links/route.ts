import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { roseId, link, claimWallet, claimStatus } = await request.json();
    console.log(
      roseId,
      link,
      claimWallet,
      claimStatus,
      "roseId, link, claimWallet, claimStatus"
    );
    const { data, error } = await supabase
      .from("peanut_link")
      .insert([
        {
          rose_id: roseId,
          link: link,
          claimed: claimStatus,
          claim_wallet: claimWallet,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();
    console.log(data, "data");
    console.log(error, "error");
    if (error) {
      return NextResponse.json(
        { error: "Error creating peanut link" },
        { status: 500 }
      );
    }

    // Update the rose record with the peanut link
    const { error: roseError } = await supabase
      .from("roses")
      .update({ peanut_link: link })
      .eq("id", roseId);
    console.log(roseError, "roseError");

    if (roseError) {
      return NextResponse.json(
        { error: "Error updating rose with peanut link" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { link, claimWallet } = await request.json();

    // Generate a new game ID that will be shared between roses and games tables
    const gameId = uuidv4();

    // Update peanut link status
    const { data: peanutLink, error: peanutError } = await supabase
      .from("peanut_link")
      .update({
        claim_status: true,
        claim_wallet: claimWallet,
        claimed_at: new Date().toISOString(),
        claimed_by: claimWallet,
      })
      .eq("link", link)
      .select()
      .single();

    if (peanutError) {
      return NextResponse.json(
        { error: "Error updating peanut link" },
        { status: 500 }
      );
    }

    // Update associated rose status with the game ID
    const { error: roseError } = await supabase
      .from("roses")
      .update({
        claimed: true,
        claimed_at: new Date().toISOString(),
        claimed_by_wallet: claimWallet,
        game_id: gameId,
      })
      .eq("id", peanutLink.rose_id);

    if (roseError) {
      return NextResponse.json(
        { error: "Error updating rose status" },
        { status: 500 }
      );
    }

    // Create a new game record with the same game ID
    const { error: gameError } = await supabase.from("games").insert({
      id: gameId,
      ascii_game: true,
      roses_game: false,
      guess_game: false,
      poem_game: false,
    });

    if (gameError) {
      return NextResponse.json(
        { error: "Error creating game record" },
        { status: 500 }
      );
    }

    return NextResponse.json(peanutLink);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
