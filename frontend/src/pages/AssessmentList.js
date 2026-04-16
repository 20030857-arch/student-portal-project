import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AssessmentList() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/assessments");
      setAssessments(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`/submit/${id}`);
  };

  if (loading) return <p>Loading assessments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Assessments</h2>

      {assessments.length === 0 ? (
        <p>No assessments available</p>
      ) : (
        assessments.map((assessment) => (
          <div
            key={assessment.id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "15px",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            <h3>{assessment.title}</h3>
            <p><strong>Subject:</strong> {assessment.subject}</p>
            <p><strong>Description:</strong> {assessment.description}</p>
            <p><strong>Due Date:</strong> {new Date(assessment.due_date).toLocaleString()}</p>
            <button onClick={() => handleClick(assessment.id)}>
              Submit Assessment
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AssessmentList;