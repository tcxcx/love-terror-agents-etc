"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { nanoid } from "nanoid";

import { AsciiArt } from "@/components/games/ascii";
import { GuessingGame } from "@/components/games/guessing-game";
import { PoemDisplay } from "@/components/games/poem-display";
import { DateScheduler } from "@/components/games/date-scheduler";
import {handleAsciiArtComplete} from '@/hooks/game-functions';
import { 
  asciiArtTool,
  guessingGameTool,
  poemRevealTool,
  dateLocationTool,
  gameProgressTool,
  validateSecretAnswerTool
} from "@/components/ai/tools";
import { 
  initializeGame,
  completeAsciiGame,
  completeGuessingGame,
  completePoemGame,
  completeRosesGame,
} from '@/actions/supabase/game';
import { getGameStateWithValentineInfo } from '@/utils/supabase/queries';

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
}

export async function continueConversation(input: string): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();
  let gameState = await getGameStateWithValentineInfo();
  
  if (!gameState) {
    gameState = await initializeGame();
  }

  const result = await streamUI({
    model: openai("gpt-4o"),
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content },
        ]);
      }
      return <div>{content}</div>;
    },
    tools: {
      // ASCII Art Game
      displayAsciiArt: {
        ...asciiArtTool,
        generate: async function* () {
          yield <div>Generating your special ASCII art...</div>;
          if (gameState && !gameState.ascii_game) {
            await completeAsciiGame(gameState.id);
          }
          return <AsciiArt onComplete={() => completeAsciiGame(gameState!.id)} />;
        },
      },

      // Guessing Game with 7 Clues
      playGuessingGame: {
        ...guessingGameTool,
        generate: async function* ({ clueNumber, guess }: { clueNumber: number; guess: string }) {
          yield <div>Loading clue {clueNumber}...</div>;
          
          const clues = {
            clue_1: gameState?.roses?.[0]?.clue_1,
            clue_2: gameState?.roses?.[0]?.clue_2,
            clue_3: gameState?.roses?.[0]?.clue_3,
            clue_4: gameState?.roses?.[0]?.clue_4,
            clue_5: gameState?.roses?.[0]?.clue_5,
            clue_6: gameState?.roses?.[0]?.clue_6,
            clue_7: gameState?.roses?.[0]?.clue_7,
          };


          if (guess) {
            const isCorrect = guess.toLowerCase().trim() === 
              (gameState?.roses?.[0]?.secret_answer || '').toLowerCase().trim();

            if (isCorrect) {
              await completeGuessingGame(gameState!.id);
            }

            yield <div>{isCorrect ? '🎉 Correct!' : 'Try again...'}</div>;
          }

          return (
            <GuessingGame 
              clues={clues}
              currentClue={clueNumber}
              secretAnswer={gameState?.roses?.[0]?.secret_answer}
              onComplete={() => completeGuessingGame(gameState!.id)}
              guess={guess}
            />
          );
        },
      },

      // Poem Game
      handlePoem: {
        ...poemRevealTool,
        generate: async function* ({ poem, action }) {
          yield <div>Preparing your special poem...</div>;
          
          if (action === 'view') {
            return (
              <PoemDisplay 
                poem={gameState?.roses?.[0]?.poem_text}
                onComplete={() => completePoemGame(gameState!.id)}
              />
            );
          }
          return null;
        },
      },

      // Date Location & Scheduling
      handleDate: {
        ...dateLocationTool,
        generate: async function* ({ location, details }) {
          yield <div>Preparing your special date details...</div>;
                    
          return (
            <DateScheduler 
              location={gameState?.roses?.[0]?.date_site}
              details={gameState?.roses?.[0]?.date_details}
              calendlyLink={gameState?.roses?.[0]?.calendly_link}
            />
          );
        },
      },

      // Game Progress Checking
      checkProgress: {
        ...gameProgressTool,
        generate: async function* ({ checkType }) {
          yield <div>Checking game progress...</div>;
          
          const progress = {
            ascii: gameState?.ascii_game,
            guessing: gameState?.guess_game,
            poem: gameState?.poem_game,
            roses: gameState?.roses_game,
          };

          return (
            <div className="p-4 bg-pink-500/10 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Your Progress</h3>
              <ul className="space-y-2">
                <li>ASCII Art: {progress.ascii ? '✅' : '⏳'}</li>
                <li>Guessing Game: {progress.guessing ? '✅' : '⏳'}</li>
                <li>Secret Poem: {progress.poem ? '✅' : '⏳'}</li>
                <li>Roses Claimed: {progress.roses ? '✅' : '⏳'}</li>
              </ul>
            </div>
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});