import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28 text-center">
      <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">
        Contact
      </p>

      <h2 className="text-4xl font-black text-white md:text-6xl">
        Let’s build something reliable, scalable, and useful.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
        I’m open to full stack developer roles, backend-focused opportunities,
        internships, freelance projects, and collaboration on production-grade
        web applications.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="mailto:rajutkurs@gmail.com"
          className="inline-flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-black text-black transition hover:scale-105 hover:bg-cyan-300"
        >
          <FaEnvelope /> Email Me
        </a>

        <a
          href="tel:+916206792004"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 px-8 py-4 font-bold text-white transition hover:border-cyan-400/60 hover:bg-white/5"
        >
          <FaPhoneAlt /> Call
        </a>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-5 text-slate-400">
        <a href="https://github.com/Utkursraj" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
          <FaGithub /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/utkurs-raj" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cyan-300">
          <FaLinkedin /> LinkedIn
        </a>
        <span className="flex items-center gap-2">
          <FaMapMarkerAlt /> Patna, Bihar, India
        </span>
      </div>
    </section>
  );
};

export default Contact;