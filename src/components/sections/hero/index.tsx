'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="container px-4 pt-20 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-4 animate-slide-up">
          <div className="inline-block px-4 py-1 mb-4 bg-secondary/10 rounded-full animate-bounce">
          <AnimatedShinyText 
            onClick={() => router.push('/love')}
            className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 cursor-pointer"
          >
          <span>✨  Helping dev&lsquo;s get dates for Valentine&lsquo;s Day 👀</span>

          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>         
           </div>
          <h1 className="text-5xl font-bold text-accent">
            <span className="text-red-500">Valentine&lsquo;s</span> Day 2025: 
            <span className="text-secondary animate-pulse"> autists unite!</span>
          </h1>
          <p className="text-lg text-accent/80 mt-6 font-mono">
            {">"} I am a simp for Love <span className="text-red-500 animate-pulse">❤</span>

          </p>
          <p className="text-sm text-accent/60 italic">
            (FU Cupid, this is MY $LOVE quest...)
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;