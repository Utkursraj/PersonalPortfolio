import { FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center px-6 pt-24 text-center"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 font-mono text-sm uppercase tracking-[0.35em] text-cyan-300">
          MERN Stack Developer
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight tracking-tighter text-white md:text-8xl">
          Building scalable web apps with{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            clean backend architecture.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
          Hi, I’m <span className="font-semibold text-white">Utkurs Raj</span>,
          a Full Stack Developer specializing in React, Node.js, Express, and
          MongoDB. I build production-ready applications with authentication,
          REST APIs, dashboards, payments, deployment, and performance-focused
          UI.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="rounded-full bg-white px-8 py-4 font-bold text-black transition hover:scale-105 hover:bg-cyan-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-8 py-4 font-bold text-white transition hover:border-cyan-400/60 hover:bg-white/5"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-8 flex justify-center gap-5 text-2xl text-slate-400">
          <a
            href="https://github.com/Utkursraj"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/utkurs-raj"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-300"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["2024", "ECE Graduate"],
            ["MERN", "Primary Stack"],
            ["JWT", "Auth Systems"],
            ["Cloud", "Deployed Apps"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
            >
              <h3 className="text-2xl font-black text-white">{value}</h3>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;