import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeLanguageProvider } from "./context/ThemeLanguageContext";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AssessmentList from "./pages/AssessmentList";
import SubmitAssessment from "./pages/SubmitAssessment";
import MarkAssessments from "./pages/MarkAssessments";
import CreateAssessment from "./pages/CreateAssessment";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SystemManagement from "./pages/SystemManagement";
import GradeManagement from "./pages/GradeManagement";
import Grades from "./pages/Grades";
import Messages from "./pages/Messages";

function App() {
  return (
    <ThemeLanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessments" element={<AssessmentList />} />
          <Route path="/submit/:id" element={<SubmitAssessment />} />
          <Route path="/admin/create" element={<CreateAssessment />} />
          <Route path="/admin/mark" element={<MarkAssessments />} />
          <Route path="/admin/system-management" element={<SystemManagement />} />
          <Route path="/admin/grade-management" element={<GradeManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </Router>
    </ThemeLanguageProvider>
  );
}

export default App;