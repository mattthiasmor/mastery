import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DurationSelector = ({ duration, onDurationChange, disabled }) => {
  const [customDuration, setCustomDuration] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const presetDurations = [
    { label: '25 min', value: 25 * 60, description: 'Pomodoro' },
    { label: '45 min', value: 45 * 60, description: 'Deep Work' },
    { label: '60 min', value: 60 * 60, description: 'Extended' },
    { label: '90 min', value: 90 * 60, description: 'Flow State' }
  ];

  const handlePresetSelect = (value) => {
    if (!disabled) {
      onDurationChange(value);
      setShowCustomInput(false);
    }
  };

  const handleCustomSubmit = () => {
    const minutes = parseInt(customDuration);
    if (minutes && minutes > 0 && minutes <= 180) {
      onDurationChange(minutes * 60);
      setCustomDuration('');
      setShowCustomInput(false);
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getCurrentPreset = () => {
    return presetDurations.find(preset => preset.value === duration);
  };

  return (
    <div className="space-y-4">
      {/* Current Duration Display */}
      <div className="text-center p-4 bg-surface/50 rounded-lg">
        <div className="text-2xl font-mono font-bold text-accent">
          {formatDuration(duration)}
        </div>
        <div className="text-sm text-text-secondary font-caption mt-1">
          {getCurrentPreset()?.description || 'Custom Duration'}
        </div>
      </div>

      {/* Preset Duration Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {presetDurations.map((preset) => (
          <button
            key={preset.value}
            onClick={() => handlePresetSelect(preset.value)}
            disabled={disabled}
            className={`
              p-3 rounded-lg border-2 transition-all duration-150 text-left
              ${disabled 
                ? 'opacity-50 cursor-not-allowed' :'hover:scale-105 hover:shadow-md'
              }
              ${duration === preset.value 
                ? 'border-accent bg-accent/10 text-accent' :'border-border bg-surface hover:border-accent/50'
              }
            `}
          >
            <div className="font-body font-medium">
              {preset.label}
            </div>
            <div className="text-xs text-text-secondary font-caption mt-1">
              {preset.description}
            </div>
          </button>
        ))}
      </div>

      {/* Custom Duration Section */}
      <div className="border-t border-border pt-4">
        {!showCustomInput ? (
          <button
            onClick={() => !disabled && setShowCustomInput(true)}
            disabled={disabled}
            className={`
              w-full flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed transition-all duration-150
              ${disabled 
                ? 'border-border text-text-secondary opacity-50 cursor-not-allowed' :'border-border hover:border-accent text-text-secondary hover:text-accent'
              }
            `}
          >
            <Icon name="Plus" size={18} color="currentColor" />
            <span className="font-body">Custom Duration</span>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={customDuration}
                  onChange={(e) => setCustomDuration(e.target.value)}
                  placeholder="Minutes (1-180)"
                  min="1"
                  max="180"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none transition-colors duration-150"
                  autoFocus
                />
              </div>
              <button
                onClick={handleCustomSubmit}
                disabled={!customDuration || parseInt(customDuration) <= 0 || parseInt(customDuration) > 180}
                className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 font-body font-medium"
              >
                Set
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomDuration('');
                }}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 font-body"
              >
                Cancel
              </button>
              <span className="text-xs text-text-secondary font-caption">
                Max: 3 hours
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Duration Tips */}
      <div className="bg-surface/30 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <div className="text-xs text-text-secondary font-caption">
            <strong className="text-accent">Tip:</strong> Start with 25-minute sessions for better focus. 
            Gradually increase duration as your concentration improves.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationSelector;