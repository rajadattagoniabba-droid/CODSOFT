import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import QuizList from './pages/QuizList';
import QuizCreate from './pages/QuizCreate';
import QuizTake from './pages/QuizTake';
import QuizResult from './pages/QuizResult';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quizzes" element={<QuizList />} />
            <Route path="create" element={<QuizCreate />} />
            <Route path="quiz/:id" element={<QuizTake />} />
            <Route path="quiz/:id/results" element={<QuizResult />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
