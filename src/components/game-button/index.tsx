import React from 'react';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';

interface GameButtonProps {
  peanutLink: string;
  disabled?: boolean;
}

export default function GameButton({ peanutLink, disabled = false }: GameButtonProps) {
  const router = useRouter();
  const [, setLove] = useQueryState('love');
  
  const handleNavigateToGame = async () => {
    if (!peanutLink) {
      console.error('No peanutLink provided to GameButton');
      return;
    }
    
    try {
      // Get the full URL path and parameters
      const gameUrl = peanutLink.replace('/love', '/game');
      
      // Set the full URL as the love parameter
      await setLove(gameUrl);
      router.push('/game');
    } catch (error) {
      console.error('Error handling navigation:', error);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleNavigateToGame}
      disabled={disabled || !peanutLink}
      className="mt-5 flex items-center gap-2 self-end w-full hover:bg-violet-300"
    >
      Continue to Game <span className="text-xl">🎮</span>
    </Button>
  );
}