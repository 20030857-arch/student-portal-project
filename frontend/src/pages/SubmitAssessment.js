import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function SubmitAssessment() {
  const [submissionText, setSubmissionText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const studentId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Protect this page - only students can access
    if (userRole && userRole.toLowerCase() !== "student") {
      navigate("/dashboard");
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submissionText.trim()) {
      alert("Please enter submission text");
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          assessment_id: parseInt(id),
          student_id: parseInt(studentId),
          submission_text: submissionText
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to submit assessment");
        return;
      }

      alert("Assessment submitted successfully");
      navigate("/assessments");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error: " + error.message);
    }
  };

  return (
    <AppLayout
      title="Submit Assessment"
      subtitle="Upload or type your assessment submission"
      backTo="/assessments"
    >
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Submission Text</label>
        <textarea
          style={styles.textarea}
          placeholder="Write your submission here..."
          value={submissionText}
          onChange={(e) => setSubmissionText(e.target.value)}
        />

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.submitBtn}>
            Submit
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
  textarea: {
    width: "100%",
    minHeight: "160px",
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
  submitBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};