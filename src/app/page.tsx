
import React from "react";
import HeroSection from "@/components/sections/hero";
import TerminalWindow from "@/components/sections/terminal";
import TokenSection from "@/components/sections/token";
import DevStorySection from "@/components/sections/story";
import HowItWorksSection from "@/components/sections/features/how-it-works";
import FeatureGrid from "@/components/sections/features/feature-grid";
import DisclaimerSection from "@/components/sections/disclaimer";
import CTASection from "@/components/sections/cta";
import InspirationVideo from "@/components/sections/video";
import Header from "@/components/header";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TerminalWindow />
      <TokenSection />
      <DevStorySection />
      <div>
      <HowItWorksSection />
      <FeatureGrid />
      </div>
      <InspirationVideo />
      <DisclaimerSection />
      <CTASection />
    </div>
  );
};

export default Index;