import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AssessmentList from "./pages/AssessmentList";
import SubmitAssessment from "./pages/SubmitAssessment";
import CreateAssessment from "./pages/CreateAssessment";
import AdminView from "./pages/AdminView";

function App() {
  return (
    <Router>
      <div style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Assessments</Link>
        <Link to="/admin/create" style={{ marginRight: "15px" }}>Create Assessment</Link>
        <Link to="/admin/submissions">Admin - View Submissions</Link>
      </div>

      <Routes>
        <Route path="/" element={<AssessmentList />} />
        <Route path="/submit/:id" element={<SubmitAssessment />} />
        <Route path="/admin/create" element={<CreateAssessment />} />
        <Route path="/admin/submissions" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;
