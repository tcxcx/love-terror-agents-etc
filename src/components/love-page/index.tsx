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
import { useRoseStore } from '@/store/useRoseStore';

export default function LovePage({ peanutLink }: { peanutLink: string }) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setGameState: setZustandGameState, updateGame } = useRoseStore();

  useEffect(() => {
    async function initializeGame() {
      try {
        console.log('peanutLink', peanutLink);
        const rose = await getRoseByPeanutLink(peanutLink);

        console.log('rose id', rose?.game_id);

        let currentGameState = await getGameState(rose?.peanut_link!);

        if (!currentGameState) {
          const { data: newGameState, error: gameError } = await supabase
            .from("games")
            .select("*")
            .eq("peanut_link", rose?.peanut_link)
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
        

        // Create the complete game state
        const completeGameState = {
          id: currentGameState?.id!,
          created_at: currentGameState?.created_at!,
          roses_game: currentGameState?.roses_game!,
          ascii_game: currentGameState?.ascii_game!, 
          guess_game: currentGameState?.guess_game!,
          poem_game: currentGameState?.poem_game!,
          valentines_user_id: currentGameState?.valentines_user_id!,
          valentines_user: currentGameState?.valentines_user!,
          claimed: currentGameState?.claimed,
          roses: [rose]
        };

        // Set both local and Zustand state
        setGameState(completeGameState as GameState);
        setZustandGameState(completeGameState as any);

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
  }, [peanutLink, setZustandGameState]);

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
    systemPrompt: gameState.roses?.[0]?.system_prompt || "you are a wingman for a secret admirer",
    clues: [
      gameState.roses?.[0]?.clue_1,
      gameState.roses?.[0]?.clue_2,
      gameState.roses?.[0]?.clue_3,
      gameState.roses?.[0]?.clue_4,
      gameState.roses?.[0]?.clue_5,
      gameState.roses?.[0]?.clue_6,
      gameState.roses?.[0]?.clue_7,
    ].filter(Boolean) as string[],
    poemText: gameState.roses?.[0]?.poem_text!,
    dateDetails: gameState.roses?.[0]?.date_details!,
    calendlyLink: gameState.roses?.[0]?.calendly_link!,
    roses: gameState.roses!,
  };

  const renderMainContent = () => {
    if (allGiftsUnlocked) {
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