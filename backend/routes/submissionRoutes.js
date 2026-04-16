const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createSubmission,
  getAllSubmissions,
  getSubmissionsByStudent,
  getSubmissionsByAssessment,
  updateSubmissionMarks
} = require("../controllers/submissionController");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), createSubmission);
router.get("/", getAllSubmissions);
router.get("/student/:studentId", getSubmissionsByStudent);
router.get("/assessment/:assessmentId", getSubmissionsByAssessment);
router.put("/:submissionId/marks", updateSubmissionMarks);

module.exports = router;