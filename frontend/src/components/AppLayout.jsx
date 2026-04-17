import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeLanguageContext";

export default function AppLayout({ title, subtitle, backTo, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeStyles, t } = useTheme();

  const userName = localStorage.getItem("userName") || "User";
  const userRole = localStorage.getItem("userRole") || "student";

  useEffect(() => {
    // Protect routes based on role
    if (userRole.toLowerCase() === "student" && location.pathname.includes("/admin")) {
      navigate("/dashboard");
    }
    if (userRole.toLowerCase() === "admin" && location.pathname === "/assessments") {
      navigate("/dashboard");
    }
  }, [userRole, location.pathname, navigate]);

  const isActive = (path) => location.pathname === path;

  const getMenuItemStyle = (path) => ({
    ...styles.menuItem,
    ...(isActive(path) ? styles.activeMenuItem : {}),
  });

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userSettings");
    navigate("/");
  };

  return (
    <div style={{ ...styles.page, background: themeStyles.background, color: themeStyles.text }}>
      <div
        style={{
          ...styles.sidebar,
          background: themeStyles.sidebarBg,
          borderRight: `1px solid ${themeStyles.border}`,
          color: themeStyles.sidebarText,
        }}
      >
        <div>
          <div style={styles.brandBox}>
            <div style={styles.brandIcon}>EMS</div>
            <div>
              <div style={styles.brandTitle}>EMS</div>
              <div style={{ ...styles.brandSubtitle, color: themeStyles.subText }}>
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </div>
            </div>
          </div>

          <div style={styles.menuSection}>
            <button style={getMenuItemStyle("/dashboard")} onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            {userRole.toLowerCase() === "student" && (
              <>
                <button style={getMenuItemStyle("/assessments")} onClick={() => navigate("/assessments")}>
                  My Assessments
                </button>
                <button style={getMenuItemStyle("/grades")} onClick={() => navigate("/grades")}>
                  My Grades
                </button>
                <button style={getMenuItemStyle("/messages")} onClick={() => navigate("/messages")}>
                  Messages
                </button>
              </>
            )}

            {userRole.toLowerCase() === "admin" && (
              <>
                <button style={getMenuItemStyle("/admin/create")} onClick={() => navigate("/admin/create")}>
                  Add Assessment
                </button>
                <button style={getMenuItemStyle("/admin/mark")} onClick={() => navigate("/admin/mark")}>
                  Mark Assessments
                </button>
              </>
            )}

            <button style={getMenuItemStyle("/profile")} onClick={() => navigate("/profile")}>
              Profile
            </button>
          </div>
        </div>

        <div style={styles.bottomMenu}>
          <button style={getMenuItemStyle("/settings")} onClick={() => navigate("/settings")}>
            Settings
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.topBar}>
          <input
            type="text"
            placeholder="Search assessments, students..."
            style={{
              ...styles.searchInput,
              background: themeStyles.cardBackground,
              color: themeStyles.text,
              border: `1px solid ${themeStyles.border}`,
            }}
          />

          <div style={styles.topRight}>
            <div style={styles.userBox}>
              <div>
                <div style={{ ...styles.userName, color: themeStyles.text }}>{userName}</div>
                <div style={{ ...styles.userRole, color: themeStyles.subText }}>
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </div>
              </div>
              <div style={styles.avatar}>
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </div>

        {backTo && (
          <button
            style={{
              ...styles.backBtn,
              background: themeStyles.cardBackground,
              color: themeStyles.text,
              border: `1px solid ${themeStyles.border}`,
            }}
            onClick={() => navigate(backTo)}
          >
            Back
          </button>
        )}

        <h1 style={{ ...styles.heading, color: themeStyles.text }}>{title}</h1>
        {subtitle && <p style={{ ...styles.subHeading, color: themeStyles.subText }}>{subtitle}</p>}

        <div>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "280px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "24px 18px",
  },
  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
  },
  brandIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },
  brandTitle: {
    fontSize: "20px",
    fontWeight: "700",
  },
  brandSubtitle: {
    fontSize: "14px",
    marginTop: "4px",
  },
  menuSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  menuItem: {
    width: "100%",
    textAlign: "left",
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "transparent",
    color: "inherit",
    fontSize: "18px",
    cursor: "pointer",
  },
  activeMenuItem: {
    width: "100%",
    textAlign: "left",
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
  },
  bottomMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "20px",
  },
  logoutBtn: {
    width: "100%",
    textAlign: "left",
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "transparent",
    color: "#ef4444",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "24px 30px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 1,
    minWidth: "280px",
    maxWidth: "700px",
    padding: "14px 18px",
    borderRadius: "14px",
    fontSize: "16px",
    outline: "none",
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  notification: {
    fontSize: "22px",
  },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  userName: {
    fontWeight: "700",
    textAlign: "right",
  },
  userRole: {
    fontSize: "14px",
    textAlign: "right",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px",
  },
  backBtn: {
    marginBottom: "20px",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  heading: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "16px",
    marginBottom: "28px",
  },
};