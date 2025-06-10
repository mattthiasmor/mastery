import React from 'react';
import Icon from 'components/AppIcon';

const QuickStats = ({ user, getMotivationalMessage }) => {
  // Mock daily statistics
  const dailyStats = {
    tasksCompleted: 8,
    totalTasks: 12,
    focusTime: 150, // minutes
    focusGoal: 240, // minutes
    notesCreated: 3,
    willpowerLevel: 85,
    streak: 7
  };

  const completionPercentage = Math.round((dailyStats.tasksCompleted / dailyStats.totalTasks) * 100);
  const focusPercentage = Math.round((dailyStats.focusTime / dailyStats.focusGoal) * 100);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'accent';
    if (percentage >= 40) return 'warning';
    return 'error';
  };

  const ProgressBar = ({ percentage, color, size = 'md' }) => {
    const sizeClasses = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    };

    const colorClasses = {
      success: 'bg-success',
      accent: 'bg-accent',
      warning: 'bg-warning',
      error: 'bg-error'
    };

    return (
      <div className={`w-full ${sizeClasses[size]} bg-surface rounded-full overflow-hidden`}>
        <div 
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Progress Card */}
      <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Today's Progress
          </h3>
          <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={18} color="var(--color-accent)" />
          </div>
        </div>

        {/* Task Completion */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-text-secondary">Tasks Completed</span>
            <span className="text-sm font-mono text-text-primary">
              {dailyStats.tasksCompleted}/{dailyStats.totalTasks}
            </span>
          </div>
          <ProgressBar 
            percentage={completionPercentage} 
            color={getProgressColor(completionPercentage)} 
          />
          <div className="mt-2 text-xs text-text-secondary font-caption">
            {completionPercentage}% complete
          </div>
        </div>

        {/* Focus Time */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-text-secondary">Focus Time</span>
            <span className="text-sm font-mono text-text-primary">
              {formatTime(dailyStats.focusTime)} / {formatTime(dailyStats.focusGoal)}
            </span>
          </div>
          <ProgressBar 
            percentage={focusPercentage} 
            color={getProgressColor(focusPercentage)} 
          />
          <div className="mt-2 text-xs text-text-secondary font-caption">
            {focusPercentage}% of daily goal
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Star" size={18} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
            <p className="text-sm font-body text-text-primary">
              {getMotivationalMessage(completionPercentage)}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Overview Card */}
      <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Overview
          </h3>
          <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={18} color="var(--color-success)" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Notes Created */}
          <div className="text-center p-4 bg-surface/30 rounded-lg">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="FileText" size={20} color="var(--color-warning)" />
            </div>
            <div className="text-xl font-bold text-text-primary font-mono">
              {dailyStats.notesCreated}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Notes Created
            </div>
          </div>

          {/* Willpower Level */}
          <div className="text-center p-4 bg-surface/30 rounded-lg">
            <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Zap" size={20} color="var(--color-error)" />
            </div>
            <div className="text-xl font-bold text-text-primary font-mono">
              {dailyStats.willpowerLevel}%
            </div>
            <div className="text-xs text-text-secondary font-caption">
              aMCC Level
            </div>
          </div>

          {/* Current Streak */}
          <div className="text-center p-4 bg-surface/30 rounded-lg">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Flame" size={20} color="var(--color-accent)" />
            </div>
            <div className="text-xl font-bold text-text-primary font-mono">
              {dailyStats.streak}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Day Streak
            </div>
          </div>

          {/* Total Focus */}
          <div className="text-center p-4 bg-surface/30 rounded-lg">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Icon name="Clock" size={20} color="var(--color-success)" />
            </div>
            <div className="text-xl font-bold text-text-primary font-mono">
              {user.stats.focusHours}h
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Total Focus
            </div>
          </div>
        </div>

        {/* Weekly Progress Indicator */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-text-secondary">Weekly Progress</span>
            <span className="text-sm font-mono text-accent">78%</span>
          </div>
          <ProgressBar percentage={78} color="accent" size="sm" />
          <div className="mt-2 text-xs text-text-secondary font-caption">
            5 of 7 days completed this week
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;