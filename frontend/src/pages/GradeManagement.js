import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeLanguageContext";
import "./GradeManagement.css";

export default function GradeManagement() {
  const navigate = useNavigate();
  const { themeStyles, t } = useTheme();
  const [role, setRole] = useState("");
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    gradingScale: [
      { grade: "A", minMarks: 90, maxMarks: 100 },
      { grade: "B", minMarks: 80, maxMarks: 89 },
      { grade: "C", minMarks: 70, maxMarks: 79 },
      { grade: "D", minMarks: 60, maxMarks: 69 },
      { grade: "F", minMarks: 0, maxMarks: 59 },
    ],
    assessmentWeightages: [
      { name: "Class Work", weightage: 20 },
      { name: "Assignments", weightage: 30 },
      { name: "Mid-term", weightage: 20 },
      { name: "Final Exam", weightage: 30 },
    ],
    feedbackTemplates: [
      { grade: "A", template: "Excellent work! Keep up the great performance." },
      { grade: "B", template: "Good job! Work on improving specific areas." },
      { grade: "C", template: "Satisfactory. Please review the concepts covered." },
      { grade: "D", template: "Needs improvement. Seek additional help." },
      { grade: "F", template: "Requires significant improvement. Meeting recommended." },
    ],
  });

  const [editingScale, setEditingScale] = useState(null);
  const [editingWeightage, setEditingWeightage] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole?.toLowerCase() !== "admin") {
      navigate("/dashboard");
      return;
    }
    setRole(savedRole);

    const savedConfig = localStorage.getItem("gradeConfig");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, [navigate]);

  const updateGradeScale = (index, field, value) => {
    const newScale = [...config.gradingScale];
    newScale[index][field] = parseInt(value);
    setConfig({ ...config, gradingScale: newScale });
  };

  const updateWeightage = (index, field, value) => {
    const newWeightages = [...config.assessmentWeightages];
    newWeightages[index][field] = field === "weightage" ? parseInt(value) : value;
    setConfig({ ...config, assessmentWeightages: newWeightages });
  };

  const updateTemplate = (index, field, value) => {
    const newTemplates = [...config.feedbackTemplates];
    newTemplates[index][field] = value;
    setConfig({ ...config, feedbackTemplates: newTemplates });
  };

  const handleSave = () => {
    localStorage.setItem("gradeConfig", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalWeightage = config.assessmentWeightages.reduce((sum, item) => sum + item.weightage, 0);

  return (
    <AppLayout
      title="Grade Management"
      subtitle="Customize grading scales, weightages, and feedback templates"
      backTo="/settings"
    >
      <div style={{ ...styles.container, color: themeStyles.text }}>
        <div
          style={{
            ...styles.section,
            background: themeStyles.cardBackground,
            borderColor: themeStyles.border,
          }}
        >
          <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
            Grading Scale
          </h3>

          <div style={styles.gradeTable}>
            <div style={styles.tableHeader}>
              <div style={styles.tableHeaderCell}>Grade</div>
              <div style={styles.tableHeaderCell}>Minimum Marks</div>
              <div style={styles.tableHeaderCell}>Maximum Marks</div>
            </div>

            {config.gradingScale.map((gradeItem, idx) => (
              <div key={idx} style={styles.tableRow}>
                <div style={styles.tableCell}>
                  <input
                    type="text"
                    value={gradeItem.grade}
                    onChange={(e) => updateGradeScale(idx, "grade", e.target.value)}
                    style={{
                      ...styles.input,
                      background: themeStyles.cardBackground,
                      color: themeStyles.text,
                      borderColor: themeStyles.border,
                      width: "60px",
                    }}
                  />
                </div>
                <div style={styles.tableCell}>
                  <input
                    type="number"
                    value={gradeItem.minMarks}
                    onChange={(e) => updateGradeScale(idx, "minMarks", e.target.value)}
                    style={{
                      ...styles.input,
                      background: themeStyles.cardBackground,
                      color: themeStyles.text,
                      borderColor: themeStyles.border,
                      width: "100px",
                    }}
                  />
                </div>
                <div style={styles.tableCell}>
                  <input
                    type="number"
                    value={gradeItem.maxMarks}
                    onChange={(e) => updateGradeScale(idx, "maxMarks", e.target.value)}
                    style={{
                      ...styles.input,
                      background: themeStyles.cardBackground,
                      color: themeStyles.text,
                      borderColor: themeStyles.border,
                      width: "100px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            ...styles.section,
            background: themeStyles.cardBackground,
            borderColor: themeStyles.border,
          }}
        >
          <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
            Assessment Weightages
          </h3>

          <div style={{ marginBottom: "16px", fontSize: "14px", color: totalWeightage === 100 ? "#22c55e" : "#ef4444" }}>
            Total Weightage: {totalWeightage}%
          </div>

          <div style={styles.weightageList}>
            {config.assessmentWeightages.map((item, idx) => (
              <div key={idx} style={styles.weightageItem}>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateWeightage(idx, "name", e.target.value)}
                  placeholder="Assessment name"
                  style={{
                    ...styles.input,
                    background: themeStyles.cardBackground,
                    color: themeStyles.text,
                    borderColor: themeStyles.border,
                    flex: 1,
                  }}
                />
                <input
                  type="number"
                  value={item.weightage}
                  onChange={(e) => updateWeightage(idx, "weightage", e.target.value)}
                  placeholder="Weightage %"
                  style={{
                    ...styles.input,
                    background: themeStyles.cardBackground,
                    color: themeStyles.text,
                    borderColor: themeStyles.border,
                    width: "100px",
                  }}
                />
                <span style={{ fontSize: "14px", minWidth: "50px" }}>%</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            ...styles.section,
            background: themeStyles.cardBackground,
            borderColor: themeStyles.border,
          }}
        >
          <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
            Feedback Templates
          </h3>

          <div style={styles.feedbackList}>
            {config.feedbackTemplates.map((template, idx) => (
              <div key={idx} style={styles.feedbackItem}>
                <div style={styles.feedbackGrade}>Grade {template.grade}</div>
                <textarea
                  value={template.template}
                  onChange={(e) => updateTemplate(idx, "template", e.target.value)}
                  placeholder="Feedback template"
                  style={{
                    ...styles.textarea,
                    background: themeStyles.cardBackground,
                    color: themeStyles.text,
                    borderColor: themeStyles.border,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={styles.actionBar}>
          <button style={styles.saveBtn} onClick={handleSave}>
            Save Configuration
          </button>
          {saved && <span style={styles.savedMsg}>Configuration saved successfully!</span>}
        </div>
      </div>
    </AppLayout>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  section: {
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "2px solid #e5e7eb",
  },
  gradeTable: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tableHeader: {
    display: "flex",
    backgroundColor: "#f3f4f6",
    fontWeight: "600",
    borderBottom: "1px solid #e5e7eb",
  },
  tableHeaderCell: {
    flex: 1,
    padding: "12px 16px",
    textAlign: "left",
  },
  tableRow: {
    display: "flex",
    borderBottom: "1px solid #e5e7eb",
  },
  tableCell: {
    flex: 1,
    padding: "12px 16px",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  weightageList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  weightageItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  feedbackList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  feedbackItem: {
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
  },
  feedbackGrade: {
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    fontFamily: "inherit",
    minHeight: "80px",
    resize: "vertical",
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginTop: "20px",
  },
  saveBtn: {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  savedMsg: {
    color: "#22c55e",
    fontSize: "14px",
    fontWeight: "600",
  },
};
