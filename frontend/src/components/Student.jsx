import React, { useState } from "react";

const Student = ({ assessments, submissions, setSubmissions }) => {

  const [studentName, setStudentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (projectId) => {

    if (!studentName || !selectedFile) {
      alert("Enter name and choose file");
      return;
    }

    const newSubmission = {
      id: Date.now(),
      student: studentName,
      projectId,
      fileName: selectedFile.name
    };

    setSubmissions([...submissions, newSubmission]);

    alert("File submitted!");

    setSelectedFile(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Dashboard</h1>

      {/* Student Name */}
      <input
        placeholder="Enter your name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px" }}
      />

      <h3>Available Assessments</h3>

      {assessments.map((a) => (
        <div key={a.id} style={styles.card}>
          <h4>{a.title}</h4>
          <p>{a.description}</p>
          <p><b>Marks:</b> {a.marks}</p>
          <p><b>Deadline:</b> {a.dueDate}</p>

          {/* ✅ FILE INPUT PER PROJECT */}
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginBottom: "10px" }}
          />

          {/* ✅ SUBMIT BUTTON */}
          <button onClick={() => handleSubmit(a.id)}>
            Submit File
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px"
  }
};

export default Student;