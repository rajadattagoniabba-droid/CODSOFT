const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Application = require("../models/Application");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Apply for a job
router.post("/", upload.single("resume"), async (req, res) => {
  const { job, applicant } = req.body;
  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : "";
  
  try {
    const newApplication = new Application({ job, applicant, resumeUrl });
    await newApplication.save();
    // Simulate email notification
    console.log(`Email Notification: Successful application by user ${applicant} for job ${job}`);
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get applications for a candidate
router.get("/candidate/:id", async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.params.id }).populate("job");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get applications for a job (employer)
router.get("/job/:id", async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.id }).populate("applicant", "name email");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Update application status (employer)
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
