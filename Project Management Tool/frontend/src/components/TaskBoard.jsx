import { useState } from 'react';
import { Calendar, User, CheckCircle2, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function TaskBoard({ tasks, onTaskUpdated }) {
  const columns = ['To Do', 'In Progress', 'Done'];
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('taskId', taskId);
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const task = tasks.find(t => t._id === taskId);
    
    if (task && task.status !== targetStatus) {
      try {
        await api.put(`/tasks/${taskId}`, { status: targetStatus });
        onTaskUpdated();
        toast.success(`Moved to ${targetStatus}`);
      } catch (error) {
        console.error('Failed to update task status', error);
        toast.error('Failed to move task');
      }
    }
  };

  return (
    <div className="board-container">
      {columns.map(status => (
        <div 
          key={status} 
          className="board-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, status)}
        >
          <div className="board-column-header">
            <span>{status}</span>
            <span className="badge" style={{ backgroundColor: 'var(--bg-base)' }}>
              {tasks.filter(t => t.status === status).length}
            </span>
          </div>
          
          <div className="task-list">
            {tasks.filter(t => t.status === status).map(task => (
              <div 
                key={task._id} 
                className={`task-card ${draggedTaskId === task._id ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, task._id)}
                onDragEnd={handleDragEnd}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="task-title">{task.title}</div>
                  <GripVertical size={16} color="var(--text-secondary)" style={{ cursor: 'grab' }} />
                </div>
                
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {task.description}
                </div>
                
                <div className="task-meta">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <User size={14} />
                    <span>{task.assignee}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: new Date(task.deadline) < new Date() && status !== 'Done' ? 'var(--accent-danger)' : 'inherit' }}>
                    <Calendar size={14} />
                    <span>{new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {status === 'Done' && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                     <CheckCircle2 size={20} color="var(--accent-success)" />
                  </div>
                )}
              </div>
            ))}
            {tasks.filter(t => t.status === status).length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                Drop tasks here
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
