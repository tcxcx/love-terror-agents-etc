'use client';

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useHoverAudio } from "@/utils/audio";
// import { ActionBannerSkeleton } from "@/components/skeletons";
import SparklesText from "@/components/magicui/sparkles-text";
// import dynamic from "next/dynamic";

// const ActionBanner = dynamic(() => import("@/components/action-banner"), {
//   loading: () => <ActionBannerSkeleton />,
// });

const song = "/audio/saxophone.mp3";

const HeaderFull: React.FC = () => {
  const MotionLink = motion(Link);
  const { playHoverSound, resetHoverSound } = useHoverAudio(song);

  return (
    <div className="bg-transparent">
      {/* <ActionBanner /> */}
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-24">
          {/* Spacer div to help with centering */}
          <div className="w-[250px]" />
          
          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 group">
            <MotionLink
              href="/"
              whileHover={{ scale: 1.15, rotate: 4 }}
              whileTap={{ scale: 1.05, rotate: 2 }}
              onHoverStart={playHoverSound}
              onHoverEnd={resetHoverSound}
            >
              <div className="flex items-center">
                <SparklesText>
                  <Image
                    src="/cringe-logo.png"
                    alt="cringe Logo"
                    width={100}
                    height={100}
                    priority
                  />
                </SparklesText>
                <span className="absolute mt-28 sm:mt-20 opacity-0 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-300">
                  <span className="inline-block pl-5 pt-10 font-clash bg-gradient-to-r text-sm from-pink-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                    Get some $LOVE soon
                  </span>
                </span>
              </div>
            </MotionLink>
          </div>

          {/* Right-aligned Dynamic Widget */}
          <div className="w-[250px] flex justify-end">
            <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
              <DynamicWidget />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFull;