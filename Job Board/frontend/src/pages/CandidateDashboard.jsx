import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiFileText, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

const CandidateDashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user) fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/applications/candidate/${user.id}`);
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications");
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "accepted": return <FiCheckCircle color="#10b981" />;
      case "rejected": return <FiXCircle color="#ef4444" />;
      default: return <FiClock color="#f59e0b" />;
    }
  };

  if (!user || user.role !== "candidate") return <div className="page container">Unauthorized</div>;

  return (
    <div className="page container animate-fade-in">
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>Welcome, {user.name}</h2>
        <p style={{ color: "var(--text-muted)" }}>Track your job applications and manage your profile.</p>
      </div>

      <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><FiFileText /> My Applications</h3>
      
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {applications.length > 0 ? applications.map(app => (
          <div key={app._id} className="glass" style={{ padding: "1.5rem", borderRadius: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Link to={`/jobs/${app.job._id}`}>
                <h4 style={{ fontSize: "1.25rem", color: "var(--primary-color)", marginBottom: "0.25rem" }}>{app.job.title}</h4>
              </Link>
              <p style={{ color: "var(--text-main)", fontWeight: "500", marginBottom: "0.5rem" }}>{app.job.company}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className={`status-badge status-${app.status || 'pending'}`}>
                {getStatusIcon(app.status)}
                {app.status || 'pending'}
              </span>
            </div>
          </div>
        )) : (
          <div className="glass" style={{ padding: "3rem", textAlign: "center", borderRadius: "1rem" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>You haven't applied to any jobs yet.</p>
            <Link to="/jobs" className="btn btn-primary">Find Jobs</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
