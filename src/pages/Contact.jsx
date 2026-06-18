import { useEffect, useRef, useState } from "react";
import { SiWhatsapp, SiTelegram, SiGmail } from "react-icons/si";
import { HiPhone } from "react-icons/hi";

// Custom LinkedIn icon since SiLinkedin is not available
function SiLinkedin({ size, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

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

const contacts = [
  {
    label: "Phone",
    value: "+251 976 669 307",
    sub: "Call anytime",
    Icon: HiPhone,
    color: "#22c55e",
    href: "tel:+251976669307",
  },
  {
    label: "WhatsApp",
    value: "+251 976 669 307",
    sub: "Message me",
    Icon: SiWhatsapp,
    color: "#25d366",
    href: "https://wa.me/251976669307",
  },
  {
    label: "Email",
    value: "yonatangetachew695\n@gmail.com",
    sub: "Drop me a line",
    Icon: SiGmail,
    color: "#ea4335",
    href: "mailto:yonatangetachew695@gmail.com",
  },
  {
    label: "Telegram",
    value: "@yadaElaha",
    sub: "Chat on Telegram",
    Icon: SiTelegram,
    color: "#2aabee",
    href: "https://t.me/yadaElaha",
  },
  {
    label: "LinkedIn",
    value: "Yonatan Getachew",
    sub: "Connect with me",
    Icon: SiLinkedin,
    color: "#0a66c2",
    href: "https://www.linkedin.com/in/yonatan-getachew-446109407/",
  },
];

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)].join(",");
}

function ContactCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const rgb = hexToRgb(item.color);
  const delay = index * 110 + 150;

  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "1.6rem",
        borderRadius: 18,
        textDecoration: "none",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        background: hovered ? `rgba(${rgb},0.07)` : "rgba(11,17,32,0.85)",
        border: hovered
          ? `1px solid rgba(${rgb},0.35)`
          : "1px solid rgba(40,52,72,0.65)",
        boxShadow: hovered
          ? `0 16px 48px rgba(${rgb},0.15), 0 0 0 1px rgba(${rgb},0.12)`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transform: visible
          ? hovered ? "translateY(-5px)" : "translateY(0)"
          : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transition: hovered
          ? `background 220ms, border 220ms, box-shadow 220ms, transform 200ms`
          : `opacity 650ms ease ${delay}ms, transform 650ms ease ${delay}ms, background 220ms, border 220ms, box-shadow 220ms`,
      }}
    >
      {/* bg corner glow */}
      <div style={{
        position: "absolute", top: -30, right: -30,
        width: 100, height: 100, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(${rgb},0.15) 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 300ms ease",
        pointerEvents: "none",
      }} />

      {/* top: icon + label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hovered ? `rgba(${rgb},0.18)` : "rgba(15,23,42,0.9)",
          border: hovered ? `1px solid rgba(${rgb},0.3)` : "1px solid rgba(40,52,72,0.7)",
          transition: "background 250ms, border 250ms",
        }}>
          <item.Icon size={20} color={hovered ? item.color : "#475569"} style={{ transition: "color 250ms" }} />
        </div>
        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "11px", letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: hovered ? `rgba(${rgb},0.9)` : "#475569",
          transition: "color 250ms",
        }}>
          {item.label}
        </span>
      </div>

      {/* value */}
      <div>
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "clamp(1rem, 2vw, 1rem)",
          fontWeight: 400,
          color: hovered ? "#f1f5f9" : "#94a3b8",
          margin: "0 0 4px",
          lineHeight: 1.35,
          transition: "color 250ms",
          whiteSpace: "pre-line",
        }}>
          {item.value}
        </p>
        <p style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "11px", color: "#334155",
          margin: 0,
          transition: "color 250ms",
        }}>
          {item.sub}
        </p>
      </div>

      {/* arrow hint */}
      <div style={{
        position: "absolute", bottom: 14, right: 16,
        fontFamily: "'Nunito', sans-serif",
        fontSize: "13px",
        color: hovered ? item.color : "rgba(51,65,85,0.5)",
        transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
        transition: "color 220ms, transform 220ms",
      }}>
        ↗
      </div>
    </a>
  );
}

export default function Contact() {
  const [ref, visible] = useScrollReveal();

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative", overflow: "hidden",
        background: "#060a18",
        paddingTop: "5.5rem", paddingBottom: "6rem",
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
          position: "absolute", left: "50%", top: "40%",
          width: 500, height: 500, borderRadius: "50%",
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} />
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 860, margin: "0 auto",
        padding: "0 1.5rem",
      }}>

        {/* heading */}
        <div style={{
          textAlign: "center", marginBottom: "3.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 600ms ease, transform 600ms ease",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, letterSpacing: "0.38em",
            textTransform: "uppercase", color: "#3b82f6", marginBottom: 12,
          }}>
            Contact
          </p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 14px",
          }}>
            Let's work<br />
            <span style={{ color: "#60a5fa" }}>together.</span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem", color: "#475569",
            maxWidth: 360, margin: "0 auto", lineHeight: 1.7,
          }}>
            Reach out through any channel — I'm quick to respond.
          </p>
        </div>

        {/* grid — auto-fit handles 5 cards gracefully */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}>
          {contacts.map((item, i) => (
            <ContactCard key={item.label} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* footer note */}
        <div style={{
          textAlign: "center", marginTop: "3.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 700ms ease 600ms",
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px", letterSpacing: "0.05em",
            color: "rgba(51,65,85,0.7)",
          }}>
            Location <span style={{ color: "#475569" }}>Addis Ababa, Ethiopia</span> · Open to remote work
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
      `}</style>
    </section>
  );
}