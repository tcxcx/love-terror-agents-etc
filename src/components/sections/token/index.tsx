import React from "react";
import { Copy, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TokenSection = () => {
  const { toast } = useToast();
  const contractAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractAddress);
    toast({
      title: "Contract address copied!",
      description: "The contract address has been copied to your clipboard.",
    });
  };

  return (
    <section className="container px-4 py-16 bg-white/50 relative overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      >
        <source src="/bg-yellow.mp4" type="video/mp4" />
      </video>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="retro-window p-8 bg-gradient-to-r from-secondary/5 to-primary/5 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6">Get Your Love Tokens 💝</h2>
          <p className="text-lg mb-6">
            Power your romantic journey with $LOVE tokens on Base blockchain
          </p>
          
          {/* Floating Flaunch Logo Animation */}
          <div className="absolute -right-4 -top-4 w-24 h-24 animate-bounce">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full rounded-full shadow-lg"
            >
              <source src="/flaunch-coin.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <code className="bg-accent/5 p-2 rounded text-sm">{contractAddress}</code>
            <button
              onClick={handleCopyContract}
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
            Buy $LOVE on Flaunch
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-6 h-6 rounded-full ml-2"
            >
              <source src="/flaunch-logo.mp4" type="video/mp4" />
            </video>
            <Link className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;