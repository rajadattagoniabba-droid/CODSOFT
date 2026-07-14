// A mock database service using LocalStorage to simulate a backend like Firebase
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const DB_KEY = 'quiz_maker_db';

const getDb = () => {
  const db = localStorage.getItem(DB_KEY);
  if (db) return JSON.parse(db);
  
  // Initial Mock Data
  const initialDb = {
    users: {},
    quizzes: {
      'quiz-1': {
        id: 'quiz-1',
        title: 'General Knowledge Trivia',
        description: 'Test your general knowledge with these fun questions!',
        authorId: 'system',
        createdAt: new Date().toISOString(),
        questions: [
          {
            id: 'q1',
            text: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctOptionIndex: 2
          },
          {
            id: 'q2',
            text: 'Which planet is known as the Red Planet?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
            correctOptionIndex: 1
          }
        ]
      }
    },
    results: {}
  };
  localStorage.setItem(DB_KEY, JSON.stringify(initialDb));
  return initialDb;
};

const saveDb = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const api = {
  // --- Quizzes ---
  async getQuizzes() {
    await delay(500); // simulate network
    const db = getDb();
    return Object.values(db.quizzes).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  
  async getQuiz(id) {
    await delay(300);
    const db = getDb();
    if (!db.quizzes[id]) throw new Error('Quiz not found');
    return db.quizzes[id];
  },
  
  async createQuiz(quizData) {
    await delay(600);
    const db = getDb();
    const id = 'quiz-' + Date.now();
    const newQuiz = {
      ...quizData,
      id,
      createdAt: new Date().toISOString()
    };
    db.quizzes[id] = newQuiz;
    saveDb(db);
    return newQuiz;
  },
  
  // --- Auth (Mock) ---
  async login(email, password) {
    await delay(600);
    const db = getDb();
    const user = Object.values(db.users).find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    
    // Don't leak password
    const { password: _, ...safeUser } = user;
    return safeUser;
  },
  
  async register(name, email, password) {
    await delay(600);
    const db = getDb();
    if (Object.values(db.users).some(u => u.email === email)) {
      throw new Error('Email already exists');
    }
    const id = 'user-' + Date.now();
    const newUser = { id, name, email, password };
    db.users[id] = newUser;
    saveDb(db);
    
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  },

  // --- Results ---
  async saveResult(quizId, userId, score, total) {
    await delay(400);
    const db = getDb();
    const id = 'result-' + Date.now();
    const result = { id, quizId, userId, score, total, createdAt: new Date().toISOString() };
    db.results[id] = result;
    saveDb(db);
    return result;
  }
};
