const express = require("express");
const Job = require("../models/Job");
const router = express.Router();

// Get all jobs (with search and filter functionality)
router.get("/", async (req, res) => {
  const { search, category, experienceLevel, location } = req.query;
  try {
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } }
      ];
    }
    if (category) {
      query.category = category;
    }
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get job search suggestions
router.get("/suggestions", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(200).json([]);
  
  try {
    const jobs = await Job.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } }
      ]
    }).select('title company -_id').limit(5);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get single job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("employer", "name email");
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Create job
router.post("/", async (req, res) => {
  const { title, company, location, description, salary, category, experienceLevel, employer } = req.body;
  try {
    const newJob = new Job({ title, company, location, description, salary, category, experienceLevel, employer });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get employer's jobs
router.get("/employer/:id", async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
