import React from "react";
import About from "./About";
const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Seção Hero com vídeo */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-full h-full object-cover"
          >
            <source src="https://www.tomorrow.io/wp-content/uploads/2024/05/hero-spin-globe.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay escuro */}
          <div className="absolute inset-0  bg-opacity-40 z-1"></div>
          
          {/* Conteúdo do Hero */}
          <div className="relative z-10 text-center px-4 text-white max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Venha fazer parte da nossa comunidade!
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed expedita quidem aspernatur inventore animi quis.
            </p>
          </div>
        </section>
      </div>
        <About />
    </>
  );
};

export default Home;