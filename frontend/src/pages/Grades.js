import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeLanguageContext";

export default function Grades() {
  const navigate = useNavigate();
  const { themeStyles } = useTheme();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole || userRole.toLowerCase() !== "student") {
      navigate("/dashboard");
      return;
    }

    fetchGrades();
  }, [navigate]);

  const fetchGrades = async () => {
    try {
      const studentId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:5002/api/submissions/student/${studentId}`);
      const data = await response.json();

      const gradesData = data
        .filter((item) => item.marks !== null)
        .map((item) => ({
          id: item.id,
          title: item.title,
          subject: item.subject,
          marks: item.marks,
          feedback: item.feedback,
          submittedAt: item.submitted_at,
          dueDate: item.due_date,
        }));

      setGrades(gradesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching grades:", error);
      setLoading(false);
    }
  };

  const getGradeColor = (marks) => {
    if (marks >= 90) return "#22c55e";
    if (marks >= 80) return "#3b82f6";
    if (marks >= 70) return "#f59e0b";
    if (marks >= 60) return "#ef4444";
    return "#ef4444";
  };

  const getGradeLetter = (marks) => {
    if (marks >= 90) return "A+";
    if (marks >= 85) return "A";
    if (marks >= 80) return "B+";
    if (marks >= 75) return "B";
    if (marks >= 70) return "C+";
    if (marks >= 60) return "C";
    return "F";
  };

  const filteredGrades = filter === "all" ? grades : grades.filter((g) => g.marks >= 70);

  const averageMarks = grades.length > 0 ? Math.round(grades.reduce((sum, g) => sum + g.marks, 0) / grades.length) : 0;

  return (
    <AppLayout title="My Grades" subtitle="View your grades and feedback">
      <div style={{ ...styles.container, color: themeStyles.text }}>
        {/* Statistics */}
        <div style={styles.statsGrid}>
          <div style={{ ...styles.statCard, backgroundColor: themeStyles.cardBackground, borderColor: themeStyles.border }}>
            <div style={styles.statLabel}>Average Score</div>
            <div style={{ ...styles.statValue, color: getGradeColor(averageMarks) }}>{averageMarks}%</div>
            <div style={styles.statDesc}>Across all assessments</div>
          </div>

          <div style={{ ...styles.statCard, backgroundColor: themeStyles.cardBackground, borderColor: themeStyles.border }}>
            <div style={styles.statLabel}>Total Graded</div>
            <div style={{ ...styles.statValue, color: "#3b82f6" }}>{grades.length}</div>
            <div style={styles.statDesc}>Completed assessments</div>
          </div>

          <div style={{ ...styles.statCard, backgroundColor: themeStyles.cardBackground, borderColor: themeStyles.border }}>
            <div style={styles.statLabel}>Best Score</div>
            <div style={{ ...styles.statValue, color: "#22c55e" }}>
              {grades.length > 0 ? Math.max(...grades.map((g) => g.marks)) : 0}%
            </div>
            <div style={styles.statDesc}>Highest achievement</div>
          </div>
        </div>

        {/* Filter */}
        <div style={styles.filterSection}>
          <button
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === "all" ? "#4f46e5" : themeStyles.cardBackground,
              color: filter === "all" ? "white" : themeStyles.text,
              borderColor: filter === "all" ? "#4f46e5" : themeStyles.border,
            }}
            onClick={() => setFilter("all")}
          >
            All Grades
          </button>
          <button
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === "passed" ? "#4f46e5" : themeStyles.cardBackground,
              color: filter === "passed" ? "white" : themeStyles.text,
              borderColor: filter === "passed" ? "#4f46e5" : themeStyles.border,
            }}
            onClick={() => setFilter("passed")}
          >
            Passed (70+)
          </button>
        </div>

        {/* Grades List */}
        {loading ? (
          <p style={{ textAlign: "center", color: themeStyles.subText }}>Loading grades...</p>
        ) : filteredGrades.length === 0 ? (
          <p style={{ textAlign: "center", color: themeStyles.subText, marginTop: "40px" }}>No grades available yet</p>
        ) : (
          <div style={styles.gradesList}>
            {filteredGrades.map((grade) => (
              <div
                key={grade.id}
                style={{ ...styles.gradeCard, backgroundColor: themeStyles.cardBackground, borderColor: themeStyles.border }}
              >
                <div style={styles.gradeHeader}>
                  <div>
                    <h3 style={{ ...styles.gradeTitle, color: themeStyles.text }}>{grade.title}</h3>
                    <p style={{ ...styles.gradeSubject, color: themeStyles.subText }}>{grade.subject}</p>
                  </div>
                  <div
                    style={{
                      ...styles.marksBadge,
                      backgroundColor: getGradeColor(grade.marks),
                    }}
                  >
                    <div style={styles.marksValue}>{grade.marks}%</div>
                    <div style={styles.gradeLetter}>{getGradeLetter(grade.marks)}</div>
                  </div>
                </div>

                {grade.feedback && (
                  <div style={styles.feedbackSection}>
                    <label style={{ ...styles.feedbackLabel, color: themeStyles.text }}>Feedback:</label>
                    <p style={{ ...styles.feedbackText, color: themeStyles.subText }}>{grade.feedback}</p>
                  </div>
                )}

                <div style={styles.gradeFooter}>
                  <span style={{ color: themeStyles.subText, fontSize: "13px" }}>
                    Submitted: {new Date(grade.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    textAlign: "center",
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "12px",
  },
  statValue: {
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "8px",
  },
  statDesc: {
    fontSize: "13px",
    opacity: "0.7",
  },
  filterSection: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
  },
  filterBtn: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.3s",
  },
  gradesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  gradeCard: {
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  gradeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  gradeTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "4px",
    margin: "0 0 4px 0",
  },
  gradeSubject: {
    fontSize: "14px",
    marginBottom: "0",
    margin: "0",
  },
  marksBadge: {
    width: "70px",
    height: "70px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  marksValue: {
    fontSize: "24px",
    fontWeight: "800",
  },
  gradeLetter: {
    fontSize: "12px",
    fontWeight: "600",
  },
  feedbackSection: {
    marginBottom: "16px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "rgba(79, 70, 229, 0.05)",
  },
  feedbackLabel: {
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  },
  feedbackText: {
    fontSize: "14px",
    margin: "0",
    lineHeight: "1.5",
  },
  gradeFooter: {
    paddingTop: "12px",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
  },
};
