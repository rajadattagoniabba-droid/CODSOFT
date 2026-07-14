import { Link } from 'react-router-dom';
import { BrainCircuit, PlusCircle, List } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <BrainCircuit className="brand-icon text-gradient" size={32} />
          <span className="brand-text">QuizMaster</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/quizzes" className="nav-item">
            <List size={20} />
            <span>Browse</span>
          </Link>
          <Link to="/create" className="nav-item">
            <PlusCircle size={20} />
            <span>Create</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
