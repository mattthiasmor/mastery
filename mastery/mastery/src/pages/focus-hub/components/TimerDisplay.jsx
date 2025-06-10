import React from 'react';
import Icon from 'components/AppIcon';

const TimerDisplay = ({ 
  timeRemaining, 
  duration, 
  isActive, 
  isPaused, 
  selectedTask 
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((duration - timeRemaining) / duration) * 100;
  };

  const getStatusColor = () => {
    if (!isActive) return 'text-text-secondary';
    if (isPaused) return 'text-warning';
    return 'text-accent';
  };

  const getStatusText = () => {
    if (!isActive) return 'Ready to Focus';
    if (isPaused) return 'Paused';
    return 'Focusing';
  };

  return (
    <div className="space-y-6">
      {/* Selected Task Display */}
      {selectedTask && (
        <div className={`
          p-4 rounded-lg border-2 transition-all duration-300
          ${isActive ? 'border-accent bg-accent/10 animate-pulse-slow' : 'border-border bg-surface/50'}
        `}>
          <div className="flex items-center space-x-3">
            <Icon 
              name="Target" 
              size={20} 
              color={isActive ? "var(--color-accent)" : "currentColor"} 
            />
            <div className="flex-1 text-left">
              <h3 className={`font-body font-medium ${isActive ? 'text-accent' : 'text-text-primary'}`}>
                {selectedTask.title}
              </h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedTask.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md font-caption"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Timer Display */}
      <div className="space-y-4">
        <div className={`text-6xl md:text-7xl font-mono font-bold ${getStatusColor()} transition-colors duration-300`}>
          {formatTime(timeRemaining)}
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            isActive && !isPaused ? 'bg-accent animate-pulse' : isPaused ?'bg-warning' : 'bg-text-secondary'
          }`} />
          <span className={`text-sm font-body ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="var(--color-surface)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="var(--color-accent)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
            className="transition-all duration-300 ease-smooth"
            style={{
              filter: isActive ? 'drop-shadow(0 0 8px var(--color-accent))' : 'none'
            }}
          />
        </svg>
        
        {/* Center Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-mono font-bold text-accent">
            {Math.round(getProgressPercentage())}%
          </span>
        </div>
      </div>

      {/* Session Info */}
      {isActive && (
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-surface/50 rounded-lg">
            <div className="text-sm text-text-secondary font-caption">Elapsed</div>
            <div className="text-lg font-mono font-bold text-text-primary">
              {formatTime(duration - timeRemaining)}
            </div>
          </div>
          <div className="p-3 bg-surface/50 rounded-lg">
            <div className="text-sm text-text-secondary font-caption">Remaining</div>
            <div className="text-lg font-mono font-bold text-text-primary">
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;