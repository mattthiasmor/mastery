import React from 'react';
import Icon from 'components/AppIcon';

const SessionControls = ({ 
  isActive, 
  isPaused, 
  onStart, 
  onPause, 
  onStop, 
  disabled 
}) => {
  const getStartButtonText = () => {
    if (isActive && isPaused) return 'Resume';
    if (isActive) return 'Running';
    return 'Start Focus';
  };

  const getStartButtonIcon = () => {
    if (isActive && isPaused) return 'Play';
    if (isActive) return 'Target';
    return 'Play';
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Start/Resume Button */}
      <button
        onClick={onStart}
        disabled={disabled || (isActive && !isPaused)}
        className={`
          flex items-center space-x-3 px-6 py-3 rounded-lg font-body font-medium transition-all duration-150
          ${disabled 
            ? 'bg-surface/30 text-text-secondary cursor-not-allowed opacity-50' 
            : isActive && !isPaused
              ? 'bg-accent/20 text-accent cursor-default' :'bg-accent text-primary hover:bg-accent/90 hover:scale-105 hover:shadow-lg'
          }
        `}
        style={{
          boxShadow: !disabled && !(isActive && !isPaused) ? '0 0 20px rgba(249, 248, 113, 0.3)' : 'none'
        }}
      >
        <Icon 
          name={getStartButtonIcon()} 
          size={20} 
          color={disabled ? "currentColor" : "#0d0d0d"} 
        />
        <span className="text-lg">
          {getStartButtonText()}
        </span>
      </button>

      {/* Pause Button */}
      {isActive && (
        <button
          onClick={onPause}
          className="flex items-center space-x-2 px-4 py-3 bg-surface border border-border rounded-lg text-text-primary hover:bg-surface/80 hover:border-accent transition-all duration-150 font-body font-medium"
        >
          <Icon 
            name={isPaused ? "Play" : "Pause"} 
            size={18} 
            color="currentColor" 
          />
          <span>
            {isPaused ? 'Resume' : 'Pause'}
          </span>
        </button>
      )}

      {/* Stop Button */}
      {isActive && (
        <button
          onClick={onStop}
          className="flex items-center space-x-2 px-4 py-3 bg-error/10 border border-error/20 rounded-lg text-error hover:bg-error/20 hover:border-error transition-all duration-150 font-body font-medium"
        >
          <Icon name="Square" size={18} color="currentColor" />
          <span>Stop</span>
        </button>
      )}
    </div>
  );
};

export default SessionControls;