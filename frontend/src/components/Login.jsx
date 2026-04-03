import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
export default function Login() {
    const navigate = useNavigate(); 
  const [role, setRole] = useState("Student");

  return (
    <div style={styles.container}>
      
      {/* Logo */}
      <div style={styles.logoBox}>
        <div style={styles.logoIcon}>🏠</div>
        <span style={styles.logoText}>EMS</span>
      </div>

      <h1 style={styles.title}>Welcome Back</h1>
      <p style={styles.subtitle}>Sign in to your account</p>

      {/* Card */}
      <div style={styles.card}>
        
        {/* Role Selection */}
        <p style={styles.label}>Select Role</p>
        <div style={styles.roleContainer}>
          {["Student", "Supervisor", "Admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                ...styles.roleButton,
                background: role === r ? "#eef2ff" : "white",
                border: role === r ? "2px solid #4f46e5" : "1px solid #ddd",
                color: role === r ? "#4f46e5" : "#555",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Email */}
        <p style={styles.label}>Email Address</p>
        <input
          type="email"
          placeholder="Enter your email"
          style={styles.input}
        />

        {/* Password */}
        <p style={styles.label}>Password</p>
        <input
          type="password"
          placeholder="Enter your password"
          style={styles.input}
        />

        {/* Button */}
        <button 
  style={styles.loginBtn}
  onClick={() => navigate("/dashboard")}  // ✅ ADD THIS
>
  Login
</button>

        {/* Footer */}
        <p style={styles.footer}>
          Don't have an account? <span style={styles.link}>Sign Up</span>
        </p>

        <div style={styles.demo}>
          Demo: Use any email and password to login
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

  roleContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  roleButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "10px",
    outline: "none",
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

  footer: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
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