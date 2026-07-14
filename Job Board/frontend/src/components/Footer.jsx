import { Link } from "react-router-dom";
import { FiBriefcase, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer style={{ background: "var(--bg-card)", borderTop: "var(--border-light)", padding: "3rem 0 1.5rem", marginTop: "auto" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <FiBriefcase className="text-gradient" />
              <span className="text-gradient">Online Jobs</span>
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
              Connecting top talent with the best opportunities. Empowering your career journey every step of the way.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-main)" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link to="/jobs" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="var(--primary-color)"} onMouseOut={e => e.target.style.color="var(--text-muted)"}>Find Jobs</Link>
              <Link to="/register" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="var(--primary-color)"} onMouseOut={e => e.target.style.color="var(--text-muted)"}>Create Account</Link>
              <Link to="/login" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="var(--primary-color)"} onMouseOut={e => e.target.style.color="var(--text-muted)"}>Employer Login</Link>
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-main)" }}>Legal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link to="/" style={{ color: "var(--text-muted)", transition: "color 0.2s" }}>Privacy Policy</Link>
              <Link to="/" style={{ color: "var(--text-muted)", transition: "color 0.2s" }}>Terms of Service</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "1rem", color: "var(--text-main)" }}>Connect</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="#" style={{ color: "var(--text-muted)", fontSize: "1.25rem", transition: "color 0.2s" }}><FiTwitter /></a>
              <a href="#" style={{ color: "var(--text-muted)", fontSize: "1.25rem", transition: "color 0.2s" }}><FiLinkedin /></a>
              <a href="#" style={{ color: "var(--text-muted)", fontSize: "1.25rem", transition: "color 0.2s" }}><FiGithub /></a>
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: "var(--border-light)", paddingTop: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
          &copy; {new Date().getFullYear()} Online Jobs. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
