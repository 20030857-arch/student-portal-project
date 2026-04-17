const express = require("express");
const router = express.Router();
const db = require("../db");

// Submit assessment
router.post("/", (req, res) => {
  const { assessment_id, student_id, submission_text } = req.body;

  if (!assessment_id || !student_id) {
    return res.status(400).json({ message: "Assessment and student are required" });
  }

  const assessmentId = parseInt(assessment_id);
  const studentIdInt = parseInt(student_id);

  if (isNaN(assessmentId) || isNaN(studentIdInt)) {
    return res.status(400).json({ message: "Invalid assessment_id or student_id" });
  }

  const query = `
    INSERT INTO submissions (assessment_id, student_id, submission_text, status)
    VALUES (?, ?, ?, 'submitted')
  `;

  db.query(query, [assessmentId, studentIdInt, submission_text || ""], (err, result) => {
    if (err) {
      console.error("Submit assessment error:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }

    res.status(201).json({
      message: "Submission successful",
      id: result.insertId,
    });
  });
});

// Get student assessments with submission status
router.get("/student/:studentId", (req, res) => {
  const { studentId } = req.params;
  const studentIdInt = parseInt(studentId);

  if (isNaN(studentIdInt)) {
    return res.status(400).json({ message: "Invalid student ID" });
  }

  const query = `
    SELECT 
      a.id,
      a.title,
      a.description,
      a.subject,
      a.due_date,
      s.status,
      s.marks,
      s.feedback,
      s.submitted_at
    FROM assessments a
    LEFT JOIN submissions s
      ON a.id = s.assessment_id AND s.student_id = ?
    ORDER BY a.due_date ASC
  `;

  db.query(query, [studentIdInt], (err, results) => {
    if (err) {
      console.error("Get student assessments error:", err);
      return res.status(500).json({
        message: "Server error",
        error: err.message
      });
    }

    res.json(results);
  });
});

// Get all submissions for admin marking
router.get("/", (req, res) => {
  const query = `
    SELECT
      s.id,
      s.assessment_id,
      s.student_id,
      s.submission_text,
      s.status,
      s.marks,
      s.feedback,
      s.submitted_at,
      a.title AS assessment_title,
      u.name AS student_name
    FROM submissions s
    JOIN assessments a ON s.assessment_id = a.id
    JOIN users u ON s.student_id = u.id
    ORDER BY s.submitted_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Get submissions error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results);
  });
});

// Mark a submission
router.put("/:id/mark", (req, res) => {
  const { id } = req.params;
  const { marks, feedback } = req.body;

  const query = `
    UPDATE submissions
    SET marks = ?, feedback = ?, status = 'graded'
    WHERE id = ?
  `;

  db.query(query, [marks, feedback, id], (err) => {
    if (err) {
      console.error("Mark submission error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json({ message: "Submission graded successfully" });
  });
});

module.exports = router;