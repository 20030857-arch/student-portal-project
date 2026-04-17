import React, { useState } from "react";

const Student = ({ assessments, submissions, setSubmissions }) => {

  const [studentName, setStudentName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState({});

  // handle file per project
  const handleFileChange = (e, projectId) => {
    setSelectedFiles({
      ...selectedFiles,
      [projectId]: e.target.files[0]
    });
  };

  // submit
  const handleSubmit = (projectId) => {
    const file = selectedFiles[projectId];

    if (!studentName || !file) {
      alert("Enter name and choose file");
      return;
    }

    const newSubmission = {
      id: Date.now(),
      student: studentName,
      projectId,
      fileName: file.name
    };

    setSubmissions([...submissions, newSubmission]);

    alert("File submitted successfully!");

    // clear file after submit
    setSelectedFiles({
      ...selectedFiles,
      [projectId]: null
    });
  };

  return (
    <div className="app-container">
      <h1>Student Dashboard</h1>

      {/* Name Input */}
      <div className="card">
        <h3>Your Details</h3>

        <input
          placeholder="Enter your name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </div>

      {/* Assessments */}
      <h3>Available Assessments</h3>

      {assessments.length === 0 ? (
        <p>No assessments available</p>
      ) : (
        assessments.map((a) => (
          <div key={a.id} className="card">
            <h4>{a.title}</h4>
            <p>{a.description}</p>
            <p><b>Marks:</b> {a.marks}</p>
            <p><b>Deadline:</b> {a.dueDate}</p>

            {/* File Upload */}
            <input
              type="file"
              onChange={(e) => handleFileChange(e, a.id)}
            />

            {/* Show selected file */}
            {selectedFiles[a.id] && (
              <p style={{ fontSize: "12px" }}>
                Selected: {selectedFiles[a.id].name}
              </p>
            )}

            {/* Submit Button */}
            <button
              onClick={() => handleSubmit(a.id)}
              className="btn btn-primary"
            >
              Submit File
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Student;