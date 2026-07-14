import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "candidate" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", formData);
      login(data);
      if (data.result.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/candidate");
      }
    } catch (error) {
      alert("Registration failed or user already exists.");
    }
  };

  return (
    <div className="page animate-fade-in" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="glass" style={{ padding: "3rem", borderRadius: "1rem", width: "100%", maxWidth: "450px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center", color: "white" }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" className="input-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" className="input-field" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          <div className="input-group">
            <label>I am a...</label>
            <select className="input-field" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="candidate">Candidate (Looking for jobs)</option>
              <option value="employer">Employer (Posting jobs)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
