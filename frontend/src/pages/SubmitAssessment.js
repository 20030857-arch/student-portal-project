import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SubmitAssessment() {
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const studentId = 2;

  useEffect(() => {
    fetchAssessment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAssessment = async () => {
    try {
      const res = await axios.get(`http://localhost:5002/api/assessments/${id}`);
      setAssessment(res.data);
    } catch (error) {
      console.error("Error fetching assessment:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to submit");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("assessment_id", id);
      formData.append("student_id", studentId);
      formData.append("submission_text", submissionText);
      formData.append("file", file);

      await axios.post("http://localhost:5002/api/submissions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Submission successful!");
      setSubmissionText("");
      setFile(null);
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Failed to submit");
    }
  };

  if (!assessment) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{assessment.title}</h2>
      <p><strong>Subject:</strong> {assessment.subject}</p>
      <p>{assessment.description}</p>
      <p><strong>Due Date:</strong> {new Date(assessment.due_date).toLocaleString()}</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="file"><strong>Upload File:</strong></label>
          <br />
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: "5px" }}
          />
          {file && <p style={{ color: "green" }}>Selected: {file.name}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="notes"><strong>Notes (Optional):</strong></label>
          <br />
          <textarea
            id="notes"
            rows="6"
            cols="50"
            placeholder="Add any notes about your submission"
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            style={{ marginTop: "5px" }}
          />
        </div>

        <button type="submit">Submit Assessment</button>
      </form>

      {message && <p style={{ marginTop: "15px", fontWeight: "bold", color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
    </div>
  );
}

export default SubmitAssessment;