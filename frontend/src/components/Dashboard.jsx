import React from "react";

export default function Dashboard() {
  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>EMS</h2>

        <ul style={styles.menu}>
          <li style={styles.active}>Dashboard</li>
          <li>Assessments</li>
          <li>Students</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.main}>

        {/* Topbar */}
        <div style={styles.topbar}>
          <h2>Dashboard</h2>
          <div>👤 User</div>
        </div>

        {/* Cards */}
        <div style={styles.cards}>

          <div style={styles.card}>
            <h3>Total Students</h3>
            <p style={styles.number}>120</p>
          </div>

          <div style={styles.card}>
            <h3>Assessments</h3>
            <p style={styles.number}>45</p>
          </div>

          <div style={styles.card}>
            <h3>Completed</h3>
            <p style={styles.number}>30</p>
          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f8fafc",
  },

  sidebar: {
    width: "220px",
    background: "#0f172a",
    color: "white",
    padding: "20px",
  },

  logo: {
    marginBottom: "30px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
    lineHeight: "40px",
  },

  active: {
    background: "#1e293b",
    padding: "8px",
    borderRadius: "8px",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  cards: {
    display: "flex",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    flex: 1,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  number: {
    fontSize: "24px",
    fontWeight: "700",
  },
};