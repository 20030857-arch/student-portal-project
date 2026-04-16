const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

const assessmentRoutes = require("./routes/assessmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

const app = express();

// Configure multer for file upload
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/assessments", assessmentRoutes);
app.use("/api/submissions", submissionRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Assessment backend is running 🚀");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});