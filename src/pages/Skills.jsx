import { useEffect, useRef, useState } from "react";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact,
  SiNodedotjs, SiExpress, SiPhp, SiMysql, SiMongodb,
} from "react-icons/si";

function useScrollReveal(threshold = 0.12) {
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

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

const frontend = [
  { Icon: SiHtml5,      name: "HTML5",        color: "#e34f26" },
  { Icon: SiCss3,       name: "CSS3",         color: "#1572b6" },
  { Icon: SiJavascript, name: "JavaScript",   color: "#f7df1e" },
  { Icon: SiReact,      name: "React",        color: "#61dafb" },
  { Icon: SiReact,      name: "React Native", color: "#61dafb", short: "RN" },
];

const backend = [
  { Icon: SiNodedotjs,  name: "Node.js",      color: "#3c873a" },
  { Icon: SiExpress,    name: "Express.js",   color: "#eeeeee" },
  { Icon: SiPhp,        name: "PHP",          color: "#8892bf" },
  { Icon: SiMysql,      name: "MySQL",        color: "#4479a1" },
  { Icon: SiMongodb,    name: "MongoDB",      color: "#47a248" },
];

function SkillCard({ Icon, name, color, short, visible, delay, from }) {
  const [hovered, setHovered] = useState(false);
  const rgb = hexToRgb(color);
  const startX = from === "left" ? "-36px" : "36px";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) scale(1)" : `translateX(${startX}) scale(0.96)`,
        transition: `
          opacity 550ms ease ${delay}ms,
          transform 550ms ease ${delay}ms,
          background 220ms ease,
          border-color 220ms ease,
          box-shadow 220ms ease
        `,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "22px 16px",
        borderRadius: 16,
        background: hovered
          ? `rgba(${rgb}, 0.08)`
          : "rgba(10, 16, 35, 0.85)",
        border: hovered
          ? `1px solid rgba(${rgb}, 0.4)`
          : "1px solid rgba(40,55,80,0.6)",
        boxShadow: hovered
          ? `0 0 28px rgba(${rgb}, 0.1), inset 0 1px 0 rgba(${rgb},0.08)`
          : "inset 0 1px 0 rgba(255,255,255,0.03)",
        cursor: "default",
        flex: "1 1 80px",
        minWidth: 80,
      }}
    >
      <div style={{
        width: 44, height: 44,
        borderRadius: 12,
        background: hovered ? `rgba(${rgb}, 0.15)` : "rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 220ms ease",
      }}>
        <Icon
          size={24}
          color={hovered ? color : "#475569"}
          style={{ transition: "color 220ms ease" }}
        />
      </div>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        color: hovered ? "#e2e8f0" : "#64748b",
        transition: "color 220ms ease",
        textAlign: "center",
      }}>
        {short || name}
      </span>
    </div>
  );
}

function CategoryBlock({ label, tag, skills, visible, baseDelay, from }) {
  return (
    <div style={{
      background: "rgba(8,14,31,0.7)",
      border: "1px solid rgba(30,50,90,0.5)",
      borderRadius: 20,
      padding: "24px 22px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}>
      {/* label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 9,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "#3b82f6",
          opacity: visible ? 1 : 0,
          transition: `opacity 500ms ease ${baseDelay}ms`,
        }}>
          {tag}
        </span>
        <div style={{
          flex: 1, height: 1,
          background: "rgba(59,130,246,0.12)",
          opacity: visible ? 1 : 0,
          transition: `opacity 500ms ease ${baseDelay + 80}ms`,
        }} />
      </div>

      <h3 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "1.05rem",
        fontWeight: 700,
        color: "#cbd5e1",
        margin: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 500ms ease ${baseDelay + 60}ms, transform 500ms ease ${baseDelay + 60}ms`,
      }}>
        {label}
      </h3>

      {/* skill cards row */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}>
        {skills.map(({ Icon, name, color, short }, i) => (
          <SkillCard
            key={name}
            Icon={Icon}
            name={name}
            color={color}
            short={short}
            visible={visible}
            delay={baseDelay + 120 + i * 65}
            from={from}
          />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#060a18",
        borderBottom: "1px solid rgba(30,58,138,0.2)",
        paddingTop: "5.5rem",
        paddingBottom: "5.5rem",
      }}
    >
      {/* bg texture */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(99,155,255,0.038) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div style={{
          position: "absolute", left: "50%", top: "40%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.065) 0%, transparent 70%)",
          filter: "blur(100px)",
          transform: "translateX(-50%)",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 900, margin: "0 auto",
        padding: "0 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}>

        {/* ── heading ── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 600ms ease 0ms, transform 600ms ease 0ms",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.38em",
            textTransform: "uppercase", color: "#3b82f6", marginBottom: 10,
          }}>
            Skills
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: 0,
          }}>
            What I build<br />
            <span style={{ color: "#60a5fa" }}>with.</span>
          </h2>
        </div>

        {/* ── bento grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "14px",
        }}>
          <CategoryBlock
            label="Frontend Development"
            tag="Client Side"
            skills={frontend}
            visible={visible}
            baseDelay={100}
            from="left"
          />
          <CategoryBlock
            label="Backend & Databases"
            tag="Server Side"
            skills={backend}
            visible={visible}
            baseDelay={220}
            from="right"
          />
        </div>
      </div>
    </section>
  );
}