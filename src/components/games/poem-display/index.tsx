'use client';

import React, { useEffect } from 'react';

interface PoemDisplayProps {
  poem?: string;
  onComplete?: () => void;
}

export const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem, onComplete }) => {
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <div className="p-6 bg-pink-500/10 rounded-lg tool-content">
      <h3 className="text-xl font-bold mb-4 text-pink-400">A Poem For You</h3>
      <div className="whitespace-pre-wrap text-pink-300 font-serif">
        {poem}
      </div>
    </div>
  );
};