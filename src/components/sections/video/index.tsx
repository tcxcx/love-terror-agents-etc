
import React from "react";

const InspirationVideo = () => {
  return (
    <section className="container px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="retro-window">
          <h2 className="text-3xl font-bold mb-6">The Song That Started It All 🇦🇷</h2>
          <p className="text-lg mb-4">For all of those fellow Love Terrorists out there</p>
          <p className="text-md text-secondary-darker mb-6 italic">
          Inspired by being stood up three times by a green-eyed <br/> Web3 girl from Buenos Aires 🇦🇷   at <a href="https://aleph.crecimiento.build/" target="_blank" className="text-secondary hover:underline">Aleph Hub</a> 🧉
          </p>
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