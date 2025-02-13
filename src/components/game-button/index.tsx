import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface GameButtonProps {
  peanutLink: string;
  disabled?: boolean;
}

export default function GameButton({ peanutLink, disabled = false }: GameButtonProps) {
  const router = useRouter();
  
  const handleNavigateToGame = async () => {
    if (!peanutLink) {
      console.error('No peanutLink provided to GameButton');
      return;
    }
    
    try {
      // Parse the original URL
      const url = new URL(peanutLink);
      const params = url.searchParams;
      
      // Create game URL with all original parameters
      const gameUrl = `/game?${params.toString()}${url.hash}`;
      
      router.push(gameUrl);
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