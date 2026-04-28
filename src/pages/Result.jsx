import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("analysis");
    if (stored) {
      setData(JSON.parse(stored));
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .result-wrap {
          min-height: 100vh;
          background: #ECEAE4;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
        }

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

        .result-body {
          display: grid;
          grid-template-columns: 1fr 2fr;
          flex: 1;
        }

        /* LEFT SIDEBAR */
        .result-sidebar {
          padding: 64px 52px;
          border-right: 1px solid #c8c4b8;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          position: sticky;
          top: 85px;
          height: fit-content;
        }

        .result-eyebrow {
          font-size: 9px;
          letter-spacing: 0.28em;
          color: #a08c6e;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .result-deco {
          width: 40px;
          height: 1px;
          background: #a08c6e;
          margin-bottom: 24px;
        }

        .result-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 44px;
          font-weight: 300;
          color: #6b6b4a;
          line-height: 1.1;
          letter-spacing: 0.02em;
        }

        .result-title em {
          font-style: italic;
          color: #4a4a30;
        }

        /* RIGHT CONTENT */
        .result-content {
          padding: 64px 64px;
        }

        .result-card {
          padding: 32px 0;
          border-bottom: 1px solid #c8c4b8;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 24px;
          align-items: start;
        }
        .result-card:first-child {
          border-top: 1px solid #c8c4b8;
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-num {
          font-size: 9px;
          letter-spacing: 0.18em;
          color: #c8c4b8;
        }

        .card-label {
          font-size: 9px;
          letter-spacing: 0.22em;
          color: #6b6b4a;
          text-transform: uppercase;
        }

        .card-value {
          font-size: 13px;
          color: #4a4a34;
          line-height: 1.8;
          font-weight: 300;
          letter-spacing: 0.02em;
        }
      `}</style>

      <div className="result-wrap">

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
            <p className="result-eyebrow">Analysis Complete</p>
            <div className="result-deco" />
            <h1 className="result-title">
              Generated<br />
              <em>Insights</em>
            </h1>
          </div>

          {/* CARDS */}
          <div className="result-content">
            {cards.map((c) => (
              <div className="result-card" key={c.label}>
                <div className="card-meta">
                  <span className="card-num">{c.num}</span>
                  <span className="card-label">{c.label}</span>
                </div>
                <p className="card-value">{c.value}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}