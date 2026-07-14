import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import api from '../utils/api';
import TaskBoard from '../components/TaskBoard';
import CreateTaskModal from '../components/CreateTaskModal';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks?projectId=${id}`)
      ]);
      setProject(projectRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Failed to fetch project details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project? All tasks will be orphaned or deleted.')) {
      try {
        await api.delete(`/projects/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  if (loading) return <div className="animate-fade-in">Loading project details...</div>;
  if (!project) return <div className="animate-fade-in">Project not found</div>;

  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const progress = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <button 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', alignSelf: 'flex-start' }}
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>{project.title}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={handleDelete} style={{ color: 'var(--accent-danger)', borderColor: 'var(--accent-danger)' }}>
            <Trash2 size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Delete
          </button>
          <button className="btn-primary" onClick={() => setIsTaskModalOpen(true)}>
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, backgroundColor: 'var(--bg-surface)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, backgroundColor: 'var(--accent-success)', height: '100%', transition: 'width 0.3s ease' }}></div>
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {progress}% Completed
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <TaskBoard tasks={tasks} onTaskUpdated={fetchData} />
      </div>

      {isTaskModalOpen && (
        <CreateTaskModal 
          projectId={project._id}
          onClose={() => setIsTaskModalOpen(false)}
          onTaskCreated={() => {
            setIsTaskModalOpen(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
