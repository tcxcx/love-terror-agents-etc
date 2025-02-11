'use client';

import React, { useState } from 'react';

interface GuessingGameProps {
  clues: {
    clue_1?: string;
    clue_2?: string;
    clue_3?: string;
    clue_4?: string;
    clue_5?: string;
    clue_6?: string;
    clue_7?: string;
  };
  currentClue: number;
  secretAnswer?: string;
  onComplete?: () => void;
  guess?: string;
}

export const GuessingGame: React.FC<GuessingGameProps> = ({
  clues,
  currentClue,
  secretAnswer,
  onComplete,
  guess
}) => {
  const [localGuess, setLocalGuess] = useState(guess || '');

  const currentClueText = clues[`clue_${currentClue}` as keyof typeof clues];

  return (
    <div className="p-4 bg-purple-500/10 rounded-lg tool-content">
      <h3 className="text-lg font-bold mb-4">Clue #{currentClue}</h3>
      <p className="mb-4 text-purple-300">{currentClueText}</p>
      <div className="space-y-4">
        {/* Previous clues */}
        {currentClue > 1 && (
          <div className="text-sm opacity-70">
            <h4>Previous Clues:</h4>
            {Array.from({ length: currentClue - 1 }, (_, i) => (
              <p key={i}>{clues[`clue_${i + 1}` as keyof typeof clues]}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};