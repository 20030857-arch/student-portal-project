import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme, useLanguage } from "../context/ThemeLanguageContext";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, updateTheme, themeStyles, t } = useTheme();
  const { language, updateLanguage } = useLanguage();
  const [role, setRole] = useState("");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    automatedReminders: true,
    twoFactorAuth: false,
    accountVisibility: "private",
    darkMode: false,
    language: "en",
  });
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setRole(savedRole.toLowerCase());
    }

    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings({
        ...parsed,
        darkMode: parsed.darkMode ?? (theme === "dark"),
        language: parsed.language ?? language,
      });
    } else {
      setSettings((prev) => ({
        ...prev,
        darkMode: theme === "dark",
        language: language || "en",
      }));
    }
  }, [theme, language]);

  const handleToggle = (key) => {
    if (key === "darkMode") {
      const newDarkMode = !settings.darkMode;
      setSettings({ ...settings, darkMode: newDarkMode });
      updateTheme(newDarkMode ? "dark" : "light");
      return;
    }

    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (key, value) => {
    if (key === "language") {
      updateLanguage(value);
      setSettings({ ...settings, language: value });
    } else {
      setSettings({ ...settings, [key]: value });
    }
  };

  const handleSave = () => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = async () => {
    const userId = localStorage.getItem("userId");

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 4) {
      alert("New password must be at least 4 characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to change password");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 2000);
    } catch (error) {
      console.error("Change password error:", error);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("userSettings");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      localStorage.clear();
      alert("Account deleted successfully.");
      navigate("/");
    }
  };

  return (
    <AppLayout
      title={t.settings}
      subtitle="Manage your account preferences and notifications"
      backTo="/dashboard"
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
            {t.notifications}
          </h3>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>{t.emailNotifications}</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Receive updates via email</p>
            </div>
            <label style={{ ...styles.toggle, backgroundColor: settings.emailNotifications ? "#22c55e" : "#d1d5db" }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle("emailNotifications")}
                style={{ display: "none" }}
              />
              <span style={{ ...styles.toggleSlider, left: settings.emailNotifications ? "25px" : "3px" }}></span>
            </label>
          </div>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>{t.smsNotifications}</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Receive updates via SMS</p>
            </div>
            <label style={{ ...styles.toggle, backgroundColor: settings.smsNotifications ? "#22c55e" : "#d1d5db" }}>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => handleToggle("smsNotifications")}
                style={{ display: "none" }}
              />
              <span style={{ ...styles.toggleSlider, left: settings.smsNotifications ? "25px" : "3px" }}></span>
            </label>
          </div>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>{t.automatedReminders}</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Get reminders for upcoming assessments</p>
            </div>
            <label style={{ ...styles.toggle, backgroundColor: settings.automatedReminders ? "#22c55e" : "#d1d5db" }}>
              <input
                type="checkbox"
                checked={settings.automatedReminders}
                onChange={() => handleToggle("automatedReminders")}
                style={{ display: "none" }}
              />
              <span style={{ ...styles.toggleSlider, left: settings.automatedReminders ? "25px" : "3px" }}></span>
            </label>
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
            {t.privacySecurity}
          </h3>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>{t.accountVisibility}</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Control who can see your profile</p>
            </div>
            <select
              value={settings.accountVisibility}
              onChange={(e) => handleChange("accountVisibility", e.target.value)}
              style={{
                ...styles.select,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>{t.twoFactorAuth}</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Extra security for your account</p>
            </div>
            <label style={{ ...styles.toggle, backgroundColor: settings.twoFactorAuth ? "#22c55e" : "#d1d5db" }}>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle("twoFactorAuth")}
                style={{ display: "none" }}
              />
              <span style={{ ...styles.toggleSlider, left: settings.twoFactorAuth ? "25px" : "3px" }}></span>
            </label>
          </div>

          <div style={styles.passwordSection}>
            <p style={{ ...styles.passwordTitle, color: themeStyles.text }}>{t.changePassword}</p>
            <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Update your password securely in the database</p>

            <input
              type="password"
              placeholder={t.currentPassword}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                ...styles.input,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            />

            <input
              type="password"
              placeholder={t.newPassword}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                ...styles.input,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            />

            <input
              type="password"
              placeholder={t.confirmNewPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                ...styles.input,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            />

            <button style={styles.secondarySaveBtn} onClick={handleChangePassword}>
              {t.changePassword}
            </button>

            {passwordSaved && (
              <div style={styles.passwordSavedMsg}>Password changed successfully!</div>
            )}
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
            {t.preferences}
          </h3>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>Theme</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Choose your interface theme</p>
            </div>
            <div style={styles.preferenceRight}>
              <label style={{ ...styles.toggle, backgroundColor: settings.darkMode ? "#22c55e" : "#d1d5db" }}>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleToggle("darkMode")}
                  style={{ display: "none" }}
                />
                <span style={{ ...styles.toggleSlider, left: settings.darkMode ? "25px" : "3px" }}></span>
              </label>
              <span style={{ ...styles.preferenceText, color: themeStyles.subText }}>
                {settings.darkMode ? t.darkMode : t.lightMode}
              </span>
            </div>
          </div>

          <div style={{ ...styles.settingItem, borderBottomColor: themeStyles.border }}>
            <div>
              <p style={{ ...styles.settingLabel, color: themeStyles.text }}>{t.language}</p>
              <p style={{ ...styles.settingDescription, color: themeStyles.subText }}>Select your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleChange("language", e.target.value)}
              style={{
                ...styles.select,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>

        {role === "admin" && (
          <div
            style={{
              ...styles.section,
              background: themeStyles.cardBackground,
              borderColor: themeStyles.border,
            }}
          >
            <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
              Administrator Settings
            </h3>

            <button 
              onClick={() => navigate("/admin/system-management")}
              style={{
                ...styles.adminCardButton,
                backgroundColor: "#dbeafe",
                borderColor: "#2563eb"
              }}
            >
              <p style={styles.infoTitleBlue}>System Management</p>
              <p style={styles.infoText}>
                Configure grading templates, email notifications, and assessment categories from the admin panel.
              </p>
              <span style={styles.cardArrow}>→</span>
            </button>

            <button 
              onClick={() => navigate("/admin/grade-management")}
              style={{
                ...styles.adminCardButton,
                backgroundColor: "#dcfce7",
                borderColor: "#22c55e"
              }}
            >
              <p style={styles.infoTitleGreen}>Grade Management</p>
              <p style={styles.infoText}>
                Customize grading scales, weightages, and automatic feedback templates for assessments.
              </p>
              <span style={styles.cardArrow}>→</span>
            </button>
          </div>
        )}

        <div
          style={{
            ...styles.section,
            background: themeStyles.cardBackground,
            borderColor: themeStyles.border,
          }}
        >
          <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
            {t.account}
          </h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button style={styles.dangerBtn} onClick={handleLogout}>
              {t.logout}
            </button>
            <button style={styles.deleteBtn} onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>

        <div style={styles.actionBar}>
          <button style={styles.saveBtn} onClick={handleSave}>
            {t.saveSettings}
          </button>
          {saved && <span style={styles.savedMsg}>Settings saved successfully!</span>}
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
    padding: "14px 0",
    borderBottom: "1px solid #f3f4f6",
    gap: "20px",
  },
  settingLabel: {
    fontSize: "15px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  settingDescription: {
    fontSize: "13px",
    margin: "0",
  },
  toggle: {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "28px",
    borderRadius: "34px",
    cursor: "pointer",
    border: "none",
    padding: 0,
    flexShrink: 0,
  },
  toggleSlider: {
    position: "absolute",
    top: "3px",
    width: "22px",
    height: "22px",
    background: "#fff",
    borderRadius: "50%",
    transition: "0.3s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "150px",
  },
  passwordSection: {
    marginTop: "20px",
    paddingTop: "20px",
  },
  passwordTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  secondarySaveBtn: {
    marginTop: "14px",
    backgroundColor: "#020617",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  passwordSavedMsg: {
    marginTop: "10px",
    color: "#22c55e",
    fontSize: "14px",
    fontWeight: "600",
  },
  preferenceRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  preferenceText: {
    fontSize: "14px",
    minWidth: "85px",
  },
  infoCardBlue: {
    background: "#f0f9ff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  infoTitleBlue: {
    color: "#1e40af",
    fontWeight: "600",
    marginBottom: "8px",
  },
  infoCardGreen: {
    background: "#f0fdf4",
    padding: "16px",
    borderRadius: "12px",
  },
  infoTitleGreen: {
    color: "#166534",
    fontWeight: "600",
    marginBottom: "8px",
  },
  infoText: {
    color: "#475569",
    fontSize: "14px",
    margin: 0,
  },
  adminCardButton: {
    width: "100%",
    textAlign: "left",
    padding: "16px",
    border: "2px solid",
    borderRadius: "12px",
    backgroundColor: "transparent",
    cursor: "pointer",
    marginBottom: "16px",
    position: "relative",
    transition: "all 0.3s ease",
  },
  cardArrow: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "20px",
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  saveBtn: {
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  dangerBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#f97316",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  savedMsg: {
    color: "#22c55e",
    fontSize: "14px",
    fontWeight: "600",
  },
};