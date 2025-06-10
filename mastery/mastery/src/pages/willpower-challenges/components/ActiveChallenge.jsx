// src/pages/willpower-challenges/components/ActiveChallenge.jsx
import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ActiveChallenge = ({
  challenge,
  timeRemaining,
  isActive,
  onSuccess,
  onFailure,
  onStop
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((challenge?.duration - timeRemaining) / challenge?.duration) * 100 || 0;
  };

  const getTimeColor = () => {
    const percentRemaining = (timeRemaining / challenge?.duration) * 100;
    if (percentRemaining <= 10) return 'text-error';
    if (percentRemaining <= 25) return 'text-warning';
    return 'text-accent';
  };

  if (!challenge) return null;

  return (
    <div className="space-y-6">
      {/* Challenge Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Target" size={20} color="#0d0d0d" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-text-primary mb-1">
              {challenge.task}
            </h3>
            <p className="text-sm text-text-secondary font-body">
              Started at {challenge.startTime?.toLocaleTimeString()}
            </p>
          </div>
          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-accent animate-pulse' : 'bg-text-secondary'}`} />
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center space-y-4">
        <div className={`text-6xl md:text-7xl font-mono font-bold transition-colors duration-300 ${getTimeColor()}`}>
          {formatTime(timeRemaining)}
        </div>
        
        <div className="text-sm font-body text-text-secondary">
          {timeRemaining > 0 ? 'Time Remaining' : 'Challenge Complete!'}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-caption text-text-secondary">Progress</span>
          <span className="text-sm font-mono font-bold text-accent">
            {Math.round(getProgressPercentage())}%
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-3">
          <div 
            className="h-3 bg-accent rounded-full transition-all duration-300 ease-smooth"
            style={{
              width: `${getProgressPercentage()}%`,
              boxShadow: isActive ? '0 0 8px rgba(249, 248, 113, 0.5)' : 'none'
            }}
          />
        </div>
      </div>

      {/* Challenge Controls */}
      <div className="space-y-4">
        {timeRemaining === 0 ? (
          // Challenge completion buttons
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={onSuccess}
              variant="success"
              size="lg"
              fullWidth
              iconName="CheckCircle"
              className="bg-success hover:bg-success/90 text-white font-semibold"
            >
              Success!
            </Button>
            <Button
              onClick={onFailure}
              variant="danger"
              size="lg"
              fullWidth
              iconName="XCircle"
              className="bg-error hover:bg-error/90 text-white font-semibold"
            >
              Failed
            </Button>
          </div>
        ) : (
          // Active challenge controls
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={onSuccess}
              variant="success"
              size="md"
              fullWidth
              iconName="CheckCircle"
              className="bg-success hover:bg-success/90 text-white"
            >
              Complete
            </Button>
            <Button
              onClick={onFailure}
              variant="danger"
              size="md"
              fullWidth
              iconName="XCircle"
              className="bg-error hover:bg-error/90 text-white"
            >
              Give Up
            </Button>
            <Button
              onClick={onStop}
              variant="secondary"
              size="md"
              fullWidth
              iconName="Square"
            >
              Stop
            </Button>
          </div>
        )}
      </div>

      {/* Challenge Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface/50 rounded-lg p-3 text-center">
          <div className="text-sm text-text-secondary font-caption mb-1">Duration</div>
          <div className="text-lg font-mono font-bold text-text-primary">
            {Math.round(challenge.duration / 60)}m
          </div>
        </div>
        <div className="bg-surface/50 rounded-lg p-3 text-center">
          <div className="text-sm text-text-secondary font-caption mb-1">Elapsed</div>
          <div className="text-lg font-mono font-bold text-text-primary">
            {formatTime(challenge.duration - timeRemaining)}
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center p-4 bg-gradient-to-r from-accent/5 to-success/5 rounded-lg border border-accent/10">
        <p className="text-sm font-body text-text-secondary">
          {timeRemaining === 0 
            ? "🎯 Time's up! How did you do?"
            : "💪 Stay focused. Every second builds your willpower."
          }
        </p>
      </div>
    </div>
  );
};

export default ActiveChallenge;