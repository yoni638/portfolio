import { useEffect, useRef, useState } from "react";


function useTypewriter(phrases) {
  const [text, setText] = useState("");
  const state = useRef({ pi: 0, ci: 0, del: false });

  useEffect(() => {
    function tick() {
      const { pi, ci, del } = state.current;
      const word = phrases[pi];
      if (!del && ci < word.length) {
        state.current.ci++;
        setText(word.slice(0, state.current.ci));
        return setTimeout(tick, 65);
      }
      if (!del && ci === word.length) {
        return setTimeout(() => { state.current.del = true; tick(); }, 1800);
      }
      if (del && ci > 0) {
        state.current.ci--;
        setText(word.slice(0, state.current.ci));
        return setTimeout(tick, 38);
      }
      state.current.del = false;
      state.current.pi = (pi + 1) % phrases.length;
      setTimeout(tick, 300);
    }
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line

  return text;
}


function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 80);
    const t1 = setTimeout(() => setPhase(2), 350);
    const t2 = setTimeout(() => setPhase(3), 950);
    const t3 = setTimeout(() => onDone(), 1200);
    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#060a18",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        transition: "opacity 400ms ease",
        opacity: phase === 3 ? 0 : 1,
        pointerEvents: phase === 3 ? "none" : "all",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(59,130,246,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        transition: "opacity 500ms ease, transform 500ms ease",
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? "translateY(0)" : "translateY(16px)",
        textAlign: "center",
      }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2.4rem, 8vw, 4.5rem)",
          fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: 0,
        }}>
          Yoni<span style={{ color: "#60a5fa" }}>.G</span>
        </h1>
        <p style={{
          marginTop: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem", letterSpacing: "0.28em",
          textTransform: "uppercase", color: "rgba(148,163,184,0.7)",
        }}>
          Full Stack Developer
        </p>
      </div>

      <div style={{
        position: "relative", zIndex: 1, marginTop: 28,
        width: 120, height: 1, background: "rgba(59,130,246,0.15)", borderRadius: 4,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%", borderRadius: 4,
          background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
          transition: "width 900ms cubic-bezier(0.4,0,0.2,1)",
          width: phase >= 2 ? "100%" : "0%",
        }} />
      </div>
    </div>
  );
}


/* Ambient background: thin circuit-trace lines with a slow flowing dash,
   plus two faint signal pulses traveling along a couple of them.
   No nodes, no glyph text — kept deliberately quiet and peripheral so
   it never competes with the text or the photo. */
function CircuitLines() {
  const traces = [
    { d: "M30,70 H240 V190 H420", dur: "9s", delay: "0s" },
    { d: "M970,110 H760 V260 H580", dur: "10s", delay: "0.6s" },
    { d: "M970,540 V680 H800 V860", dur: "8.5s", delay: "1.4s" },
    { d: "M30,930 H210 V770 H380", dur: "11s", delay: "0.9s" },
    { d: "M120,980 L260,860 L260,700", dur: "10.5s", delay: "2.1s" },
  ];

  // only a couple of traces also carry a small traveling pulse —
  // a hint of "signal", not a whole light show
  const pulses = [
    { d: traces[0].d, dur: "6s" },
    { d: traces[2].d, dur: "7.5s" },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {traces.map((t, i) => (
        <path
          key={`t-${i}`}
          d={t.d}
          fill="none"
          stroke="rgba(96,165,250,0.16)"
          strokeWidth="1"
          strokeLinecap="round"
          className="trace-flow"
          style={{ animationDuration: t.dur, animationDelay: t.delay }}
        />
      ))}

      {pulses.map((p, i) => (
        <circle key={`pulse-${i}`} r="2.5" fill="#93c5fd" opacity="0.55">
          <animateMotion dur={p.dur} repeatCount="indefinite" path={p.d} />
        </circle>
      ))}
    </svg>
  );
}


export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [reveal, setReveal] = useState(false);
  const role = useTypewriter([
    "Full Stack Developer",
    "Junior Data Analyst",
    "IT Support ",
  ]);

  function handleIntroDone() {
    setShowIntro(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setReveal(true))
    );
  }

  const fly = (delay) => ({
    transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
    opacity: reveal ? 1 : 0,
    transform: reveal ? "translateY(0px)" : "translateY(20px)",
  });

  const flyLeft = (delay) => ({
    transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
    opacity: reveal ? 1 : 0,
    transform: reveal ? "translateX(0px)" : "translateX(-16px)",
  });

  const flyRight = (delay) => ({
    transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
    opacity: reveal ? 1 : 0,
    transform: reveal ? "translateX(0px)" : "translateX(16px)",
  });

  return (
    <>
      {showIntro && <Intro onDone={handleIntroDone} />}

      <section
        id="home"
        className="relative min-h-screen flex flex-col overflow-hidden border-b border-blue-950/30"
      >
        {/* ── background ── */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Circuit board grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }} />

          {/* Network / data-flow visualization */}
          <CircuitLines />

          {/* Gradient orbs — now gently drifting */}
          <div className="absolute right-[5%] top-1/2 w-[500px] h-[500px] rounded-full blur-[130px] orb-drift-a"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)" }} />
          <div className="absolute left-0 bottom-0 w-[280px] h-[280px] rounded-full blur-[100px] orb-drift-b"
            style={{ background: "radial-gradient(circle, rgba(29,78,216,0.07) 0%, transparent 70%)" }} />
        </div>

        {/* ── text content ── */}
        <div className="relative z-10 flex-1 flex items-center w-full">
          <div className="max-w-6xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-20 pb-[40vh] md:pb-16">

            <div className="flex flex-col gap-6 w-full max-w-xl">

              {/* badge */}
                {/*
              <div style={fly(0)}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-medium"
                  style={{
                    background: "rgba(6,78,59,0.2)",
                    borderColor: "rgba(16,185,129,0.25)",
                    color: "#34d399",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for hire
                </span>*
              </div>*/}


              <div style={fly(80)}>
                <p className="text-slate-500 text-sm mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Hey there 👋 I'm
                </p>
                <h1
                  className="leading-none font-black text-white"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
                  }}
                >
                  Yonatan<span style={{ color: "#60a5fa" }}>&nbsp;Getachew</span>
                </h1>
              </div>


              <div style={fly(180)}>
                <p className="font-semibold min-h-[1.6rem]"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(1rem, 2.2vw, 1.35rem)",
                    color: "#93c5fd",
                  }}>
                  {role}
                  <span className="animate-pulse" style={{ color: "#60a5fa" }}>|</span>
                </p>
              </div>


              <div style={fly(260)}>
                <p className="text-slate-400 leading-relaxed max-w-[420px] text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                 I’m a Full Stack Developer with 1 year of experience and I also worked as a Junior IT Support Specialist. I take my time to learn new technologies and I make sure to stay updated with the ones I already use.
                </p>
              </div>


              <div style={fly(340)} className="flex flex-wrap gap-2">
                {[
                  { label: "React & Node.js", icon: "⚛️" },
                  { label: "Bot Development", icon: "🤖" },
                  { label: "Data Analyst", icon: "📊" },
                  { label: "Fast Learner", icon: "🚀" },
                ].map(({ label, icon }) => (
                  <span key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-medium"
                    style={{
                      background: "rgba(15,23,42,0.7)",
                      border: "1px solid rgba(51,65,85,0.5)",
                      color: "#94a3b8",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                    <span>{icon}</span>{label}
                  </span>
                ))}
              </div>


              <div style={fly(420)} className="flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="cursor-pointer"
                  style={{
                    padding: "10px 22px", borderRadius: 10,
                    background: "#2563eb",
                    color: "#fff", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.02em",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
                    transition: "background 200ms, transform 150ms",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                  onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                  onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                  onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Let's Talk →
                </button>
                <button
                  onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
                  className="cursor-pointer"
                  style={{
                    padding: "10px 22px", borderRadius: 10,
                    background: "transparent",
                    color: "#94a3b8", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500, fontSize: "0.85rem",
                    border: "1px solid rgba(51,65,85,0.6)",
                    transition: "border-color 200ms, color 200ms",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(96,165,250,0.45)"; e.currentTarget.style.color = "#e2e8f0"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(51,65,85,0.6)"; e.currentTarget.style.color = "#94a3b8"; }}
                >
                  View My Work
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ── image pinned to the bottom (absolute, bottom-0) ── */}
        <div
          className="absolute z-[1] bottom-0 right-1/6 translate-x-1/2 md:left-auto md:translate-x-0 md:left-[15%]"
          style={{ width: "clamp(300px, 75vw, 550px)" }}
        >
          <div className="relative photo-float" style={{ width: "100%" }}>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-8 rounded-full blur-2xl"
              style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.28), transparent 70%)" }} />
          <img
  src="/myImage.png"
  alt="Yoni.G"
  draggable={false}
  className="relative right-1/8 lg:right-0 w-full object-contain select-none rounded-2xl cursor-pointer max-h-[450px] lg:max-h-[clamp(600px,65vh,650px)]"
  style={{
    filter: "drop-shadow(0 0 15px rgba(96,165,250,0.3))",
    transition: "filter 6s ease",
    ...fly(60),
  }}
  onMouseEnter={e => e.currentTarget.style.filter = "drop-shadow(0 0 30px rgba(96,165,250,0.6)) drop-shadow(0 0 60px rgba(96,165,250,0.4))"}
  onMouseLeave={e => e.currentTarget.style.filter = "drop-shadow(0 0 15px rgba(96,165,250,0.3))"}
/>
          </div>
        </div>

        {/* ── scroll cue (desktop only — mobile's bottom space is taken by the image) ── */}
        <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5"
          style={fly(880)}>
          <span className="text-[9px] tracking-[0.3em] uppercase text-slate-600"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>scroll</span>
          <div className="w-px h-5 rounded-full"
            style={{ background: "linear-gradient(to bottom, rgba(96,165,250,0.35), transparent)" }} />
        </div>

        <style>{`
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50%      { transform: translateY(-9px); }
          }
          .photo-float { animation: float 6s ease-in-out infinite; }

          .trace-flow {
            stroke-dasharray: 5 13;
            animation-name: traceFlow;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          @keyframes traceFlow {
            to { stroke-dashoffset: -360; }
          }

          .orb-drift-a { animation: orbDriftA 15s ease-in-out infinite; }
          @keyframes orbDriftA {
            0%, 100% { transform: translate(0, -50%) scale(1); }
            50%       { transform: translate(-26px, calc(-50% + 18px)) scale(1.08); }
          }

          .orb-drift-b { animation: orbDriftB 17s ease-in-out infinite; }
          @keyframes orbDriftB {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50%       { transform: translate(22px, -14px) scale(1.1); }
          }

          @media (prefers-reduced-motion: reduce) {
            .photo-float, .orb-drift-a, .orb-drift-b, .trace-flow {
              animation: none !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}