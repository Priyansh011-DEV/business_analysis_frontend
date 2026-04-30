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
      setTimeout(() => setVisible(true), 80);
    }
  }, []);

  if (!data) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#ECEAE4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        color: "#7a7660",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
      }}>
        No data found
      </div>
    );
  }

  const cards = [
    { num: "01", label: "Insight",        value: data.insight },
    { num: "02", label: "Risk",           value: data.risk },
    { num: "03", label: "Recommendation", value: data.recommendation },
    { num: "04", label: "Explanation",    value: data.explanation },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .result-wrap {
          min-height: 100vh;
          background: #ECEAE4;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .result-wrap.is-visible {
          opacity: 1;
        }

        /* ── HEADER ─────────────────────────────── */
        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 64px;
          border-bottom: 1px solid #c8c4b8;
          position: sticky;
          top: 0;
          background: #ECEAE4;
          z-index: 10;
        }

        .result-brand {
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #a08c6e;
          text-transform: uppercase;
        }

        .result-header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-ghost {
          background: transparent;
          border: 1px solid #c8c4b8;
          color: #7a7660;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-ghost:hover {
          border-color: #6b6b4a;
          color: #6b6b4a;
        }

        .btn-solid {
          background: #1a1a14;
          border: none;
          color: #ECEAE4;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 9px 20px;
          cursor: pointer;
          transition: background 0.25s;
        }
        .btn-solid:hover { background: #2e2e20; }

        /* ── LAYOUT ─────────────────────────────── */
        .result-body {
          display: grid;
          grid-template-columns: 320px 1fr;
          flex: 1;
          min-height: calc(100vh - 85px);
        }

        /* ── SIDEBAR ────────────────────────────── */
        .result-sidebar {
          padding: 72px 52px 72px 64px;
          border-right: 1px solid #c8c4b8;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: sticky;
          top: 85px;
          height: calc(100vh - 85px);
        }

        .sidebar-top {}

        .result-eyebrow {
          font-size: 9px;
          letter-spacing: 0.32em;
          color: #a08c6e;
          text-transform: uppercase;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .eyebrow-tick {
          width: 20px;
          height: 1px;
          background: #a08c6e;
          display: inline-block;
        }

        .result-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 54px;
          font-weight: 300;
          color: #6b6b4a;
          line-height: 1.05;
          letter-spacing: 0.01em;
          margin-bottom: 32px;
        }

        .result-title em {
          font-style: italic;
          color: #4a4a30;
          font-weight: 400;
        }

        .sidebar-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, #c8c4b8 60%, transparent);
          margin-bottom: 28px;
        }

        .sidebar-meta {
          font-size: 10px;
          color: #a09a8a;
          line-height: 1.9;
          letter-spacing: 0.04em;
        }

        .sidebar-meta strong {
          color: #6b6b4a;
          font-weight: 400;
        }

        /* Section count */
        .sidebar-bottom {
          padding-bottom: 8px;
        }

        .result-count {
          font-size: 72px;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          color: #d8d4ca;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .result-count-label {
          font-size: 9px;
          letter-spacing: 0.24em;
          color: #b0a898;
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* ── CARDS ──────────────────────────────── */
        .result-content {
          padding: 0;
        }

        .result-card {
          padding: 48px 64px;
          border-bottom: 1px solid #c8c4b8;
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 32px;
          align-items: start;
          transition: background 0.2s ease;
        }

        .result-card:first-child {
          border-top: none;
        }

        .result-card:hover {
          background: rgba(107, 107, 74, 0.03);
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 6px;
        }

        .card-num {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #c8c4b8;
        }

        .card-label {
          font-size: 8px;
          letter-spacing: 0.28em;
          color: #6b6b4a;
          text-transform: uppercase;
        }

        .card-label-line {
          width: 20px;
          height: 1px;
          background: #c8c4b8;
          margin-top: 4px;
        }

        .card-body {}

        .card-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: #4a4a30;
          margin-bottom: 14px;
          letter-spacing: 0.01em;
          line-height: 1.2;
        }

        .card-value {
          font-size: 14px;
          color: #5a5a44;
          line-height: 1.9;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        /* Stagger-in animation */
        .result-card {
          opacity: 0;
          transform: translateY(12px);
          animation: fadeUp 0.5s ease forwards;
        }

        .result-card:nth-child(1) { animation-delay: 0.1s; }
        .result-card:nth-child(2) { animation-delay: 0.22s; }
        .result-card:nth-child(3) { animation-delay: 0.34s; }
        .result-card:nth-child(4) { animation-delay: 0.46s; }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className={`result-wrap ${visible ? "is-visible" : ""}`}>

        {/* HEADER */}
        <header className="result-header">
          <p className="result-brand">Business Analytics</p>
          <div className="result-header-actions">
            <button className="btn-ghost" onClick={() => navigate("/home")}>Home</button>
            <button className="btn-solid" onClick={() => navigate("/upload")}>Run Again</button>
          </div>
        </header>

        <div className="result-body">

          {/* SIDEBAR */}
          <div className="result-sidebar">
            <div className="sidebar-top">
              <p className="result-eyebrow">
                <span className="eyebrow-tick" />
                Analysis Complete
              </p>
              <h1 className="result-title">
                Generated<br />
                <em>Insights</em>
              </h1>
              <div className="sidebar-rule" />
              <p className="sidebar-meta">
                Four dimensions reviewed:<br />
                <strong>Insight · Risk</strong><br />
                <strong>Recommendation · Explanation</strong>
              </p>
            </div>

            <div className="sidebar-bottom">
              <p className="result-count">04</p>
              <p className="result-count-label">Sections</p>
            </div>
          </div>

          {/* CARDS */}
          <div className="result-content">
            {cards.map((c) => (
              <div className="result-card" key={c.label}>
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