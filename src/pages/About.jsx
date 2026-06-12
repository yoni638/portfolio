import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Scroll-reveal hook
───────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─────────────────────────────────────────────
   Fade-in wrapper
───────────────────────────────────────────── */
function FadeIn({ delay = 0, direction = "up", children, className = "" }) {
  const [ref, visible] = useScrollReveal();

  const transforms = {
    up:    visible ? "translateY(0)"   : "translateY(28px)",
    left:  visible ? "translateX(0)"   : "translateX(-24px)",
    right: visible ? "translateX(0)"   : "translateX(24px)",
    none:  "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transforms[direction],
        transition: `opacity 650ms ease ${delay}ms, transform 650ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Timeline item
───────────────────────────────────────────── */
function TimelineItem({ year, role, org, desc, delay }) {
  return (
    <FadeIn delay={delay} direction="left">
      <div className="relative pl-6" style={{ borderLeft: "1px solid rgba(59,130,246,0.18)" }}>
        {/* dot */}
        <div
          className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full"
          style={{ background: "#2563eb", boxShadow: "0 0 8px rgba(37,99,235,0.5)" }}
        />
        <p
          className="text-[10px] tracking-widest uppercase mb-2"
          style={{ color: "#3b82f6", fontFamily: "'DM Sans', sans-serif" }}
        >
          {year}
        </p>
        <p
          className="font-bold text-white text-sm tracking-widest leading-snug"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {role}
        </p>
        <p
          className="text-[11px] mb-1.5 tracking-normal"
          style={{ color: "#60a5fa", fontFamily: "'DM Sans', sans-serif" }}
        >
          {org}
        </p>
        <p
          className="text-slate-400 text-[12.5px] leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {desc}
        </p>
      </div>
    </FadeIn>
  );
}

/* ─────────────────────────────────────────────
   About Section
───────────────────────────────────────────── */
export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-blue-950/30"
      style={{ background: "#060a18", paddingTop: "5rem", paddingBottom: "5rem" }}
    >
      {/* background texture */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(99,155,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute left-[-10%] top-1/4 w-[380px] h-[380px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute right-0 bottom-0 w-[260px] h-[260px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(29,78,216,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 md:px-12">

        {/* ── section label ── */}
        <FadeIn delay={0} direction="up">
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-3"
            style={{ color: "#3b82f6", fontFamily: "'DM Sans', sans-serif" }}
          >
            About me
          </p>
        </FadeIn>

        {/* ── heading ── */}
        <FadeIn delay={80} direction="up">
          <h2
            className="text-white font-black leading-none mb-10"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            The person<br />
            <span style={{ color: "#60a5fa" }}>behind the site.</span>
          </h2>
        </FadeIn>

        {/* ── two-col layout ── */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">

          {/* ── LEFT: bio ── */}
          <div className="flex-1 flex flex-col gap-6">

            <FadeIn delay={160} direction="up">
              <p
                className="text-slate-300 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.925rem", maxWidth: 480 }}
              >
                I'm <span className="text-white font-semibold">Yonatan Getachew</span> a Computer Science
                graduate (class of 2025) i've had interest in computer and programs since growing up im eager to learn and grow in the tech field. 
              </p>
            </FadeIn>

            <FadeIn delay={240} direction="up">
              <p
                className="text-slate-400 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", maxWidth: 480 }}
              >
                i love to code and spend my free time learning about new things im currently enrolling in data analytics and machine learning courses to expand my knowledge in the field. 
              </p>
            </FadeIn>

            {/* trait pills */}
            <FadeIn delay={320} direction="up">
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  "CS Graduate 25",
                  "Self driven",
                  "Detail oriented",
                  "Team player",
                  "Problem solver",
                ].map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-lg text-[11px] font-medium"
                    style={{
                      background: "rgba(15,23,42,0.7)",
                      border: "1px solid rgba(51,65,85,0.5)",
                      color: "#94a3b8",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </FadeIn>

            
          </div>

          {/* ── RIGHT: timeline ── */}
          <div className="flex-1 flex flex-col gap-7">

            <FadeIn delay={120} direction="right">
              <p
                className="text-[10px] tracking-[0.6em] uppercase mb-4"
                style={{ color: "#475569", fontFamily: "'DM Sans', sans-serif" }}
              >
                Experience
              </p>
            </FadeIn>

            <TimelineItem
  year="May 2026 – Present"
  role="Full Stack Developer & IT Support"
  org="Freelance"
  desc="Improvising and learning new technologies to always stay competitive in the market and provide the best digital solutions."
  delay={200}
/>

<TimelineItem
  year="Mar 2026 – May 2026"
  role="SDR"
  org="CCI"
  desc="Engaging with customers, understanding their unique needs, and connecting them with the right strategic solutions."
  delay={300}
/>
            <TimelineItem
              year="Jan 2026 – Mar 2026"
              role="IT Support"
              org="National Election Board of Ethiopia"
              desc="Provided technical support across departments. "
              delay={400}
            />

           

            <TimelineItem
              year=" Apr 2025 – Sep 2025"
              role="Web Development Instructor"
              org="Tutoring"
              desc="Taught fundamentals of web development HTML, CSS, and basic JavaScript  helping beginners build their first projects and confidence."
              delay={500}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #about .flex-col { gap: 1.25rem; }
        }
      `}</style>
    </section>
  );
}