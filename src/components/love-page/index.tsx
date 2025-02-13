"use client";

import { Suspense, useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import ValentineChat from "@/components/valentine-chat";
import { getGameState, getRoseByPeanutLink } from "@/utils/supabase/queries";
import GiftCounter from "@/components/gift-counter";
import DateComponent from "@/components/date-component";
import { GameState } from "@/types";
import supabase from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";
import { LoadingOverview } from "@/components/loading-overview";

export default function LovePage({ peanutLink }: { peanutLink: string }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeGame() {
      try {
        const rose = await getRoseByPeanutLink(peanutLink);
        if (!rose?.game_id) {
          console.error("No rose found for this peanut link");
          return;
        }

        console.log('rose id', rose.game_id);

        let currentGameState = await getGameState(rose?.peanut_link!);

        if (!currentGameState) {
          const { data: newGameState, error: gameError } = await supabase
            .from("games")
            .select("*")
            .eq("game_id", rose.game_id)
            .single();
          console.log('newGameState', newGameState);
          if (gameError) {
            console.error("Failed to create game state");
            toast({
              title: "Error",
              description: "Failed to create game state",
              variant: "destructive",
            });
            return;
          }
          currentGameState = newGameState;
        }

        setGameState(currentGameState);
      } catch (error) {
        console.error("Error initializing game:", error);
        toast({
          title: "Error",
          description: "Failed to initialize game",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (peanutLink) {
      initializeGame();
    }
  }, [peanutLink]);

  if (isLoading) {
    return <LoadingOverview />;
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

    console.log('gameState', gameState);

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
    if (allGiftsUnlocked) {

        // TODO: Add GameInfo={gameInfo} as
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