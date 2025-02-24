"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useHoverAudio } from "@/utils/audio";
import SparklesText from "@/components/magicui/sparkles-text";
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleSignin } from "@/components/google-auth";
import supabase from "@/utils/supabase/client";

const song = "/audio/saxophone.mp3";

const HeaderFull: React.FC = () => {
  const MotionLink = motion(Link);
  const { playHoverSound, resetHoverSound } = useHoverAudio(song);
  const [userLoggedIn, setUserLoggedIn] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data: userLoggedIn } = await supabase.auth.getUser();
      console.log(userLoggedIn, "userLoggedIn");
      setUserLoggedIn(userLoggedIn);
    };
    getUser();
  }, []);

  return (
    <div className="bg-transparent">
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
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="/cringe-logo.png"
                      alt="cringe Logo"
                      width={100}
                      height={100}
                      priority
                      className="transform hover:scale-110 transition-transform duration-200"
                    />
                  </motion.div>
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
              {userLoggedIn?.user === null ? (
                <GoogleSignin />
              ) : (
                <>
                  {/* <SignOut /> */}
                  <DynamicWidget />
                </>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFull;
