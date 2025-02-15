import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import LovePage from '../love-page';

interface GameButtonProps {
  peanutLink: string;
  disabled?: boolean;
}

export default function GameButton({ peanutLink, disabled = false }: GameButtonProps) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          disabled={disabled || !peanutLink}
          className="mt-5 flex items-center gap-2 self-end w-full hover:bg-violet-300"
        >
          Continue to Game <span className="text-xl">🎮</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
            <LovePage peanutLink={peanutLink} />
      </DialogContent>
    </Dialog>
  );
}