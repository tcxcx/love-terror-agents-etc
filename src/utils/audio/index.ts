"use client";

import { useRef, useEffect } from "react";

// Audio cache to prevent creating multiple instances of the same audio
const audioCache = new Map<string, HTMLAudioElement>();

// Safely create audio element
const createAudio = (audioFilePath: string): HTMLAudioElement | null => {
  if (typeof window === "undefined") return null;
  
  // Check cache first
  if (audioCache.has(audioFilePath)) {
    return audioCache.get(audioFilePath)!;
  }


  // Create new audio instance
  const audio = new window.Audio(audioFilePath);
  audioCache.set(audioFilePath, audio);
  return audio;
};

// Hook for hover audio effects
export function useHoverAudio(audioFilePath: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = createAudio(audioFilePath);
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioFilePath]);

  const playHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.warn("Hover audio failed:", err));
    }
  };

  const resetHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { playHoverSound, resetHoverSound };
}

// One-off audio playback
export function playAudio(audioFilePath: string) {
  if (typeof window === "undefined") return;

  const audio = createAudio(audioFilePath);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((err) => console.warn("Audio playback failed:", err));
  }
}