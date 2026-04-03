import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section style={styles.container}>
      
      <h1 style={styles.title}>
        Smart Education <br />
        <span style={styles.highlight}>Management System</span>
      </h1>

      <p style={styles.desc}>
        Manage assessments, projects, and student submissions easily.
        Streamline your educational workflow with our intuitive platform.
      </p>

      <div style={styles.buttonGroup}>
        <button
          style={styles.primary}
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>

        <button
          style={styles.secondary}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>

    </section>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "140px 20px 80px",
    background: "linear-gradient(to bottom, #f8f9fc, #ffffff)",
  },
  title: {
    fontSize: "56px",
    fontWeight: "800",
    marginBottom: "10px",
    color: "#0f172a",
  },
  highlight: {
    color: "#4f46e5",
  },
  desc: {
    margin: "20px auto",
    maxWidth: "650px",
    color: "#64748b",
    fontSize: "18px",
    lineHeight: "1.6",
  },
  buttonGroup: {
    marginTop: "30px",
  },
  primary: {
    background: "#4f46e5",
    color: "white",
    padding: "14px 32px",
    border: "none",
    borderRadius: "12px",
    marginRight: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondary: {
    padding: "14px 32px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "white",
    fontWeight: "500",
    cursor: "pointer",
  },
};