"use client";

import { Suspense, useEffect, useState } from "react";
import ValentineChat from "@/components/valentine-chat";
import { getGameState, getRoseByPeanutLink } from "@/utils/supabase/queries";
import GiftCounter from "@/components/gift-counter";
import ClaimRoses from "@/components/claim-roses";
import DateComponent from "@/components/date-component";
import { Rose, GameState } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function LovePage({ peanutLink }: { peanutLink: string }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  useEffect(() => {
    async function initializeGame() {
      try {
        const rose = await getRoseByPeanutLink(peanutLink);

        if (!rose) {
          console.error("No rose found for this peanut link");
          return;
        }

        let currentGameState = await getGameState(rose?.game_id!);

        if (!currentGameState) {
          // Create new game state if none exists
          const { data: currentGameState, error: gameError } = await supabase
            .from("games")
            .select("*")
            .eq("id", rose?.game_id!)
            .single();
          if (gameError) {
            console.error("Failed to create game state");
            toast({
              title: "Error",
              description: "Failed to create game state",
              variant: "destructive",
            });
            return;
          }
        }

        setGameState(currentGameState);
      } catch (error) {
        console.error("Error initializing game:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (peanutLink) {
      initializeGame();
    }
  }, [peanutLink]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="text-center">
        <p className="text-red-500">Failed to load game state</p>
      </div>
    );
  }

  const allGiftsUnlocked =
    gameState.roses_game &&
    gameState.ascii_game &&
    gameState.guess_game &&
    gameState.poem_game;

  const gameInfo = {
    valentineName: gameState.roses?.[0]?.valentines_name || "there",
    systemPrompt: gameState.roses?.[0]?.system_prompt || "",
    clues: [
      gameState.roses?.[0]?.clue_1,
      gameState.roses?.[0]?.clue_2,
      gameState.roses?.[0]?.clue_3,
      gameState.roses?.[0]?.clue_4,
      gameState.roses?.[0]?.clue_5,
      gameState.roses?.[0]?.clue_6,
      gameState.roses?.[0]?.clue_7,
    ].filter(Boolean) as string[],
    poemText: gameState.roses?.[0]?.poem_text || "",
    dateDetails: gameState.roses?.[0]?.date_details || "",
    calendlyLink: gameState.roses?.[0]?.calendly_link || "",
  };

  const renderMainContent = () => {
    if (!gameState.roses_game) {
      // TO DO: adapt so claim form takes peanutLink as a prop
      return <ClaimRoses />;
    }

    if (allGiftsUnlocked) {
      // TO DO: pass gameInfo as a prop
      return <DateComponent />;
    }

    return (
      <Suspense fallback={<div>Loading chat...</div>}>
        <ValentineChat gameInfo={gameInfo} />
      </Suspense>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <GiftCounter gameState={gameState} />
      {renderMainContent()}
    </div>
  );
}
