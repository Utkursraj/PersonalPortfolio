const Navbar = () => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50
    backdrop-blur-xl bg-white/5 border border-white/10
    rounded-2xl px-8 py-3 flex gap-8 text-sm text-slate-200 shadow-lg">
    {["Home", "About", "Stack", "Projects", "Contact"].map((item) => (
      <a
        key={item}
        href={`#${item.toLowerCase()}`}
        className="hover:text-white transition"
      >
        {item}
      </a>
    ))}
  </nav>
);

export default Navbar;
