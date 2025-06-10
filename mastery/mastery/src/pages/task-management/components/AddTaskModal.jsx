import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const AddTaskModal = ({ isOpen, onClose, onSubmit, columnTitle }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setTags('');
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: title.trim(),
        tags: tags.trim()
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div 
        className="bg-surface border border-border rounded-lg shadow-xl w-full max-w-md"
        onKeyDown={handleKeyDown}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Add New Task
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Adding to {columnTitle}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-background transition-colors duration-150"
            aria-label="Close modal"
          >
            <Icon name="X" size={20} color="currentColor" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Task Title */}
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-text-primary mb-2">
              Task Title *
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className={`
                w-full px-3 py-2 bg-background border rounded-md
                text-text-primary placeholder-text-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                transition-colors duration-150
                ${errors.title ? 'border-error' : 'border-border'}
              `}
              autoFocus
            />
            {errors.title && (
              <p className="mt-1 text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={14} />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="task-tags" className="block text-sm font-medium text-text-primary mb-2">
              Tags
            </label>
            <input
              id="task-tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas..."
              className="
                w-full px-3 py-2 bg-background border border-border rounded-md
                text-text-primary placeholder-text-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                transition-colors duration-150
              "
            />
            <p className="mt-1 text-xs text-text-secondary">
              Separate multiple tags with commas (e.g., design, frontend, urgent)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-md transition-colors duration-150"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Icon name="Plus" size={16} />
              <span>Add Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;