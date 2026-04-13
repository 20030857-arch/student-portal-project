import React, { useState, useEffect } from "react";
import "./App.css";  // ✅ ADD THIS LINE
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import Supervisor from "./components/Supervisor";
import Student from "./components/Student";

function AppLayout({ assessments, setAssessments, submissions, setSubmissions }) {

  const location = useLocation();
  const hideNavbar = ["/login", "/dashboard"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path="/" element={
          <>
            <Hero />
            <Cards />
          </>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/admin"
          element={
            <Admin
              assessments={assessments}
              setAssessments={setAssessments}
            />
          }
        />

        <Route
          path="/supervisor"
          element={<Supervisor assessments={assessments} />}
        />

        <Route
          path="/student"
          element={
            <Student
              assessments={assessments}
              submissions={submissions}
              setSubmissions={setSubmissions}
            />
          }
        />

      </Routes>
    </>
  );
}

export default function App() {

  // ✅ assessments (PROJECTS)
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem("assessments");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ submissions
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem("submissions");
    return saved ? JSON.parse(saved) : [];
  });

  // SAVE assessments
  useEffect(() => {
    localStorage.setItem("assessments", JSON.stringify(assessments));
  }, [assessments]);

  // SAVE submissions
  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  return (
    <Router>
      <AppLayout
        assessments={assessments}
        setAssessments={setAssessments}
        submissions={submissions}
        setSubmissions={setSubmissions}
      />
    </Router>
  );
}