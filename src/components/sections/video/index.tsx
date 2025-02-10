
import React from "react";

const InspirationVideo = () => {
  return (
    <section className="container px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="retro-window">
          <h2 className="text-3xl font-bold mb-6">The Song That Started It All 🇧🇷</h2>
          <p className="text-lg mb-4">For all of those fellow <span className="text-secondary italic bg-gradient-to-r from-pink-300 via-purple-400 to-cyan-300 bg-clip-text text-transparent">Love Terrorists</span> out there</p>

          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/38XbS3Lsr7o"
              title="Inspiration Song"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspirationVideo;