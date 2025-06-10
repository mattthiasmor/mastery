// src/pages/willpower-challenges/components/ChallengeHistory.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const ChallengeHistory = ({ history }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const getOutcomeIcon = (outcome) => {
    switch (outcome) {
      case 'success':
        return 'CheckCircle';
      case 'failure':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'success':
        return 'text-success';
      case 'failure':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getaMCCChangeDisplay = (change) => {
    if (change > 0) {
      return {
        text: `+${change}%`,
        color: 'text-success',
        icon: 'TrendingUp'
      };
    } else if (change < 0) {
      return {
        text: `${change}%`,
        color: 'text-error',
        icon: 'TrendingDown'
      };
    }
    return {
      text: '0%',
      color: 'text-text-secondary',
      icon: 'Minus'
    };
  };

  if (!history || history.length === 0) {
    return (
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="History" size={20} color="currentColor" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Challenge History
          </h2>
        </div>
        
        <div className="text-center py-8">
          <Icon name="FileText" size={48} color="var(--color-text-secondary)" className="mx-auto mb-3" />
          <p className="text-text-secondary font-body mb-2">
            No challenges completed yet
          </p>
          <p className="text-sm text-text-secondary font-caption">
            Complete your first challenge to see it here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="History" size={20} color="currentColor" />
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Recent Challenges
          </h2>
        </div>
        <span className="text-sm text-text-secondary font-caption">
          {history.length} total
        </span>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {history.map((challenge, index) => {
          const aMCCChange = getaMCCChangeDisplay(challenge.aMCCChange || 0);
          
          return (
            <div 
              key={challenge.id || index}
              className="bg-surface/50 border border-border rounded-lg p-4 hover:bg-surface/70 transition-all duration-150"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getOutcomeIcon(challenge.outcome)} 
                    size={16} 
                    color={`var(--color-${challenge.outcome === 'success' ? 'success' : challenge.outcome === 'failure' ? 'error' : 'text-secondary'})`}
                  />
                  <span className="text-sm font-body text-text-primary line-clamp-1">
                    {challenge.task}
                  </span>
                </div>
                <div className={`flex items-center space-x-1 ${aMCCChange.color}`}>
                  <Icon name={aMCCChange.icon} size={12} color="currentColor" />
                  <span className="text-xs font-mono font-semibold">
                    {aMCCChange.text}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} color="currentColor" />
                    <span className="font-caption">{formatDuration(challenge.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} color="currentColor" />
                    <span className="font-caption">{formatDate(challenge.endTime)}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-caption ${getOutcomeColor(challenge.outcome)} bg-current bg-opacity-10`}>
                  {challenge.outcome}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-mono font-bold text-success">
                {history.filter(c => c.outcome === 'success').length}
              </div>
              <div className="text-xs text-text-secondary font-caption">Success</div>
            </div>
            <div>
              <div className="text-lg font-mono font-bold text-error">
                {history.filter(c => c.outcome === 'failure').length}
              </div>
              <div className="text-xs text-text-secondary font-caption">Failed</div>
            </div>
            <div>
              <div className="text-lg font-mono font-bold text-accent">
                {Math.round((history.filter(c => c.outcome === 'success').length / history.length) * 100)}%
              </div>
              <div className="text-xs text-text-secondary font-caption">Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeHistory;