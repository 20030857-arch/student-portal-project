import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminView() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/submissions");
      setSubmissions(res.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleSelectSubmission = (submission) => {
    setSelectedSubmission(submission);
    setMarks(submission.marks || "");
    setFeedback(submission.feedback || "");
  };

  const handleMarkSubmission = async (e) => {
    e.preventDefault();

    if (!selectedSubmission) {
      setMessage("Please select a submission");
      return;
    }

    try {
      await axios.put(`http://localhost:5002/api/submissions/${selectedSubmission.id}/marks`, {
        marks: parseInt(marks),
        feedback: feedback,
      });

      setMessage("Submission marked successfully!");
      fetchSubmissions();
      setSelectedSubmission(null);
      setMarks("");
      setFeedback("");
    } catch (error) {
      console.error("Error marking submission:", error);
      setMessage("Failed to mark submission");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin - View & Mark Submissions</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Submissions List */}
        <div style={{ flex: 1, borderRight: "1px solid #ccc", paddingRight: "20px" }}>
          <h3>Submissions</h3>
          {submissions.length === 0 ? (
            <p>No submissions yet</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Student</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Assessment</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>File</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Status</th>
                  <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Marks</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    onClick={() => handleSelectSubmission(submission)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedSubmission?.id === submission.id ? "#e3f2fd" : "white",
                      border: "1px solid #ddd",
                    }}
                  >
                    <td style={{ padding: "10px" }}>{submission.student_name}</td>
                    <td style={{ padding: "10px" }}>Assessment {submission.assessment_id}</td>
                    <td style={{ padding: "10px" }}>{submission.file_name || "N/A"}</td>
                    <td style={{ padding: "10px" }}>
                      <span
                        style={{
                          backgroundColor: submission.status === "graded" ? "#4caf50" : "#ff9800",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                        }}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px" }}>{submission.marks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Marking Panel */}
        <div style={{ flex: 1 }}>
          <h3>Mark Submission</h3>
          {selectedSubmission ? (
            <form onSubmit={handleMarkSubmission}>
              <div style={{ marginBottom: "15px" }}>
                <label><strong>Student:</strong> {selectedSubmission.student_name}</label>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label><strong>File:</strong> {selectedSubmission.file_name || "No file"}</label>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label><strong>Submission Notes:</strong></label>
                <p style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "4px" }}>
                  {selectedSubmission.submission_text || "No notes"}
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="marks"><strong>Marks (out of 100):</strong></label>
                <input
                  id="marks"
                  type="number"
                  min="0"
                  max="100"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label htmlFor="feedback"><strong>Feedback:</strong></label>
                <textarea
                  id="feedback"
                  rows="6"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Add feedback for the student"
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Save Marks
              </button>
            </form>
          ) : (
            <p>Select a submission to mark</p>
          )}

          {message && (
            <p style={{
              marginTop: "15px",
              fontWeight: "bold",
              color: message.includes("successfully") ? "green" : "red",
            }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminView;
