import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("analysis");
    if (stored) {
      setData(JSON.parse(stored));
    }

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
      { threshold: 0.1 }
    );

    // Wait a brief moment for DOM to paint before observing
    setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    }, 150);

    return () => observer.disconnect();
  }, [data]); // Re-run observer if data loads

  if (!data) {
    return (
      <div className={`result-wrap empty-state ${visible ? "is-visible" : ""}`}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          .empty-state {
            min-height: 100vh;
            background: #ECEAE4;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'DM Mono', monospace;
            opacity: 0;
            transition: opacity 0.8s ease;
          }
          .empty-state.is-visible { opacity: 1; }
          .empty-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 48px;
            color: #1a1a14;
            margin-bottom: 16px;
            font-weight: 300;
          }
          .empty-desc {
            font-size: 11px;
            color: #6b6b4a;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 32px;
          }
          .btn-solid {
            background: #1a1a14;
            border: 1px solid #1a1a14;
            color: #ECEAE4;
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            padding: 14px 32px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .btn-solid:hover { background: transparent; color: #1a1a14; transform: translateY(-4px); }
        `}</style>
        <h2 className="empty-title">Awaiting Data</h2>
        <p className="empty-desc">No active analysis session found.</p>
        <button className="btn-solid" onClick={() => navigate("/upload")}>Initialize Analysis</button>
      </div>
    );
  }

  const cards = [
    { num: "01", label: "Executive Insight",        value: data.insight },
    { num: "02", label: "Risk Exposure",            value: data.risk },
    { num: "03", label: "Strategic Recommendation", value: data.recommendation },
    { num: "04", label: "Evidence & Context",       value: data.explanation },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #ECEAE4;
        }

        .result-wrap {
          min-height: 100vh;
          background: #ECEAE4;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .result-wrap.is-visible { opacity: 1; }

        /* ── ANIMATIONS ──────────────────────── */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-on-scroll.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }

        /* ── HEADER ─────────────────────────────── */
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 64px;
          border-bottom: 1px solid #1a1a14;
          position: sticky;
          top: 0;
          background: #ECEAE4;
          z-index: 50;
        }

        .result-brand {
          font-size: 13px;
          letter-spacing: 0.24em;
          color: #1a1a14;
          text-transform: uppercase;
          font-weight: bold;
        }

        .result-header-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-ghost {
          background: transparent;
          border: 1px solid #c8c4b8;
          color: #1a1a14;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-ghost:hover {
          border-color: #1a1a14;
        }

        .btn-solid {
          background: #1a1a14;
          border: 1px solid #1a1a14;
          color: #ECEAE4;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-solid:hover {
          background: transparent;
          color: #1a1a14;
        }

        /* ── LAYOUT ─────────────────────────────── */
        .result-body {
          display: grid;
          grid-template-columns: 400px 1fr;
          flex: 1;
        }

        /* ── SIDEBAR ────────────────────────────── */
        .result-sidebar {
          padding: 80px 64px;
          border-right: 1px solid #1a1a14;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 85px;
          height: calc(100vh - 85px);
          background: #1a1a14;
          color: #ECEAE4;
        }

        .result-eyebrow {
          font-size: 10px;
          letter-spacing: 0.32em;
          color: #a08c6e;
          text-transform: uppercase;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .eyebrow-tick {
          width: 30px;
          height: 1px;
          background: #a08c6e;
          display: inline-block;
        }

        .result-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px;
          font-weight: 300;
          color: #ECEAE4;
          line-height: 0.95;
          letter-spacing: -0.01em;
          margin-bottom: 40px;
          text-transform: uppercase;
        }

        .result-title em {
          font-style: italic;
          color: #a08c6e;
          font-weight: 300;
          text-transform: lowercase;
        }

        .sidebar-meta {
          font-size: 11px;
          color: #9a9878;
          line-height: 2;
          letter-spacing: 0.05em;
          border-top: 1px solid #4a4a34;
          padding-top: 32px;
        }

        .sidebar-meta strong {
          color: #ECEAE4;
          font-weight: 400;
        }

        /* Section count */
        .result-count {
          font-size: 80px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          color: #a08c6e;
          line-height: 1;
        }

        .result-count-label {
          font-size: 10px;
          letter-spacing: 0.24em;
          color: #9a9878;
          text-transform: uppercase;
          margin-top: 12px;
        }

        /* ── CARDS ──────────────────────────────── */
        .result-content {
          padding: 0;
          background: #ECEAE4;
        }

        .result-card {
          padding: 80px 64px;
          border-bottom: 1px solid #c8c4b8;
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 40px;
          align-items: start;
          transition: background-color 0.5s ease;
          cursor: crosshair;
        }

        .result-card:last-child {
          border-bottom: none;
        }

        .result-card:hover {
          background-color: #1a1a14;
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 8px;
        }

        .card-num {
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #a08c6e;
          transition: color 0.5s ease;
        }

        .card-label {
          font-size: 9px;
          letter-spacing: 0.28em;
          color: #1a1a14;
          text-transform: uppercase;
          font-weight: bold;
          transition: color 0.5s ease;
        }

        .card-label-line {
          width: 30px;
          height: 1px;
          background: #1a1a14;
          margin-top: 8px;
          transition: background 0.5s ease;
        }

        .card-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 400;
          color: #1a1a14;
          margin-bottom: 24px;
          letter-spacing: 0.01em;
          line-height: 1.1;
          transition: color 0.5s ease;
        }

        .card-value {
          font-size: 15px;
          color: #4a4a30;
          line-height: 1.9;
          font-weight: 300;
          letter-spacing: 0.02em;
          transition: color 0.5s ease;
        }

        /* Hover state overrides */
        .result-card:hover .card-num,
        .result-card:hover .card-label,
        .result-card:hover .card-heading,
        .result-card:hover .card-value {
          color: #ECEAE4;
        }

        .result-card:hover .card-label-line {
          background: #ECEAE4;
        }

        @media (max-width: 1024px) {
          .result-body { grid-template-columns: 1fr; }
          .result-sidebar {
            position: relative;
            top: 0;
            height: auto;
            border-right: none;
            border-bottom: 1px solid #1a1a14;
          }
          .result-card { grid-template-columns: 1fr; gap: 24px; }
          .card-label-line { display: none; }
          .card-meta { flex-direction: row; align-items: center; border-bottom: 1px solid #c8c4b8; padding-bottom: 16px; }
        }
      `}</style>

      <div className={`result-wrap ${visible ? "is-visible" : ""}`}>

        {/* HEADER */}
        <header className="result-header">
          <p className="result-brand">Business Analytics</p>
          <div className="result-header-actions">
            <button className="btn-ghost" onClick={() => navigate("/home")}>Dashboard</button>
            <button className="btn-solid" onClick={() => navigate("/upload")}>New Analysis</button>
          </div>
        </header>

        <div className="result-body">

          {/* SIDEBAR */}
          <div className="result-sidebar animate-on-scroll">
            <div>
              <p className="result-eyebrow">
                <span className="eyebrow-tick" />
                Analysis Complete
              </p>
              <h1 className="result-title">
                Strategic<br />
                <em>Directives</em>
              </h1>
              <p className="sidebar-meta">
                Evaluated Dimensions:<br />
                <strong>Insight · Risk</strong><br />
                <strong>Recommendation · Evidence</strong>
              </p>
            </div>

            <div className="sidebar-bottom">
              <p className="result-count">04</p>
              <p className="result-count-label">Key Deliverables</p>
            </div>
          </div>

          {/* CARDS */}
          <div className="result-content">
            {cards.map((c, i) => (
              <div className={`result-card animate-on-scroll delay-${i + 1}`} key={c.label}>
                <div className="card-meta">
                  <span className="card-num">{c.num}</span>
                  <span className="card-label">{c.label}</span>
                  <div className="card-label-line" />
                </div>
                <div className="card-body">
                  <p className="card-heading">{c.label}</p>
                  <p className="card-value">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}