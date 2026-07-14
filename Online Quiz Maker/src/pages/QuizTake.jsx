import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/db';
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import './QuizTake.css';

export default function QuizTake() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const data = await api.getQuiz(id);
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error || !quiz) {
    return <div className="text-center mt-8 auth-error">{error || 'Quiz not found'}</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleOptionSelect = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = async () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestion.correctOptionIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setIsAnswerSubmitted(true);
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      // Finish quiz
      const finalScore = selectedOption === currentQuestion.correctOptionIndex ? score + 1 : score;
      
      // Save result
      await api.saveResult(quiz.id, 'anonymous', finalScore, quiz.questions.length);
      
      // Navigate to results
      navigate(`/quiz/${quiz.id}/results`, { state: { score: finalScore, total: quiz.questions.length } });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    }
  };

  return (
    <div className="quiz-take-container animate-fade-in">
      <div className="quiz-take-header">
        <h1 className="heading-md">{quiz.title}</h1>
        <div className="progress-text">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <div className="glass-card mt-8 animate-fade-in" key={currentQuestionIndex}>
        <h2 className="question-text">{currentQuestion.text}</h2>
        
        <div className="options-list mt-6">
          {currentQuestion.options.map((opt, idx) => {
            let className = "option-btn";
            if (selectedOption === idx) className += " selected";
            
            if (isAnswerSubmitted) {
              if (idx === currentQuestion.correctOptionIndex) {
                className += " correct";
              } else if (selectedOption === idx) {
                className += " incorrect";
              }
            }

            return (
              <button 
                key={idx} 
                className={className}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswerSubmitted}
              >
                <div className="option-content">
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{opt}</span>
                </div>
                {isAnswerSubmitted && idx === currentQuestion.correctOptionIndex && (
                  <CheckCircle2 className="text-green" size={20} />
                )}
                {isAnswerSubmitted && selectedOption === idx && idx !== currentQuestion.correctOptionIndex && (
                  <AlertCircle className="text-red" size={20} />
                )}
              </button>
            );
          })}
        </div>
        
        <div className="flex justify-end mt-8">
          {!isAnswerSubmitted ? (
            <button 
              className="btn btn-primary" 
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
            >
              Submit Answer
            </button>
          ) : (
            <button className="btn btn-primary animate-fade-in" onClick={handleNext}>
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
