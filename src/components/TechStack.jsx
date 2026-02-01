import React from "react";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman } from "react-icons/si";

const StackItem = ({ icon: Icon, label, color }) => (
  <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition">
    <Icon size={40} className={color} />
    <span className="text-slate-300 text-xs font-medium">{label}</span>
  </div>
);

const TechStack = () => (
  <section id="stack" className="py-32 px-6 max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-white mb-16">Languages & Tools</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      <StackItem icon={SiMongodb} label="MongoDB" color="text-green-500" />
      <StackItem icon={SiExpress} label="Express" color="text-slate-300" />
      <StackItem icon={FaReact} label="React.js" color="text-cyan-400" />
      <StackItem icon={FaNodeJs} label="Node.js" color="text-green-400" />
      <StackItem icon={SiTailwindcss} label="Tailwind" color="text-sky-400" />
      <StackItem icon={SiJavascript} label="JavaScript" color="text-yellow-400" />
      <StackItem icon={SiPostman} label="Postman" color="text-orange-500" />
      <StackItem icon={FaGithub} label="GitHub" color="text-white" />
    </div>
  </section>
);

export default TechStack;