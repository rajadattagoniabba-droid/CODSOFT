import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="page container animate-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "60vh" }}>
      <FiAlertTriangle style={{ fontSize: "4rem", color: "var(--primary-color)", marginBottom: "1rem" }} />
      <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "0.5rem" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--text-main)", marginBottom: "1.5rem" }}>Page Not Found</h2>
      <p style={{ color: "var(--text-muted)", maxWidth: "400px", marginBottom: "2rem" }}>
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
