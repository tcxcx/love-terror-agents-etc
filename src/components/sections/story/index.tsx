
import React from "react";
import { Heart } from "lucide-react";

const DevStorySection = () => {
  return (
    <div className=" inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    <section className="container px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="retro-window p-8 bg-white/80">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold mb-2">@BasedDevRel</h3>
              <p className="text-accent/80 mb-4">
                During #ETHGlobal, this dev came up to me saying:<br/>
                &quot;Bro, I wish I was a DevRel like you. You get to travel, touch grass, AND have a gf?! 
                Meanwhile I&lsquo;m here grinding 24/7 on smart contracts living off energy drinks and hopium&quot; 😭
              </p>
              <p className="text-accent/80 font-mono">
                That&lsquo;s why we built this shitty website. For all my fellow keyboard autistic warriors out there. 🫡
              </p>
              <div className="mt-4 text-sm text-accent/60">
                6:09 PM · Feb 14, 2024 · 420 reposts · 69 likes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default DevStorySection;