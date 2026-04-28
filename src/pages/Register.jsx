import { useState } from "react";
import { registerUser } from "../api/Auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ email, password });

      alert("Registered successfully");

      navigate("/"); // go to login
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .input {
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

        .input:focus {
          border-bottom-color: #6b6b4a;
        }

        .btn {
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

        .btn:hover {
          background: #7a7a55;
        }

        .link {
          color: #a08c6e;
          cursor: pointer;
        }
      `}</style>

      <div style={styles.container}>
        {/* LEFT */}
        <div style={styles.left}>
          <p style={styles.brandMark}>Business Analytics</p>

          <h1 style={styles.title}>
            Create <br />
            <span style={{ color: "#4a4a30" }}>Account.</span>
          </h1>

          <div style={styles.line} />

          <p style={styles.text}>
            Start using structured insights to drive smarter decisions.
          </p>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <p style={styles.label}>Register</p>

          <input
            className="input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn" onClick={handleRegister}>
            Register
          </button>

          <p style={styles.bottom}>
            Already have account?{" "}
            <span className="link" onClick={() => navigate("/")}>
              Login
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
    color: "#a08c6e",
    fontSize: "25px",
    letterSpacing: "0.15em",
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

  bottom: {
    marginTop: 20,
    color: "#4a4a34",
  },
};