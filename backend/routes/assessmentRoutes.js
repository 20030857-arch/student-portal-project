const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all assessments
router.get("/", (req, res) => {
  const query = `
    SELECT id, title, description, subject, due_date
    FROM assessments
    ORDER BY due_date ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Fetch assessments error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results);
  });
});

// Create assessment
router.post("/", (req, res) => {
  const { title, description, subject, due_date, created_by } = req.body;

  if (!title || !description || !subject || !due_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO assessments (title, description, subject, due_date, created_by)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [title, description, subject, due_date, created_by || null],
    (err, result) => {
      if (err) {
        console.error("Create assessment error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      res.status(201).json({
        message: "Assessment created successfully",
        id: result.insertId,
      });
    }
  );
});

module.exports = router;