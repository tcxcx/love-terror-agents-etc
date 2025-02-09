
import React from "react";
import { Heart, Gamepad, Gift } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="container px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How Our AI Cupid Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="retro-window p-6 hover:scale-105 transition-transform duration-300 group">
            <div className="mb-4">
              <Heart className="w-8 h-8 text-primary group-hover:text-red-500 transition-colors transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-bold mb-2">Send $LOVE Tokens</h3>
            <p className="text-accent/70">
              Become the ultimate simp by sending $LOVE tokens to your crush 🌹
            </p>
          </div>
          <div className="retro-window p-6 hover:scale-105 transition-transform duration-300 group">
            <div className="mb-4">
              <Gamepad className="w-8 h-8 text-secondary group-hover:text-purple-500 transition-colors transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Mystery</h3>
            <p className="text-accent/70">
              Our AI wingman creates puzzles even an autist can solve 🧩
            </p>
          </div>
          <div className="retro-window p-6 hover:scale-105 transition-transform duration-300 group">
            <div className="mb-4">
              <Gift className="w-8 h-8 text-secondary-darker group-hover:text-pink-500 transition-colors transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-bold mb-2">The Big Reveal</h3>
            <p className="text-accent/70">
              Touch grass with an IRL date reveal (or stay comfy online) 🌟
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;