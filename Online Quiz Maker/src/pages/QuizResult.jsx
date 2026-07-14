import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { Trophy, RefreshCcw, Home } from 'lucide-react';
import './QuizResult.css';

export default function QuizResult() {
  const { id } = useParams();
  const location = useLocation();
  const score = location.state?.score || 0;
  const total = location.state?.total || 0;
  
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  
  let message = '';
  if (percentage >= 90) message = 'Outstanding!';
  else if (percentage >= 70) message = 'Great Job!';
  else if (percentage >= 50) message = 'Good Effort!';
  else message = 'Keep Practicing!';

  return (
    <div className="quiz-result-container animate-fade-in">
      <div className="glass-card result-card">
        <Trophy size={64} className="trophy-icon text-gradient mb-6" />
        
        <h1 className="heading-lg mb-2">{message}</h1>
        <p className="text-secondary mb-8">You completed the quiz successfully.</p>
        
        <div className="score-circle mb-8">
          <div className="score-value text-gradient">
            {score} <span className="score-total">/ {total}</span>
          </div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link to={`/quiz/${id}`} className="btn btn-secondary">
            <RefreshCcw size={18} />
            Retake Quiz
          </Link>
          <Link to="/quizzes" className="btn btn-primary">
            <Home size={18} />
            Back to Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}
