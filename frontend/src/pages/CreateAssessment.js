import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function CreateAssessment() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const createdBy = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Protect this page - only admins can access
    if (userRole && userRole.toLowerCase() !== "admin") {
      navigate("/dashboard");
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5002/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          description,
          subject,
          due_date: dueDate,
          created_by: createdBy
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Assessment created successfully");
      setTitle("");
      setDescription("");
      setSubject("");
      setDueDate("");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <AppLayout
      title="Create Assessment"
      subtitle="Add a new assessment for students"
      backTo="/dashboard"
    >
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Assessment Title *</label>
        <input
          style={styles.input}
          placeholder="e.g., Database Design Project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label style={styles.label}>Description</label>
        <textarea
          style={styles.textarea}
          placeholder="Assessment description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label style={styles.label}>Subject *</label>
        <input
          style={styles.input}
          placeholder="e.g., ICT, Mathematics"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <label style={styles.label}>Due Date *</label>
        <input
          type="datetime-local"
          style={styles.input}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.createBtn}>
            Create Assessment
          </button>
        </div>
      </form>
    </AppLayout>
  );
}

const styles = {
  label: {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
    marginTop: "18px",
    color: "#111827",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  buttonRow: {
    marginTop: "24px",
  },
  createBtn: {
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};