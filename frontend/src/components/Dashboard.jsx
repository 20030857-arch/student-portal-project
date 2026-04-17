import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [name, setName] = useState("John Smith");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    const savedName = localStorage.getItem("userName");

    if (savedRole) {
      setRole(savedRole.toLowerCase());
    }

    if (savedName) {
      setName(savedName);
    } else if (email) {
      const username = email.split("@")[0];
      const formattedName =
        username.charAt(0).toUpperCase() + username.slice(1);
      setName(formattedName);
    }
  }, []);

  const formattedRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "";

  const isActive = (path) => location.pathname === path;

  const getMenuItemStyle = (path) => ({
    ...styles.menuItem,
    ...(isActive(path) ? styles.activeMenuItem : {}),
  });

  const studentAssessments = [
    {
      title: "Database Design Project",
      subject: "Database Systems",
      description: "Design a normalized database schema for an e-commerce platform",
      dueDate: "15/04/2026",
      submittedDate: "28/03/2026",
      status: "Graded",
      marks: "85/100",
      feedback: "Excellent work on normalization!",
    },
    {
      title: "Web Development Assignment",
      subject: "Web Technologies",
      description: "Build a responsive website using React and Tailwind CSS",
      dueDate: "10/04/2026",
      submittedDate: "29/03/2026",
      status: "Submitted",
      marks: "",
      feedback: "",
    },
    {
      title: "Cloud Report",
      subject: "Cloud Computing",
      description: "Write a detailed report on cloud computing technologies",
      dueDate: "25/04/2026",
      submittedDate: "",
      status: "Pending",
      marks: "",
      feedback: "",
    },
  ];

  const adminAssessments = [
    {
      title: "Database Design Project",
      subject: "ICT",
      description: "Create assessment and manage marks for students",
      dueDate: "20/04/2026",
      status: "Open",
    },
    {
      title: "Cloud Report",
      subject: "Cloud Computing",
      description: "Review submissions and prepare marks",
      dueDate: "25/04/2026",
      status: "Open",
    },
  ];

  // Filter assessments based on search
  const filterAssessments = (assessments) => {
    return assessments.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredStudentAssessments = filterAssessments(studentAssessments);
  const filteredAdminAssessments = filterAssessments(adminAssessments);

  const total = role === "admin" ? adminAssessments.length : studentAssessments.length;

  const submitted =
    role === "admin"
      ? 0
      : studentAssessments.filter(
          (item) => item.status === "Submitted" || item.status === "Graded"
        ).length;

  const pending =
    role === "admin"
      ? 0
      : studentAssessments.filter((item) => item.status === "Pending").length;

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  const goToAssessments = () => {
    navigate("/assessments");
  };

  const goToCreateAssessment = () => {
    navigate("/admin/create");
  };

  const goToMarkAssessments = () => {
    navigate("/admin/mark");
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebar}>
        <div>
          <div style={styles.brandBox}>
            <div style={styles.brandIcon}>EMS</div>
            <div>
              <div style={styles.brandTitle}>EMS</div>
              <div style={styles.brandSubtitle}>{formattedRole}</div>
            </div>
          </div>

          <div style={styles.menuSection}>
            <button style={getMenuItemStyle("/dashboard")} onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>

            {role === "student" && (
              <button style={getMenuItemStyle("/assessments")} onClick={goToAssessments}>
                My Assessments
              </button>
            )}

            {role === "admin" && (
              <button style={getMenuItemStyle("/admin/create")} onClick={goToCreateAssessment}>
                Add Assessment
              </button>
            )}

            {role === "admin" && (
              <button style={getMenuItemStyle("/admin/mark")} onClick={goToMarkAssessments}>
                Mark Assessments
              </button>
            )}

            <button style={getMenuItemStyle("/profile")} onClick={goToProfile}>
              Profile
            </button>
          </div>
        </div>

        <div style={styles.bottomMenu}>
          <button style={styles.settingsBtn} onClick={goToSettings}>
            Settings
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.topBar}>
          <input
            type="text"
            placeholder="Search assessments, students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />

          <div style={styles.topRight}>
            <div style={styles.userBox}>
              <div>
                <div style={styles.userName}>{name}</div>
                <div style={styles.userRole}>{formattedRole}</div>
              </div>
              <div style={styles.avatar}>
                {name ? name.charAt(0).toUpperCase() : "J"}
              </div>
            </div>
          </div>
        </div>

        <h1 style={styles.heading}>Welcome back, {name}!</h1>
        <p style={styles.subHeading}>
          {role === "admin"
            ? "Here is an overview of your assessment management portal"
            : "Here's an overview of your assessments and progress"}
        </p>

        <div style={styles.cardRow}>
          <div style={styles.summaryCard}>
            <div style={styles.cardTitle}>Total Assessments</div>
            <div style={styles.cardNumber}>{total}</div>
            <div style={styles.cardText}>
              {role === "admin" ? "Created assessments" : "Active assignments"}
            </div>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.cardTitle}>
              {role === "admin" ? "To Be Marked" : "Submitted"}
            </div>
            <div style={styles.cardNumber}>
              {role === "admin" ? "2" : submitted}
            </div>
            <div style={styles.cardText}>
              {role === "admin" ? "Pending marking" : "Completed submissions"}
            </div>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.cardTitle}>
              {role === "admin" ? "Settings" : "Pending"}
            </div>
            <div style={styles.cardNumber}>
              {role === "admin" ? "2" : pending}
            </div>
            <div style={styles.cardText}>
              {role === "admin" ? "Quick admin actions" : "Awaiting submission"}
            </div>
          </div>
        </div>

        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            {role === "admin" ? "Assessment Management" : "My Assessments"}
          </h2>

          {role === "student" && (
            <button style={styles.viewAllBtn} onClick={goToAssessments}>
              View All
            </button>
          )}
        </div>

        {role === "student" &&
          filteredStudentAssessments.map((item, index) => (
            <div key={index} style={styles.assessmentCard}>
              <div style={styles.cardTopRow}>
                <div>
                  <h3 style={styles.assessmentTitle}>{item.title}</h3>
                  <p style={styles.subjectText}>{item.subject}</p>
                </div>

                <div style={styles.rightStatusBox}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor:
                        item.status === "Graded"
                          ? "#dbeafe"
                          : item.status === "Submitted"
                          ? "#f3f4f6"
                          : "#fef3c7",
                      color:
                        item.status === "Graded"
                          ? "#2563eb"
                          : item.status === "Submitted"
                          ? "#6b7280"
                          : "#92400e",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <p style={styles.description}>{item.description}</p>

              <div style={styles.infoRow}>
                <span style={styles.infoText}>Due: {item.dueDate}</span>

                {item.submittedDate && (
                  <span style={styles.greenText}>Submitted: {item.submittedDate}</span>
                )}
              </div>

              {(item.marks || item.feedback) && (
                <div style={styles.extraRow}>
                  {item.marks && <span style={styles.markBadge}>Marks: {item.marks}</span>}
                </div>
              )}

              {item.feedback && (
                <div style={styles.feedbackBox}>
                  <strong>Feedback:</strong> {item.feedback}
                </div>
              )}
            </div>
          ))}

        {role === "admin" &&
          filteredAdminAssessments.map((item, index) => (
            <div key={index} style={styles.assessmentCard}>
              <div style={styles.cardTopRow}>
                <div>
                  <h3 style={styles.assessmentTitle}>{item.title}</h3>
                  <p style={styles.subjectText}>{item.subject}</p>
                </div>

                <div style={styles.rightStatusBox}>
                  <span style={styles.openBadge}>{item.status}</span>
                </div>
              </div>

              <p style={styles.description}>{item.description}</p>

              <div style={styles.infoRow}>
                <span style={styles.infoText}>Due: {item.dueDate}</span>
              </div>

              <div style={styles.adminActionRow}>
                <button style={styles.primaryBtn} onClick={goToCreateAssessment}>
                  Edit Assessment
                </button>
                <button style={styles.secondaryBtn} onClick={goToMarkAssessments}>
                  Mark Assessment
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f7f8fa",
    fontFamily: "Arial, sans-serif",
  },

  sidebar: {
    width: "280px",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "24px 18px",
  },

  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
  },

  brandIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  brandTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
  },

  brandSubtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginTop: "4px",
  },

  menuSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  activeMenuItem: {
    width: "100%",
    textAlign: "left",
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
  },

  menuItem: {
    width: "100%",
    textAlign: "left",
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "transparent",
    color: "#374151",
    fontSize: "18px",
    cursor: "pointer",
  },

  settingsBtn: {
    width: "100%",
    textAlign: "left",
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "transparent",
    color: "#374151",
    fontSize: "18px",
    cursor: "pointer",
  },

  bottomMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "20px",
  },

  logoutBtn: {
    width: "100%",
    textAlign: "left",
    padding: "16px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: "transparent",
    color: "#ef4444",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "24px 30px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  searchInput: {
    flex: 1,
    minWidth: "280px",
    maxWidth: "700px",
    padding: "14px 18px",
    border: "1px solid #d1d5db",
    borderRadius: "14px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#fff",
  },

  topRight: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  notification: {
    fontSize: "22px",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  userName: {
    fontWeight: "700",
    color: "#111827",
    textAlign: "right",
  },

  userRole: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "right",
  },

  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px",
  },

  heading: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "10px",
  },

  subHeading: {
    color: "#4b5563",
    fontSize: "16px",
    marginBottom: "28px",
  },

  cardRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "22px",
    marginBottom: "34px",
  },

  summaryCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "28px",
  },

  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "22px",
  },

  cardNumber: {
    fontSize: "54px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "10px",
  },

  cardText: {
    color: "#6b7280",
    fontSize: "15px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap",
    gap: "12px",
  },

  sectionTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
  },

  viewAllBtn: {
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    padding: "12px 18px",
    fontSize: "16px",
    cursor: "pointer",
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

  assessmentTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "10px",
  },

  subjectText: {
    fontSize: "18px",
    color: "#4b5563",
    marginBottom: "16px",
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

  greenText: {
    color: "#16a34a",
    fontSize: "16px",
    fontWeight: "600",
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

  openBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "10px 16px",
    borderRadius: "999px",
    fontSize: "15px",
    fontWeight: "700",
  },

  adminActionRow: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "10px",
  },

  primaryBtn: {
    backgroundColor: "#020617",
    color: "#fff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  secondaryBtn: {
    backgroundColor: "#ffffff",
    color: "#111827",
    border: "1px solid #d1d5db",
    padding: "14px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};