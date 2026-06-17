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
        className="relative min-h-screen flex items-center overflow-hidden border-b border-blue-950/30"
      >
        {/* ── background ── */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(rgba(99,155,255,0.045) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.09) 0%, transparent 70%)" }} />
          <div className="absolute left-0 bottom-0 w-[280px] h-[280px] rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(29,78,216,0.07) 0%, transparent 70%)" }} />
        </div>

        {/* ── layout ── */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-8 md:px-12 pt-20 pb-14 flex flex-col md:flex-row items-center gap-8 md:gap-16">

          {/* ════ LEFT TEXT ════ */}
          <div className="flex-1 flex flex-col gap-6 order-2 md:order-1 w-full">

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
                  fontSize: "clamp(2.6rem, 4vw, 1.8rem)",
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
                I'm a Full Stack Developer with interests in programming and also a junior IT support specialist. I'm energetic and passionate about learning new technologies and solving problems.
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

            
            <div
              className="flex gap-8 pt-5"
              style={{ ...fly(500), borderTop: "1px solid rgba(30,41,59,0.7)" }}
            >
              {[
                { num: "1+", label: "Yrs in Dev" },
                { num: "5+", label: "Projects Delivered" },
                { num: "1+", label: "Yrs IT Support" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-black text-white text-lg leading-none"
                    style={{ fontFamily: "'DM Serif Display', serif" }}>{num}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5 tracking-wide"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          
          <div
            className="relative flex-shrink-0 order-1 md:order-2 flex justify-center"
            style={{ width: "clamp(180px, 45vw, 340px)", margin: "0 auto" }}
          >
            
            <div style={{
              position: "absolute",
              inset: "15% 0 0 0",
              borderRadius: 20,
              background: "linear-gradient(160deg, rgba(30,58,138,0.12) 0%, rgba(15,23,42,0.28) 100%)",
              border: "1px solid rgba(59,130,246,0.1)",
              backdropFilter: "blur(4px)",
              ...fly(60),
            }} />

            
            {[
              ["top-[13%]","left-1","border-t-2 border-l-2","rounded-tl-lg"],
              ["top-[13%]","right-1","border-t-2 border-r-2","rounded-tr-lg"],
              ["bottom-1","left-1","border-b-2 border-l-2","rounded-bl-lg"],
              ["bottom-1","right-1","border-b-2 border-r-2","rounded-br-lg"],
            ].map(([t,l,b,r], i) => (
              <div key={i} className={`absolute ${t} ${l} w-4 h-4 ${b} border-blue-500/25 ${r} pointer-events-none`}
                style={fly(80 + i * 35)} />
            ))}

            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 rounded-full pointer-events-none"
              style={{ background: "rgba(59,130,246,0.1)", filter: "blur(18px)" }} />

           
            <div className="relative photo-float" style={{ width: "100%" }}>
              <img
                src="/myImage.png"
                alt="Yoni.G"
                draggable={false}
                className="w-full object-contain select-none"
                style={{
                  maxHeight: "clamp(200px, 40vw, 460px)",
                  filter: "drop-shadow(0 8px 28px rgba(37,99,235,0.18))",
                  ...fly(60),
                }}
              />
            </div>
 
            <div className="absolute left-[-12px] top-[32%] rounded-xl px-3 py-2 shadow-xl"
              style={{
                background: "#080e1f",
                border: "1px solid rgba(37,99,235,0.2)",
                ...flyLeft(700),
              }}>
              <p className="font-black text-blue-400 text-sm leading-none"
                style={{ fontFamily: "'DM Serif Display', serif" }}>1+</p>
              <p className="text-slate-500 text-[9px] mt-0.5 tracking-wider"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>Yrs Dev</p>
            </div>

            
            <div className="absolute right-[-12px] bottom-[30%] rounded-xl px-3 py-2 shadow-xl"
              style={{
                background: "#080e1f",
                border: "1px solid rgba(37,99,235,0.2)",
                ...flyRight(820),
              }}>
              <p className="font-black text-blue-400 text-sm leading-none"
                style={{ fontFamily: "'DM Serif Display', serif" }}>5+</p>
              <p className="text-slate-500 text-[9px] mt-0.5 tracking-wider"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>Projects</p>
            </div>
          </div>
        </div>

        
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
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
        `}</style>
      </section>
    </>
  );
}