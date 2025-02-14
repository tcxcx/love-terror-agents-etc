"use client";

import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

export function AddAccountButton({ onClick }: { onClick?: () => void }) {
  const [_, setStep] = useQueryState("step");

  const handleClick = () => {
    setStep("connect");
    onClick?.();
  };

  return (
    <Button
      data-event="Begin"
      onClick={handleClick}
      className="bg-main text-black dark:text-white font-futuru font-extrabold tracking-tight border-2 border-transparent rounded-xl px-4"
    >
      <span className="mr-1 tracking-wide">❤️‍🔥</span> Begin
    </Button>
  );
}
