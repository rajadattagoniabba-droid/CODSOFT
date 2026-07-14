import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/db';
import { Plus, Trash2, Save } from 'lucide-react';
import './QuizCreate.css';

export default function QuizCreate() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correctOptionIndex: 0 }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', '', '', ''], correctOptionIndex: 0 }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length === 1) return;
    const newQs = [...questions];
    newQs.splice(index, 1);
    setQuestions(newQs);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQs = [...questions];
    newQs[index][field] = value;
    setQuestions(newQs);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQs = [...questions];
    newQs[qIndex].options[oIndex] = value;
    setQuestions(newQs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Please fill in title and description');
      return;
    }
    
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text) return setError(`Question ${i + 1} text is empty`);
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j]) return setError(`Option ${j + 1} for question ${i + 1} is empty`);
      }
    }

    setLoading(true);
    setError('');

    try {
      const quizData = {
        title,
        description,
        authorId: 'anonymous',
        questions: questions.map((q, i) => ({
          id: `q-${Date.now()}-${i}`,
          ...q
        }))
      };
      
      const newQuiz = await api.createQuiz(quizData);
      navigate(`/quiz/${newQuiz.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="quiz-create-container animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="heading-lg">Create New Quiz</h1>
      </div>

      {error && <div className="auth-error mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="quiz-form">
        {/* Basic Info */}
        <div className="glass-card mb-8">
          <h2 className="heading-md mb-4">Quiz Details</h2>
          <div className="form-group">
            <label className="form-label">Quiz Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. JavaScript Basics"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-input" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this quiz about?"
              rows={3}
              required
            />
          </div>
        </div>

        {/* Questions */}
        <div className="questions-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="heading-md">Questions</h2>
            <button type="button" className="btn btn-secondary" onClick={handleAddQuestion}>
              <Plus size={18} /> Add Question
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="glass-card question-card mb-6 animate-fade-in delay-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gradient">Question {qIndex + 1}</h3>
                {questions.length > 1 && (
                  <button type="button" className="btn-icon text-muted hover-danger" onClick={() => handleRemoveQuestion(qIndex)}>
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Question Text</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={q.text}
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                  placeholder="e.g. What is closure?"
                  required
                />
              </div>

              <div className="options-grid">
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="form-group option-group">
                    <label className="form-label flex items-center gap-2">
                      <input 
                        type="radio" 
                        name={`correct-${qIndex}`} 
                        checked={q.correctOptionIndex === oIndex}
                        onChange={() => handleQuestionChange(qIndex, 'correctOptionIndex', oIndex)}
                      />
                      Option {oIndex + 1} {q.correctOptionIndex === oIndex && <span className="badge-correct">Correct</span>}
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={opt}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : <><Save size={20} /> Save & Publish Quiz</>}
          </button>
        </div>
      </form>
    </div>
  );
}
