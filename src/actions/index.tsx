"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { nanoid } from "nanoid";
import { useRoseStore } from '@/store/useRoseStore';
import { AsciiArt } from "@/components/games/ascii";
import { GuessingGame } from "@/components/games/guessing-game";
import { PoemDisplay } from "@/components/games/poem-display";
import { DateScheduler } from "@/components/games/date-scheduler";

// Import tools and actions
import {
  asciiArtTool,
  guessingGameTool,
  poemRevealTool,
  dateLocationTool,
  gameProgressTool,
} from "@/components/ai/tools";

import {
  initializeGame,
  completeAsciiGame,
  completeGuessingGame,
  completePoemGame,
} from "@/utils/supabase/actions";


import { getGameState } from "@/utils/supabase/queries";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;
  gameId: string;
}

export async function continueConversation(
  input: string,
  gameId: string
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();
  let gameState = await getGameState(gameId);

  if (!gameState) {
    gameState = await initializeGame(gameId);
  }

  // Create context for AI from game state
  const aiContext = {
    valentineName: gameState?.roses?.[0]?.valentines_name || "",
    secretAdmirerName: gameState?.roses?.[0]?.secret_admirer_name || "",
    systemPrompt: gameState?.roses?.[0]?.system_prompt || "",
    secretQuestion: gameState?.roses?.[0]?.secret_question || "",
    secretAnswer: gameState?.roses?.[0]?.secret_answer || "",
    clues: {
      clue1: gameState?.roses?.[0]?.clue_1 || "",
      clue2: gameState?.roses?.[0]?.clue_2 || "",
      clue3: gameState?.roses?.[0]?.clue_3 || "",
      clue4: gameState?.roses?.[0]?.clue_4 || "",
      clue5: gameState?.roses?.[0]?.clue_5 || "",
      clue6: gameState?.roses?.[0]?.clue_6 || "",
      clue7: gameState?.roses?.[0]?.clue_7 || "",
    },
    dateSite: gameState?.roses?.[0]?.date_site || "",
    dateDetails: gameState?.roses?.[0]?.date_details || "",
    calendlyLink: gameState?.roses?.[0]?.calendly_link || "",
    poemText: gameState?.roses?.[0]?.poem_text || "",
    progress: {
      ascii: gameState?.ascii_game || false,
      guessing: gameState?.guess_game || false,
      poem: gameState?.poem_game || false,
      roses: gameState?.roses_game || false,
    }
  };

  // Update Zustand store with game state
  useRoseStore.getState().setGameState(gameState as any);

  const result = await streamUI({
    model: openai("gpt-4o"),
    messages: [
      ...history.get(),
      {
        role: "system",
        content: `You are managing a Valentine's game for ${aiContext.valentineName}. 
                 Secret Admirer: ${aiContext.secretAdmirerName}
                 System Context: ${aiContext.systemPrompt}
                 Current Progress: ASCII(${aiContext.progress.ascii}), Guessing(${aiContext.progress.guessing}), Poem(${aiContext.progress.poem}), Roses(${aiContext.progress.roses})`
      },
      { role: "user", content: input }
    ],
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
          yield <div>Generating your special ASCII art...</div>
          if (!aiContext.progress.ascii) {
            useRoseStore.getState().updateGame({ ascii_game: true })
          }
          return <AsciiArt onComplete={() => useRoseStore.getState().updateGame({ ascii_game: true })} />
        },
      },

      // Guessing Game
      playGuessingGame: {
        ...guessingGameTool,
        generate: async function* ({ clueNumber, guess }) {
          yield <div>Loading clue {clueNumber}...</div>

          if (guess) {
            const isCorrect = guess.toLowerCase().trim() === aiContext.secretAnswer.toLowerCase().trim()

            if (isCorrect) {
              useRoseStore.getState().updateGame({ guess_game: true })
            }

            yield <div>{isCorrect ? "🎉 Correct!" : "Try again..."}</div>
          }

          return (
            <GuessingGame
              clues={aiContext.clues as any}
              currentClue={clueNumber}
              secretAnswer={aiContext.secretAnswer}
              onComplete={() => {
                useRoseStore.getState().updateGame({ guess_game: true })
              }}
              guess={guess}
            />
          )
        },
      },

      // Poem Game
      handlePoem: {
        ...poemRevealTool,
        generate: async function* ({ action }: { action: string }) {
          yield <div>Preparing your special poem...</div>

          if (action === "view") {
            return (
              <PoemDisplay
                poem={aiContext.poemText}
                onComplete={() => {
                  useRoseStore.getState().updateGame({ poem_game: true })
                }}
              />
            )
          }
          return null
        },
      },

      // Date Location & Scheduling
      handleDate: {
        ...dateLocationTool,
        generate: async function* () {
          yield <div>Preparing your special date details...</div>

          return (
            <DateScheduler
              location={aiContext.dateSite}
              details={aiContext.dateDetails}
              calendlyLink={aiContext.calendlyLink}
            />
          )
        },
      },

      // Game Progress
      checkProgress: {
        ...gameProgressTool,
        generate: async function* () {
          yield <div>Checking game progress...</div>

          return (
            <div className="p-4 bg-pink-500/10 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Your Progress</h3>
              <ul className="space-y-2">
                <li>ASCII Art: {aiContext.progress.ascii ? "✅" : "⏳"}</li>
                <li>Guessing Game: {aiContext.progress.guessing ? "✅" : "⏳"}</li>
                <li>Secret Poem: {aiContext.progress.poem ? "✅" : "⏳"}</li>
                <li>Roses Claimed: {aiContext.progress.roses ? "✅" : "⏳"}</li>
              </ul>
            </div>
          )
        },
      },
    },
  })

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value,
    gameId: gameId,
  }
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
})
