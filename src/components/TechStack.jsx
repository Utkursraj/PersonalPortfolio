import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaDocker,
  FaPython,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPostman,
  SiMysql,
  SiVite,
  SiRender,
  SiVercel,
} from "react-icons/si";

const skills = [
  { icon: SiJavascript, label: "JavaScript", color: "text-yellow-300" },
  { icon: SiTypescript, label: "TypeScript", color: "text-blue-400" },
  { icon: FaReact, label: "React.js", color: "text-cyan-300" },
  { icon: FaNodeJs, label: "Node.js", color: "text-green-400" },
  { icon: SiExpress, label: "Express.js", color: "text-slate-200" },
  { icon: SiMongodb, label: "MongoDB", color: "text-green-500" },
  { icon: SiMysql, label: "MySQL", color: "text-sky-300" },
  { icon: SiTailwindcss, label: "Tailwind", color: "text-cyan-400" },
  { icon: SiVite, label: "Vite", color: "text-purple-300" },
  { icon: FaDocker, label: "Docker", color: "text-blue-400" },
  { icon: SiPostman, label: "Postman", color: "text-orange-400" },
  { icon: FaGithub, label: "GitHub", color: "text-white" },
  { icon: SiRender, label: "Render", color: "text-white" },
  { icon: SiVercel, label: "Vercel", color: "text-white" },
  { icon: FaPython, label: "Python", color: "text-yellow-200" },
  { icon: FaHtml5, label: "HTML5", color: "text-orange-500" },
  { icon: FaCss3Alt, label: "CSS3", color: "text-blue-400" },
];

const TechStack = () => {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
      <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">
        Tech Stack
      </p>
      <h2 className="mb-14 text-4xl font-black text-white md:text-5xl">
        Tools I use to build production-ready apps.
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {skills.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/5"
          >
            <Icon className={`mx-auto text-4xl ${color}`} />
            <p className="mt-3 text-sm font-semibold text-slate-300">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;