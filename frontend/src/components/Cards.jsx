import React from "react";

export default function Cards() {
  return (
    <section style={styles.container}>
      
      <div style={styles.card}>
        <div style={styles.icon}>📄</div>
        <h3>Assessment Management</h3>
        <p>Create, assign, and track assessments easily.</p>
      </div>

      <div style={styles.card}>
        <div style={styles.icon}>👥</div>
        <h3>Role-Based Access</h3>
        <p>Different roles for students, supervisors and admins.</p>
      </div>

      <div style={styles.card}>
        <div style={styles.icon}>📊</div>
        <h3>Analytics & Tracking</h3>
        <p>Track progress and performance with insights.</p>
      </div>

    </section>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "80px 20px",
    flexWrap: "wrap",
  },

  card: {
    background: "white",
    padding: "30px",
    width: "280px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    transition: "0.3s",
    cursor: "pointer",
  },

  icon: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#4f46e5",
  },
};