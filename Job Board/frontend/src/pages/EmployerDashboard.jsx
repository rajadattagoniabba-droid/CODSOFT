import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FiPlus, FiBriefcase, FiUsers, FiCheck, FiX } from "react-icons/fi";

const EmployerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", company: "", location: "", description: "", salary: "", category: "tech", experienceLevel: "any" });
  const [applications, setApplications] = useState({});

  useEffect(() => {
    if (user) fetchMyJobs();
  }, [user]);

  const fetchMyJobs = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/jobs/employer/${user.id}`);
      setJobs(data);
      
      // Fetch applications for each job
      data.forEach(async (job) => {
        const res = await axios.get(`http://localhost:5000/api/applications/job/${job._id}`);
        setApplications(prev => ({ ...prev, [job._id]: res.data }));
      });
    } catch (error) {
      toast.error("Error fetching jobs");
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Posting job...");
    try {
      await axios.post("http://localhost:5000/api/jobs", { ...formData, employer: user.id });
      toast.success("Job posted successfully!", { id: loadingToast });
      setShowForm(false);
      setFormData({ title: "", company: "", location: "", description: "", salary: "", category: "tech", experienceLevel: "any" });
      fetchMyJobs();
    } catch (error) {
      toast.error("Error posting job", { id: loadingToast });
    }
  };

  const handleUpdateStatus = async (appId, jobId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/${appId}/status`, { status: newStatus });
      toast.success(`Applicant ${newStatus}!`);
      
      // Update local state
      setApplications(prev => {
        const updatedJobApps = prev[jobId].map(app => 
          app._id === appId ? { ...app, status: newStatus } : app
        );
        return { ...prev, [jobId]: updatedJobApps };
      });
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (!user || user.role !== "employer") return <div className="page container">Unauthorized</div>;

  return (
    <div className="page container animate-fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>Employer Dashboard</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          <FiPlus /> {showForm ? "Cancel" : "Post a Job"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handlePostJob} className="glass" style={{ padding: "2rem", borderRadius: "1rem", marginBottom: "3rem" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Post a New Job</h3>
          <div className="input-group"><label>Job Title</label><input type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
          <div className="input-group"><label>Company</label><input type="text" className="input-field" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required /></div>
          <div className="input-group"><label>Location</label><input type="text" className="input-field" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required /></div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="input-group">
              <label>Category (Domain)</label>
              <select className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="tech">Technology</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Experience Level</label>
              <select className="input-field" value={formData.experienceLevel} onChange={e => setFormData({...formData, experienceLevel: e.target.value})}>
                <option value="any">Any Experience</option>
                <option value="fresher">Fresher</option>
                <option value="experienced">Experienced</option>
              </select>
            </div>
          </div>

          <div className="input-group"><label>Salary</label><input type="text" className="input-field" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} placeholder="e.g. $80k - $100k" /></div>
          <div className="input-group"><label>Description</label><textarea className="input-field" rows="5" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea></div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: "1rem" }}>Submit Job Posting</button>
        </form>
      )}

      <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiBriefcase /> Your Posted Jobs</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {jobs.map(job => (
          <div key={job._id} className="glass" style={{ padding: "1.5rem", borderRadius: "1rem" }}>
            <h4 style={{ fontSize: "1.25rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>{job.title}</h4>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
            
            <h5 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}><FiUsers /> Applicants ({applications[job._id]?.length || 0})</h5>
            {applications[job._id]?.length > 0 ? (
              <div style={{ display: "grid", gap: "1rem" }}>
                {applications[job._id].map(app => (
                  <div key={app._id} style={{ background: "var(--bg-dark)", border: "var(--border-light)", padding: "1.25rem", borderRadius: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <p style={{ fontWeight: "600", color: "var(--text-main)" }}>{app.applicant.name}</p>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{app.applicant.email}</p>
                      <span className={`status-badge status-${app.status || 'pending'}`}>
                        {app.status || 'pending'}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {app.resumeUrl && <a href={`http://localhost:5000${app.resumeUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Resume</a>}
                      
                      {app.status !== 'accepted' && (
                        <button onClick={() => handleUpdateStatus(app._id, job._id, 'accepted')} className="btn btn-success" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                          <FiCheck /> Accept
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button onClick={() => handleUpdateStatus(app._id, job._id, 'rejected')} className="btn btn-danger" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
                          <FiX /> Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : <p style={{ color: "var(--text-muted)" }}>No applications yet.</p>}
          </div>
        ))}
        {jobs.length === 0 && <p style={{ color: "var(--text-muted)" }}>You haven't posted any jobs yet.</p>}
      </div>
    </div>
  );
};

export default EmployerDashboard;
