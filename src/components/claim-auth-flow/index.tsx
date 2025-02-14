"use client";

import React, { useState } from "react";
import { GoogleSignin } from "../google-auth";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Heart, Gift, LockKeyhole, Mail } from "lucide-react";

interface ClaimAuthFlowProps {
  peanutLink?: string;
}

const ClaimAuthFlow = ({ peanutLink }: ClaimAuthFlowProps) => {
  const [step, setStep] = useState<'intro' | 'google' | 'wallet'>('intro');

  const renderIntro = () => (
    <div className="space-y-6 text-center">
      <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
        <Gift className="w-10 h-10 text-secondary" />
      </div>
      <h1 className="text-3xl font-bold text-accent">Someone Sent You a Valentine Secret Admirer Game!</h1>
      <p className="text-accent/60 max-w-md mx-auto">
        You've received a special Valentine's Rose Game. To claim your gift, we'll need to set up your account securely.
      </p>
      <div className="bg-accent/5 p-6 rounded-xl max-w-md mx-auto">
        <h3 className="font-semibold mb-4 flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-secondary" />
          How It Works
        </h3>
        <ul className="space-y-4 text-left">
          <li className="flex items-start gap-3">
            <Mail className="w-5 h-5 mt-1 text-secondary shrink-0" />
            <p className="text-sm text-accent/80">Sign in with Google to create your account (Step 1/2)</p>
          </li>
          <li className="flex items-start gap-3">
            <LockKeyhole className="w-5 h-5 mt-1 text-secondary shrink-0" />
            <p className="text-sm text-accent/80">Connect your wallet to claim your gift (Step 2/2)</p>
          </li>
        </ul>
      </div>
      <button
        onClick={() => setStep('google')}
        className="bg-secondary text-white px-8 py-3 rounded-xl hover:bg-secondary-darker transition-colors"
      >
        Start Claiming Your Gift
      </button>
    </div>
  );

  const renderGoogleAuth = () => (
    <div className="space-y-6 text-center">
      <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
        <Mail className="w-10 h-10 text-secondary" />
      </div>
      <h2 className="text-2xl font-bold text-accent">Step 1: Sign In</h2>
      <p className="text-accent/60 max-w-md mx-auto mb-6">
        First, let's create your account to keep track of your game state.
      </p>
      <div className="max-w-sm mx-auto">
        <GoogleSignin />
      </div>
    </div>
  );

  const renderWalletConnect = () => (
    <div className="space-y-6 text-center">
      <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
        <LockKeyhole className="w-10 h-10 text-secondary" />
      </div>
      <h2 className="text-2xl font-bold text-accent">Step 2: Connect Wallet</h2>
      <p className="text-accent/60 max-w-md mx-auto mb-6">
        Now, connect your wallet to claim your Valentine's gift. You'll need a small amount of ETH on Base for network fees.
      </p>
      <div className="max-w-sm mx-auto">
        <DynamicWidget />
      </div>
      <div className="bg-primary/5 p-4 rounded-xl max-w-md mx-auto mt-6">
        <p className="text-sm text-accent/80">
          New to Web3? Don't worry! Your wallet is like a digital key that lets you receive and manage your Valentine's gifts securely.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 'intro':
        return renderIntro();
      case 'google':
        return renderGoogleAuth();
      case 'wallet':
        return renderWalletConnect();
      default:
        return renderIntro();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ClaimAuthFlow;