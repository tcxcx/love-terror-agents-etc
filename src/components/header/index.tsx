"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LocalSwitcher from "@/components/locale-switcher";
import { ModeToggle } from "@/components/theme-toggle";
import SparklesText from "@/components/magicui/sparkles-text";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useHoverAudio } from "@/utils/audio-hover";
import { ActionBannerSkeleton } from "@/components/skeleton-card";
import dynamic from "next/dynamic";

const ActionBanner = dynamic(() => import("./action-banner"), {
  loading: () => <ActionBannerSkeleton />,
});
const song = "/sounds/anime-wow-sound-effect.mp3";

const HeaderFull: React.FC = () => {
  const MotionLink = motion(Link);
  const { playHoverSound, resetHoverSound } = useHoverAudio(song);

  return (
    <>
      <ActionBanner />
      <div className="container mx-auto grid grid-cols-3 items-center z-100">
        <div className="flex justify-center group z-100">
          <MotionLink
            href="/"
            whileHover={{ scale: 1.15, rotate: 4 }}
            whileTap={{ scale: 1.05, rotate: 2 }}
            onHoverStart={playHoverSound}
            onHoverEnd={resetHoverSound}
          >
            <div className="flex items-center z-100">
              <SparklesText>
                <Image
                  src="/cringe-logo.png"
                  alt="Bu Logo"
                  width={100}
                  height={100}
                  priority
                />
              </SparklesText>
            </div>
          </MotionLink>
        </div>
        <div className="flex items-center justify-end">
          <span className="h-px flex-grow bg-border"></span>
          <Suspense fallback={<Skeleton className="h-4 w-[250px]" />}>
            <div className="flex items-center gap-3 z-20">
              <DynamicWidget />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HeaderFull;
