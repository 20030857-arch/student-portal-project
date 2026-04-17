import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeLanguageContext";

export default function MarkAssessments() {
  const navigate = useNavigate();
  const { themeStyles } = useTheme();
  const [submissions, setSubmissions] = useState([]);
  const [marksInput, setMarksInput] = useState({});
  const [feedbackInput, setFeedbackInput] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Protect this page - only admins can access
    if (userRole && userRole.toLowerCase() !== "admin") {
      navigate("/dashboard");
      return;
    }

    fetchSubmissions();
  }, [userRole, navigate]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("http://localhost:5002/api/submissions");
      const data = await res.json();

      if (Array.isArray(data)) {
        setSubmissions(data);
        // Set first assessment as selected by default
        if (data.length > 0) {
          const firstAssessment = data[0].assessment_title;
          setSelectedAssessment(firstAssessment);
        }
      } else {
        setSubmissions([]);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGrade = async (submissionId) => {
    if (!marksInput[submissionId] && marksInput[submissionId] !== 0) {
      alert("Please enter marks");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`http://localhost:5002/api/submissions/${submissionId}/mark`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marks: parseInt(marksInput[submissionId]),
          feedback: feedbackInput[submissionId] || "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to grade submission");
        setSaving(false);
        return;
      }

      alert("Marks saved successfully! Student will see this in their Grades page.");
      setMarksInput({ ...marksInput, [submissionId]: "" });
      setFeedbackInput({ ...feedbackInput, [submissionId]: "" });
      fetchSubmissions();
      setSaving(false);
    } catch (error) {
      console.error("Error grading submission:", error);
      alert("Server error");
      setSaving(false);
    }
  };

  // Group submissions by assessment
  const groupedByAssessment = submissions.reduce((acc, submission) => {
    const assessmentTitle = submission.assessment_title;
    if (!acc[assessmentTitle]) {
      acc[assessmentTitle] = [];
    }
    acc[assessmentTitle].push(submission);
    return acc;
  }, {});

  const assessmentList = Object.keys(groupedByAssessment);
  const currentSubmissions = selectedAssessment ? groupedByAssessment[selectedAssessment] : [];
  
  // Filter submissions by search term
  const filteredSubmissions = currentSubmissions.filter((submission) =>
    submission.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.submission_text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout
      title="Mark Assessments"
      subtitle="View student submissions and assign marks"
      backTo="/dashboard"
    >
      <div style={{ ...styles.container, color: themeStyles.text }}>
        {loading ? (
          <p style={{ textAlign: "center", color: themeStyles.subText }}>Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p style={{ textAlign: "center", color: themeStyles.subText, marginTop: "40px" }}>
            No submissions found.
          </p>
        ) : (
          <>
            {/* Assessment Selector */}
            <div style={styles.selectorSection}>
              <label style={{ ...styles.selectorLabel, color: themeStyles.text }}>Select Assessment:</label>
              <select
                value={selectedAssessment || ""}
                onChange={(e) => {
                  setSelectedAssessment(e.target.value);
                  setSearchTerm(""); // Reset search when assessment changes
                }}
                style={{
                  ...styles.assessmentSelect,
                  backgroundColor: themeStyles.cardBackground,
                  color: themeStyles.text,
                  borderColor: themeStyles.border,
                }}
              >
                {assessmentList.map((assessment) => (
                  <option key={assessment} value={assessment}>
                    {assessment} ({groupedByAssessment[assessment].length} submission
                    {groupedByAssessment[assessment].length !== 1 ? "s" : ""})
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div style={styles.searchSection}>
              <input
                type="text"
                placeholder="Search by student name or submission content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  backgroundColor: themeStyles.cardBackground,
                  color: themeStyles.text,
                  borderColor: themeStyles.border,
                }}
              />
              {searchTerm && (
                <button
                  style={styles.clearBtn}
                  onClick={() => setSearchTerm("")}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stats */}
            <div style={styles.statsBar}>
              <div>
                <span style={{ ...styles.statLabel, color: themeStyles.subText }}>Total Submissions:</span>
                <span style={{ ...styles.statValue, color: themeStyles.text }}>{filteredSubmissions.length}</span>
              </div>
              <div>
                <span style={{ ...styles.statLabel, color: themeStyles.subText }}>Marked:</span>
                <span style={{ ...styles.statValue, color: themeStyles.text }}>
                  {filteredSubmissions.filter((s) => s.marks !== null).length}
                </span>
              </div>
              <div>
                <span style={{ ...styles.statLabel, color: themeStyles.subText }}>Pending:</span>
                <span style={{ ...styles.statValue, color: "#f59e0b" }}>
                  {filteredSubmissions.filter((s) => s.marks === null).length}
                </span>
              </div>
            </div>

            {/* Submissions List */}
            <div style={styles.submissionsList}>
              {filteredSubmissions.length === 0 ? (
                <p style={{ textAlign: "center", color: themeStyles.subText }}>
                  {searchTerm ? "No submissions match your search" : "No submissions for this assessment"}
                </p>
              ) : (
                filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    style={{
                      ...styles.submissionCard,
                      backgroundColor: themeStyles.cardBackground,
                      borderColor: submission.marks !== null ? "#22c55e" : themeStyles.border,
                      borderLeftColor: submission.marks !== null ? "#22c55e" : "#3b82f6",
                    }}
                  >
                    {/* Header */}
                    <div style={styles.submissionHeader}>
                      <div>
                        <h3 style={{ ...styles.studentName, color: themeStyles.text }}>
                          {submission.student_name}
                        </h3>
                        <p style={{ ...styles.submissionTime, color: themeStyles.subText }}>
                          Submitted: {new Date(submission.submitted_at).toLocaleDateString()} at{" "}
                          {new Date(submission.submitted_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div style={styles.statusBadgeContainer}>
                        {submission.marks !== null ? (
                          <span style={{ ...styles.markedBadge }}>
                            Marked: {submission.marks}/100
                          </span>
                        ) : (
                          <span style={{ ...styles.pendingBadge }}>Pending</span>
                        )}
                      </div>
                    </div>

                    {/* Submission Content */}
                    <div style={{ ...styles.submissionContent, borderTopColor: themeStyles.border }}>
                      <h4 style={{ ...styles.contentTitle, color: themeStyles.text }}>Submission Content:</h4>
                      <p style={{ ...styles.submissionText, color: themeStyles.subText }}>
                        {submission.submission_text || "No text submitted"}
                      </p>
                    </div>

                    {/* Current Feedback if exists */}
                    {submission.marks !== null && submission.feedback && (
                      <div style={{ ...styles.currentFeedback, backgroundColor: "rgba(34, 197, 94, 0.1)" }}>
                        <h4 style={{ ...styles.contentTitle, color: themeStyles.text }}>Current Feedback:</h4>
                        <p style={{ ...styles.feedbackText, color: themeStyles.subText }}>
                          {submission.feedback}
                        </p>
                        <p style={{ ...styles.marksInfo, color: themeStyles.text }}>
                          <strong>Marks: {submission.marks}/100</strong>
                        </p>
                      </div>
                    )}

                    {/* Marking Form */}
                    {submission.marks === null ? (
                      <div style={styles.markingForm}>
                        <h4 style={{ ...styles.formTitle, color: themeStyles.text }}>Add Marks & Feedback:</h4>

                        <div style={styles.marksInputGroup}>
                          <label style={{ ...styles.inputLabel, color: themeStyles.text }}>Marks (out of 100):</label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Enter marks..."
                            value={marksInput[submission.id] || ""}
                            onChange={(e) =>
                              setMarksInput({ ...marksInput, [submission.id]: e.target.value })
                            }
                            style={{
                              ...styles.marksInput,
                              backgroundColor: themeStyles.cardBackground,
                              color: themeStyles.text,
                              borderColor: themeStyles.border,
                            }}
                          />
                        </div>

                        <div style={styles.feedbackInputGroup}>
                          <label style={{ ...styles.inputLabel, color: themeStyles.text }}>Feedback:</label>
                          <textarea
                            placeholder="Enter your feedback for the student..."
                            value={feedbackInput[submission.id] || ""}
                            onChange={(e) =>
                              setFeedbackInput({ ...feedbackInput, [submission.id]: e.target.value })
                            }
                            style={{
                              ...styles.feedbackInput,
                              backgroundColor: themeStyles.cardBackground,
                              color: themeStyles.text,
                              borderColor: themeStyles.border,
                            }}
                          />
                        </div>

                        <button
                          style={{
                            ...styles.saveBtn,
                            opacity: saving ? 0.6 : 1,
                            cursor: saving ? "not-allowed" : "pointer",
                          }}
                          onClick={() => handleGrade(submission.id)}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save Marks & Feedback"}
                        </button>
                      </div>
                    ) : (
                      <div style={{ ...styles.alreadyMarked, backgroundColor: "rgba(34, 197, 94, 0.05)" }}>
                        <p style={{ ...styles.markedText, color: "#22c55e", fontWeight: "600" }}>
                          Already marked - If you want to update, contact admin
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
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
  selectorSection: {
    marginBottom: "30px",
  },
  selectorLabel: {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  assessmentSelect: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    fontWeight: "500",
  },
  searchSection: {
    position: "relative",
    marginBottom: "30px",
  },
  searchInput: {
    width: "100%",
    padding: "12px 40px 12px 16px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  clearBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#9ca3af",
    padding: "0",
    width: "30px",
    height: "30px",
  },
  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "rgba(79, 70, 229, 0.05)",
    borderRadius: "12px",
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "800",
  },
  submissionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  submissionCard: {
    border: "2px solid #e5e7eb",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "12px",
    overflow: "hidden",
  },
  submissionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    borderBottom: "1px solid #e5e7eb",
  },
  studentName: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "4px",
    margin: "0 0 4px 0",
  },
  submissionTime: {
    fontSize: "13px",
    margin: "0",
  },
  statusBadgeContainer: {
    display: "flex",
    gap: "8px",
  },
  markedBadge: {
    display: "inline-block",
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  pendingBadge: {
    display: "inline-block",
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  submissionContent: {
    padding: "20px",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
  },
  contentTitle: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 10px 0",
  },
  submissionText: {
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  currentFeedback: {
    padding: "20px",
    margin: "0",
    borderTop: "1px solid rgba(34, 197, 94, 0.3)",
  },
  feedbackText: {
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 12px 0",
    fontStyle: "italic",
  },
  marksInfo: {
    fontSize: "15px",
    margin: "0",
  },
  markingForm: {
    padding: "20px",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "rgba(79, 70, 229, 0.03)",
  },
  formTitle: {
    fontSize: "14px",
    fontWeight: "700",
    marginBottom: "16px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 16px 0",
  },
  marksInputGroup: {
    marginBottom: "16px",
  },
  feedbackInputGroup: {
    marginBottom: "16px",
  },
  inputLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  marksInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "15px",
    boxSizing: "border-box",
  },
  feedbackInput: {
    width: "100%",
    minHeight: "120px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "inherit",
  },
  saveBtn: {
    width: "100%",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    padding: "14px 20px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  alreadyMarked: {
    padding: "20px",
    borderTop: "1px solid rgba(34, 197, 94, 0.3)",
    textAlign: "center",
  },
  markedText: {
    margin: "0",
  },
};