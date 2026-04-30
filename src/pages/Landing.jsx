import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { num: "01", label: "Compare", desc: "Benchmark past performance against targets with precision." },
  { num: "02", label: "Identify", desc: "Surface hiring gaps and operational blind spots instantly." },
  { num: "03", label: "Decide",  desc: "Transform raw KPIs into clear, actionable strategies." },
];

export default function Landing() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial load animation
    setTimeout(() => setVisible(true), 100);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #ECEAE4;
          overflow-x: hidden;
        }

        .land-wrap {
          min-height: 100vh;
          background: #ECEAE4;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .land-wrap.visible { opacity: 1; }

        /* ── ANIMATIONS ──────────────────────── */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-on-scroll.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }

        /* ── NAV ──────────────────────────────── */
        .land-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 64px;
          border-bottom: 1px solid #c8c4b8;
          position: sticky;
          top: 0;
          background: #ECEAE4;
          z-index: 50;
        }

        .nav-brand {
          font-size: 13px;
          letter-spacing: 0.24em;
          color: #1a1a14;
          text-transform: uppercase;
          font-weight: bold;
        }

        .nav-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid #c8c4b8;
          color: #1a1a14;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-outline:hover {
          background: #1a1a14;
          color: #ECEAE4;
          border-color: #1a1a14;
        }

        .btn-fill {
          background: #1a1a14;
          border: 1px solid #1a1a14;
          color: #ECEAE4;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-fill:hover {
          background: transparent;
          color: #1a1a14;
        }

        /* ── MARQUEE ──────────────────────────── */
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 1px solid #c8c4b8;
          padding: 16px 0;
          background: #1a1a14;
          color: #ECEAE4;
          display: flex;
        }

        .marquee-content {
          display: inline-block;
          animation: marquee 25s linear infinite;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── HERO ─────────────────────────────── */
        .land-hero {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          border-bottom: 1px solid #c8c4b8;
          min-height: 80vh;
        }

        .hero-left {
          padding: 120px 64px 80px;
          border-right: 1px solid #c8c4b8;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hero-eyebrow {
          font-size: 10px;
          letter-spacing: 0.32em;
          color: #1a1a14;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .eyebrow-line {
          width: 40px;
          height: 1px;
          background: #1a1a14;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 9vw, 160px);
          font-weight: 400;
          color: #1a1a14;
          line-height: 0.9;
          letter-spacing: -0.02em;
          margin-bottom: 0;
          text-transform: uppercase;
        }

        .hero-title em {
          font-style: italic;
          color: #6b6b4a;
          font-weight: 300;
          text-transform: lowercase;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-top: 80px;
        }

        .btn-hero-primary {
          background: #6b6b4a;
          border: none;
          color: #ECEAE4;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 18px 42px;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
        }
        .btn-hero-primary:hover {
          background: #5a5a3a;
          transform: translateY(-4px);
        }

        .btn-hero-ghost {
          background: transparent;
          border: none;
          color: #1a1a14;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: opacity 0.2s;
        }
        .btn-hero-ghost:hover { opacity: 0.6; }

        .ghost-arrow {
          font-size: 16px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-hero-ghost:hover .ghost-arrow { transform: translateX(8px); }

        /* RIGHT PANEL */
        .hero-right {
          background: #ECEAE4;
          padding: 120px 64px 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .decorative-circle {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: #1a1a14;
          opacity: 0.03;
          z-index: 0;
        }

        .hero-right-tag {
          font-size: 10px;
          letter-spacing: 0.28em;
          color: #1a1a14;
          text-transform: uppercase;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .hero-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          color: #6b6b4a;
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }

        .hero-desc strong {
          font-weight: 500;
          color: #1a1a14;
          font-style: italic;
        }

        .hero-stat-row {
          display: flex;
          gap: 48px;
          padding-top: 60px;
          border-top: 1px solid #c8c4b8;
          position: relative;
          z-index: 1;
        }

        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 300;
          color: #1a1a14;
          line-height: 1;
        }

        .stat-label {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #6b6b4a;
          text-transform: uppercase;
          margin-top: 12px;
        }

        /* ── FEATURES ─────────────────────────── */
        .land-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid #c8c4b8;
        }

        .feature-cell {
          padding: 80px 56px;
          border-right: 1px solid #c8c4b8;
          transition: background-color 0.4s ease, color 0.4s ease;
          cursor: crosshair;
        }

        .feature-cell:last-child { border-right: none; }

        .feature-cell:hover {
          background-color: #1a1a14;
        }

        .feature-num {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #a08c6e;
          margin-bottom: 32px;
          transition: color 0.4s ease;
        }

        .feature-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 400;
          color: #1a1a14;
          margin-bottom: 24px;
          transition: color 0.4s ease;
        }

        .feature-rule {
          width: 40px;
          height: 1px;
          background: #1a1a14;
          margin-bottom: 24px;
          transition: background 0.4s ease;
        }

        .feature-desc {
          font-size: 12px;
          color: #6b6b4a;
          line-height: 1.85;
          transition: color 0.4s ease;
        }

        .feature-cell:hover .feature-num,
        .feature-cell:hover .feature-label,
        .feature-cell:hover .feature-desc {
          color: #ECEAE4;
        }

        .feature-cell:hover .feature-rule {
          background: #ECEAE4;
        }

        /* ── FOOTER ───────────────────────────── */
        .land-footer {
          padding: 40px 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #1a1a14;
          color: #ECEAE4;
        }

        .footer-note {
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #a08c6e;
          text-transform: uppercase;
        }

        .footer-beta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #a08c6e;
          text-transform: uppercase;
        }

        .beta-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ECEAE4;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .land-hero, .land-features { grid-template-columns: 1fr; }
          .hero-left { border-right: none; border-bottom: 1px solid #c8c4b8; }
          .feature-cell { border-right: none; border-bottom: 1px solid #c8c4b8; }
          .feature-cell:last-child { border-bottom: none; }
        }
      `}</style>

      <div className={`land-wrap ${visible ? "visible" : ""}`}>

        {/* NAV */}
        <nav className="land-nav">
          <p className="nav-brand">Business Analytics</p>
          <div className="nav-actions">
            <button className="btn-outline" onClick={() => navigate("/register")}>Register</button>
            <button className="btn-fill" onClick={() => navigate("/login")}>Login</button>
          </div>
        </nav>

        {/* MARQUEE */}
        <div className="marquee-container">
          <div className="marquee-content">
            DATA INTELLIGENCE &nbsp; // &nbsp; BENCHMARK PERFORMANCE &nbsp; // &nbsp; OPERATIONAL BLIND SPOTS &nbsp; // &nbsp; ACTIONABLE STRATEGIES &nbsp; // &nbsp; DATA INTELLIGENCE &nbsp; // &nbsp; BENCHMARK PERFORMANCE &nbsp; // &nbsp; OPERATIONAL BLIND SPOTS &nbsp; // &nbsp; ACTIONABLE STRATEGIES &nbsp; // &nbsp;
          </div>
        </div>

        {/* HERO */}
        <div className="land-hero">
          <div className="hero-left">
            <div className="animate-on-scroll">
              <p className="hero-eyebrow">
                <span className="eyebrow-line" />
                Data Intelligence Platform
              </p>
              <h1 className="hero-title">
                Insight<br />
                <em>Refined.</em>
              </h1>
            </div>
            <div className="hero-cta-row animate-on-scroll delay-1">
              <button className="btn-hero-primary" onClick={() => navigate("/register")}>
                Get Started
              </button>
              <button className="btn-hero-ghost" onClick={() => navigate("/login")}>
                Sign In <span className="ghost-arrow">→</span>
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="decorative-circle"></div>
            <div className="animate-on-scroll">
              <p className="hero-right-tag">What we do</p>
              <p className="hero-desc">
                Upload your <strong>past</strong> and <strong>target</strong> data —
                we surface the gaps, risks, and opportunities your spreadsheets bury.
              </p>
            </div>
            <div className="hero-stat-row animate-on-scroll delay-2">
              <div className="hero-stat">
                <p className="stat-num">04</p>
                <p className="stat-label">Insight Dimensions</p>
              </div>
              <div className="hero-stat">
                <p className="stat-num">PDF</p>
                <p className="stat-label">Native Format</p>
              </div>
              <div className="hero-stat">
                <p className="stat-num">AI</p>
                <p className="stat-label">Powered Analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="land-features">
          {features.map((f, i) => (
            <div className={`feature-cell animate-on-scroll delay-${i}`} key={f.num}>
              <p className="feature-num">{f.num}</p>
              <p className="feature-label">{f.label}</p>
              <div className="feature-rule" />
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="land-footer">
          <p className="footer-note">© 2026 Business Analytics</p>
          <div className="footer-beta">
            <span className="beta-dot" />
            Currently in build — expect errors
          </div>
        </footer>

      </div>
    </>
  );
}