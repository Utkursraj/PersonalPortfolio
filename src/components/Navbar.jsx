const navItems = ["Home", "About", "Stack", "Projects", "Contact"];

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[92%] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/40 px-5 py-3 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        <a href="#home" className="font-black tracking-tight text-white">
          Utkurs<span className="text-cyan-400">.</span>
        </a>

        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition hover:text-cyan-300"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="mailto:rajutkurs@gmail.com"
          className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-cyan-300"
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
};

export default Navbar;