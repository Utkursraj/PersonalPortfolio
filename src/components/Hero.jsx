import React from "react";

const Hero = () => (
  <section id="home" className="min-h-screen flex items-center justify-center px-6 text-center">
    <div className="max-w-5xl">
      <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">
        Hi, I'm Utkurs Raj
      </p>
      <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
        Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Developer</span>
      </h1>
      <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
        2024 ECE Graduate specializing in building robust MERN stack applications 
        with high-performance backends and sleek, responsive interfaces.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <a href="#projects" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
          View Projects
        </a>
        <a href="#contact" className="border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/5 transition">
          Let's Talk
        </a>
      </div>
    </div>
  </section>
);

export default Hero;