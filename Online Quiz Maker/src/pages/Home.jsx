import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, PlusCircle, Sparkles } from 'lucide-react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container animate-fade-in">
      <div className="hero-section relative">
        <div className="bg-glow"></div>
        <div className="badge glass animate-fade-in delay-100 badge-foxform">
          <span className="pulse-dot"></span>
          <span className="badge-text">🎯 Free Quiz Builder</span>
        </div>
        
        <h1 className="heading-xl animate-fade-in delay-200">
          Build Quizzes, <br />
          <span className="text-gradient">Get Unlimited Responses</span>
        </h1>
        
        <p className="hero-description animate-fade-in delay-300">
          Create personality quizzes, knowledge tests, and learning funnels. All free, all unlimited, with instant results built in.
        </p>
        
        <div className="hero-actions animate-fade-in delay-300">
          <Link to="/create" className="btn btn-primary btn-large shadow-glow-btn">
            Create my free quiz
          </Link>
          <Link to="/quizzes" className="btn btn-secondary btn-large">
            Browse Quizzes
          </Link>
        </div>
        
        <div className="feature-checks animate-fade-in delay-300">
          <span className="check-item"><span className="check-icon">✓</span> Free forever</span>
          <span className="check-item"><span className="check-icon">✓</span> No sign up required</span>
        </div>
      </div>
      
      <div className="features-grid animate-fade-in delay-300">
        <div className="glass-card feature-card">
          <div className="feature-icon">✨</div>
          <h3>Beautiful Design</h3>
          <p>Experience a stunning interface with smooth animations and dark mode glassmorphism.</p>
        </div>
        <div className="glass-card feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Lightning Fast</h3>
          <p>Built with modern web technologies to ensure your quizzes load instantly.</p>
        </div>
        <div className="glass-card feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Ready</h3>
          <p>Create and take quizzes seamlessly on any device, anywhere you go.</p>
        </div>
      </div>
    </div>
  );
}
