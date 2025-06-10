import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskSelector = ({ tasks, selectedTask, onTaskSelect, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTaskSelect = (task) => {
    if (!disabled) {
      onTaskSelect(task);
      setIsOpen(false);
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'text-text-secondary';
      case 'in-progress': return 'text-warning';
      case 'done': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case 'todo': return 'Circle';
      case 'in-progress': return 'Clock';
      case 'done': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const formatLastFocus = (lastFocusSession) => {
    if (!lastFocusSession) return 'Never';
    
    const now = new Date();
    const diff = now - lastFocusSession;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Recently';
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-150
          ${disabled 
            ? 'bg-surface/30 border-border cursor-not-allowed opacity-50' :'bg-surface border-border hover:border-accent focus:border-accent'
          }
          ${selectedTask ? 'border-accent' : ''}
        `}
        disabled={disabled}
      >
        <div className="flex items-center space-x-3 flex-1 text-left">
          {selectedTask ? (
            <>
              <Icon 
                name={getTaskStatusIcon(selectedTask.status)} 
                size={20} 
                color="var(--color-accent)" 
              />
              <div className="flex-1 min-w-0">
                <div className="font-body font-medium text-text-primary truncate">
                  {selectedTask.title}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs font-caption ${getTaskStatusColor(selectedTask.status)}`}>
                    {selectedTask.status.replace('-', ' ')}
                  </span>
                  <span className="text-xs text-text-secondary font-caption">
                    • {selectedTask.focusTime}min focused
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <Icon name="Search" size={20} color="currentColor" />
              <span className="text-text-secondary font-body">
                Select a task to focus on...
              </span>
            </>
          )}
        </div>
        
        <Icon 
          name="ChevronDown" 
          size={20} 
          color="currentColor"
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto scrollbar-thin">
          <div className="p-2">
            {tasks.length === 0 ? (
              <div className="p-4 text-center text-text-secondary">
                <Icon name="Inbox" size={24} color="currentColor" className="mx-auto mb-2" />
                <p className="text-sm font-body">No tasks available</p>
                <p className="text-xs text-text-secondary mt-1">
                  Create tasks in Task Management
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => handleTaskSelect(task)}
                  className={`
                    w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-150
                    hover:bg-surface/50 focus:bg-surface/50 text-left
                    ${selectedTask?.id === task.id ? 'bg-accent/10 border border-accent' : ''}
                  `}
                >
                  <Icon 
                    name={getTaskStatusIcon(task.status)} 
                    size={18} 
                    color={selectedTask?.id === task.id ? "var(--color-accent)" : "currentColor"}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className={`
                      font-body font-medium truncate
                      ${selectedTask?.id === task.id ? 'text-accent' : 'text-text-primary'}
                    `}>
                      {task.title}
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs font-caption ${getTaskStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      <span className="text-xs text-text-secondary font-caption">
                        • {task.focusTime}min
                      </span>
                      <span className="text-xs text-text-secondary font-caption">
                        • {formatLastFocus(task.lastFocusSession)}
                      </span>
                    </div>
                    
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-surface text-text-secondary text-xs rounded font-caption"
                          >
                            #{tag}
                          </span>
                        ))}
                        {task.tags.length > 3 && (
                          <span className="text-xs text-text-secondary font-caption">
                            +{task.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {selectedTask?.id === task.id && (
                    <Icon name="Check" size={16} color="var(--color-accent)" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskSelector;