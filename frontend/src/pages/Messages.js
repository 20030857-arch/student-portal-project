import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { useTheme } from "../context/ThemeLanguageContext";

export default function Messages() {
  const navigate = useNavigate();
  const { themeStyles } = useTheme();
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!userRole) {
      navigate("/");
      return;
    }

    loadMessages();
  }, [navigate]);

  const loadMessages = () => {
    const savedMessages = localStorage.getItem("userMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const defaultMessages = [
        {
          id: 1,
          title: "Assignment Graded",
          message: "Your Database Design Project has been graded. Check your grades section for feedback.",
          type: "grading",
          read: false,
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          title: "New Assessment Available",
          message: "A new assessment has been created: Cloud Computing Report",
          type: "assessment",
          read: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 3,
          title: "System Maintenance",
          message: "System will undergo maintenance on weekends",
          type: "system",
          read: true,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setMessages(defaultMessages);
      localStorage.setItem("userMessages", JSON.stringify(defaultMessages));
    }
  };

  const markAsRead = (id) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessages(updated);
    localStorage.setItem("userMessages", JSON.stringify(updated));
  };

  const deleteMessage = (id) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("userMessages", JSON.stringify(updated));
  };

  const filteredMessages =
    filter === "all" ? messages : filter === "unread" ? messages.filter((m) => !m.read) : messages;

  const unreadCount = messages.filter((m) => !m.read).length;

  const getMessageIcon = (type) => {
    switch (type) {
      case "grading":
        return "G";
      case "assessment":
        return "A";
      case "system":
        return "S";
      default:
        return "M";
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case "grading":
        return "#22c55e";
      case "assessment":
        return "#3b82f6";
      case "system":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <AppLayout title="Messages" subtitle="Your notifications and messages">
      <div style={{ ...styles.container, color: themeStyles.text }}>
        {/* Header Stats */}
        <div style={styles.headerStats}>
          <div>
            <h3 style={styles.statsTitle}>Unread Messages</h3>
            <p style={{ ...styles.statsValue, color: unreadCount > 0 ? "#f59e0b" : "#6b7280" }}>
              {unreadCount}
            </p>
          </div>
          <div>
            <h3 style={styles.statsTitle}>Total Messages</h3>
            <p style={styles.statsValue}>{messages.length}</p>
          </div>
        </div>

        {/* Filters */}
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
            All Messages
          </button>
          <button
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === "unread" ? "#4f46e5" : themeStyles.cardBackground,
              color: filter === "unread" ? "white" : themeStyles.text,
              borderColor: filter === "unread" ? "#4f46e5" : themeStyles.border,
            }}
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <p style={{ textAlign: "center", color: themeStyles.subText, marginTop: "40px" }}>No messages</p>
        ) : (
          <div style={styles.messagesList}>
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.messageCard,
                  backgroundColor: msg.read ? themeStyles.cardBackground : "rgba(79, 70, 229, 0.05)",
                  borderColor: themeStyles.border,
                  opacity: msg.read ? 0.8 : 1,
                }}
              >
                <div style={styles.messageContent}>
                  <div
                    style={{
                      ...styles.messageIcon,
                      backgroundColor: getMessageColor(msg.type),
                    }}
                  >
                    {getMessageIcon(msg.type)}
                  </div>
                  <div style={styles.messageText}>
                    <h4 style={{ ...styles.messageTitle, color: themeStyles.text, fontWeight: msg.read ? 600 : 700 }}>
                      {msg.title}
                    </h4>
                    <p style={{ ...styles.messageBody, color: themeStyles.subText }}>{msg.message}</p>
                    <span style={{ ...styles.messageTime, color: themeStyles.subText }}>
                      {new Date(msg.timestamp).toLocaleDateString()}{" "}
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div style={styles.messageActions}>
                  {!msg.read && (
                    <button
                      style={styles.actionBtn}
                      onClick={() => markAsRead(msg.id)}
                      title="Mark as read"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteMessage(msg.id)}
                    title="Delete"
                  >
                    Delete
                  </button>
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
  headerStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "rgba(79, 70, 229, 0.05)",
  },
  statsTitle: {
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    margin: "0 0 8px 0",
    opacity: 0.7,
  },
  statsValue: {
    fontSize: "32px",
    fontWeight: "800",
    margin: "0",
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
  messagesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  messageCard: {
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  messageContent: {
    display: "flex",
    gap: "16px",
    flex: 1,
  },
  messageIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "800",
    flexShrink: 0,
  },
  messageText: {
    flex: 1,
  },
  messageTitle: {
    fontSize: "16px",
    margin: "0 0 6px 0",
  },
  messageBody: {
    fontSize: "14px",
    margin: "0 0 8px 0",
    lineHeight: "1.5",
  },
  messageTime: {
    fontSize: "12px",
  },
  messageActions: {
    display: "flex",
    gap: "8px",
    marginLeft: "16px",
  },
  actionBtn: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #3b82f6",
    color: "#3b82f6",
    background: "transparent",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  deleteBtn: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ef4444",
    color: "#ef4444",
    background: "transparent",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
};
