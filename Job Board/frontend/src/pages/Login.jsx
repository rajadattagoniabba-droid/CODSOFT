import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      login(data);
      if (data.result.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/candidate");
      }
    } catch (error) {
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="page animate-fade-in" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="glass" style={{ padding: "3rem", borderRadius: "1rem", width: "100%", maxWidth: "450px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center", color: "white" }}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
