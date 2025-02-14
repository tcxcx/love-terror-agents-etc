"use client";

import { hideConnectFlowAction } from "@/actions/hide-connect-flow-action";
import { AddAccountButton } from "@/components/begin-button";
import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import OverViewScreenOneLight from "public/assets/placeholder-1.svg";
import OverViewScreenOne from "public/assets/placeholder-2.svg";
import OverViewScreenTwoLight from "public/assets/placeholder-3.svg";
import OverViewScreenTwo from "public/assets/placeholder-4.svg";
import { Fragment, useState } from "react";

const content = [
  {
    id: 1,
    src: OverViewScreenOne,
    src2: OverViewScreenOneLight,
    title: "Find Your Perfect Match 💘",
    description: "Discover potential soulmates through our AI-powered matching system. No more endless swiping - we help you find meaningful connections.",
    tagline: "Connect"
  },
  {
    id: 2,
    src: OverViewScreenTwo,
    src2: OverViewScreenTwoLight,
    title: "Icebreaker Games 🎮", 
    description: "Break the awkward silence with fun, interactive games designed to spark natural conversations and reveal genuine personalities.",
    tagline: "Play"
  },
  {
    id: 3,
    src: OverViewScreenTwo,
    src2: OverViewScreenTwo,
    title: "Virtual Date Planning 🎬",
    description: "Plan and schedule virtual dates with curated activities - from movie nights to cooking classes. Perfect for long-distance connections.",
    tagline: "Date"
  },
  {
    id: 4,
    src: OverViewScreenOne,
    src2: OverViewScreenOne,
    title: "AI Love Coach ✨",
    description: "Get personalized relationship advice and conversation starters from our AI love coach. Navigate your dating journey with confidence.",
    tagline: "Learn"
  },
  {
    id: 5,
    src: OverViewScreenTwo,
    src2: OverViewScreenTwo,
    title: "Global Love Stories 🌍",
    description: "Connect with potential matches worldwide. Our platform breaks down language barriers and cultural differences to help love flourish across borders.",
    tagline: "Explore"
  },
  {
    id: 6,
    src: OverViewScreenOne,
    src2: OverViewScreenOne,
    title: "Safety First 🛡️",
    description: "Feel secure with our verified profiles, video chat features, and comprehensive safety measures. Your peace of mind is our priority.",
    tagline: "Trust"
  }
];

export function OverviewModal({
  defaultOpen = false,
}: { defaultOpen?: boolean }) {
  const [activeId, setActive] = useState(1);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { execute: hideConnectFlow } = useAction(hideConnectFlowAction);

  const handleOnOpenChange = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      hideConnectFlow();
    }
  };

  const activeContent = content.find(item => item.id === activeId);

  return (
    <Dialog
      defaultOpen={defaultOpen}
      open={isOpen}
      onOpenChange={handleOnOpenChange}
    >
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        size="lg"
        className="bg-whiteDanis dark:bg-secondaryBlack border-borderFine dark:border-darkBorder border-2 rounded-xl shadow-shadow"
      >
        <DialogHeader>
          <DialogTitle>Overview</DialogTitle>
        </DialogHeader>
        <div className="bg-whiteDanis dark:bg-secondaryBlack p-2">
          <div className="p-4">
            <div className="flex items-center justify-between gap-8 group">
              {/* Left side image sequence */}
              <div className="w-2/5 relative h-[250px]">
                {content.map((item) => (
                  <Fragment key={item.id}>
                    <Image
                      quality={100}
                      src={item.src}
                      width={486}
                      height={251}
                      alt="Overview"
                      className={cn(
                        "w-full opacity-0 absolute transition-all hidden dark:block",
                        item.id === activeId && "opacity-1",
                      )}
                    />

                    <Image
                      quality={100}
                      src={item.src2}
                      width={486}
                      height={251}
                      alt="Overview"
                      className={cn(
                        "w-full opacity-0 absolute transition-all block dark:hidden",
                        item.id === activeId && "opacity-1",
                      )}
                    />
                  </Fragment>
                ))}
              </div>

              {/* Right side text content */}
              <div className="w-3/5 flex flex-col gap-4">
                <div className="flex flex-col">
                  <TextAnimate 
                    animation="blurInUp" 
                    by="text" 
                    className={cn(
                      "text-2xl md:text-3xl font-knick text-purpleDanis mb-2",
                      "transition-all duration-300",
                      "group-hover:underline group-hover:decoration-wavy group-hover:decoration-purpleDanis/30"
                    )}
                    delay={0.2}
                  >
                    {activeContent?.tagline ?? ''}
                  </TextAnimate>
                  <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-black dark:text-white font-futuru tracking-tight">
                    {activeContent?.title}
                  </h2>
                </div>
                <TextAnimate animation="blurInUp" by="word" key={activeContent?.id} delay={0.4}>
                  {activeContent?.description ?? ''}
                </TextAnimate>
              </div>
            </div>

            <div className="flex justify-between mt-12 items-center">
              <div className="flex space-x-2">
                {content.map((item) => (
                  <button
                    type="button"
                    onMouseEnter={() => setActive(item.id)}
                    onClick={() => setActive(item.id)}
                    key={item.id}
                    className={cn(
                      "w-[16px] h-[6px] rounded-full transition-all cursor-pointer",
                      item.id === activeId 
                        ? "bg-gradient-to-r from-violeta via-lila to-agnusDei dark:from-belanova dark:via-purpura dark:to-vverde scale-110" 
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    )}
                  />
                ))}
              </div>

              <AddAccountButton onClick={handleOnOpenChange} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
