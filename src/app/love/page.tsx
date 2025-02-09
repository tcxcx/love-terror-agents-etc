import { Suspense } from 'react';
import ValentineChat from '@/components/valentine-chat';
import { getGameState } from '@/utils/supabase/queries';
import { createGameState } from '@/utils/supabase/mutations';
// import { generateMetadata } from "@/seo/get-roses";
import GiftCounter from '@/components/gift-counter';
import ClaimRoses from '@/components/claim-roses';
import DateComponent from '@/components/date-component';
import { GameState } from '@/utils/supabase/types';

// export { generateMetadata };

interface LovePageProps {
  initialGameState: GameState | null;
}

export default async function LovePage({ initialGameState }: LovePageProps) {
  // Initialize game state on page load if it doesn't exist
  const gameState = initialGameState || await getGameState();
  if (!gameState) {
    await createGameState();
    return null; // Return early while creating game state
  }

  // Check if all gifts are unlocked
  const allGiftsUnlocked = 
    gameState.roses_game && 
    gameState.ascii_game && 
    gameState.guess_game && 
    gameState.poem_game;

  // Check if the link is claimed
  const isLinkClaimed = gameState.claimed;

  // Render appropriate component based on conditions
  const renderMainContent = () => {
    if (!isLinkClaimed) {
      return <ClaimRoses />;
    }

    if (allGiftsUnlocked) {
      return <DateComponent />;
    }

    return (
      <Suspense fallback={<div>Loading chat...</div>}>
        <ValentineChat />
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