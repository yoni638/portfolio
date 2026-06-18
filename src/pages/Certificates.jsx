import { useEffect, useRef, useState, useCallback } from "react";

/* ── scroll reveal ── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── certificate data — swap in your real details ── */
const certs = [
  {
    id: 1,
    src: "certificate1.png",
    title: "AI Career Essentials",
    issuer: "ALX",
    date: "5th May 2026",
    accent: "#3b82f6",
  },
  {
    id: 5,
    src: "certificate5.jpg",
    title: "Hackathon Participation",
    issuer: "Kuriftu, WeVa Sphere",
    date: "6th 2026",
    accent: "#06b6d4",
  },
  {
    id: 2,
    src: "certificate2.png",
    title: "Professional Academy",
    issuer: "ALX",
    date: "26th May 2026",
    accent: "#8b5cf6",
  },
  {
    id: 3,
    src: "certificate3.png",
    title: "Founder Academy",
    issuer: "ALX",
    date: "29th May 2026",
    accent: "#06b6d4",
  },
  {
    id: 4,
    src: "certificate4.png",
    title: "Digital Marketing",
    issuer: "Hubspot",
    date: "13th 2026",
    accent: "#06b6d4",
  },
];

function CertCard({ cert, index, visible, onOpen }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.12,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    setHovered(false);
  }, []);

  const delay = index * 130 + 100;
  const rgb = hexToRgb(cert.accent);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
        perspective: 1000,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(cert)}
        style={{
          position: "relative",
          borderRadius: 22,
          cursor: "pointer",
          transformStyle: "preserve-3d",
          /* ── slightly larger card: min 310px wide, auto height ── */
          minWidth: 310,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: hovered
            ? "transform 120ms ease-out, box-shadow 300ms ease"
            : "transform 500ms cubic-bezier(0.23,1,0.32,1), box-shadow 300ms ease",
          boxShadow: hovered
            ? `0 20px 50px rgba(${rgb},0.3), 0 0 0 2px rgba(${rgb},0.3)`
            : `0 6px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(30,41,59,0.5)`,
          background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,16,35,0.98) 100%)",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* glare overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4, borderRadius: 22, pointerEvents: "none",
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 1.5}) 0%, transparent 70%)`,
          transition: hovered ? "none" : "opacity 500ms ease",
        }} />

        {/* accent top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 3,
          background: `linear-gradient(90deg, ${cert.accent} 0%, ${cert.accent}aa 40%, transparent 100%)`,
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 300ms ease, height 300ms ease",
          height: hovered ? 4 : 3,
        }} />

        {/* corner glow */}
        <div style={{
          position: "absolute", top: -30, right: -30, width: 100, height: 100,
          borderRadius: "50%", zIndex: 1, pointerEvents: "none",
          background: `radial-gradient(circle, rgba(${rgb},0.2) 0%, transparent 65%)`,
          transition: "opacity 400ms ease, transform 400ms ease",
          opacity: hovered ? 1 : 0.5,
          transform: hovered ? "scale(1.2)" : "scale(1)",
        }} />

        {/* image */}
        <div style={{
          position: "relative", zIndex: 2,
          /* ── slightly more generous padding ── */
          padding: "1.4rem 1.4rem 0",
          transformStyle: "preserve-3d",
          transform: "translateZ(15px)",
        }}>
          <div style={{
            borderRadius: 14, overflow: "hidden",
            border: `2px solid rgba(${rgb},0.25)`,
            boxShadow: `0 6px 24px rgba(0,0,0,0.4)`,
            aspectRatio: "16/10",
            background: "#060a18",
            transition: "border-color 300ms ease, box-shadow 300ms ease",
          }}>
            <img
              src={cert.src}
              alt={cert.title}
              draggable={false}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 400ms ease, filter 400ms ease",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                filter: hovered ? "brightness(1.05)" : "brightness(1)",
              }}
            />
          </div>
        </div>

        {/* text info */}
        <div style={{
          position: "relative", zIndex: 2,
          /* ── roomier text area ── */
          padding: "1.1rem 1.4rem 1.4rem",
          transformStyle: "preserve-3d",
          transform: "translateZ(8px)",
        }}>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.95rem",
            fontWeight: 400,           /* was 400 on serif — Nunito 400 reads light & clean */
            color: "#f1f5f9",
            margin: "0 0 8px",
            lineHeight: 1.5,
            letterSpacing: "0.06em",  /* breathing room between letters */
          }}>
            {cert.title}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <p style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "11.5px",
              fontWeight: 300,          /* very light — airy issuer label */
              color: "#94a3b8",
              margin: 0,
              letterSpacing: "0.08em",
            }}>
              {cert.issuer}
            </p>
            <span style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "10px",
              fontWeight: 400,
              color: cert.accent,
              background: `rgba(${rgb},0.12)`,
              border: `1px solid rgba(${rgb},0.25)`,
              padding: "4px 10px",
              borderRadius: 12,
              letterSpacing: "0.07em",
              whiteSpace: "nowrap",
            }}>
              {cert.date}
            </span>
          </div>
        </div>

        {/* click hint */}
        <div style={{
          position: "absolute", bottom: 8, right: 16, zIndex: 3,
          fontFamily: "'Nunito', sans-serif",
          fontSize: "9px",
          fontWeight: 400,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: hovered ? cert.accent : "rgba(71,85,105,0.7)",
          transition: "color 250ms ease, transform 250ms ease",
          transform: hovered ? "translateX(-3px)" : "translateX(0)",
        }}>
          view ↗
        </div>
      </div>
    </div>
  );
}

/* ── lightbox ── */
function Lightbox({ cert, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const rgb = hexToRgb(cert.accent);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(4,8,20,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        animation: "lbIn 250ms ease forwards",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500&display=swap');
        @keyframes lbIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lbImg { from { opacity:0; transform:scale(0.94) } to { opacity:1; transform:scale(1) } }
        @media (max-width: 640px) {
          div[style*="padding: 1.5rem"] { padding: 0.75rem !important; }
          .glow-effect { width: 300px !important; height: 300px !important; }
        }
      `}</style>

      {/* glow behind image */}
      <div
        className="glow-effect"
        style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%", pointerEvents: "none",
          background: `radial-gradient(circle, rgba(${rgb},0.12) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", maxWidth: "90vw", maxHeight: "88vh",
          borderRadius: 20, overflow: "hidden",
          border: `1px solid rgba(${rgb},0.25)`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(${rgb},0.15)`,
          animation: "lbImg 300ms cubic-bezier(0.23,1,0.32,1) forwards",
        }}
      >
        {/* accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 2,
          background: `linear-gradient(90deg, ${cert.accent}, transparent)`,
        }} />

        <img
          src={cert.src}
          alt={cert.title}
          draggable={false}
          style={{
            display: "block",
            maxWidth: "90vw", maxHeight: "85vh",
            objectFit: "contain",
          }}
        />

        {/* close btn */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 15, right: 12, zIndex: 3,
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(10,15,30,0.85)",
            border: "1px solid rgba(71,85,105,0.5)",
            color: "#94a3b8", fontSize: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* caption */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(4,8,20,0.95), transparent)",
          padding: "1.5rem 1.4rem 1rem", zIndex: 2,
        }}>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "1rem",
            fontWeight: 400,
            color: "#f1f5f9",
            margin: "0 0 4px",
            letterSpacing: "0.05em",
          }}>
            {cert.title}
          </p>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "11px",
            fontWeight: 300,
            color: "#64748b",
            margin: 0,
            letterSpacing: "0.07em",
          }}>
            {cert.issuer} · {cert.date}
          </p>
        </div>
      </div>

      <p style={{
        position: "absolute", bottom: 20,
        fontFamily: "'Nunito', sans-serif",
        fontSize: "10px",
        fontWeight: 300,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "rgba(71,85,105,0.6)",
      }}>
        click outside or press esc to close
      </p>
    </div>
  );
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ].join(",");
}

/* ── main section ── */
export default function Certificates() {
  const [sectionRef, visible] = useScrollReveal();
  const [active, setActive] = useState(null);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      style={{
        position: "relative", overflow: "hidden",
        background: "#060a18",
        borderBottom: "1px solid rgba(30,58,138,0.2)",
        paddingTop: "5.5rem", paddingBottom: "5.5rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500&display=swap');
      `}</style>

      {/* bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(99,155,255,0.038) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div style={{
          position: "absolute", right: "-8%", top: "20%",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />
        <div style={{
          position: "absolute", left: "-5%", bottom: "10%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1060,   /* slightly wider to breathe with bigger cards */
        margin: "0 auto",
        padding: "0 1.5rem",
      }}>

        {/* heading */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 600ms ease, transform 600ms ease",
          marginBottom: "3.5rem",
        }}>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 10,
            fontWeight: 400,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "#3b82f6",
            marginBottom: 10,
          }}>
            Certificates
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: "0.02em",
          }}>
            Credentials &<br />
            <span style={{ color: "#60a5fa" }}>achievements.</span>
          </h2>
        </div>

        {/* cards grid */}
        <div style={{
          display: "grid",
          /* ── minmax bumped from 290 → 310 for slightly larger cards ── */
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: "1.75rem",
        }}>
          {certs.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={i}
              visible={visible}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>

      {active && <Lightbox cert={active} onClose={() => setActive(null)} />}
    </section>
  );
}