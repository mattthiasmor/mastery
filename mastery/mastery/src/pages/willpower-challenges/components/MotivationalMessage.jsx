// src/pages/willpower-challenges/components/MotivationalMessage.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const MotivationalMessage = ({ aMCCLevel, lastPerformance, challengeHistory }) => {
  // Calculate success rate at component level so both functions can access it
  const recentSuccesses = challengeHistory?.filter(c => c?.outcome === 'success')?.length || 0;
  const totalChallenges = challengeHistory?.length || 0;
  const successRate = totalChallenges > 0 ? (recentSuccesses / totalChallenges) * 100 : 0;

  const getMotivationalContent = () => {
    // Dynamic messages based on aMCC level and recent performance
    if (aMCCLevel >= 90) {
      return {
        title: "Mental Fortress Achieved! 🏰",
        message: "You've built extraordinary willpower. Your aMCC is operating at elite levels. Consider yourself a mental athlete!",
        icon: "Crown",
        color: "text-accent",
        bg: "bg-accent/10 border-accent/20"
      };
    }

    if (aMCCLevel >= 80) {
      return {
        title: "Willpower Warrior! ⚔️",
        message: "Your mental strength is impressive. You're in the top tier of self-control. Keep pushing those boundaries!",
        icon: "Zap",
        color: "text-success",
        bg: "bg-success/10 border-success/20"
      };
    }

    if (aMCCLevel >= 60) {
      return {
        title: "Strong Foundation Built 💪",
        message: "You're developing serious mental resilience. The aMCC is strengthening with each challenge you complete.",
        icon: "TrendingUp",
        color: "text-accent",
        bg: "bg-accent/10 border-accent/20"
      };
    }

    if (aMCCLevel >= 40) {
      return {
        title: "Momentum Building! 🚀",
        message: "You're making solid progress. Each challenge is literally rewiring your brain for better self-control.",
        icon: "Target",
        color: "text-warning",
        bg: "bg-warning/10 border-warning/20"
      };
    }

    if (aMCCLevel >= 20) {
      return {
        title: "Getting Started! 🌱",
        message: "Every expert was once a beginner. You're building the neural pathways for stronger willpower.",
        icon: "Seedling",
        color: "text-text-secondary",
        bg: "bg-surface/50 border-border"
      };
    }

    // Low level or just starting
    if (lastPerformance === 'failure') {
      return {
        title: "Resilience Training 🛡️",
        message: "Failure is the gym for willpower. Your aMCC gets stronger when you face challenges, even when you don't succeed.",
        icon: "Shield",
        color: "text-error",
        bg: "bg-error/10 border-error/20"
      };
    }

    return {
      title: "Begin Your Journey! ✨",
      message: "The anterior mid-cingulate cortex grows stronger with every challenge. Start building your mental muscle today!",
      icon: "Compass",
      color: "text-accent",
      bg: "bg-accent/10 border-accent/20"
    };
  };

  const getAdditionalTips = () => {
    // Ensure successRate is accessible within this function
    const currentSuccessRate = successRate;
    
    if (currentSuccessRate >= 80) {
      return [
        "Consider increasing challenge difficulty",
        "Try longer duration challenges",
        "Experiment with new types of tasks"
      ];
    }

    if (currentSuccessRate >= 60) {
      return [
        "You're building consistent habits",
        "Focus on maintaining your streak",
        "Challenge yourself gradually"
      ];
    }

    if (currentSuccessRate >= 40) {
      return [
        "Progress takes time - be patient",
        "Start with shorter challenges",
        "Consistency beats perfection"
      ];
    }

    return [
      "Every attempt builds neural pathways",
      "Start small and build momentum",
      "Celebrate every effort, not just success"
    ];
  };

  const content = getMotivationalContent();
  const tips = getAdditionalTips();

  return (
    <div className={`card p-6 border-2 ${content.bg}`}>
      <div className="flex items-start space-x-4 mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-current bg-opacity-10 ${content.color}`}>
          <Icon name={content.icon} size={24} color="currentColor" />
        </div>
        <div className="flex-1">
          <h2 className={`text-lg font-heading font-bold mb-2 ${content.color}`}>
            {content.title}
          </h2>
          <p className="text-sm text-text-secondary font-body leading-relaxed">
            {content.message}
          </p>
        </div>
      </div>

      {/* Progress Insight */}
      {challengeHistory?.length > 0 && (
        <div className="mb-4 p-3 bg-surface/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-text-secondary">Recent Performance</span>
            <span className={`text-sm font-mono font-bold ${
              successRate >= 70 ? 'text-success' : 
              successRate >= 50 ? 'text-warning' : 'text-error'
            }`}>
              {Math.round(successRate)}% success
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                successRate >= 70 ? 'bg-success' : 
                successRate >= 50 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div>
        <h3 className="text-sm font-heading font-semibold text-text-primary mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} color="currentColor" className="mr-2" />
          Tips for Growth
        </h3>
        <ul className="space-y-1">
          {tips?.map?.((tip, index) => (
            <li key={index} className="text-xs text-text-secondary font-body flex items-start">
              <span className="text-accent mr-2 font-bold">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Scientific Context */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Brain" size={16} color="var(--color-accent)" />
          <span className="text-xs font-heading font-semibold text-accent">
            Science Corner
          </span>
        </div>
        <p className="text-xs text-text-secondary font-body leading-relaxed">
          The anterior mid-cingulate cortex (aMCC) is your brain's willpower center. 
          Research shows it grows stronger when you do things you don't want to do, 
          building real neural resilience.
        </p>
      </div>
    </div>
  );
};

export default MotivationalMessage;