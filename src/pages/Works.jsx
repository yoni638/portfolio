import { useState, useEffect } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Mena",
    tagline: "Wellness community social media platform",
    description:
      "Mena is a wellness based mobile application aimed at creating a social community for people to share their wellness journeys, tips, and support.",
    tech: ["React Native", "Tailwind CSS", "Express", "MySQL"],
    category: "mobile",
    screenshots: [
      "mencom/mena.png",
      "mencom/1.png",
      "mencom/2.png",
      "mencom/3.png",
      "mencom/4.png",
      "mencom/5.png",
    ],
    liveUrl: "",
    repoUrl: "",
    year: "2025",
  },
  {
    id: 2,
    title: "Kiraye",
    tagline: "Rental property listing mobile app",
    description:
      "To help solve the current problem a tenant faces when looking for a rental property, Kiraye was developed to connect landlords and tenants directly.",
    tech: ["React Native", "Node.js", "MySQL"],
    category: "mobile",
    screenshots: ["kiraye/kiraye.png", "kiraye/1.png", "kiraye/2.png", "kiraye/3.png", "kiraye/4.png"],
    liveUrl: "",
    repoUrl: "",
    year: "2025",
  },
  {
    id: 3,
    title: "Coffee Meet",
    tagline: "A telegram bot for coffee lovers",
    description:
      "Coffee meet is a telegram bot that aims to meet up new people to share their love for coffee and have a good time.",
    tech: ["php", "MySQL"],
    category: "Bot",
    screenshots: ["coffee.png"],
    liveUrl: "",
    repoUrl: "https://github.com/yoni638/Projects.git",
    year: "2026",
  },
];

const CATEGORY_COLORS = {
  Web:    { bg: "rgba(37,99,235,0.15)",   border: "rgba(37,99,235,0.35)",   color: "#60a5fa" },
  Bot:    { bg: "rgba(139,92,246,0.15)",  border: "rgba(139,92,246,0.35)",  color: "#a78bfa" },
  Data:   { bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.35)",  color: "#34d399" },
  mobile: { bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.28)",  color: "#fb923c" },
};

const TECH_COLORS = {
  React:          { bg: "rgba(97,218,251,0.08)",  border: "rgba(97,218,251,0.2)",  color: "#61dafb" },
  "React Native": { bg: "rgba(97,218,251,0.08)",  border: "rgba(97,218,251,0.2)",  color: "#61dafb" },
  "Node.js":      { bg: "rgba(104,195,73,0.08)",  border: "rgba(104,195,73,0.2)",  color: "#68c349" },
  "Tailwind CSS": { bg: "rgba(56,189,248,0.08)",  border: "rgba(56,189,248,0.2)",  color: "#38bdf8" },
  Vite:           { bg: "rgba(189,147,249,0.08)", border: "rgba(189,147,249,0.2)", color: "#bd93f9" },
  MongoDB:        { bg: "rgba(77,179,61,0.08)",   border: "rgba(77,179,61,0.2)",   color: "#4db33d" },
  Telegraf:       { bg: "rgba(41,182,246,0.08)",  border: "rgba(41,182,246,0.2)",  color: "#29b6f6" },
  "Chart.js":     { bg: "rgba(255,99,132,0.08)",  border: "rgba(255,99,132,0.2)",  color: "#ff6384" },
  Express:        { bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)", color: "#94a3b8" },
  MySQL:          { bg: "rgba(0,117,143,0.08)",   border: "rgba(0,117,143,0.2)",   color: "#00758f" },
  Excel:          { bg: "rgba(27,94,32,0.08)",    border: "rgba(27,94,32,0.2)",    color: "#217346" },
  PowerBI:        { bg: "rgba(247,138,31,0.08)",  border: "rgba(247,138,31,0.2)",  color: "#f78a1f" },
};

function TechBadge({ label }) {
  const s = TECH_COLORS[label] || { bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.2)", color: "#60a5fa" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 9px", borderRadius: 5,
      fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.04em",
      fontFamily: "'Nunito', sans-serif",
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      /* ── fix: allow wrapping, never clip ── */
      whiteSpace: "normal",
      wordBreak: "break-word",
    }}>
      {label}
    </span>
  );
}

function CategoryBadge({ label }) {
  const s = CATEGORY_COLORS[label] || CATEGORY_COLORS.Web;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 4,
      fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
      fontFamily: "'Nunito', sans-serif",
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      /* ── fix: never overflow its container ── */
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}>
      {label}
    </span>
  );
}

function ImgOrPlaceholder({ src, alt, style = {}, onClick }) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return (
      <div style={{
        ...style,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10,
        background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(10,16,35,0.9) 100%)",
        border: "1px dashed rgba(59,130,246,0.15)",
      }}>
        <svg width="36" height="36" fill="none" stroke="rgba(96,165,250,0.2)" strokeWidth="1.2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span style={{ fontSize: 9, color: "rgba(148,163,184,0.3)", fontFamily: "'Nunito',sans-serif", letterSpacing: "0.06em" }}>
          preview unavailable
        </span>
      </div>
    );
  }
  return (
    <img
      src={src} alt={alt}
      onError={() => setErr(true)}
      onClick={onClick}
      style={{ ...style, objectFit: "cover", display: "block", cursor: onClick ? "zoom-in" : "default" }}
    />
  );
}

function IconLink({ href, title, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onClick={e => e.stopPropagation()} title={title}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        width: 32, height: 32, borderRadius: 8,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: hovered ? "rgba(51,65,85,0.8)" : "rgba(15,23,42,0.7)",
        border: `1px solid ${hovered ? "rgba(96,165,250,0.3)" : "rgba(51,65,85,0.45)"}`,
        color: hovered ? "#cbd5e1" : "#64748b",
        textDecoration: "none", fontSize: 12,
        transition: "all 150ms ease", fontFamily: "monospace",
        flexShrink: 0,
      }}
    >
      {children}
    </a>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, index, onOpen }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(project)}
      style={{
        position: "relative",
        background: hov ? "rgba(11,18,38,0.98)" : "rgba(8,13,28,0.92)",
        border: `1px solid ${hov ? "rgba(59,130,246,0.28)" : "rgba(30,41,59,0.5)"}`,
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov
          ? "0 20px 50px rgba(37,99,235,0.12), 0 0 0 1px rgba(59,130,246,0.06)"
          : "0 2px 16px rgba(0,0,0,0.3)",
        display: "flex", flexDirection: "column",
        /* ── fix: card itself must never overflow its grid column ── */
        minWidth: 0,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Top shimmer line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1, zIndex: 2,
        background: hov
          ? "linear-gradient(to right, transparent, rgba(59,130,246,0.55), transparent)"
          : "linear-gradient(to right, transparent, rgba(30,41,59,0.7), transparent)",
        transition: "all 280ms ease",
      }} />

      {/* Screenshot */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "52%", flexShrink: 0 }}>
        <ImgOrPlaceholder
          src={project.screenshots[0]}
          alt={project.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 38%, rgba(8,13,28,0.82) 100%)",
          pointerEvents: "none",
        }} />
        {/* ── fix: badge row uses flex-wrap so year badge never pushes outside ── */}
        <div style={{
          position: "absolute", top: 12, left: 12, right: 12,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 6,
        }}>
          <CategoryBadge label={project.category} />
          <span style={{
            fontSize: "8px", color: "rgba(148,163,184,0.5)",
            fontFamily: "'Nunito',monospace", letterSpacing: "0.1em",
            background: "rgba(4,8,20,0.65)", backdropFilter: "blur(6px)",
            padding: "3px 8px", borderRadius: 4,
            border: "1px solid rgba(30,41,59,0.5)",
            whiteSpace: "nowrap",
          }}>
            {project.year}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: "18px 20px 20px", flex: 1,
        display: "flex", flexDirection: "column", gap: 10,
        /* ── fix: prevent body from overflowing card ── */
        minWidth: 0, overflow: "hidden", boxSizing: "border-box",
      }}>

        {/* Title row — stack on very narrow instead of forcing side-by-side */}
        <div style={{
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between", gap: 8,
          /* ── fix: allow wrap so arrow badge doesn't push title off screen ── */
          flexWrap: "nowrap",
          minWidth: 0,
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "1.05rem", color: "#f1f5f9", margin: "0 0 3px", lineHeight: 1.3,
              letterSpacing: "0.01em",
              /* ── fix: long titles wrap instead of overflow ── */
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}>
              {project.title}
            </h3>
            <p style={{
              margin: 0, fontFamily: "'Nunito', sans-serif",
              fontSize: "10.5px", color: "rgba(148,163,184,0.45)", letterSpacing: "0.02em",
              /* ── fix: tagline wraps instead of overflowing ── */
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}>
              {project.tagline}
            </p>
          </div>
          {/* Arrow badge */}
          <div style={{
            width: 26, height: 26, borderRadius: 6, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: hov ? "rgba(37,99,235,0.16)" : "rgba(30,41,59,0.3)",
            border: `1px solid ${hov ? "rgba(59,130,246,0.3)" : "rgba(30,41,59,0.5)"}`,
            transition: "all 280ms ease",
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke={hov ? "#60a5fa" : "#475569"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: hov
            ? "linear-gradient(to right, rgba(59,130,246,0.2), transparent)"
            : "linear-gradient(to right, rgba(30,41,59,0.6), transparent)",
          transition: "all 280ms ease",
        }} />

        {/* Description — fully visible, no clamp-related hidden overflow */}
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "11.5px", color: "#475569", lineHeight: 1.75,
          margin: 0,
          /* ── fix: remove line clamp; let text wrap fully on mobile ── */
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}>
          {project.description}
        </p>

        {/* Tech badges — already flex-wrap, just ensure no single badge overflows */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tech.map(t => <TechBadge key={t} label={t} />)}
        </div>

        {/* Footer row */}
        <div style={{
          marginTop: "auto", paddingTop: 14,
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 8,
          flexWrap: "wrap",          /* ── fix: wrap if both buttons don't fit ── */
        }}>
          <button
            onClick={e => { e.stopPropagation(); onOpen(project); }}
            style={{
              padding: "6px 14px", borderRadius: 6,
              background: hov ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.08)",
              border: `1px solid ${hov ? "rgba(59,130,246,0.4)" : "rgba(37,99,235,0.2)"}`,
              color: hov ? "#93c5fd" : "#60a5fa",
              fontFamily: "'Nunito', sans-serif",
              fontSize: "10.5px", fontWeight: 600, cursor: "pointer",
              transition: "all 160ms", letterSpacing: "0.03em",
              whiteSpace: "nowrap",
            }}
          >
            View Details →
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            {project.liveUrl && <IconLink href={project.liveUrl} title="Live site">↗</IconLink>}
            {project.repoUrl && <IconLink href={project.repoUrl} title="GitHub repo">{"</>"}</IconLink>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Image Zoom Overlay ── */
function ImageZoom({ screenshots, activeIndex, onClose, onPrev, onNext }) {
  const total = screenshots.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  const navBtn = (onClick, disabled, label) => (
    <button
      onClick={e => { e.stopPropagation(); onClick(); }}
      disabled={disabled}
      style={{
        position: "absolute", top: "50%", transform: "translateY(-50%)",
        ...(label === "‹" ? { left: 14 } : { right: 14 }),
        width: 40, height: 40, borderRadius: 8,
        background: disabled ? "rgba(15,23,42,0.4)" : "rgba(15,23,42,0.85)",
        border: `1px solid ${disabled ? "rgba(30,41,59,0.3)" : "rgba(51,65,85,0.6)"}`,
        color: disabled ? "rgba(100,116,139,0.3)" : "#cbd5e1",
        fontSize: 22, cursor: disabled ? "default" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 150ms", backdropFilter: "blur(6px)",
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = "rgba(37,99,235,0.35)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)"; }}}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.background = "rgba(15,23,42,0.85)"; e.currentTarget.style.borderColor = "rgba(51,65,85,0.6)"; }}}
    >
      {label}
    </button>
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        background: "rgba(2,6,23,0.94)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 22, animation: "fadeIn 150ms ease", cursor: "default",
      }}
    >
      <img
        src={screenshots[activeIndex]}
        alt={`screenshot ${activeIndex + 1}`}
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", height: "100%",
          objectFit: "contain", borderRadius: 12,
          padding: "48px 80px", boxSizing: "border-box",
          display: "block", cursor: "default",
        }}
      />
      {navBtn(onPrev, activeIndex === 0, "‹")}
      {navBtn(onNext, activeIndex === total - 1, "›")}
      {total > 1 && (
        <div style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 6,
        }}>
          {screenshots.map((_, i) => (
            <div key={i} style={{
              width: i === activeIndex ? 18 : 5, height: 5, borderRadius: 3,
              background: i === activeIndex ? "#3b82f6" : "rgba(148,163,184,0.22)",
              transition: "all 250ms ease",
            }} />
          ))}
        </div>
      )}
      <div style={{
        position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
        fontSize: "9px", fontFamily: "'Nunito',monospace",
        color: "rgba(148,163,184,0.4)", letterSpacing: "0.1em",
        background: "rgba(6,10,24,0.7)", backdropFilter: "blur(4px)",
        padding: "4px 10px", borderRadius: 5,
        border: "1px solid rgba(30,41,59,0.5)",
      }}>
        {activeIndex + 1} / {total}
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 14, right: 14,
          width: 32, height: 32, borderRadius: 8,
          background: "rgba(30,41,59,0.85)", border: "1px solid rgba(51,65,85,0.6)",
          color: "#94a3b8", fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        ✕
      </button>
    </div>
  );
}

/* ── Modal ── */
function Modal({ project, onClose }) {
  const [activeShot, setActiveShot] = useState(0);
  const [zoomed, setZoomed]         = useState(false);

  const validShots = project.screenshots.filter(Boolean);
  const handlePrev = () => setActiveShot(i => Math.max(0, i - 1));
  const handleNext = () => setActiveShot(i => Math.min(validShots.length - 1, i + 1));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") { if (zoomed) setZoomed(false); else onClose(); }
      if (!zoomed && e.key === "ArrowLeft")  handlePrev();
      if (!zoomed && e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose, zoomed]);

  if (!project) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(2,6,23,0.82)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "72px 16px 24px", overflowY: "auto",
        animation: "fadeIn 180ms ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative", width: "100%", maxWidth: 900,
          background: "#080e1f",
          border: "1px solid rgba(59,130,246,0.18)",
          borderRadius: 22, overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          animation: "slideUp 230ms cubic-bezier(0.22,1,0.36,1)",
          boxSizing: "border-box",
        }}
        className="modal-container"
      >
        {zoomed && validShots.length > 0 && (
          <ImageZoom
            screenshots={validShots}
            activeIndex={activeShot}
            onClose={() => setZoomed(false)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid rgba(30,41,59,0.6)",
          background: "rgba(6,10,24,0.6)",
          gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <CategoryBadge label={project.category} />
            <span style={{
              color: "rgba(148,163,184,0.35)", fontSize: "10px",
              fontFamily: "'Nunito',sans-serif", letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}>
              {project.year}
            </span>
          </div>
          <button
            onClick={onClose} aria-label="Close"
            style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: "rgba(30,41,59,0.7)", border: "1px solid rgba(51,65,85,0.5)",
              color: "#64748b", fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 150ms",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.background = "rgba(51,65,85,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "rgba(30,41,59,0.7)"; }}
          >
            ✕
          </button>
        </div>

        {/* Body grid */}
        <div
          data-modal-grid="true"
          style={{
            display: "grid",
            gridTemplateColumns: "var(--modal-cols, 1fr 340px)",
            gap: 0,
          }}
        >
          {/* Left: screenshots */}
          <div style={{
            padding: "20px",
            borderRight: "var(--modal-divider, 1px solid rgba(30,41,59,0.5))",
            borderBottom: "var(--modal-divider-h, none)",
            boxSizing: "border-box", minWidth: 0,
          }}>
            <div style={{
              borderRadius: 12, overflow: "hidden",
              border: "1px solid rgba(30,41,59,0.6)",
              background: "rgba(6,10,24,0.8)",
              lineHeight: 0, position: "relative",
            }}>
              <ImgOrPlaceholder
                src={validShots[activeShot] || ""}
                alt={`${project.title} screenshot ${activeShot + 1}`}
                style={{ width: "100%", height: 280, display: "block" }}
                onClick={() => validShots.length > 0 && setZoomed(true)}
              />
            </div>

            {validShots.length > 1 && (
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {validShots.map((s, i) => (
                  <button key={i}
                    onClick={() => { setActiveShot(i); setZoomed(false); }}
                    style={{
                      width: 60, height: 40, borderRadius: 8, overflow: "hidden",
                      border: `2px solid ${i === activeShot ? "rgba(59,130,246,0.6)" : "rgba(30,41,59,0.5)"}`,
                      padding: 0, cursor: "pointer",
                      background: "rgba(6,10,24,0.8)",
                      transition: "border-color 150ms", flexShrink: 0, outline: "none",
                    }}
                  >
                    <ImgOrPlaceholder src={s} alt="" style={{ width: "100%", height: "100%" }} />
                  </button>
                ))}
              </div>
            )}

            {(project.liveUrl || project.repoUrl) && (
              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer"
                    style={{
                      flex: 1, minWidth: 100, padding: "9px 0", textAlign: "center",
                      borderRadius: 10, textDecoration: "none",
                      background: "#2563eb", color: "#fff",
                      fontFamily: "'Nunito',sans-serif", fontSize: "12px", fontWeight: 600,
                      transition: "background 180ms", letterSpacing: "0.02em",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                  >Live Site ↗</a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer"
                    style={{
                      flex: 1, minWidth: 100, padding: "9px 0", textAlign: "center",
                      borderRadius: 10, textDecoration: "none",
                      background: "transparent", color: "#94a3b8",
                      fontFamily: "'Nunito',sans-serif", fontSize: "12px", fontWeight: 500,
                      border: "1px solid rgba(51,65,85,0.55)", transition: "all 180ms",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(96,165,250,0.4)"; e.currentTarget.style.color = "#e2e8f0"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(51,65,85,0.55)"; e.currentTarget.style.color = "#94a3b8"; }}
                  >View Code &lt;/&gt;</a>
                )}
              </div>
            )}
          </div>

          {/* Right: info panel */}
          <div style={{
            padding: "24px 22px", display: "flex", flexDirection: "column", gap: 18,
            boxSizing: "border-box", minWidth: 0,
          }}>
            <div>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "1.45rem", color: "#f1f5f9", margin: "0 0 5px", lineHeight: 1.2,
                fontWeight: 500,
                wordBreak: "break-word",
              }}>
                {project.title}
              </h2>
              <p style={{
                fontFamily: "'Nunito',sans-serif",
                fontSize: "11px", color: "rgba(148,163,184,0.45)",
                letterSpacing: "0.04em", margin: 0,
                wordBreak: "break-word",
              }}>
                {project.tagline}
              </p>
            </div>

            <div style={{ width: 28, height: 2, background: "linear-gradient(to right, #3b82f6, #6366f1)", borderRadius: 2 }} />

            <p style={{
              fontFamily: "'Nunito',sans-serif", fontSize: "12.5px", color: "#94a3b8",
              lineHeight: 1.8, margin: 0,
              wordBreak: "break-word",
            }}>
              {project.description}
            </p>

            <div>
              <p style={{
                fontFamily: "'Nunito',sans-serif",
                fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(96,165,250,0.45)", margin: "0 0 10px",
              }}>
                Tech Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.tech.map(t => <TechBadge key={t} label={t} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }

        /* ── mobile: stack the modal grid vertically ── */
        @media (max-width: 640px) {
          [data-modal-grid="true"] {
            grid-template-columns: 1fr !important;
          }
          [data-modal-grid="true"] > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(30,41,59,0.5) !important;
            padding: 16px !important;
          }
          [data-modal-grid="true"] > div:last-child {
            padding: 16px !important;
          }
          .modal-container {
            border-radius: 16px !important;
          }
        }

        /* ── mobile: shorter main screenshot ── */
        @media (max-width: 640px) {
          [data-modal-grid="true"] img[style*="height: 280"] {
            height: 200px !important;
          }
        }

        /* ── mobile: single-column card grid ── */
        .projects-grid {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Works Section ── */
export default function Works() {
  const [active, setActive] = useState(null);

  return (
    <>
      <section
        id="works"
        className="relative min-h-screen flex flex-col items-center px-6 py-28 border-b border-blue-950/40 last:border-0"
      >
        <div className="pointer-events-none absolute inset-0 z-0" style={{
          backgroundImage: "radial-gradient(rgba(99,155,255,0.025) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-[9px] tracking-[0.45em] uppercase mb-4"
              style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(96,165,250,0.5)" }}
            >
              — Selected Work —
            </p>
            <h2
              className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}
            >
              Projects
            </h2>
            <div className="w-10 h-px mx-auto mb-5 rounded-full" style={{
              background: "linear-gradient(to right, #2563eb, #6366f1)",
            }} />
            <p
              className="text-sm max-w-xs mx-auto leading-relaxed"
              style={{ fontFamily: "'Nunito', sans-serif", color: "#475569" }}
            >
              Some of the projects I've worked on. Not all are listed — they will be updated soon.
            </p>
          </div>

          <div
            className="projects-grid"
            style={{ display: "grid", gap: 22 }}
          >
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
            ))}
          </div>
        </div>
      </section>

      {active && <Modal project={active} onClose={() => setActive(null)} />}
    </>
  );
}