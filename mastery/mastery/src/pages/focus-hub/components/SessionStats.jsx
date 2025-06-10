import React from 'react';
import Icon from 'components/AppIcon';

const SessionStats = ({ completedSessions, totalFocusTime, currentStreak }) => {
  const formatFocusTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStreakMessage = () => {
    if (currentStreak === 0) return 'Start your streak!';
    if (currentStreak < 5) return 'Building momentum';
    if (currentStreak < 10) return 'Great consistency!';
    if (currentStreak < 20) return 'Focus master!';
    return 'Legendary streak!';
  };

  const getStreakColor = () => {
    if (currentStreak === 0) return 'text-text-secondary';
    if (currentStreak < 5) return 'text-warning';
    if (currentStreak < 10) return 'text-accent';
    return 'text-success';
  };

  const stats = [
    {
      label: 'Sessions Today',
      value: completedSessions,
      icon: 'Target',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Focus Time',
      value: formatFocusTime(totalFocusTime),
      icon: 'Clock',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
      icon: 'Flame',
      color: getStreakColor(),
      bgColor: currentStreak > 0 ? 'bg-warning/10' : 'bg-surface/50'
    }
  ];

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} color="var(--color-accent)" />
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Session Stats
        </h2>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className={`p-3 rounded-lg ${stat.bgColor} transition-all duration-150 hover:scale-105`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center">
                <Icon name={stat.icon} size={16} color={stat.color.replace('text-', 'var(--color-')} />
              </div>
              
              <div className="flex-1">
                <div className="text-xs text-text-secondary font-caption">
                  {stat.label}
                </div>
                <div className={`text-lg font-mono font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Streak Message */}
      <div className="mt-4 p-3 bg-surface/30 rounded-lg text-center">
        <div className={`text-sm font-body ${getStreakColor()}`}>
          {getStreakMessage()}
        </div>
        {currentStreak > 0 && (
          <div className="text-xs text-text-secondary font-caption mt-1">
            Keep it up! Don't break the chain.
          </div>
        )}
      </div>

      {/* Progress Indicators */}
      <div className="mt-4 space-y-3">
        {/* Daily Goal Progress */}
        <div>
          <div className="flex items-center justify-between text-xs text-text-secondary font-caption mb-1">
            <span>Daily Goal</span>
            <span>{completedSessions}/4 sessions</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((completedSessions / 4) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Weekly Focus Time */}
        <div>
          <div className="flex items-center justify-between text-xs text-text-secondary font-caption mb-1">
            <span>Weekly Target</span>
            <span>{formatFocusTime(totalFocusTime)}/10h</span>
          </div>
          <div className="w-full bg-surface rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((totalFocusTime / 600) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievement Badge */}
      {completedSessions >= 4 && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg text-center">
          <Icon name="Award" size={20} color="var(--color-accent)" className="mx-auto mb-1" />
          <div className="text-sm font-body text-accent">
            Daily Goal Achieved! 🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionStats;