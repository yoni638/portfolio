import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import Works from "./pages/Works";
import Contact from "./pages/Contact";

const SECTION_IDS = ["home", "about", "skills", "certificates", "works", "contact"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observers = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        html { scroll-behavior: smooth; }
        body { background-color: #050814; color: #fff; overflow-x: hidden; }
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(59,130,246,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none; z-index: 0;
        }
        main { position: relative; z-index: 1; }
      `}</style>

      <NavBar activeSection={activeSection} />
      <main>
        <Home />
        <About />
        <Skills />
        <Certificates />
        <Works />
        <Contact />
      </main>
      <Footer />
    </>
  );
}