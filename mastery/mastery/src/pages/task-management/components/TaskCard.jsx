import React from 'react';
import Icon from 'components/AppIcon';

const TaskCard = ({ task, onDelete }) => {
  const formatFocusTime = (minutes) => {
    if (minutes === 0) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatLastSession = (date) => {
    if (!date) return null;
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div 
      className={`
        bg-surface border rounded-lg p-4 cursor-grab active:cursor-grabbing
        transition-all duration-200 hover:shadow-lg group
        ${task.isActive ? 'border-accent shadow-accent/20' : 'border-border hover:border-accent/50'}
      `}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-body font-medium text-text-primary flex-1 pr-2 leading-tight">
          {task.title}
        </h4>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-error/20 transition-all duration-150"
          title="Delete task"
        >
          <Icon name="Trash2" size={14} color="var(--color-error)" />
        </button>
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-background/50 text-xs text-text-secondary rounded-md border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Focus Session Info */}
      <div className="space-y-2">
        {task.isActive && (
          <div className="flex items-center space-x-2 p-2 bg-accent/10 border border-accent/20 rounded-md">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-xs text-accent font-medium">
              Active Focus Session
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Total: {formatFocusTime(task.focusTime)}</span>
          </div>
          
          {task.lastFocusSession && (
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>Last: {formatLastSession(task.lastFocusSession)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Drag Handle Indicator */}
      <div className="flex justify-center mt-3 opacity-0 group-hover:opacity-50 transition-opacity duration-150">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
          <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;