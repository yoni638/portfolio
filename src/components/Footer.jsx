export default function Footer() {
  return (
    <footer className="relative bg-[#030510] border-t border-blue-950/40 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <h2
            style={{ fontFamily: "'DM Serif Display', serif" }}
            className="text-3xl font-bold"
          >
            <span className="text-white tracking-wider">Yoni</span>
            <span className="text-blue-400 tracking-wider">.G</span>
          </h2>

          {/* Tagline */}
          <p
            className="mt-3 text-slate-400 max-w-md text-sm md:text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Becomming Better Every Single Day.
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent my-8" />

           

          {/* Bottom Line */}
          <div className="mt-10 pt-6 border-t border-blue-950/30 w-full">
            <p
              className="text-[11px] tracking-[0.25em] text-slate-600 uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              © 2026 · All Rights Reserved · Built By Yoni.G
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}