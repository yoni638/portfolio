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
    src: "/src/assets/certificate1.png",
    title: "AI carrer essentials",
    issuer: "ALX",
    date: "5th May 2026",
    accent: "#3b82f6",
  },
  {
    id: 2,
    src: "/src/assets/certificate2.png",
    title: "Proffesional Academy",
    issuer: "ALX",
    date: "26th May 2026",
    accent: "#8b5cf6",
  },
  {
    id: 3,
    src: "/src/assets/certificate3.png",
    title: "Founder Academy",
    issuer: "ALX",
    date: "29th May 2026",
    accent: "#06b6d4",
  },
   {
    id: 4,
    src: "/src/assets/certificate4.png",
    title: "Digital Marketing",
    issuer: "Hubspot",
    date: "13th  2026",
    accent: "#06b6d4",
  }

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
          borderRadius: 20,
          cursor: "pointer",
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
          transition: hovered
            ? "transform 80ms linear, box-shadow 300ms ease"
            : "transform 500ms cubic-bezier(0.23,1,0.32,1), box-shadow 300ms ease",
          boxShadow: hovered
            ? `0 24px 60px rgba(${rgb},0.22), 0 0 0 1px rgba(${rgb},0.2)`
            : `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(40,52,72,0.6)`,
          background: "#0b1120",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* glare overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4, borderRadius: 20, pointerEvents: "none",
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
          transition: hovered ? "none" : "opacity 500ms ease",
        }} />

        {/* accent top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 3,
          background: `linear-gradient(90deg, ${cert.accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 300ms ease",
        }} />

        {/* corner glow */}
        <div style={{
          position: "absolute", top: -40, right: -40, width: 120, height: 120,
          borderRadius: "50%", zIndex: 1, pointerEvents: "none",
          background: `radial-gradient(circle, rgba(${rgb},0.14) 0%, transparent 70%)`,
          transition: "opacity 300ms ease",
          opacity: hovered ? 1 : 0.3,
        }} />

        {/* image */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "1.25rem 1.25rem 0",
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}>
          <div style={{
            borderRadius: 12, overflow: "hidden",
            border: `1px solid rgba(${rgb},0.18)`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
            aspectRatio: "16/10",
            background: "#060a18",
          }}>
            <img
              src={cert.src}
              alt={cert.title}
              draggable={false}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 500ms ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
          </div>
        </div>

        {/* text info */}
        <div style={{
          position: "relative", zIndex: 2,
          padding: "1rem 1.25rem 1.25rem",
          transformStyle: "preserve-3d",
          transform: "translateZ(10px)",
        }}>
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "0.95rem", fontWeight: 300,
            color: "#f1f5f9", margin: "0 0 4px",
            lineHeight: 1.3,
            letterSpacing:"0.08em"
          }}>
            {cert.title}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px", color: "#64748b", margin: 0,
            }}>
              {cert.issuer}
            </p>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              color: cert.accent,
              background: `rgba(${rgb},0.1)`,
              border: `1px solid rgba(${rgb},0.2)`,
              padding: "2px 8px", borderRadius: 20,
            }}>
              {cert.date}
            </span>
          </div>
        </div>

        {/* click hint */}
        <div style={{
          position: "absolute", bottom: 2, right: 14, zIndex: 3,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "9px", letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: hovered ? `rgba(${rgb},0.8)` : "rgba(71,85,105,0.6)",
          transition: "color 250ms ease",
        }}>
          view full ↗
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
        @keyframes lbIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lbImg { from { opacity:0; transform:scale(0.94) } to { opacity:1; transform:scale(1) } }
      `}</style>

      {/* glow behind image */}
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(circle, rgba(${rgb},0.12) 0%, transparent 70%)`,
        filter: "blur(60px)",
      }} />

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
          padding: "1.5rem 1.25rem 1rem", zIndex: 2,
        }}>
          <p style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "1rem", color: "#f1f5f9", margin: "0 0 2px",
          }}>
            {cert.title}
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", color: "#64748b", margin: 0,
          }}>
            {cert.issuer} · {cert.date}
          </p>
        </div>
      </div>

      <p style={{
        position: "absolute", bottom: 20,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px", letterSpacing: "0.25em",
        textTransform: "uppercase", color: "rgba(71,85,105,0.6)",
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
        maxWidth: 1000, margin: "0 auto",
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
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.38em",
            textTransform: "uppercase", color: "#3b82f6", marginBottom: 10,
          }}>
            Certificates
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: 0,
          }}>
            Credentials &<br />
            <span style={{ color: "#60a5fa" }}>achievements.</span>
          </h2>
        </div>

        {/* cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "1.5rem",
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