import React from "react";

const Supervisor = ({ assessments }) => {

  // fake submissions (keep this for now)
  const submissions = [
    { id: 1, student: "Ankit", projectId: 1 },
    { id: 2, student: "John", projectId: 1 },
    { id: 3, student: "Sara", projectId: 2 }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supervisor Dashboard</h1>

      {/* ALL PROJECTS */}
      <h3>All Projects</h3>

      {assessments.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        assessments.map((a) => (
          <div key={a.id} style={styles.card}>
            <h4>{a.title}</h4>
            <p>{a.description}</p>
            <p><b>Marks:</b> {a.marks}</p>
            <p><b>Deadline:</b> {a.dueDate}</p>

            {/* submission count */}
            <p>
              Submissions: {
                submissions.filter(s => s.projectId === a.id).length
              }
            </p>
          </div>
        ))
      )}

      {/* ALL SUBMISSIONS */}
      <h3>All Submissions</h3>

      {submissions.map((s) => (
        <div key={s.id} style={styles.card}>
          <p><b>Student:</b> {s.student}</p>
          <p><b>Project ID:</b> {s.projectId}</p>
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

export default Supervisor;