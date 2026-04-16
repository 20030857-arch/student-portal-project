import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreateAssessment() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    due_date: "",
    created_by: 1
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.title || !formData.subject || !formData.due_date) {
      setMessage("Please fill in all required fields");
      setIsSuccess(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5002/api/assessments", formData);
      setMessage(`Assessment created successfully! (ID: ${res.data.assessmentId})`);
      setIsSuccess(true);
      setFormData({
        title: "",
        description: "",
        subject: "",
        due_date: "",
        created_by: 1
      });
    } catch (error) {
      console.error("Error creating assessment:", error);
      setMessage("Failed to create assessment. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Create Assessment</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="title"><strong>Assessment Title *</strong></label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="e.g., Database Design Project"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="description"><strong>Description</strong></label>
          <textarea
            id="description"
            name="description"
            placeholder="Assessment description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="subject"><strong>Subject *</strong></label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="e.g., ICT, Mathematics"
            value={formData.subject}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="due_date"><strong>Due Date *</strong></label>
          <input
            id="due_date"
            type="datetime-local"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              boxSizing: "border-box",
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Assessment
        </button>
      </form>

      {message && (
        <div
          style={{
            padding: "15px",
            backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
            borderLeft: `4px solid ${isSuccess ? "#28a745" : "#dc3545"}`,
            color: isSuccess ? "#155724" : "#721c24",
            marginBottom: "20px",
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}

      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
          display: "inline-block",
        }}
      >
        ← Back to Assessments
      </Link>
    </div>
  );
}

export default CreateAssessment;