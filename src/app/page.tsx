
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
import SocialSection from "@/components/sections/social";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-lighter to-white">
      <Header />
      <HeroSection />
      <TerminalWindow />
      <TokenSection />
      <DevStorySection />
      <HowItWorksSection />
      <FeatureGrid />
      <InspirationVideo />
      <DisclaimerSection />
      <CTASection />
      <SocialSection />
    </div>
  );
};

export default Index;