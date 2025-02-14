import { ArrowRight, Heart } from "lucide-react";
import { Coins, Wallet } from "lucide-react";
import { Gift } from "lucide-react";
import { Button } from "../ui/button";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

const WalletNotConnected = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <Wallet className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-accent">Connect Your Wallet</h1>
          <p className="text-accent/60">Start your journey of spreading love on the blockchain</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gradient-to-br from-primary/5 to-primary/20 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg">
                <Gift className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Create Rose Games</h3>
                <p className="text-sm text-accent/60">Design unique rose experiences to share with friends and family</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-primary/20 p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg">
                <Coins className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Send $LOVE</h3>
                <p className="text-sm text-accent/60">Share tokens of affection on the Base blockchain</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-accent/5 p-6 rounded-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" />
            Getting Started
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ArrowRight className="w-4 h-4 mt-1 text-secondary" />
              <p className="text-sm text-accent/80">Connect your wallet to create and manage rose games</p>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-4 h-4 mt-1 text-secondary" />
              <p className="text-sm text-accent/80">Ensure you have some ETH on Base for network fees</p>
            </li>
            <li className="flex items-start gap-3">
              <ArrowRight className="w-4 h-4 mt-1 text-secondary" />
              <p className="text-sm text-accent/80">Create rose games and share them with loved ones</p>
            </li>
          </ul>
        </div>
        <div className="w-full flex justify-center">
          <DynamicWidget />
        </div>
      </div>
    </div>
  );
};

export default WalletNotConnected;