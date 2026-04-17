const db = require("../db");

exports.createAssessment = (req, res) => {
  const { title, description, subject, due_date, created_by } = req.body;

  if (!title || !description || !subject || !due_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO assessments (title, description, subject, due_date, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [title, description, subject, due_date, created_by || null], (err, result) => {
    if (err) {
      console.error("Create assessment error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(201).json({
      message: "Assessment created successfully",
      assessmentId: result.insertId,
    });
  });
};

exports.getAllAssessments = (req, res) => {
  const query = "SELECT id, title, description, subject, due_date FROM assessments ORDER BY due_date ASC";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Fetch assessments error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
};

exports.getAssessmentById = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM assessments WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Fetch assessment error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.json(results[0]);
  });
};

exports.updateAssessment = (req, res) => {
  const { id } = req.params;
  const { title, description, subject, due_date } = req.body;

  if (!title || !description || !subject || !due_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    UPDATE assessments
    SET title = ?, description = ?, subject = ?, due_date = ?
    WHERE id = ?
  `;

  db.query(sql, [title, description, subject, due_date, id], (err) => {
    if (err) {
      console.error("Update assessment error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json({ message: "Assessment updated successfully" });
  });
};

exports.deleteAssessment = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM assessments WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Delete assessment error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json({ message: "Assessment deleted successfully" });
  });
};