import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Translated into pure business steps
const businessProcess = [
  { step: "01", label: "Upload Historical Data" },
  { step: "02", label: "Define Strategic Targets" },
  { step: "03", label: "Surface Performance Gaps" },
  { step: "04", label: "Review Risk Analysis" },
  { step: "05", label: "Evaluate Evidence" },
  { step: "06", label: "Execute Strategy" },
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #ECEAE4;
          overflow-x: hidden;
        }

        .home-wrap {
          min-height: 100vh;
          background: #ECEAE4;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .home-wrap.visible { opacity: 1; }

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
        .delay-3 { transition-delay: 0.3s; }

        /* ── HEADER ──────────────────────────── */
        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 64px;
          border-bottom: 1px solid #c8c4b8;
          position: sticky;
          top: 0;
          background: #ECEAE4;
          z-index: 50;
        }

        .home-brand {
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.24em;
          color: #1a1a14;
          text-transform: uppercase;
          font-weight: bold;
        }

        .btn-logout {
          background: transparent;
          border: 1px solid #1a1a14;
          color: #1a1a14;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-logout:hover {
          background: #1a1a14;
          color: #ECEAE4;
        }

        /* ── HERO SECTION ────────────────────── */
        .home-hero {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          border-bottom: 1px solid #c8c4b8;
        }

        .home-left {
          padding: 100px 64px;
          border-right: 1px solid #c8c4b8;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .home-eyebrow {
          font-size: 10px;
          letter-spacing: 0.32em;
          color: #1a1a14;
          text-transform: uppercase;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .home-eyebrow::before {
          content: '';
          display: block;
          width: 40px;
          height: 1px;
          background: #1a1a14;
        }

        .home-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(60px, 6vw, 100px);
          font-weight: 300;
          color: #1a1a14;
          line-height: 0.95;
          margin-bottom: 40px;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .home-title em {
          font-style: italic;
          color: #6b6b4a;
          text-transform: lowercase;
        }

        .home-desc {
          font-size: 13px;
          color: #4a4a30;
          line-height: 1.8;
          margin-bottom: 56px;
          max-width: 480px;
          letter-spacing: 0.02em;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 18px 42px;
          background: #1a1a14;
          border: 1px solid #1a1a14;
          color: #ECEAE4;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          width: fit-content;
        }
        .btn-primary:hover {
          background: #ECEAE4;
          color: #1a1a14;
          transform: translateY(-4px);
        }

        /* ── RIGHT COLUMN (USPs) ─────────────── */
        .home-right {
          background: #1a1a14;
          color: #ECEAE4;
          padding: 100px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 48px;
        }

        .usp-block {
          border-left: 1px solid #4a4a34;
          padding-left: 24px;
          transition: border-color 0.4s ease;
        }
        .usp-block:hover {
          border-left-color: #ECEAE4;
        }

        .usp-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          margin-bottom: 12px;
          color: #ECEAE4;
        }

        .usp-desc {
          font-size: 12px;
          color: #9a9878;
          line-height: 1.6;
          letter-spacing: 0.03em;
        }

        /* ── PROCESS SECTION ───────────────── */
        .process-section {
          padding: 80px 64px;
          background: #1a1a14;
          color: #ECEAE4;
        }

        .process-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          margin-bottom: 60px;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px 40px;
        }

        .process-step {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          border-top: 1px solid #4a4a34;
          padding-top: 24px;
          transition: border-color 0.4s ease;
        }

        .process-step:hover {
          border-top-color: #ECEAE4;
        }

        .process-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          color: #6b6b4a;
          line-height: 1;
        }

        .process-label {
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          line-height: 1.4;
          color: #ECEAE4;
        }

        @media (max-width: 1024px) {
          .home-hero { grid-template-columns: 1fr; }
          .home-left { border-right: none; border-bottom: 1px solid #c8c4b8; }
          .process-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className={`home-wrap ${visible ? "visible" : ""}`}>

        {/* HEADER */}
        <header className="home-header">
          <p className="home-brand">Business Analytics</p>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </header>

        {/* HERO */}
        <div className="home-hero">
          <div className="home-left">
            <div className="animate-on-scroll">
              <p className="home-eyebrow">Decision Intelligence Platform</p>
              <h1 className="home-title">
                Analyze. <br />
                Predict. <br />
                <em>Execute.</em>
              </h1>
              <p className="home-desc">
                Stop relying on guesswork. Our platform benchmarks your past performance against future targets to surface hidden operational gaps, mitigate risks, and deliver clear, actionable business directives.
              </p>
            </div>
            <div className="animate-on-scroll delay-1">
              <button className="btn-primary" onClick={() => navigate("/upload")}>
                Start Analysis <span>→</span>
              </button>
            </div>
          </div>

          <div className="home-right">
            <div className="usp-block animate-on-scroll">
              <h3 className="usp-title">Precision Benchmarking</h3>
              <p className="usp-desc">Instantly compare historical KPIs against strategic goals to identify exactly where your business is overperforming or lagging.</p>
            </div>
            <div className="usp-block animate-on-scroll delay-1">
              <h3 className="usp-title">Identify Blindspots</h3>
              <p className="usp-desc">Proactively surface hiring gaps, resource misallocations, and operational bottlenecks before they impact your bottom line.</p>
            </div>
            <div className="usp-block animate-on-scroll delay-2">
              <h3 className="usp-title">Evidence-Based Action</h3>
              <p className="usp-desc">Transform raw spreadsheet data into clear, objective directives. Every recommendation is directly tied to your internal metrics.</p>
            </div>
          </div>
        </div>

        {/* PROCESS / WORKFLOW */}
        <div className="process-section">
          <h2 className="process-heading animate-on-scroll">The Workflow</h2>
          <div className="process-grid">
            {businessProcess.map((item, idx) => (
              <div className={`process-step animate-on-scroll delay-${idx % 3}`} key={item.step}>
                <div className="process-num">{item.step}</div>
                <div className="process-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}