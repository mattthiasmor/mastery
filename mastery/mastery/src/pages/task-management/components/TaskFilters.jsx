import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TaskFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedTags, 
  onTagsChange, 
  availableTags 
}) => {
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onTagsChange([]);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0;

  return (
    <div className="bg-surface/30 border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              color="var(--color-text-secondary)"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks by title or tags..."
              className="
                w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md
                text-text-primary placeholder-text-secondary
                focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                transition-colors duration-150
              "
            />
            
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-surface transition-colors duration-150"
              >
                <Icon name="X" size={14} color="var(--color-text-secondary)" />
              </button>
            )}
          </div>
        </div>

        {/* Tag Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTagDropdown(!showTagDropdown)}
            className="
              flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-md
              text-text-primary hover:bg-surface transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
            "
          >
            <Icon name="Tag" size={16} />
            <span>Tags</span>
            {selectedTags.length > 0 && (
              <span className="bg-accent text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                {selectedTags.length}
              </span>
            )}
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-transform duration-150 ${showTagDropdown ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Tag Dropdown */}
          {showTagDropdown && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-xl z-50">
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-text-primary">Filter by Tags</span>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => onTagsChange([])}
                      className="text-xs text-accent hover:text-accent/80 transition-colors duration-150"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                <div className="max-h-48 overflow-y-auto scrollbar-thin space-y-1">
                  {availableTags.length > 0 ? (
                    availableTags.map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center space-x-2 p-2 rounded hover:bg-background cursor-pointer transition-colors duration-150"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagToggle(tag)}
                          className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent focus:ring-2"
                        />
                        <span className="text-sm text-text-primary">{tag}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-text-secondary text-center py-4">
                      No tags available
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-background rounded-md transition-colors duration-150"
          >
            <Icon name="X" size={16} />
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-text-secondary">Filtered by:</span>
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="flex items-center space-x-1 px-2 py-1 bg-accent/20 text-accent rounded-md text-sm"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleTagToggle(tag)}
                className="hover:bg-accent/30 rounded p-0.5 transition-colors duration-150"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Backdrop for dropdown */}
      {showTagDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowTagDropdown(false)}
        />
      )}
    </div>
  );
};

export default TaskFilters;