import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeLanguageContext";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const { themeStyles } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileData, setProfileData] = useState({
    name: localStorage.getItem("userName") || "John Doe",
    email: localStorage.getItem("userEmail") || "student@example.com",
    role: localStorage.getItem("userRole") || "Student",
    studentId: localStorage.getItem("userId") || "STU001",
    phone: localStorage.getItem("userPhone") || "+1 (555) 123-4567",
    dateOfBirth: localStorage.getItem("userDOB") || "1995-06-15",
    department: localStorage.getItem("userDepartment") || "Computer Science",
    enrollmentDate: localStorage.getItem("userEnrollment") || "2024-01-15",
    bio: localStorage.getItem("userBio") || "Passionate learner and student.",
    avatar: localStorage.getItem("userAvatar") || "JD",
  });

  const [editedData, setEditedData] = useState(profileData);

  useEffect(() => {
    // Load profile data from localStorage when component mounts
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileData(profile);
      setEditedData(profile);
    }
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    
    try {
      const response = await fetch(`http://localhost:5002/api/auth/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedData.name,
          email: editedData.email,
          phone: editedData.phone,
          dateOfBirth: editedData.dateOfBirth,
          department: editedData.department,
          bio: editedData.bio,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setProfileData(editedData);
        localStorage.setItem("userProfile", JSON.stringify(editedData));
        localStorage.setItem("userName", editedData.name);
        localStorage.setItem("userEmail", editedData.email);
        localStorage.setItem("userPhone", editedData.phone);
        localStorage.setItem("userDOB", editedData.dateOfBirth);
        localStorage.setItem("userDepartment", editedData.department);
        localStorage.setItem("userBio", editedData.bio);
        setEditMode(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert("Error updating profile: " + result.message);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  const userRole = localStorage.getItem("userRole");
  const isStudent = userRole?.toLowerCase() === "student";

  return (
    <AppLayout
      title="My Profile"
      subtitle="View and manage your profile information"
      backTo="/dashboard"
    >
      <div style={{ ...styles.container, color: themeStyles.text }}>
        {/* Profile Header */}
        <div
          style={{
            ...styles.profileHeader,
            background: themeStyles.cardBackground,
            borderColor: themeStyles.border,
          }}
        >
          <div style={styles.avatarSection}>
            <div
              style={{
                ...styles.largeAvatar,
                backgroundColor: "#4f46e5",
              }}
            >
              {editedData.avatar}
            </div>
            <div style={styles.headerInfo}>
              <h2 style={{ ...styles.profileName, color: themeStyles.text }}>
                {profileData.name}
              </h2>
              <p style={{ ...styles.profileRole, color: themeStyles.subText }}>
                {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
              </p>
              <p style={{ ...styles.profileEmail, color: themeStyles.subText }}>
                {profileData.email}
              </p>
            </div>
          </div>

          {!editMode && (
            <button style={styles.editBtn} onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Information */}
        <div
          style={{
            ...styles.section,
            background: themeStyles.cardBackground,
            borderColor: themeStyles.border,
          }}
        >
          <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
            Account Information
          </h3>

          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <label style={{ ...styles.label, color: themeStyles.subText }}>Student ID</label>
              <p style={{ ...styles.value, color: themeStyles.text }}>{profileData.studentId}</p>
            </div>
            <div style={styles.infoItem}>
              <label style={{ ...styles.label, color: themeStyles.subText }}>Email</label>
              <p style={{ ...styles.value, color: themeStyles.text }}>{profileData.email}</p>
            </div>
            <div style={styles.infoItem}>
              <label style={{ ...styles.label, color: themeStyles.subText }}>Phone</label>
              <p style={{ ...styles.value, color: themeStyles.text }}>{profileData.phone}</p>
            </div>
            <div style={styles.infoItem}>
              <label style={{ ...styles.label, color: themeStyles.subText }}>Date of Birth</label>
              <p style={{ ...styles.value, color: themeStyles.text }}>{profileData.dateOfBirth}</p>
            </div>
          </div>
        </div>

        {/* Academic Information (Students Only) */}
        {isStudent && (
          <div
            style={{
              ...styles.section,
              background: themeStyles.cardBackground,
              borderColor: themeStyles.border,
            }}
          >
            <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
              Academic Information
            </h3>

            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <label style={{ ...styles.label, color: themeStyles.subText }}>Department</label>
                <p style={{ ...styles.value, color: themeStyles.text }}>{profileData.department}</p>
              </div>
              <div style={styles.infoItem}>
                <label style={{ ...styles.label, color: themeStyles.subText }}>Enrollment Date</label>
                <p style={{ ...styles.value, color: themeStyles.text }}>{profileData.enrollmentDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bio Section */}
        <div
          style={{
            ...styles.section,
            background: themeStyles.cardBackground,
            borderColor: themeStyles.border,
          }}
        >
          <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
            Bio
          </h3>

          {editMode ? (
            <textarea
              value={editedData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Write your bio..."
              style={{
                ...styles.bioTextarea,
                background: themeStyles.cardBackground,
                color: themeStyles.text,
                borderColor: themeStyles.border,
              }}
            />
          ) : (
            <p style={{ ...styles.bioText, color: themeStyles.text }}>{profileData.bio}</p>
          )}
        </div>

        {/* Edit Form (when in edit mode) */}
        {editMode && (
          <div
            style={{
              ...styles.section,
              background: themeStyles.cardBackground,
              borderColor: themeStyles.border,
            }}
          >
            <h3 style={{ ...styles.sectionTitle, color: themeStyles.text, borderBottomColor: themeStyles.border }}>
              Edit Profile
            </h3>

            <div style={styles.editForm}>
              <div style={styles.formGroup}>
                <label style={{ ...styles.formLabel, color: themeStyles.text }}>Full Name</label>
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  style={{
                    ...styles.input,
                    background: themeStyles.cardBackground,
                    color: themeStyles.text,
                    borderColor: themeStyles.border,
                  }}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={{ ...styles.formLabel, color: themeStyles.text }}>Email</label>
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  style={{
                    ...styles.input,
                    background: themeStyles.cardBackground,
                    color: themeStyles.text,
                    borderColor: themeStyles.border,
                  }}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={{ ...styles.formLabel, color: themeStyles.text }}>Phone</label>
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  style={{
                    ...styles.input,
                    background: themeStyles.cardBackground,
                    color: themeStyles.text,
                    borderColor: themeStyles.border,
                  }}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={{ ...styles.formLabel, color: themeStyles.text }}>Date of Birth</label>
                <input
                  type="date"
                  value={editedData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  style={{
                    ...styles.input,
                    background: themeStyles.cardBackground,
                    color: themeStyles.text,
                    borderColor: themeStyles.border,
                  }}
                />
              </div>

              {isStudent && (
                <div style={styles.formGroup}>
                  <label style={{ ...styles.formLabel, color: themeStyles.text }}>Department</label>
                  <input
                    type="text"
                    value={editedData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    style={{
                      ...styles.input,
                      background: themeStyles.cardBackground,
                      color: themeStyles.text,
                      borderColor: themeStyles.border,
                    }}
                  />
                </div>
              )}

              <div style={styles.buttonGroup}>
                <button style={styles.saveBtn} onClick={handleSave}>
                  Save Changes
                </button>
                <button style={styles.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {saved && <div style={styles.savedMsg}>Profile updated successfully!</div>}
      </div>
    </AppLayout>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  profileHeader: {
    border: "1px solid #e5e7eb",
    borderRadius: "22px",
    padding: "28px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  largeAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "28px",
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
  },
  profileName: {
    fontSize: "26px",
    fontWeight: "800",
    marginBottom: "4px",
    margin: "0",
  },
  profileRole: {
    fontSize: "14px",
    marginBottom: "4px",
    margin: "4px 0",
  },
  profileEmail: {
    fontSize: "14px",
    margin: "0",
  },
  editBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
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
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  value: {
    fontSize: "16px",
    fontWeight: "500",
  },
  bioText: {
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0",
  },
  bioTextarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    fontFamily: "inherit",
    resize: "vertical",
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
  },
  saveBtn: {
    backgroundColor: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    flex: 1,
  },
  cancelBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    flex: 1,
  },
  savedMsg: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "20px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
  },
};
