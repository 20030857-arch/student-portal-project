import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

export default function AssessmentList() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Protect this page - only students can access
    if (userRole && userRole.toLowerCase() !== "student") {
      navigate("/dashboard");
      return;
    }

    const fetchAssessments = async () => {
      try {
        if (!studentId) {
          console.error("No studentId found in localStorage");
          setAssessments([]);
          setLoading(false);
          return;
        }

        console.log("Fetching assessments for studentId:", studentId);
        const res = await fetch(`http://localhost:5002/api/submissions/student/${studentId}`);
        
        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }

        const data = await res.json();
        console.log("Assessment API response:", data);

        if (Array.isArray(data) && data.length > 0) {
          setAssessments(data);
          console.log(`Successfully loaded ${data.length} assessments`);
        } else if (Array.isArray(data)) {
          console.warn("API returned empty array");
          setAssessments([]);
        } else {
          console.error("Expected array but got:", typeof data, data);
          setAssessments([]);
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [studentId, userRole, navigate]);

  return (
    <AppLayout
      title="My Assessments"
      subtitle="View and submit your available assessments"
      backTo="/dashboard"
    >
      {loading ? (
        <p style={styles.loadingText}>Loading assessments...</p>
      ) : assessments.length === 0 ? (
        <p style={styles.emptyText}>No assessments found.</p>
      ) : (
        assessments.map((item) => (
          <div key={item.id} style={styles.assessmentCard}>
            <div style={styles.cardTopRow}>
              <div style={styles.cardLeft}>
                <h3 style={styles.assessmentTitle}>{item.title}</h3>
                <p style={styles.subjectText}>{item.subject}</p>
              </div>
              <div style={styles.rightStatusBox}>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      item.status === "graded"
                        ? "#dbeafe"
                        : item.status === "submitted"
                        ? "#f3f4f6"
                        : "#fef3c7",
                    color:
                      item.status === "graded"
                        ? "#2563eb"
                        : item.status === "submitted"
                        ? "#6b7280"
                        : "#92400e",
                  }}
                >
                  {(item.status || "pending").toUpperCase()}
                </span>
              </div>
            </div>

            <p style={styles.description}>{item.description}</p>

            <div style={styles.infoRow}>
              <span style={styles.infoText}>Due: {item.due_date}</span>
            </div>

            <div style={styles.extraRow}>
              {item.marks !== null && item.marks !== undefined && (
                <span style={styles.markBadge}>Marks: {item.marks}</span>
              )}
            </div>

            {item.feedback && (
              <div style={styles.feedbackBox}>
                <strong>Feedback:</strong> {item.feedback}
              </div>
            )}

            {item.status !== "submitted" && item.status !== "graded" && (
              <button
                style={styles.submitBtn}
                onClick={() => navigate(`/submit/${item.id}`)}
              >
                Submit Assessment
              </button>
            )}
          </div>
        ))
      )}
    </AppLayout>
  );
}

const styles = {
  loadingText: {
    fontSize: "16px",
    color: "#6b7280",
    textAlign: "center",
    padding: "20px",
  },
  emptyText: {
    fontSize: "16px",
    color: "#6b7280",
    textAlign: "center",
    padding: "20px",
  },
  assessmentCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "22px",
    padding: "28px",
    marginBottom: "22px",
  },
  cardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "14px",
    flexWrap: "wrap",
  },
  cardLeft: {
    flex: 1,
    minWidth: "200px",
  },
  assessmentTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "10px",
    margin: "0 0 10px 0",
  },
  subjectText: {
    fontSize: "18px",
    color: "#4b5563",
    marginBottom: "16px",
    margin: "0",
  },
  description: {
    fontSize: "16px",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "16px",
  },
  infoRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "18px",
    marginBottom: "14px",
  },
  infoText: {
    color: "#4b5563",
    fontSize: "16px",
  },
  extraRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },
  markBadge: {
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "15px",
    fontWeight: "600",
  },
  feedbackBox: {
    backgroundColor: "#eff6ff",
    border: "1px solid #dbeafe",
    padding: "16px",
    borderRadius: "14px",
    color: "#374151",
    fontSize: "16px",
    marginBottom: "16px",
  },
  rightStatusBox: {
    display: "flex",
    alignItems: "center",
  },
  statusBadge: {
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#020617",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
};
