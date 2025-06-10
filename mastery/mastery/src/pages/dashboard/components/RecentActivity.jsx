import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  // Mock recent activity data
  const recentActivities = [
    {
      id: 1,
      type: 'task_completed',
      title: 'Completed "Review quarterly reports"',
      description: 'Task moved to Done column',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 2,
      type: 'focus_session',
      title: 'Focus session completed',
      description: '45 minutes on "Website redesign project"',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Target',
      color: 'accent'
    },
    {
      id: 3,
      type: 'note_created',
      title: 'Created new note',
      description: '"Meeting notes - Product roadmap discussion"',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'FileText',
      color: 'warning'
    },
    {
      id: 4,
      type: 'willpower_challenge',
      title: 'Willpower challenge completed',
      description: 'Successfully completed 20-minute meditation challenge',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'Zap',
      color: 'error'
    },
    {
      id: 5,
      type: 'task_created',
      title: 'Created new task',
      description: '"Prepare presentation for client meeting"',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      icon: 'Plus',
      color: 'text-secondary'
    }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getActivityColor = (color) => {
    const colorMap = {
      'success': 'text-success',
      'accent': 'text-accent',
      'warning': 'text-warning',
      'error': 'text-error',
      'text-secondary': 'text-text-secondary'
    };
    return colorMap[color] || 'text-text-secondary';
  };

  const getActivityBgColor = (color) => {
    const colorMap = {
      'success': 'bg-success/10',
      'accent': 'bg-accent/10',
      'warning': 'bg-warning/10',
      'error': 'bg-error/10',
      'text-secondary': 'bg-surface/50'
    };
    return colorMap[color] || 'bg-surface/50';
  };

  return (
    <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Recent Activity
        </h2>
        <button className="text-sm text-accent hover:text-accent/80 font-body transition-colors duration-150">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-surface/30 transition-all duration-150 group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Activity Icon */}
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              ${getActivityBgColor(activity.color)}
              group-hover:scale-105 transition-transform duration-150
            `}>
              <Icon 
                name={activity.icon} 
                size={18} 
                color="currentColor"
                className={getActivityColor(activity.color)}
              />
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary font-body truncate">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-caption mt-1">
                    {activity.description}
                  </p>
                </div>
                
                {/* Timestamp */}
                <div className="flex-shrink-0 ml-4">
                  <span className="text-xs text-text-secondary font-caption">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no activities) */}
      {recentActivities.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-surface rounded-full flex items-center justify-center mb-4">
            <Icon name="Activity" size={32} color="var(--color-text-secondary)" />
          </div>
          <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
            No Recent Activity
          </h3>
          <p className="text-text-secondary font-body">
            Start working on tasks, focus sessions, or notes to see your activity here.
          </p>
        </div>
      )}

      {/* Activity Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-success font-mono">
              {recentActivities.filter(a => a.type === 'task_completed').length}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Tasks Completed
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-accent font-mono">
              {recentActivities.filter(a => a.type === 'focus_session').length}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Focus Sessions
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-warning font-mono">
              {recentActivities.filter(a => a.type === 'note_created').length}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Notes Created
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-error font-mono">
              {recentActivities.filter(a => a.type === 'willpower_challenge').length}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Challenges
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;