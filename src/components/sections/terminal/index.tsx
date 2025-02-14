"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";


const TerminalWindow = () => {
  const navigate = useRouter();

  return (
    <div className="retro-window max-w-2xl mx-auto crt-effect">
      <div className="bg-accent p-2 flex items-center gap-2 rounded-t">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse delay-100"></div>
          <div className="w-3 h-3 rounded-full bg-white/20 animate-pulse delay-200"></div>
        </div>
        <p className="text-xs text-white/60 font-mono">crush_finder.exe</p>
      </div>
      <div className="bg-accent p-6 font-mono text-primary-lighter">
        <div className="typing-effect">
          <AnimatedSpan>
            <span className="text-secondary-lighter">{">"}</span> Initializing <span className="text-secondary-lighter animate-pulse">simp</span> mode...
            </AnimatedSpan>
          <br/>
            <AnimatedSpan>

          <span className="text-red-400">
            Roses are red 🌹<br/>
            Violets are blue 💜<br/>
            My portfolio&lsquo;s rekt ❤️‍🩹<br/>
            But I still love you 💝</span>
          </AnimatedSpan>
        </div>
        <AnimatedSpan>

        <div className="mt-2">
          <span className="text-secondary-lighter">{">"}</span> send roses to your valentine...
        </div>
        <div className="mt-2">
          <span className="text-secondary-lighter">{">"}</span> let a cringy AI Cupid be your digital wingman...
        </div>
        <div className="mt-2">
          <span className="text-secondary-lighter">{">"}</span> guessing will not be easy let them be a simp for YOU...
        </div>
        <div className="mt-2">
          <span className="text-secondary-lighter">{">"}</span> hey! even autists should play hard to get...
        </div>
        <div className="mt-2">
          <span className="text-secondary-lighter">{">"}</span> because remember kid YOU are the PRIZE 🫡...
        </div>
    
        <div className="mt-2 animate-pulse">
          <span className="text-secondary-lighter">{">"}</span> waiting for your move, champion... <span className="text-secondary-lighter animate-pulse">_</span>
        </div>

        <div className="mt-2 animate-pulse">
          <span className="text-secondary-lighter">{">"}</span> who's your <span className="text-red-500 animate-pulse">heartgoing to beat for tonight? </span> <span className="text-secondary-lighter animate-pulse">_</span>
        </div>
        </AnimatedSpan>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate.push('/roses')}
            variant="secondary"
            disabled={false}
            className="px-6 py-2 font-mono animate-pulse hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            🌹 Send Roses 🌹
          </Button>
          <Button
            onClick={() => navigate.push('/love')}
            variant="secondary"
            disabled={false}
            className="px-6 py-2 font-mono animate-pulse hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            💝 Claim $LOVE 💝
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;