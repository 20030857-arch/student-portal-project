import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userRole", data.user.role);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoBox}>
        <div style={styles.logoIcon}>EMS</div>
        <span style={styles.logoText}>EMS</span>
      </div>

      <h1 style={styles.title}>Welcome Back</h1>
      <p style={styles.subtitle}>Sign in to your account</p>

      <div style={styles.card}>
        <p style={styles.label}>Email Address</p>
        <input
          type="email"
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p style={styles.label}>Password</p>
        <input
          type="password"
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <div style={styles.demo}>
          Admin: admin@test.com / admin123
          <br />
          Student: student@test.com / student123
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "80px",
    background: "#f8fafc",
    minHeight: "100vh",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    background: "#2563eb",
    color: "white",
    padding: "10px",
    borderRadius: "12px",
  },
  logoText: {
    fontWeight: "700",
    fontSize: "20px",
  },
  title: {
    marginTop: "20px",
    fontSize: "28px",
    fontWeight: "700",
  },
  subtitle: {
    color: "#64748b",
    marginBottom: "30px",
  },
  card: {
    background: "white",
    width: "380px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    marginTop: "15px",
    color: "#334155",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    outline: "none",
    boxSizing: "border-box",
  },
  loginBtn: {
    width: "100%",
    padding: "14px",
    background: "#020617",
    color: "white",
    border: "none",
    borderRadius: "10px",
    marginTop: "15px",
    cursor: "pointer",
    fontWeight: "600",
  },
  demo: {
    marginTop: "15px",
    background: "#eef2ff",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "13px",
    textAlign: "center",
    color: "#1e3a8a",
  },
};