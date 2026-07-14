import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, PlusCircle } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import CreateProjectModal from './components/CreateProjectModal';

import { Toaster } from 'react-hot-toast';

function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <Router>
      <Toaster position="bottom-right" toastOptions={{ 
        style: { 
          background: 'var(--bg-surface)', 
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)' 
        } 
      }} />
      <div className="app-container">
        <aside className="sidebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FolderKanban size={28} color="var(--accent-primary)" />
            <h2>ProManage</h2>
          </div>
          
          <nav className="sidebar-nav">
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
            {/* Can add more links here like My Tasks, Settings, etc. */}
          </nav>
          
          <div style={{ marginTop: 'auto' }}>
            <button 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setIsProjectModalOpen(true)}
            >
              <PlusCircle size={20} />
              New Project
            </button>
          </div>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </main>
      </div>

      {isProjectModalOpen && (
        <CreateProjectModal 
          onClose={() => setIsProjectModalOpen(false)} 
          onProjectCreated={() => {
            setIsProjectModalOpen(false);
            window.location.reload(); 
          }}
        />
      )}
    </Router>
  );
}

export default App;
