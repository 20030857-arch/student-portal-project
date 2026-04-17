import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeLanguageContext";
import "./SystemManagement.css";

export default function SystemManagement() {
  const navigate = useNavigate();
  const { themeStyles, t } = useTheme();
  const [role, setRole] = useState("");
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    emailNotificationsEnabled: true,
    emailFrequency: "daily",
    assessmentCategories: ["Mathematics", "Science", "English", "History"],
    newCategory: "",
    maxSubmissionSize: 10,
    allowLateSubmission: true,
    lateSubmissionPenalty: 5,
  });

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole?.toLowerCase() !== "admin") {
      navigate("/dashboard");
      return;
    }
    setRole(savedRole);

    const savedConfig = localStorage.getItem("systemConfig");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, [navigate]);

  const handleToggle = (key) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  const handleChange = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  const addCategory = () => {
    if (config.newCategory.trim() && !config.assessmentCategories.includes(config.newCategory)) {
      setConfig({
        ...config,
        assessmentCategories: [...config.assessmentCategories, config.newCategory],
        newCategory: "",
      });
    }
  };

  const removeCategory = (category) => {
    setConfig({
      ...config,
      assessmentCategories: config.assessmentCategories.filter((c) => c !== category),
    });
  };

  const handleSave = () => {
    localStorage.setItem("systemConfig", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout
      title="System Management"
      subtitle="Configure system settings, email notifications, and assessment categories"
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
            Email Notifications
          </h3>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>Enable Email Notifications</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>
                Send email alerts to users for important events
              </p>
            </div>
            <label style={{ ...styles.toggle, backgroundColor: config.emailNotificationsEnabled ? "#22c55e" : "#d1d5db" }}>
              <input
                type="checkbox"
                checked={config.emailNotificationsEnabled}
                onChange={() => handleToggle("emailNotificationsEnabled")}
                style={{ display: "none" }}
              />
              <span style={{ ...styles.toggleSlider, left: config.emailNotificationsEnabled ? "25px" : "3px" }}></span>
            </label>
          </div>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>Email Frequency</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>How often to send digest emails</p>
            </div>
            <select
              value={config.emailFrequency}
              onChange={(e) => handleChange("emailFrequency", e.target.value)}
              style={{
                ...styles.select,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            >
              <option value="immediately">Immediately</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
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
            Assessment Categories
          </h3>

          <div style={styles.categoryList}>
            {config.assessmentCategories.map((category, idx) => (
              <div key={idx} style={styles.categoryItem}>
                <span style={{ color: themeStyles.text }}>{category}</span>
                <button
                  style={styles.removeBtn}
                  onClick={() => removeCategory(category)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={styles.addCategorySection}>
            <input
              type="text"
              placeholder="Add new category"
              value={config.newCategory}
              onChange={(e) => handleChange("newCategory", e.target.value)}
              style={{
                ...styles.input,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            />
            <button style={styles.addBtn} onClick={addCategory}>
              Add Category
            </button>
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
            Submission Settings
          </h3>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>Max Submission Size (MB)</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>
                Maximum file size allowed for submissions
              </p>
            </div>
            <input
              type="number"
              value={config.maxSubmissionSize}
              onChange={(e) => handleChange("maxSubmissionSize", parseInt(e.target.value))}
              style={{
                ...styles.numberInput,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            />
          </div>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>Allow Late Submissions</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Allow students to submit after deadline</p>
            </div>
            <label style={{ ...styles.toggle, backgroundColor: config.allowLateSubmission ? "#22c55e" : "#d1d5db" }}>
              <input
                type="checkbox"
                checked={config.allowLateSubmission}
                onChange={() => handleToggle("allowLateSubmission")}
                style={{ display: "none" }}
              />
              <span style={{ ...styles.toggleSlider, left: config.allowLateSubmission ? "25px" : "3px" }}></span>
            </label>
          </div>

          <div style={styles.settingItem}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>Late Submission Penalty (%)</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>
                Percentage marks deducted for late submissions
              </p>
            </div>
            <input
              type="number"
              value={config.lateSubmissionPenalty}
              onChange={(e) => handleChange("lateSubmissionPenalty", parseInt(e.target.value))}
              style={{
                ...styles.numberInput,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            />
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
  settingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  settingLabel: {
    fontSize: "16px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  settingDescription: {
    fontSize: "14px",
    margin: "0",
  },
  toggle: {
    width: "50px",
    height: "28px",
    borderRadius: "14px",
    cursor: "pointer",
    position: "relative",
    display: "inline-block",
  },
  toggleSlider: {
    content: '""',
    position: "absolute",
    top: "2px",
    width: "24px",
    height: "24px",
    backgroundColor: "white",
    borderRadius: "50%",
    transition: "left 0.3s ease",
  },
  select: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    cursor: "pointer",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  numberInput: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    width: "80px",
    textAlign: "center",
  },
  categoryList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px",
  },
  categoryItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    backgroundColor: "#dbeafe",
    borderRadius: "8px",
    fontSize: "14px",
  },
  removeBtn: {
    padding: "4px 8px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
  addCategorySection: {
    display: "flex",
    gap: "12px",
  },
  addBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
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
