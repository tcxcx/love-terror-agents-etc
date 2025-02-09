
import React from "react";
import { Heart, MessageCircle, Gamepad, Lock } from "lucide-react";

const FeatureGrid = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Retro Romance",
      description: "Experience love through the lens of nostalgic pixel art",
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-secondary" />,
      title: "Secret Chat",
      description: "Exchange messages in our uniquely designed terminal interface",
    },
    {
      icon: <Gamepad className="w-8 h-8 text-secondary-darker" />,
      title: "Love Games",
      description: "Solve fun puzzles to reveal your secret admirer",
    },
    {
      icon: <Lock className="w-8 h-8 text-accent" />,
      title: "Safe Space",
      description: "A respectful environment for digital connection",
    },
  ];

  return (
    <section className="container px-4 py-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Discover the Magic
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 retro-window hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-accent/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;