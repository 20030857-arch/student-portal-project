import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/dashboard" ||
    location.pathname.includes("/admin");

  if (hideNavbar) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Project Management</div>

      <div style={styles.links}>
        <span>Features</span>
        <span>How it works</span>
        <span>Benefits</span>
      </div>

      <div>
        <button style={styles.outline}>Get Started</button>
        <button style={styles.primary}>Login / Signup</button>
      </div>
    </nav>
  );
}