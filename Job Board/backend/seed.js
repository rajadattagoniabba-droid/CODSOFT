const mongoose = require("mongoose");
const Job = require("./models/Job");
const User = require("./models/User");

// Sample data pools
const titles = {
  tech: ["Software Engineer", "React Developer", "Full Stack Engineer", "Backend Developer", "DevOps Engineer", "Data Scientist", "System Administrator"],
  design: ["UX/UI Designer", "Product Designer", "Graphic Designer", "Web Designer", "Art Director"],
  marketing: ["Marketing Manager", "SEO Specialist", "Content Strategist", "Social Media Manager", "Digital Marketing Analyst"],
  sales: ["Sales Representative", "Account Executive", "Business Development Manager", "Sales Director"],
  finance: ["Financial Analyst", "Accountant", "Investment Banker", "Auditor", "Controller"],
  other: ["Registered Nurse", "Acute Care Nurse", "Radiologic Technologist", "Physician", "Operations Manager"]
};

const companies = ["Dreambound", "Micro", "GrabJobs", "Walmart", "U.S. Navy", "System Transport", "Remote For You", "TrackFive", "Wyndy", "Google", "Amazon", "Apple", "Netflix", "Meta"];
const locations = ["New York, NY", "Houston, TX", "Chicago, IL", "Los Angeles, CA", "Dallas, TX", "Atlanta, GA", "Austin, TX", "Denver, CO", "Seattle, WA", "Remote"];
const experienceLevels = ["fresher", "experienced", "any"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/job-board");
    console.log("Connected to MongoDB...");

    // Find or create a default employer
    let employer = await User.findOne({ email: "employer@jobsearcher.com" });
    if (!employer) {
      employer = new User({
        name: "JobSearcher Admin",
        email: "employer@jobsearcher.com",
        password: "password123", // Assuming plain text or you'd hash it normally
        role: "employer"
      });
      await employer.save();
      console.log("Created default employer.");
    }

    // Clear existing jobs (optional, but good for a clean slate)
    await Job.deleteMany({});
    console.log("Cleared existing jobs.");

    // Generate 60 jobs
    const jobsToInsert = [];
    for (let i = 0; i < 60; i++) {
      const category = getRandom(Object.keys(titles));
      const title = getRandom(titles[category]);
      const company = getRandom(companies);
      const location = getRandom(locations);
      const experienceLevel = getRandom(experienceLevels);
      const salary = `$${Math.floor(Math.random() * 50 + 50)}k - $${Math.floor(Math.random() * 50 + 100)}k`;
      const description = `We are looking for a highly skilled ${title} to join our team at ${company} in ${location}. If you have the right background and a passion for excellence, apply today! This position requires ${experienceLevel === 'fresher' ? 'no prior experience' : experienceLevel === 'experienced' ? 'several years of experience' : 'a willing attitude'}.`;

      jobsToInsert.push({
        title,
        company,
        location,
        description,
        salary,
        category,
        experienceLevel,
        employer: employer._id,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random past date within ~100 days
      });
    }

    await Job.insertMany(jobsToInsert);
    console.log(`Successfully seeded ${jobsToInsert.length} jobs!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

generateJobs();
