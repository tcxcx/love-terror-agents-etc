import { Suspense } from 'react';
import ValentineChat from '@/components/valentine-chat';
import { getGameState } from '@/utils/supabase/queries';
import { createGameState } from '@/utils/supabase/mutations';
// import { generateMetadata } from "@/seo/get-roses";
import GiftCounter from '@/components/gift-counter';
import ClaimRoses from '@/components/claim-roses';
import DateComponent from '@/components/date-component';
import { Rose, GameState } from '@/types';

// export { generateMetadata };

export default async function Page() {
  const gameState = await getGameState();
  if (!gameState) {
    await createGameState();
    return null;
  }

  const allGiftsUnlocked = 
    gameState.roses_game && 
    gameState.ascii_game && 
    gameState.guess_game && 
    gameState.poem_game;

  const isLinkClaimed = gameState.roses?.some((rose: Rose) => rose.claimed) || false;
  console.log('isLinkClaimed', isLinkClaimed);

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
      <GiftCounter gameState={gameState as GameState} />
      {renderMainContent()}
    </div>
  );
}