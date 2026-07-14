import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/db';
import { Play, Clock, HelpCircle, Loader2 } from 'lucide-react';
import './QuizList.css';

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const data = await api.getQuizzes();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 auth-error">{error}</div>;
  }

  return (
    <div className="quiz-list-container animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="heading-lg">Available Quizzes</h1>
          <p className="text-secondary">Choose a quiz and test your knowledge!</p>
        </div>
        <Link to="/create" className="btn btn-primary">Create Quiz</Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="glass-card text-center">
          <HelpCircle size={48} className="text-muted mx-auto mb-4" />
          <h3>No quizzes found</h3>
          <p className="text-secondary mt-2">Be the first to create one!</p>
        </div>
      ) : (
        <div className="quizzes-grid">
          {quizzes.map((quiz, idx) => (
            <div key={quiz.id} className={`glass-card quiz-card animate-fade-in delay-${(idx % 3) * 100}`}>
              <h3>{quiz.title}</h3>
              <p className="quiz-desc text-secondary">{quiz.description}</p>
              
              <div className="quiz-meta mt-4">
                <div className="meta-item">
                  <HelpCircle size={16} />
                  <span>{quiz.questions?.length || 0} Questions</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <Link to={`/quiz/${quiz.id}`} className="btn btn-primary w-full mt-6">
                <Play size={18} />
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
