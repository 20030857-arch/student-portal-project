import React, { useState } from "react";

const Admin = ({ assessments, setAssessments }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marks, setMarks] = useState("");
  const [dueDate, setDueDate] = useState("");

  // ✅ CREATE
  const handleCreate = () => {
    if (!title || !description || !marks || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newAssessment = {
      id: Date.now(), // unique id
      title,
      description,
      marks,
      dueDate
    };

    setAssessments([...assessments, newAssessment]);

    // clear form
    setTitle("");
    setDescription("");
    setMarks("");
    setDueDate("");
  };

  // ✅ DELETE
  const handleDelete = (id) => {
    const updated = assessments.filter((a) => a.id !== id);
    setAssessments(updated);
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* CREATE FORM */}
      <h3>Create Assessment</h3>

      <input
        placeholder="Assessment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />

      <input
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        style={styles.input}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleCreate} style={styles.button}>
        Create
      </button>

      {/* LIST */}
      <h3>All Assessments</h3>

      {assessments.length === 0 ? (
        <p>No assessments yet</p>
      ) : (
        assessments.map((a) => (
          <div key={a.id} style={styles.card}>
            <h4>{a.title}</h4>
            <p>{a.description}</p>
            <p><b>Marks:</b> {a.marks}</p>
            <p><b>Deadline:</b> {a.dueDate}</p>

            {/* DELETE BUTTON */}
            <button
              onClick={() => handleDelete(a.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))
      )}

      {/* RESET PASSWORD (dummy) */}
      <h3>Reset User Password</h3>
      <button
        onClick={() => alert("Password reset link sent!")}
        style={styles.resetBtn}
      >
        Reset Student/Supervisor Password
      </button>
    </div>
  );
};

// 🎨 STYLES
const styles = {
  container: {
    padding: "20px"
  },
  input: {
    display: "block",
    marginBottom: "10px",
    padding: "8px",
    width: "250px"
  },
  button: {
    padding: "8px 12px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px"
  },
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px"
  },
  deleteBtn: {
    marginTop: "10px",
    padding: "6px 10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  resetBtn: {
    padding: "8px 12px",
    background: "#555",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Admin;