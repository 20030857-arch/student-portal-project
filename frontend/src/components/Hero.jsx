import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeLanguageContext";

export default function Hero() {
  const navigate = useNavigate();
  const { themeStyles } = useTheme();

  return (
    <div style={{ ...styles.wrapper, backgroundColor: themeStyles.background }}>
      <nav style={{ ...styles.navbar, borderBottomColor: themeStyles.border, backgroundColor: themeStyles.cardBackground }}>
        <div style={styles.navContent}>
          <h2 style={{ ...styles.navLogo, color: themeStyles.text }}>EduPortal</h2>
          <button
            style={{ ...styles.navLoginBtn, color: "#4f46e5" }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </nav>

      <section style={{ ...styles.heroBanner, backgroundColor: themeStyles.background }}>
        <div style={styles.heroBannerContent}>
          <div style={styles.heroText}>
            <h1 style={{ ...styles.title, color: themeStyles.text }}>
              Smart Education <br />
              <span style={styles.highlight}>Management System</span>
            </h1>
            <p style={{ ...styles.desc, color: themeStyles.subText }}>
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
            </div>
          </div>
          <div style={styles.heroImage}>
            <svg viewBox="0 0 600 500" style={styles.bannerImg} xmlns="http://www.w3.org/2000/svg">
              <rect width="600" height="500" fill="#f0f4ff" />
              <circle cx="300" cy="150" r="80" fill="#4f46e5" opacity="0.1" />
              <circle cx="450" cy="200" r="60" fill="#4f46e5" opacity="0.15" />
              <circle cx="150" cy="300" r="70" fill="#4f46e5" opacity="0.12" />
              <rect x="100" y="220" width="400" height="200" fill="none" stroke="#4f46e5" strokeWidth="3" rx="20" opacity="0.3" />
              <text x="300" y="280" fontSize="40" fill="#4f46e5" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">Education</text>
              <text x="300" y="330" fontSize="18" fill="#7c3aed" textAnchor="middle" fontFamily="Arial, sans-serif">Learn. Manage. Succeed.</text>
            </svg>
          </div>
        </div>
      </section>

      <section style={{ ...styles.container, backgroundColor: themeStyles.background }}>
        <h2 style={{ ...styles.sectionTitle, color: themeStyles.text }}>Why Choose EduPortal?</h2>
        <div style={styles.features}>
          <div style={{ ...styles.featureCard, backgroundColor: themeStyles.cardBackground, borderColor: themeStyles.border }}>
            <svg viewBox="0 0 150 150" style={styles.featureImage} xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="70" fill="#e0e7ff" />
              <rect x="35" y="45" width="80" height="60" fill="none" stroke="#4f46e5" strokeWidth="3" rx="5" />
              <line x1="45" y1="55" x2="105" y2="55" stroke="#4f46e5" strokeWidth="2" />
              <line x1="45" y1="70" x2="105" y2="70" stroke="#4f46e5" strokeWidth="2" />
              <line x1="45" y1="85" x2="85" y2="85" stroke="#4f46e5" strokeWidth="2" />
              <circle cx="100" cy="90" r="8" fill="#4f46e5" />
            </svg>
            <h3 style={{ ...styles.featureName, color: themeStyles.text }}>Assessment Management</h3>
            <p style={{ ...styles.featureDesc, color: themeStyles.subText }}>Create, manage, and deploy assessments with powerful tools</p>
          </div>
          <div style={{ ...styles.featureCard, backgroundColor: themeStyles.cardBackground, borderColor: themeStyles.border }}>
            <svg viewBox="0 0 150 150" style={styles.featureImage} xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="70" fill="#e0e7ff" />
              <rect x="30" y="40" width="90" height="70" fill="none" stroke="#4f46e5" strokeWidth="3" rx="5" />
              <circle cx="50" cy="55" r="6" fill="#4f46e5" />
              <circle cx="75" cy="55" r="6" fill="#4f46e5" />
              <circle cx="100" cy="55" r="6" fill="#4f46e5" />
              <line x1="40" y1="75" x2="110" y2="75" stroke="#4f46e5" strokeWidth="2" />
              <line x1="40" y1="90" x2="110" y2="90" stroke="#4f46e5" strokeWidth="2" />
            </svg>
            <h3 style={{ ...styles.featureName, color: themeStyles.text }}>Real-Time Tracking</h3>
            <p style={{ ...styles.featureDesc, color: themeStyles.subText }}>Track student submissions and progress instantly</p>
          </div>
          <div style={{ ...styles.featureCard, backgroundColor: themeStyles.cardBackground, borderColor: themeStyles.border }}>
            <svg viewBox="0 0 150 150" style={styles.featureImage} xmlns="http://www.w3.org/2000/svg">
              <circle cx="75" cy="75" r="70" fill="#e0e7ff" />
              <text x="75" y="95" fontSize="50" fill="#4f46e5" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">A+</text>
              <circle cx="120" cy="50" r="15" fill="#4f46e5" opacity="0.3" />
              <circle cx="40" cy="100" r="10" fill="#4f46e5" opacity="0.2" />
            </svg>
            <h3 style={{ ...styles.featureName, color: themeStyles.text }}>Grading System</h3>
            <p style={{ ...styles.featureDesc, color: themeStyles.subText }}>Streamlined grading and comprehensive feedback</p>
          </div>
        </div>
      </section>

      <section style={{ ...styles.ctaSection, backgroundColor: "#4f46e5" }}>
        <h2 style={{ ...styles.ctaTitle, color: "#fff" }}>Ready to Transform Your Teaching?</h2>
        <p style={{ ...styles.ctaDesc, color: "rgba(255, 255, 255, 0.9)" }}>
          Join thousands of educators using EduPortal to streamline their workflow
        </p>
        <button
          style={styles.ctaButton}
          onClick={() => navigate("/login")}
        >
          Start Now - It's Free
        </button>
      </section>

      <footer style={{ ...styles.footer, borderTopColor: themeStyles.border, backgroundColor: themeStyles.cardBackground }}>
        <p style={{ ...styles.footerText, color: themeStyles.subText }}>
          Smart Education Management Platform - All Rights Reserved 2026
        </p>
      </footer>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    padding: "16px 40px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: "0",
    zIndex: "100",
  },
  navContent: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLogo: {
    fontSize: "24px",
    fontWeight: "800",
    margin: "0",
  },
  navLoginBtn: {
    background: "transparent",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.3s",
  },
  heroBanner: {
    padding: "60px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBannerContent: {
    maxWidth: "1200px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },
  heroText: {
    paddingRight: "40px",
  },
  heroImage: {
    display: "flex",
    justifyContent: "center",
  },
  bannerImg: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  },
  container: {
    padding: "80px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: "40px",
    fontWeight: "800",
    marginBottom: "60px",
  },
  title: {
    fontSize: "56px",
    fontWeight: "800",
    marginBottom: "16px",
    lineHeight: "1.2",
  },
  highlight: {
    color: "#4f46e5",
  },
  desc: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "30px",
    maxWidth: "500px",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },
  featureCard: {
    padding: "40px 24px",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s, box-shadow 0.3s",
    textAlign: "center",
  },
  featureImage: {
    width: "150px",
    height: "150px",
    borderRadius: "12px",
    objectFit: "cover",
    marginBottom: "20px",
  },
  featureName: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  featureDesc: {
    fontSize: "15px",
    margin: "0",
    lineHeight: "1.5",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "16px",
  },
  primary: {
    background: "#4f46e5",
    color: "white",
    padding: "16px 48px",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  ctaSection: {
    padding: "80px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTitle: {
    fontSize: "44px",
    fontWeight: "800",
    marginBottom: "16px",
  },
  ctaDesc: {
    fontSize: "18px",
    marginBottom: "32px",
    maxWidth: "600px",
    lineHeight: "1.6",
  },
  ctaButton: {
    background: "white",
    color: "#4f46e5",
    padding: "16px 48px",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  footer: {
    borderTop: "1px solid #e5e7eb",
    padding: "24px 20px",
    textAlign: "center",
    marginTop: "auto",
  },
  footerText: {
    fontSize: "14px",
    margin: "0",
  },
};