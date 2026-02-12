import React, { useState, useCallback, useEffect, useRef } from "react";
import image from "../assets/ChatGPT Image Jan 14, 2026, 10_46_44 AM.png"
function LandingSection() {
  const [particles, setParticles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [navHeight, setNavHeight] = useState(110); // fallback
  const sectionRef = useRef(null);
  
  const backgroundImageUrl = image

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (Math.random() > 0.85) {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        size: Math.random() * 5 + 2,
        duration: Math.random() * 2 + 2,
      };
      setParticles((prev) => [...prev, newParticle]);
      setTimeout(() => {
        setParticles((curr) => curr.filter((p) => p.id !== newParticle.id));
      }, newParticle.duration * 1000);
    }
  }, []);

  useEffect(() => {
    const createAmbientParticle = () => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 6 + 4,
      };
      setParticles((prev) => [...prev, newParticle]);
      setTimeout(() => {
        setParticles((curr) => curr.filter((p) => p.id !== newParticle.id));
      }, newParticle.duration * 1000);
    };
    const interval = setInterval(createAmbientParticle, 900);
    return () => clearInterval(interval);
  }, []);

  // measure navbar height (and watch for changes)
  useEffect(() => {
    const measureNav = () => {
      const nav = document.querySelector("nav");
      if (nav) {
        const h = Math.ceil(nav.getBoundingClientRect().height);
        setNavHeight(h);
      } else {
        setNavHeight(110);
      }
    };

    measureNav();
    // Re-measure when window resizes (mobile <-> desktop)
    window.addEventListener("resize", measureNav);

    // Observe navbar size changes (e.g., mobile menu open or scrolled state changes)
    const nav = document.querySelector("nav");
    let observer;
    if (nav && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measureNav);
      observer.observe(nav);
    }

    return () => {
      window.removeEventListener("resize", measureNav);
      if (observer && nav) observer.unobserve(nav);
    };
  }, []);

  // ensure the overlay covers full section (we use absolute overlay)
  // The section will be padded from top by navHeight + extra gap (20px)
  const topPadding = navHeight + 20;

  return (
    <section
      ref={sectionRef}
      className="landing-section"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        // dynamic top padding to always sit below navbar
        paddingTop: `${topPadding}px`,
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .landing-section {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: url('${backgroundImageUrl}') center/cover no-repeat;
          cursor: none;
          font-family: 'Inter', sans-serif;
        }

        /* Soft fade overlay */
        .dark-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.35);
          pointer-events: none;
        }
        
        /* Responsive content box that won't overlap the navbar */
        .content-box {
          position: relative;
          /* allow the box to be centered vertically-ish on large screens but remain below navbar */
          margin-left: 7%;
          margin-right: 7%;
          
          max-width: 700px;
          padding: 2.5rem;
          border-radius: 20px;
          
          
          color: white;
          display:flex;
          flex-direction:column;
          gap:12vh;
          /* make the box visually sit lower on small screens by default but nicer on large screens */
          transform: translateY(0);
        }

        /* Main heading */
        .main-heading {
  font-size: clamp(1.9rem, 4vw, 2.8rem); /* responsive scaling */
  line-height: 1.05;
  margin: 0 0 0.6rem 0;
  color: white;
  letter-spacing: -0.02em;
  font-family: 'Trajan Pro', 'Trajan', serif;
  text-transform: uppercase;
}


        .sub-text {
  margin-top: 0.9rem;
  font-size: clamp(1rem, 1.9vw, 1.25rem);
  line-height: 1.6;
  padding: 0.65rem clamp(1rem, 6vw, 3.5rem);  /* responsive padding */
  color: #f0f0f0;
  border-radius: 4px;
}


        .cta-button {
          display: inline-block;
          margin-top: 1.4rem;
          padding: 10px;
          background: #D9C6A6;
          color: white;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          width: 200px;
          align-self:center;
          transition: transform .25s ease, background .25s ease;
        }

        .cta-button:hover {
          transform: scale(1.04);
          background: #f3f3f3;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 210, 160, 0.85);
          box-shadow: 0 0 10px rgba(255, 200, 150, 0.9);
          transform: translate(-50%, -50%);
          animation: float-up linear forwards;
          pointer-events: none;
        }

        @keyframes float-up {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -120px) scale(0); }
        }

        .custom-cursor {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 220, 180, 1);
          box-shadow: 0 0 10px #ffd27f, 0 0 20px #ffea9e;
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: opacity 0.18s ease;
          z-index: 999;
        }

        /* ------------------------
           Responsive tweaks
           ------------------------ */
        @media (max-width: 1024px) {
          .content-box {
            margin-left: 6%;
            margin-right: 6%;
            padding: 2rem;
            max-width: 720px;
            border-radius: 18px;
          }
          .main-heading {
            font-size: clamp(1.7rem, 5.6vw, 3.6rem);
          }
        }

        @media (max-width: 768px) {
          .landing-section {
            height: auto; /* allow content to flow on very small screens */
            min-height: calc(100vh - 40px);
          }
          .content-box {
            margin-left: 5%;
            margin-right: 5%;
            padding: 1.6rem;
            border-radius: 16px;
            max-width: calc(100% - 40px);
          }
          .main-heading {
            font-size: clamp(1.4rem, 7.5vw, 2.6rem);
            line-height: 1.08;
            margin-bottom: 0.5rem;
          }
          .sub-text {
            font-size: 1rem;
          }
          /* push the content a bit more on very small screens */
          .content-box { margin-top: 10px; }
        }

        @media (max-width: 420px) {
          .content-box {
            padding: 1.1rem;
            border-radius: 12px;
          }
          .main-heading {
            font-size: clamp(1.2rem, 8.5vw, 2.2rem);
          }
        }

        .AlignmentModifications {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width:100vw;
  
  pointer-events: none;  /* if you want ghost overlay */
  /* remove pointer-events if you want clickable items */
}

        
      `}
      </style>

      <div className="AlignmentModifications">
  <div
    className="content-box"
    style={{ background: "none", textAlign: "center" }}
    aria-hidden={false}
  >
    <div>
    <h1 className="main-heading">THE GUIDING LIGHT WITHIN</h1>

    <p className="sub-text">
      Where consciousness meets clarity — and clarity allows evolution
    </p>
    </div>
    

    <a className="cta-button">Explore Atmarisa</a>
    
  </div>

  {particles.map((p) => (
    <div
      key={p.id}
      className="particle"
      style={{
        left: `${p.x}px`,
        top: `${p.y}px`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        animationDuration: `${p.duration}s`,
      }}
    />
  ))}

  <div
    className="custom-cursor"
    style={{
      left: cursorPos.x,
      top: cursorPos.y,
      opacity: isHovering ? 1 : 0,
    }}
  />
</div>
</section>

  );
}

export default function App() {
  return (
    <div>
      <LandingSection />
    </div>
  );
}
