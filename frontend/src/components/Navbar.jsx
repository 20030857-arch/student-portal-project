import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  // ✅ detect login page
  const isLoginPage = location.pathname.includes("/login");

  return (
    <nav style={styles.nav}>
      
      {/* Logo */}
      <div style={styles.logo}>Project Management</div>

      {/* Links */}
      <div style={styles.links}>
        <span>Features</span>
        <span>How it works</span>
        <span>Benefits</span>
      </div>

      {/* ✅ Hide buttons on login page */}
      {!isLoginPage && (
        <div>
          <button style={styles.outline}>Get Started</button>
          <button style={styles.primary}>Login / Signup</button>
        </div>
      )}

    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  logo: {
    fontWeight: "700",
    fontSize: "18px",
  },

  links: {
    display: "flex",
    gap: "20px",
    color: "#555",
  },

  primary: {
    background: "#facc15",
    padding: "10px 22px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
  },

  outline: {
    padding: "10px 22px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "white",
    marginRight: "10px",
    cursor: "pointer",
  },
};