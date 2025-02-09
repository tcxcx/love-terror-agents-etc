
import React from "react";

const CTASection = () => {
  return (
    <section className="container px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="retro-window bg-secondary/5 p-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Love Game? 
          </h2>
          <p className="text-lg text-accent/70 mb-8">
            Join the most based Web3 Valentine&lsquo;s platform today! 🚀
          </p>
          <button className="px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary-darker transition-colors duration-300 shadow-lg transform hover:scale-105">
            Start Your Love Quest
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;