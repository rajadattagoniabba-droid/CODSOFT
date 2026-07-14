import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiBriefcase, FiUser, FiLogOut, FiHome, FiSearch } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar" style={{ background: "transparent", borderBottom: "none", position: "absolute", width: "100%", top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <div style={{ background: "var(--primary-color)", padding: "0.5rem", borderRadius: "50%", color: "white", display: "flex" }}>
            <FiSearch size={20} />
          </div>
          <span style={{ color: "var(--text-main)" }}>Job Board</span>
        </Link>

        <div className="nav-links" style={{ gap: "1.5rem" }}>
          <Link to="/" className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600" }}>Home</Link>
          <Link to="/jobs" className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600" }}>Browse Job</Link>
          <div className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600", cursor: "pointer" }}>Pages</div>
          <div className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600", cursor: "pointer" }}>Blog</div>
          <div className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600", cursor: "pointer" }}>Contact</div>
        </div>

        <div className="nav-links" style={{ gap: "1.5rem" }}>
          {user ? (
            <>
              {user.role === "employer" ? (
                <Link to="/employer" className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600" }}><FiUser /> Dashboard</Link>
              ) : (
                <Link to="/candidate" className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600" }}><FiUser /> Profile</Link>
              )}
              <button onClick={handleLogout} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-main)", fontWeight: "600", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link" style={{ color: "var(--text-main)", fontWeight: "600" }}>Log in</Link>
          )}
          <Link to="/register" className="btn btn-success" style={{ borderRadius: "0.25rem" }}>Post A Job</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
