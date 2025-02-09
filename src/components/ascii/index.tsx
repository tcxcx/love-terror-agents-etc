// src/components/ascii/index.tsx
'use client';

import React, { useEffect } from 'react';
import { VALENTINE_ASCII } from '@/lib/ascii';

interface AsciiArtProps {
  onComplete?: () => void;
}

export const AsciiArt: React.FC<AsciiArtProps> = ({ onComplete }) => {
  useEffect(() => {
    console.log('🟢 AsciiArt component mounted');
    // Call onComplete when component mounts to mark the ASCII game as complete
    onComplete?.();
    return () => {
      console.log('🟢 AsciiArt component unmounting');
    };
  }, [onComplete]);

  return (
    <div className="text-center tool-content ascii-art">
      <pre className="font-mono text-sm whitespace-pre">
        {VALENTINE_ASCII}
      </pre>
    </div>
  );
};