
import React from "react";
import { Copy, Link } from "lucide-react";

const TokenSection = () => {
  const contractAddress = "will reveal soon 😍";


  return (
    <section className="container px-4 py-16 bg-white/50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="retro-window p-8 bg-gradient-to-r from-secondary/5 to-primary/5">
          <h2 className="text-3xl font-bold mb-6">Get Your Love Tokens 💝</h2>
          <p className="text-lg mb-6">
            Power your romantic journey with $LOVE tokens on Secret blockchain
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <code className="bg-accent/5 p-2 rounded text-sm">{contractAddress}</code>
            <button
              className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <a
            href="https://app.uniswap.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary-darker transition-colors duration-300 shadow-lg"
          >
            Buy $LOVE on SecretSwap <Link className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;