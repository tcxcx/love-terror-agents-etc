"use client";

import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import WalletNotConnected from "@/components/wallet-not-connected";
import { useAccount } from "wagmi";
const SendRoses = dynamic(() => import("@/components/send-roses"), {
  ssr: false,
});

const RosesPage = () => {
  const { address } = useAccount();

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      <div className="z-10">
        {!address ? (
          <WalletNotConnected />
        ) : (
          <SendRoses />
        )}
      </div>
    </div>
  );
};

export default RosesPage;
