const db = require("../db");

exports.createSubmission = (req, res) => {
  const { assessment_id, student_id, submission_text } = req.body;
  const filename = req.file ? req.file.originalname : null;

  const query = `
    INSERT INTO submissions (assessment_id, student_id, submission_text, file_name, submitted_at, status)
    VALUES (?, ?, ?, ?, NOW(), 'pending')
  `;

  db.query(query, [assessment_id, student_id, submission_text || "", filename], (err, result) => {
    if (err) {
      console.error("Create submission error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(201).json({
      message: "Submission successful",
      submissionId: result.insertId,
    });
  });
};

exports.getAllSubmissions = (req, res) => {
  const query = `
    SELECT s.id, s.assessment_id, s.student_id, u.name as student_name, 
           a.title as assessment_title, s.submission_text, s.file_name, 
           s.submitted_at, s.status, s.marks, s.feedback
    FROM submissions s
    JOIN users u ON s.student_id = u.id
    JOIN assessments a ON s.assessment_id = a.id
    ORDER BY a.title, u.name
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Fetch submissions error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
};

exports.getSubmissionsByStudent = (req, res) => {
  const { studentId } = req.params;
  
  const query = `
    SELECT s.id, s.assessment_id, s.student_id, u.name as student_name, 
           a.title as assessment_title, s.submission_text, s.file_name, 
           s.submitted_at, s.status, s.marks, s.feedback
    FROM submissions s
    JOIN users u ON s.student_id = u.id
    JOIN assessments a ON s.assessment_id = a.id
    WHERE s.student_id = ?
    ORDER BY s.submitted_at DESC
  `;

  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Fetch student submissions error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
};

exports.getSubmissionsByAssessment = (req, res) => {
  const { assessmentId } = req.params;
  
  const query = `
    SELECT s.id, s.assessment_id, s.student_id, u.name as student_name, 
           a.title as assessment_title, s.submission_text, s.file_name, 
           s.submitted_at, s.status, s.marks, s.feedback
    FROM submissions s
    JOIN users u ON s.student_id = u.id
    JOIN assessments a ON s.assessment_id = a.id
    WHERE s.assessment_id = ?
    ORDER BY u.name
  `;

  db.query(query, [assessmentId], (err, results) => {
    if (err) {
      console.error("Fetch assessment submissions error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
};

exports.updateSubmissionMarks = (req, res) => {
  const { submissionId } = req.params;
  const { marks, feedback } = req.body;

  const query = `
    UPDATE submissions 
    SET marks = ?, feedback = ?, status = 'graded'
    WHERE id = ?
  `;

  db.query(query, [marks, feedback || null, submissionId], (err) => {
    if (err) {
      console.error("Update marks error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    res.json({ message: "Submission marked successfully" });
  });
};