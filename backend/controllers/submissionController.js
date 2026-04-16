const db = require("../db");

// Mock data for submissions
let mockSubmissions = [
  { 
    id: 1, 
    assessment_id: 1, 
    student_id: 1, 
    student_name: "John Doe",
    submission_text: "Completed database design", 
    file_name: "database_design.pdf",
    submitted_at: new Date(Date.now() - 86400000).toISOString(),
    status: "pending",
    marks: null
  },
  { 
    id: 2, 
    assessment_id: 1, 
    student_id: 2, 
    student_name: "Jane Smith",
    submission_text: "Database schema included", 
    file_name: "db_schema.docx",
    submitted_at: new Date(Date.now() - 172800000).toISOString(),
    status: "graded",
    marks: 85
  }
];

let submissionIdCounter = 3;

exports.createSubmission = (req, res) => {
  const { assessment_id, student_id, submission_text } = req.body;
  const filename = req.file ? req.file.originalname : null;

  // Mock: Store in memory instead of database
  const newSubmission = {
    id: submissionIdCounter++,
    assessment_id: parseInt(assessment_id),
    student_id: parseInt(student_id),
    student_name: `Student ${student_id}`,
    submission_text: submission_text || "",
    file_name: filename,
    submitted_at: new Date().toISOString(),
    status: "pending",
    marks: null
  };

  mockSubmissions.push(newSubmission);

  res.status(201).json({
    message: "Submission successful",
    submissionId: newSubmission.id,
  });
};

exports.getAllSubmissions = (req, res) => {
  res.json(mockSubmissions);
};

exports.getSubmissionsByStudent = (req, res) => {
  const { studentId } = req.params;
  const studentSubmissions = mockSubmissions.filter(
    s => s.student_id === parseInt(studentId)
  );

  res.json(studentSubmissions);
};

exports.getSubmissionsByAssessment = (req, res) => {
  const { assessmentId } = req.params;
  const assessmentSubmissions = mockSubmissions.filter(
    s => s.assessment_id === parseInt(assessmentId)
  );

  res.json(assessmentSubmissions);
};

exports.updateSubmissionMarks = (req, res) => {
  const { submissionId } = req.params;
  const { marks, feedback } = req.body;

  const submission = mockSubmissions.find(s => s.id === parseInt(submissionId));
  
  if (!submission) {
    return res.status(404).json({ message: "Submission not found" });
  }

  submission.marks = marks;
  submission.feedback = feedback;
  submission.status = "graded";

  res.json({ message: "Submission marked successfully" });
};