import { useState, useEffect, useRef } from "react";
import { loginUser } from "../api/Auth";
import { useNavigate } from "react-router-dom";

const sentences = [
  "Comparing business performance against targets",
  "Identifying hiring gaps with precision",
  "Transforming KPIs into actionable insights",
  "Data-driven decisions for growth strategy",
  "Benchmarking teams across business units",
];

function useTypewriter(sentences) {
  const [displayed, setDisplayed] = useState("");
  const sIdx = useRef(0);
  const cIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;

    function tick() {
      const sentence = sentences[sIdx.current];

      if (!deleting.current && cIdx.current <= sentence.length) {
        setDisplayed(sentence.slice(0, cIdx.current));
        cIdx.current++;
        timeout = setTimeout(tick, cIdx.current === sentence.length + 1 ? 1800 : 55);
      } else if (deleting.current && cIdx.current >= 0) {
        setDisplayed(sentence.slice(0, cIdx.current));
        cIdx.current--;
        timeout = setTimeout(tick, 30);
      } else {
        deleting.current = !deleting.current;
        if (!deleting.current) {
          sIdx.current = (sIdx.current + 1) % sentences.length;
          cIdx.current = 0;
        }
        timeout = setTimeout(tick, 200);
      }
    }

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, []);

  return displayed;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const typed = useTypewriter(sentences);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      const token = res.token;

      if (!token) {
        alert("No token received from backend");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #3a3a2a;
          color: #d4d0c0;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          padding: 10px 0;
          outline: none;
          margin-bottom: 20px;
        }

        .login-input::placeholder {
          color: #3a3a2a;
        }

        .login-input:focus {
          border-bottom-color: #6b6b4a;
        }

        .login-btn {
          width: 100%;
          margin-top: 16px;
          padding: 14px;
          background: #6b6b4a;
          border: none;
          color: #ECEAE4;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .login-btn:hover {
          background: #7a7a55;
        }

        .register-link {
          color: #a08c6e;
          cursor: pointer;
        }

        .cursor-blink {
          display: inline-block;
          width: 1px;
          height: 14px;
          background: #6b6b4a;
          margin-left: 2px;
          animation: blink 0.75s infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>

      <div style={styles.container}>
        {/* LEFT */}
        <div style={styles.left}>
          <p style={styles.brandMark}>Business Analytics</p>

          <h1 style={styles.title}>
            Insight <br />
            <span style={{ color: "#4a4a30" }}>Refined.</span>
          </h1>

          <div style={styles.line} />

          <p style={styles.text}>
            {typed}
            <span className="cursor-blink" />
          </p>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <p style={styles.label}>Secure Access</p>

          <input
            className="login-input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Enter
          </button>

          <p style={styles.register}>
            No account?{" "}
            <span onClick={() => navigate("/register")} className="register-link">
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#ECEAE4",
  },

  left: {
    flex: 1.1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
    borderRight: "1px solid #c8c4b8",
  },

  brandMark: {
    position: "absolute",
    top: 36,
    left: 60,
    fontSize: "25px",
    color: "#a08c6e",
  },

  title: {
    fontSize: 60,
    color: "#6b6b4a",
    marginBottom: 30,
  },

  line: {
    width: 40,
    height: 1,
    background: "#a08c6e",
    marginBottom: 20,
  },

  text: {
    fontSize: 20,
    color: "#7a7660",
  },

  right: {
    flex: 0.9,
    background: "#1a1a14",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
  },

  label: {
    marginBottom: 20,
    color: "#6b6b4a",
  },

  register: {
    marginTop: 20,
    color: "#4a4a34",
  },
};