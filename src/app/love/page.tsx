import { Suspense } from 'react';
import ValentineChat from '@/components/valentine-chat';
import { getGameState } from '@/utils/supabase/queries';
import { createGameState } from '@/utils/supabase/mutations';
import GiftCounter from '@/components/gift-counter';
import ClaimRoses from '@/components/claim-roses';
import DateComponent from '@/components/date-component';
import { Rose, GameState } from '@/types';
import ClaimForm from '@/components/peanut/claim/claim-info';

interface PageProps {
  searchParams: { claimId: string }
}

export default async function Page({ searchParams }: PageProps) {
  const gameState = await getGameState();
  const claimId = await searchParams?.claimId as string || '';

  if (!gameState) {
    await createGameState();
    return null;
  }

  const allGiftsUnlocked = 
    gameState.roses_game && 
    gameState.ascii_game && 
    gameState.guess_game && 
    gameState.poem_game;

  const gameInfo = {
    valentineName: gameState.valentines_user?.name || 'there',
    systemPrompt: gameState.roses?.[0]?.system_prompt || '',
    clues: [
      gameState.roses?.[0]?.clue_1,
      gameState.roses?.[0]?.clue_2,
    ].filter(Boolean) as string[],
    poemText: gameState.roses?.[0]?.poem_text || '',
    dateDetails: gameState.roses?.[0]?.date_details || '',
    calendlyLink: gameState.roses?.[0]?.calendly_link || ''
  };

  const isLinkClaimed = gameState.roses?.some((rose: Rose) => rose.claimed) || false;
  const hasLink = gameState.roses?.length! > 0;

  const renderMainContent = () => {
    if (!hasLink) {
      return <ClaimForm claimId={claimId} />;
    }

    if (!isLinkClaimed) {
      return <ClaimRoses />;
    }

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
      <GiftCounter gameState={gameState as GameState} />
      {renderMainContent()}
    </div>
  );
}