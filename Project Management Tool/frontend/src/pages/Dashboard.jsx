import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Clock, CheckCircle2 } from 'lucide-react';
import api from '../utils/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="animate-fade-in">Loading projects...</div>;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's an overview of your projects.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project) => (
          <Link to={`/projects/${project._id}`} key={project._id} style={{ textDecoration: 'none' }}>
            <div className="glass-panel" style={{ padding: '1.5rem', transition: 'transform 0.2s', cursor: 'pointer' }} 
                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                <span className={`badge badge-${project.status.toLowerCase().replace(' ', '')}`}>
                  {project.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <FolderKanban size={16} />
                  <span>Project</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={16} />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {projects.length === 0 && (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', gridColumn: '1 / -1' }}>
            <FolderKanban size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
            <h3>No projects yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Get started by creating your first project.</p>
          </div>
        )}
      </div>
    </div>
  );
}
