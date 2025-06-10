import React from 'react';
import Icon from 'components/AppIcon';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter') {
      onConfirm();
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
        <div className="flex items-center space-x-3 p-6 border-b border-border">
          <div className="w-10 h-10 bg-error/20 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} color="var(--color-error)" />
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Delete Task
            </h3>
            <p className="text-sm text-text-secondary">
              This action cannot be undone
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-text-primary mb-2">
            Are you sure you want to delete this task?
          </p>
          
          <div className="bg-background/50 border border-border rounded-md p-3 mb-6">
            <p className="text-sm font-medium text-text-primary">
              "{taskTitle}"
            </p>
          </div>

          <p className="text-sm text-text-secondary mb-6">
            All associated data including focus time and session history will be permanently removed.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-md transition-colors duration-150"
            >
              Cancel
            </button>
            
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-error hover:bg-error/90 text-white rounded-md font-medium transition-all duration-150 hover:scale-105 flex items-center space-x-2"
            >
              <Icon name="Trash2" size={16} />
              <span>Delete Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;