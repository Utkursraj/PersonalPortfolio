const About = () => {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.3em] text-cyan-300">
            About Me
          </p>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            Backend-focused full stack developer who thinks in systems.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            I am an Electronics & Communication Engineering graduate from
            Government Engineering College, West Champaran. I specialize in
            building secure, scalable, and production-ready MERN stack
            applications with clean APIs, structured middleware, optimized
            database design, and responsive interfaces.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            My work includes authentication systems, role-based access,
            financial dashboards, payment integrations, Mapbox geolocation,
            Cloudinary image handling, MongoDB Atlas deployment, and modern
            React UI architecture.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl">
          <h3 className="mb-5 text-xl font-bold text-white">What I bring</h3>
          <div className="space-y-4">
            {[
              "REST API design with Node.js and Express.js",
              "JWT, Passport.js, bcrypt, sessions, and RBAC",
              "MongoDB schemas, aggregation pipelines, and query optimization",
              "React, Tailwind CSS, Vite, reusable components, and hooks",
              "Cloud deployment using Render, Vercel, and MongoDB Atlas",
              "AI-assisted debugging, optimization, and development workflow",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/30 p-4 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;