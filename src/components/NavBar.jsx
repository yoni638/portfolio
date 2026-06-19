import { useState } from "react";

const NAV_LINKS = [
  { label: "Home",           href: "home" },
  { label: "About Me",       href: "about" },
  { label: "Skills",         href: "skills" },
  { label: "Previous Works", href: "works" },
  { label: "Certificates",   href: "certificates" },
  { label: "Contact Me",     href: "contact" },
];

export default function NavBar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050814] border-b border-blue-900/20 shadow-md shadow-black/40">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

        {/* Logo: just the name */}
        <button
          onClick={() => scrollTo("home")}
          className="focus:outline-none cursor-pointer select-none"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          <span className="text-white text-[30px]  font-bold tracking-wider">Yoni</span>
          <span className="text-blue-400 text-[30px] font-bold tracking-wider">.G</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className={`relative px-3.5 py-2 text-[11px] tracking-widest uppercase font-medium transition-colors duration-200 focus:outline-none cursor-pointer
                  ${activeSection === link.href
                    ? "text-blue-400"
                    : "text-slate-400 hover:text-slate-100"
                  }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
                <span
                  className={`absolute bottom-0.5 left-3.5 right-3.5 h-px bg-blue-500 rounded-full transition-all duration-300 origin-left
                    ${activeSection === link.href ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-blue-400 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-blue-400 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-blue-400 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-blue-900/20
          ${menuOpen ? "max-h-80" : "max-h-0"}`}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className={`w-full px-8 py-3.5 text-xs tracking-widest uppercase text-left border-b border-white/[0.04] last:border-0 transition-colors duration-150 cursor-pointer
              ${activeSection === link.href ? "text-blue-400 font-semibold bg-blue-950/20" : "text-slate-400 hover:text-white"}`}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}