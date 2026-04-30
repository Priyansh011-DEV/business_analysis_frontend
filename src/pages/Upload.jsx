import { useState } from "react";
import { uploadAndCompare } from "../api/analysis";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [pastFile, setPastFile] = useState(null);
  const [targetFile, setTargetFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("Initializing...");

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!pastFile || !targetFile) {
      alert("Please upload both files");
      return;
    }

    try {
      setLoading(true);

      setStep("Parsing documents...");
      setTimeout(() => setStep("Comparing datasets..."), 1200);
      setTimeout(() => setStep("Generating insights..."), 2400);

      const res = await uploadAndCompare(pastFile, targetFile);

      localStorage.setItem("analysis", JSON.stringify(res.data));

      navigate("/result");

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .upload-wrap {
          min-height: 100vh;
          background: #ECEAE4;
          font-family: 'DM Mono', monospace;
          display: flex;
          flex-direction: column;
        }

        .upload-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 64px;
          border-bottom: 1px solid #c8c4b8;
        }

        .upload-brand {
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #a08c6e;
          text-transform: uppercase;
        }

        .btn-back {
          background: transparent;
          border: none;
          color: #7a7660;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .upload-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .upload-left {
          padding: 80px 64px;
          border-right: 1px solid #c8c4b8;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .upload-left-top {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }

        .upload-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 46px;
          color: #6b6b4a;
          margin-bottom: 28px;
        }

        .upload-desc {
          font-size: 12px;
          color: #7a7660;
          line-height: 1.8;
        }

        /* Instructions panel */
        .instructions-panel {
          margin-top: auto;
          padding-top: 40px;
          border-top: 1px solid #d8d4ca;
        }

        .instructions-label {
          font-size: 8px;
          letter-spacing: 0.28em;
          color: #a08c6e;
          text-transform: uppercase;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .instructions-label::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #d8d4ca;
        }

        .instructions-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .instructions-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 10px;
          color: #7a7660;
          line-height: 1.6;
          letter-spacing: 0.04em;
        }

        .instr-num {
          font-size: 8px;
          color: #a08c6e;
          letter-spacing: 0.1em;
          min-width: 14px;
          padding-top: 1px;
          opacity: 0.8;
        }

        .instr-beta-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 2px;
        }

        .beta-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #b8a882;
          display: inline-block;
          animation: pulse-dot 2.4s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        .upload-right {
          padding: 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .file-zone {
          border: 1px solid #c8c4b8;
          padding: 28px;
          margin-bottom: 20px;
          position: relative;
          transition: border-color 0.2s ease;
        }

        .file-zone:hover {
          border-color: #a09a8a;
        }

        .file-zone.has-file {
          border-color: #6b6b4a;
        }

        .file-zone input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .file-zone-text {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #7a7660;
        }

        .file-zone.has-file .file-zone-text {
          color: #5a5a3a;
        }

        .btn-analyze {
          padding: 14px;
          background: #1a1a14;
          color: #ECEAE4;
          border: none;
          cursor: pointer;
          letter-spacing: 0.2em;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          transition: background 0.2s ease;
        }

        .btn-analyze:hover:not(:disabled) {
          background: #2e2e22;
        }

        .btn-analyze:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Loader overlay */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(236, 234, 228, 0.96);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .loader-box {
          text-align: center;
        }

        .loader-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          color: #6b6b4a;
        }

        .loader-step {
          font-size: 11px;
          color: #7a7660;
          letter-spacing: 0.12em;
        }

        .loader-line {
          width: 220px;
          height: 1px;
          background: #c8c4b8;
          margin: 18px auto;
          position: relative;
          overflow: hidden;
        }

        .loader-line::after {
          content: "";
          position: absolute;
          width: 60px;
          height: 100%;
          background: #6b6b4a;
          animation: slide 1.2s infinite;
        }

        @keyframes slide {
          0% { left: -60px; }
          100% { left: 220px; }
        }
      `}</style>

      {loading && (
        <div className="overlay">
          <div className="loader-box">
            <p className="loader-title">Analyzing Data</p>
            <div className="loader-line"></div>
            <p className="loader-step">{step}</p>
          </div>
        </div>
      )}

      <div className="upload-wrap">
        <header className="upload-header">
          <p className="upload-brand">Business Analytics</p>
          <button className="btn-back" onClick={() => navigate("/home")}>
            Home
          </button>
        </header>

        <div className="upload-body">
          <div className="upload-left">
            <div className="upload-left-top">
              <h1 className="upload-title">Compare Business Data</h1>
              <p className="upload-desc">
                Upload past and target data to generate insights.
              </p>
            </div>

            {/* Instructions panel — bottom-left */}
            <div className="instructions-panel">
              <p className="instructions-label">Before you upload</p>
              <ul className="instructions-list">
                <li>
                  <span className="instr-num">01</span>
                  <span>Upload files in <strong style={{color: '#6b6b4a', fontWeight: 400}}>PDF format only</strong> — no Excel, CSV, or Word docs.</span>
                </li>
                <li>
                  <span className="instr-num">02</span>
                  <span>Use <strong style={{color: '#6b6b4a', fontWeight: 400}}>plain text PDFs</strong> — avoid scanned pages or table-heavy layouts for best results.</span>
                </li>
                <li>
                  <span className="instr-num">03</span>
                  <span>
                    <span className="instr-beta-badge">
                      <span className="beta-dot"></span>
                      <span>Product is currently in build — errors may occur.</span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="upload-right">
            <div className={`file-zone ${pastFile ? "has-file" : ""}`}>
              <input
                type="file"
                accept=".pdf"
                disabled={loading}
                onChange={(e) => setPastFile(e.target.files[0])}
              />
              <span className="file-zone-text">
                {pastFile ? pastFile.name : "Upload Past Data"}
              </span>
            </div>

            <div className={`file-zone ${targetFile ? "has-file" : ""}`}>
              <input
                type="file"
                accept=".pdf"
                disabled={loading}
                onChange={(e) => setTargetFile(e.target.files[0])}
              />
              <span className="file-zone-text">
                {targetFile ? targetFile.name : "Upload Target Data"}
              </span>
            </div>

            <button
              className="btn-analyze"
              disabled={loading}
              onClick={handleUpload}
            >
              {loading ? "Processing..." : "Run Analysis"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}