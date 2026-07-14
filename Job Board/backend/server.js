require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicationRoutes = require("./routes/applications");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Job Board API is running...");
});

// Since we are mocking a database connection, we can use an in-memory db or a free MongoDB URI if provided.
// To ensure the code runs successfully without the user providing a Mongo URI, we can use a local one.
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/job-board")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error (API will run without DB): ", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
