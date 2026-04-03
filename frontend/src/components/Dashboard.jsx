import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    const users = {
      "ankitkhatri5432@gmail.com": "Ankit",
    };

    if (email && users[email]) {
      setName(users[email]);
    } else {
      setName("Student");
    }
  }, []);

  // 🔹 Dummy data (you can change later)
  const assessments = [
    { title: "Database Design Project", status: "Submitted" },
    { title: "Web Development Assignment", status: "Submitted" },
    { title: "Algorithm Analysis Report", status: "Pending" },
    { title: "Machine Learning Model", status: "Pending" },
  ];

  const total = assessments.length;
  const submitted = assessments.filter(a => a.status === "Submitted").length;
  const pending = assessments.filter(a => a.status === "Pending").length;

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2>EMS</h2>
        <ul style={styles.menu}>
          <li style={styles.active}>Dashboard</li>
          <li>My Assessments</li>
          <li>Projects</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main */}
      <div style={styles.main}>

        {/* Top */}
        <h1>Welcome back, {name}!</h1>
        <p>Here's an overview of your assessments</p>

        {/* Cards */}
        <div style={styles.cards}>

          <div style={styles.card}>
            <h4>Total Assessments</h4>
            <h2>{total}</h2>
            <p>Active assignments</p>
          </div>

          <div style={styles.card}>
            <h4>Submitted</h4>
            <h2>{submitted}</h2>
            <p>Completed submissions</p>
          </div>

          <div style={styles.card}>
            <h4>Pending</h4>
            <h2>{pending}</h2>
            <p>Awaiting submission</p>
          </div>

        </div>

        {/* My Assessments */}
        <h2 style={{ marginTop: "30px" }}>My Assessments</h2>

        {assessments.map((item, index) => (
          <div key={index} style={styles.assessmentCard}>
            <h3>{item.title}</h3>
            <span style={{
              ...styles.badge,
              background: item.status === "Submitted" ? "#d1fae5" : "#fee2e2",
              color: item.status === "Submitted" ? "green" : "red"
            }}>
              {item.status}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", height: "100vh", background: "#f8fafc" },

  sidebar: {
    width: "220px",
    background: "#0f172a",
    color: "white",
    padding: "20px"
  },

  menu: { listStyle: "none", padding: 0 },

  active: {
    background: "#1e293b",
    padding: "10px",
    borderRadius: "8px"
  },

  main: { flex: 1, padding: "20px" },

  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    flex: 1,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  assessmentCard: {
    background: "white",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  badge: {
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px"
  }
};