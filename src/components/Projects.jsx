import { useState } from "react";
import { projects } from "../data/projects";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Projects = () => {
  const [activeImages, setActiveImages] = useState({});

  const prevImage = (projectTitle, totalImages) => {
    setActiveImages((prev) => ({
      ...prev,
      [projectTitle]:
        (prev[projectTitle] || 0) === 0
          ? totalImages - 1
          : (prev[projectTitle] || 0) - 1,
    }));
  };

  const nextImage = (projectTitle, totalImages) => {
    setActiveImages((prev) => ({
      ...prev,
      [projectTitle]:
        (prev[projectTitle] || 0) === totalImages - 1
          ? 0
          : (prev[projectTitle] || 0) + 1,
    }));
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">
        Projects
      </p>

      <h2 className="mb-14 text-4xl font-black text-white md:text-5xl">
        Featured work with real-world functionality.
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => {
          const currentImage = activeImages[project.title] || 0;

          return (
            <article
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl transition hover:-translate-y-1 hover:border-cyan-400/50"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={project.images[currentImage]}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        prevImage(project.title, project.images.length)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur transition hover:bg-cyan-400 hover:text-black"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft />
                    </button>

                    <button
                      onClick={() =>
                        nextImage(project.title, project.images.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white backdrop-blur transition hover:bg-cyan-400 hover:text-black"
                      aria-label="Next image"
                    >
                      <FaChevronRight />
                    </button>

                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setActiveImages((prev) => ({
                              ...prev,
                              [project.title]: index,
                            }))
                          }
                          className={`h-2.5 rounded-full transition-all ${
                            currentImage === index
                              ? "w-8 bg-cyan-400"
                              : "w-2.5 bg-white/40"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-7">
                <p className="mb-2 text-sm font-semibold text-cyan-300">
                  {project.category}
                </p>

                <h3 className="text-2xl font-black text-white">
                  {project.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {project.highlights.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-cyan-300"
                  >
                    Live Demo <FaExternalLinkAlt />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-400/60 hover:bg-white/5"
                  >
                    Code <FaGithub />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;