import { Suspense } from 'react';
import ValentineChat from '@/components/valentine-chat';
import { getGameState } from '@/utils/supabase/queries';
import { createGameState } from '@/utils/supabase/mutations';
// import { generateMetadata } from "@/seo/get-roses";
import GiftCounter from '@/components/gift-counter';

// export { generateMetadata };


export default async function LovePage() {
  // Initialize game state on page load
  const gameState = await getGameState();
  if (!gameState) {
    await createGameState();
  }


  return (
    <>
      <GiftCounter gameState={gameState!} />

      <Suspense fallback={<div>Loading game state...</div>}>
        <ValentineChat />
      </Suspense>
    </>
  );
}