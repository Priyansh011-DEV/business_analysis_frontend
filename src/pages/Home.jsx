import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .home-wrap {
          min-height: 100vh;
          background: #ECEAE4;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
        }

        /* HEADER */
        .home-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 64px;
          border-bottom: 1px solid #c8c4b8;
        }

        .home-brand {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #a08c6e;
          text-transform: uppercase;
        }

        .btn-logout {
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
        .btn-logout:hover {
          border-color: #6b6b4a;
          color: #6b6b4a;
        }

        /* BODY LAYOUT */
        .home-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        /* LEFT COLUMN */
        .home-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          border-right: 1px solid #c8c4b8;
        }

        .home-eyebrow {
          font-size: 9px;
          letter-spacing: 0.28em;
          color: #a08c6e;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .home-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 300;
          color: #6b6b4a;
          line-height: 1.1;
          margin-bottom: 36px;
          letter-spacing: 0.02em;
        }

        .home-title em {
          font-style: italic;
          color: #4a4a30;
          font-weight: 300;
        }

        .home-desc {
          font-size: 12px;
          color: #7a7660;
          line-height: 1.8;
          margin-bottom: 48px;
          max-width: 380px;
          font-weight: 300;
          letter-spacing: 0.03em;
        }

        .btn-primary {
          display: inline-block;
          padding: 14px 32px;
          background: #6b6b4a;
          border: none;
          color: #ECEAE4;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s;
          width: fit-content;
        }
        .btn-primary:hover { background: #7a7a55; }

        /* RIGHT COLUMN */
        .home-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 64px;
          gap: 0;
        }

        .home-section {
          padding: 32px 0;
          border-bottom: 1px solid #c8c4b8;
        }
        .home-section:first-child {
          border-top: 1px solid #c8c4b8;
        }

        .section-num {
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #c8c4b8;
          margin-bottom: 12px;
        }

        .section-label {
          font-size: 9px;
          letter-spacing: 0.22em;
          color: #6b6b4a;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .section-text {
          font-size: 12px;
          color: #7a7660;
          line-height: 1.8;
          font-weight: 300;
          letter-spacing: 0.02em;
        }

        .home-deco {
          width: 40px;
          height: 1px;
          background: #a08c6e;
          margin-bottom: 28px;
        }
      `}</style>

      <div className="home-wrap">

        {/* HEADER */}
        <header className="home-header">
          <p className="home-brand">Business Analytics</p>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </header>

        {/* BODY */}
        <div className="home-body">

          {/* LEFT */}
          <div className="home-left">
            <p className="home-eyebrow">Decision Intelligence Platform</p>
            <div className="home-deco" />
            <h1 className="home-title">
              Decision<br />
              Intelligence<br />
              <em>Platform</em>
            </h1>
            <p className="home-desc">
              Transform raw business data into structured insights. Compare past
              performance with future targets and make precise, data-driven decisions.
            </p>
            <button className="btn-primary" onClick={() => navigate("/upload")}>
              Do Analysis
            </button>
          </div>

          {/* RIGHT */}
          <div className="home-right">
            <div className="home-section">
              <p className="section-num">01</p>
              <p className="section-label">How it works</p>
              <p className="section-text">
                Upload historical data and target metrics. The system evaluates
                productivity, identifies performance gaps, and calculates optimal
                resource requirements.
              </p>
            </div>

            <div className="home-section">
              <p className="section-num">02</p>
              <p className="section-label">Why it matters</p>
              <p className="section-text">
                Avoid under-hiring or over-scaling. Make confident decisions backed
                by real performance data instead of assumptions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}