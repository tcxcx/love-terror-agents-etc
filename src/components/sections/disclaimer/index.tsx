
import React from "react";
import { AlertTriangle } from "lucide-react";

const DisclaimerSection = () => {
  return (
    <section className="container px-4 py-16 bg-red-50">
      <div className="max-w-4xl mx-auto">
        <div className="retro-window p-8 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
            <h2 className="text-2xl font-bold text-red-500">NGMI Financial Advice</h2>
          </div>
          <div className="space-y-4 text-accent/80">
            <p className="font-mono">
              Dear fellow autists,
            </p>
            <p>
              This token will probably dump harder than your last relationship. 
              Don&lsquo;t blame me when your portfolio looks like your DMs - empty and sad.
            </p>
            <p className="font-mono text-sm">
              I&lsquo;m literally just trying to help my fellow keyboard warriors find love and spread the one.
              This is NOT financial advice. DYOR (Date at Your Own Risk).
            </p>
            <p className="text-xs italic">
              * Results may vary. Success rate directly proportional to your ability to touch grass and be a CHAD.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;