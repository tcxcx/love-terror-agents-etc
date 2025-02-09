"use server";

import { createAI, getMutableAIState, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { ReactNode } from "react";
import { nanoid } from "nanoid";
import { AsciiArt } from "@/components/ascii";
import { asciiArtTool } from "@/components/ai/tools";
import { createGameState } from '@/utils/supabase/mutations';
import { getGameState } from '@/utils/supabase/queries';
import {completeAsciiGame} from '@/actions/supabase/game';
import {handleAsciiArtComplete} from '@/hooks/game-functions';
// import {checkGameProgress} from '@/hooks/game-functions';


// import { PasswordAuth } from "@/components/auth";
// import { CalendarScheduler } from "@/components/calendar";
// import { LocationReveal } from "@/components/location";
// import { PoemDisplay } from "@/components/poem";
// import { BlockchainNFT } from "@/components/blockchain";

export interface ServerMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ClientMessage {
  id: string;
  role: "user" | "assistant";
  display: ReactNode;

}

export async function continueConversation(
  input: string,
): Promise<ClientMessage> {
  "use server";

  const history = getMutableAIState();

  let gameState = await getGameState();
  if (!gameState) {
    gameState = await createGameState();
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
      displayAsciiArt: {
        ...asciiArtTool,
        generate: async function* () {
          yield <div>Generando arte ASCII...</div>;

          if (gameState && !gameState.ascii_game) {
            await completeAsciiGame(gameState.id);
          }
          return <AsciiArt onComplete={handleAsciiArtComplete} />;
        },
      },
      // passwordAuth: {
      //   description: "Authenticate with password",
      //   parameters: z.object({
      //     password: z.string().describe("I have created a secret only you and I know about - you have 7 clues to decipher it"),
      //   }),
      //   generate: async function* ({ password }) {
      //     yield <div>Verifying password...</div>;
      //     return <PasswordAuth password={password} />;
      //   },
      // },
      // scheduleDate: {
      //   description: "Schedule a date",
      //   parameters: z.object({
      //     date: z.string().describe("date to schedule"),
      //   }),
      //   generate: async function* ({ date }) {
      //     yield <div>Setting up calendar...</div>;
      //     return <CalendarScheduler date={date} />;
      //   },
      // },
      // revealLocation: {
      //   description: "Reveal meeting location",
      //   parameters: z.object({
      //     location: z.string().describe("location to reveal"),
      //   }),
      //   generate: async function* ({ location }) {
      //     yield <div>Revealing location...</div>;
      //     return <LocationReveal location={location} />;
      //   },
      // },
      // displayPoem: {
      //   description: "Display a poem",
      //   parameters: z.object({
      //     poem: z.string().describe("poem to display"),
      //   }),
      //   generate: async function* ({ poem }) {
      //     yield <div>Preparing poem...</div>;
      //     return <PoemDisplay poem={poem} />;
      //   },
      // },
      // createNFT: {
      //   description: "Create blockchain NFT",
      //   parameters: z.object({
      //     content: z.string().describe("content to mint as NFT"),
      //   }),
      //   generate: async function* ({ content }) {
      //     yield <div>Minting NFT...</div>;
      //     return <BlockchainNFT content={content} />;
      //   },
      // },
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