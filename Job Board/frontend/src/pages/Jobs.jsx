import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiMapPin, FiBriefcase } from "react-icons/fi";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (searchQuery = "") => {
    try {
      const url = searchQuery ? `http://localhost:5000/api/jobs?search=${searchQuery}` : "http://localhost:5000/api/jobs";
      const { data } = await axios.get(url);
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <div className="page container animate-fade-in">
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem" }}>Explore Opportunities</h2>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "1rem" }}>
          <input 
            type="text" 
            placeholder="Job title or company..." 
            className="input-field" 
            style={{ flex: 1, padding: "1rem" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary"><FiSearch /> Search</button>
        </form>
      </div>

      <div className="jobs-grid">
        {jobs.length > 0 ? jobs.map(job => (
          <div key={job._id} className="job-card glass">
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>{job.title}</h3>
              <p style={{ color: "var(--primary-color)", fontWeight: "500", marginBottom: "1rem" }}>{job.company}</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FiMapPin /> {job.location}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FiBriefcase /> {job.salary || "Not specified"}</span>
              </div>
            </div>
            
            <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <Link to={`/jobs/${job._id}`} className="btn btn-secondary" style={{ width: "100%", padding: "0.5rem" }}>
                View Details
              </Link>
            </div>
          </div>
        )) : (
          <p style={{ color: "var(--text-muted)" }}>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
