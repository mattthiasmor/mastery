// src/pages/willpower-challenges/components/ChallengeForm.jsx
import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const ChallengeForm = ({
  taskDescription,
  selectedTimeframe,
  customDuration,
  onTaskDescriptionChange,
  onTimeframeChange,
  onCustomDurationChange,
  onCreateChallenge
}) => {
  const timeframeOptions = [
    { value: 5, label: '5 minutes', description: 'Quick challenge' },
    { value: 15, label: '15 minutes', description: 'Short focus' },
    { value: 30, label: '30 minutes', description: 'Standard session' },
    { value: 60, label: '1 hour', description: 'Deep work' },
    { value: 'custom', label: 'Custom', description: 'Set your own' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateChallenge();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Task Description */}
      <div>
        <label className="block text-sm font-caption text-text-secondary mb-2">
          Challenge Description
        </label>
        <Input
          type="text"
          value={taskDescription}
          onChange={(e) => onTaskDescriptionChange(e.target.value)}
          placeholder="What will you focus on? (e.g., 'Write 500 words', 'Study math problems')"
          className="w-full"
          required
        />
        <p className="text-xs text-text-secondary mt-1 font-body">
          Be specific about what you want to accomplish
        </p>
      </div>

      {/* Timeframe Selection */}
      <div>
        <label className="block text-sm font-caption text-text-secondary mb-3">
          Challenge Duration
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {timeframeOptions.map((option) => (
            <div key={option.value}>
              <label className="relative flex items-center p-4 bg-surface hover:bg-surface/80 rounded-lg border border-border transition-all duration-150 cursor-pointer">
                <input
                  type="radio"
                  name="timeframe"
                  value={option.value}
                  checked={selectedTimeframe === option.value}
                  onChange={(e) => onTimeframeChange(e.target.value === 'custom' ? 'custom' : parseInt(e.target.value))}
                  className="sr-only"
                />
                <div className={`
                  w-4 h-4 rounded-full border-2 mr-3 transition-all duration-150
                  ${selectedTimeframe === option.value 
                    ? 'bg-accent border-accent' :'border-border bg-transparent'
                  }
                `}>
                  {selectedTimeframe === option.value && (
                    <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-0.5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-body font-medium text-text-primary">
                    {option.label}
                  </div>
                  <div className="text-xs text-text-secondary font-caption">
                    {option.description}
                  </div>
                </div>
                {selectedTimeframe === option.value && (
                  <Icon name="Check" size={16} color="var(--color-accent)" />
                )}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Duration Input */}
      {selectedTimeframe === 'custom' && (
        <div className="animate-fade-in">
          <label className="block text-sm font-caption text-text-secondary mb-2">
            Custom Duration (minutes)
          </label>
          <Input
            type="number"
            value={customDuration}
            onChange={(e) => onCustomDurationChange(e.target.value)}
            placeholder="Enter duration in minutes"
            min="1"
            max="480"
            className="w-full"
            required
          />
          <p className="text-xs text-text-secondary mt-1 font-body">
            Choose between 1 and 480 minutes (8 hours)
          </p>
        </div>
      )}

      {/* Challenge Tips */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h3 className="text-sm font-heading font-semibold text-accent mb-2">
              Challenge Tips
            </h3>
            <ul className="text-xs text-text-secondary space-y-1 font-body">
              <li>• Choose a specific, measurable task</li>
              <li>• Start with shorter durations and build up</li>
              <li>• Remove distractions before starting</li>
              <li>• Focus on the process, not just the outcome</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        iconName="Play"
        className="bg-accent hover:bg-accent/90 text-primary font-semibold"
      >
        Start Challenge
      </Button>
    </form>
  );
};

export default ChallengeForm;