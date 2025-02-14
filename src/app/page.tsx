
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
import Footer from "@/components/footer";
import SocialsSection from "@/components/sections/social";
const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TerminalWindow />
      <div className="max-w-4xl mx-auto">
      <TokenSection />
      <DevStorySection />
      <HowItWorksSection />
      <FeatureGrid />
      <InspirationVideo />
      <DisclaimerSection />
      <CTASection />
      </div>
      <SocialsSection />
      <section 
        className="w-full h-[400px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg-yellow.png)' }}
      />
      <Footer />
    </div>
  );
};

export default Index;