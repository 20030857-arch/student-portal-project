import React, { useState, useEffect } from "react";
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

        <Route
          path="/"
          element={
            <>
              <Hero />
              <Cards />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <Admin
              assessments={assessments}
              setAssessments={setAssessments}
            />
          }
        />

        {/* SUPERVISOR */}
        <Route
          path="/supervisor"
          element={
            <Supervisor
              assessments={assessments}
              submissions={submissions}
            />
          }
        />

        {/* STUDENT */}
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

  // ✅ assessments (saved)
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem("assessments");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ submissions (saved)
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem("submissions");
    return saved ? JSON.parse(saved) : [];
  });

  // save assessments
  useEffect(() => {
    localStorage.setItem("assessments", JSON.stringify(assessments));
  }, [assessments]);

  // save submissions
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