const db = require("../db");

// Mock data for development
let mockAssessments = [
  { id: 1, title: "Database Design Project", description: "Design a comprehensive database for a student management system", subject: "ICT", due_date: "2026-04-20T23:59:00", created_by: 1 },
  { id: 2, title: "Cloud Report", description: "Write a detailed report on cloud computing technologies", subject: "Cloud Computing", due_date: "2026-04-25T23:59:00", created_by: 1 }
];

let assessmentIdCounter = 3;

exports.createAssessment = (req, res) => {
  const { title, description, subject, due_date, created_by } = req.body;

  // Mock: Add to in-memory array instead of database
  const newAssessment = {
    id: assessmentIdCounter++,
    title,
    description,
    subject,
    due_date,
    created_by
  };

  mockAssessments.push(newAssessment);

  res.status(201).json({
    message: "Assessment created successfully",
    assessmentId: newAssessment.id,
  });
};

exports.getAllAssessments = (req, res) => {
  // Return mock data for development
  res.json(mockAssessments);
};

exports.getAssessmentById = (req, res) => {
  const { id } = req.params;

  // Return mock data for development
  const assessment = mockAssessments.find(a => a.id === parseInt(id));
  
  if (!assessment) {
    return res.status(404).json({ message: "Assessment not found" });
  }

  res.json(assessment);
};

exports.updateAssessment = (req, res) => {
  const { id } = req.params;
  const { title, description, subject, due_date } = req.body;

  const sql = `
    UPDATE assessments
    SET title = ?, description = ?, subject = ?, due_date = ?
    WHERE id = ?
  `;

  db.query(sql, [title, description, subject, due_date, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Assessment updated successfully" });
  });
};

exports.deleteAssessment = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM assessments WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: "Assessment deleted successfully" });
  });
};