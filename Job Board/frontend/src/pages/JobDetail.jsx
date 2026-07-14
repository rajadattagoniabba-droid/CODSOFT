import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FiMapPin, FiDollarSign, FiBriefcase, FiArrowLeft, FiUploadCloud } from "react-icons/fi";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details");
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login as a candidate to apply.");
      return navigate("/login");
    }
    if (user.role !== "candidate") {
      return alert("Only candidates can apply for jobs.");
    }

    const formData = new FormData();
    formData.append("job", job._id);
    formData.append("applicant", user.id);
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      await axios.post("http://localhost:5000/api/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Successfully applied! Email notification sent.");
      navigate("/candidate");
    } catch (error) {
      alert("Error applying for the job");
    }
  };

  if (!job) return <div className="page container">Loading...</div>;

  return (
    <div className="page container animate-fade-in">
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: "2rem", padding: "0.5rem 1rem", border: "none", background: "rgba(255,255,255,0.1)" }}>
        <FiArrowLeft /> Back
      </button>

      <div className="glass" style={{ padding: "3rem", borderRadius: "1rem" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "2rem", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>{job.title}</h1>
          <h3 style={{ fontSize: "1.5rem", color: "var(--primary-color)", marginBottom: "1.5rem" }}>{job.company}</h3>
          
          <div style={{ display: "flex", gap: "2rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FiMapPin /> {job.location}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FiDollarSign /> {job.salary || "Not specified"}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><FiBriefcase /> Posted {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div style={{ marginBottom: "3rem" }}>
          <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Job Description</h4>
          <p style={{ color: "var(--text-main)", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{job.description}</p>
        </div>

        {user?.role !== "employer" && (
          <form onSubmit={handleApply} className="glass" style={{ padding: "2rem", borderRadius: "1rem", border: "1px solid var(--primary-color)" }}>
            <h4 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Apply for this position</h4>
            <div className="input-group">
              <label><FiUploadCloud /> Upload Resume (PDF)</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files[0])} className="input-field" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>Submit Application</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
