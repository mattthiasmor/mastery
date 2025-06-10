// src/pages/willpower-challenges/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import aMCCLevelVisualization from './components/aMCCLevelVisualization';
import ChallengeForm from './components/ChallengeForm';
import ActiveChallenge from './components/ActiveChallenge';
import ChallengeHistory from './components/ChallengeHistory';
import MotivationalMessage from './components/MotivationalMessage';

const WillpowerChallenges = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stats: {
      tasksCompleted: 47,
      focusHours: 128,
      streak: 12
    }
  });

  // aMCC level state (persists across sessions)
  const [aMCCLevel, setaMCCLevel] = useState(() => {
    const saved = localStorage.getItem('aMCCLevel');
    return saved ? parseFloat(saved) : 0;
  });

  // Challenge state
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [challengeHistory, setChallengeHistory] = useState(() => {
    const saved = localStorage.getItem('challengeHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [lastPerformance, setLastPerformance] = useState('');

  // Form state
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState(30); // minutes
  const [customDuration, setCustomDuration] = useState('');

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // Persist aMCC level to localStorage
  useEffect(() => {
    localStorage.setItem('aMCCLevel', aMCCLevel.toString());
  }, [aMCCLevel]);

  // Persist challenge history to localStorage
  useEffect(() => {
    localStorage.setItem('challengeHistory', JSON.stringify(challengeHistory));
  }, [challengeHistory]);

  // Timer effect
  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleChallengeComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeRemaining]);

  // Webhook integration for challenge events
  const sendWebhookEvent = async (eventType, data) => {
    try {
      // This would be replaced with actual webhook URL in production
      const webhookUrl = process.env.REACT_APP_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: eventType,
            timestamp: new Date().toISOString(),
            data: {
              aMCCLevel,
              ...data
            }
          })
        });
      }
    } catch (error) {
      console.error('Webhook error:', error);
    }
  };

  const handleCreateChallenge = () => {
    if (!taskDescription.trim()) {
      setStatusMessage('Please enter a task description');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    const duration = selectedTimeframe === 'custom' 
      ? parseInt(customDuration) * 60 
      : selectedTimeframe * 60;

    if (duration <= 0) {
      setStatusMessage('Please enter a valid duration');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    const challenge = {
      id: Date.now(),
      task: taskDescription,
      duration: duration,
      startTime: new Date(),
      status: 'active'
    };

    setCurrentChallenge(challenge);
    setTimeRemaining(duration);
    setIsActive(true);
    setTaskDescription('');
    setCustomDuration('');
    setStatusMessage(`Challenge started: "${taskDescription}"`);
    setTimeout(() => setStatusMessage(''), 3000);

    // Send webhook event
    sendWebhookEvent('challenge_started', {
      challengeId: challenge.id,
      task: challenge.task,
      duration: challenge.duration
    });
  };

  const handleChallengeComplete = () => {
    if (!currentChallenge) return;

    setIsActive(false);
    const completedChallenge = {
      ...currentChallenge,
      endTime: new Date(),
      status: 'completed',
      outcome: 'success',
      aMCCChange: 5
    };

    // Update aMCC level (success increases by 5%)
    const newLevel = Math.min(100, aMCCLevel + 5);
    setaMCCLevel(newLevel);
    setLastPerformance('success');

    // Add to history
    setChallengeHistory(prev => [completedChallenge, ...prev.slice(0, 9)]); // Keep last 10

    setCurrentChallenge(null);
    setStatusMessage('🎉 Challenge completed successfully! aMCC level increased by 5%');
    setTimeout(() => setStatusMessage(''), 5000);

    // Send webhook event
    sendWebhookEvent('challenge_completed', {
      challengeId: completedChallenge.id,
      outcome: 'success',
      aMCCChange: 5,
      newaMCCLevel: newLevel
    });
  };

  const handleChallengeSuccess = () => {
    handleChallengeComplete();
  };

  const handleChallengeFailure = () => {
    if (!currentChallenge) return;

    setIsActive(false);
    const failedChallenge = {
      ...currentChallenge,
      endTime: new Date(),
      status: 'failed',
      outcome: 'failure',
      aMCCChange: -10
    };

    // Update aMCC level (failure decreases by 10%)
    const newLevel = Math.max(0, aMCCLevel - 10);
    setaMCCLevel(newLevel);
    setLastPerformance('failure');

    // Add to history
    setChallengeHistory(prev => [failedChallenge, ...prev.slice(0, 9)]); // Keep last 10

    setCurrentChallenge(null);
    setStatusMessage('Challenge failed. aMCC level decreased by 10%. Try again!');
    setTimeout(() => setStatusMessage(''), 5000);

    // Send webhook event
    sendWebhookEvent('challenge_failed', {
      challengeId: failedChallenge.id,
      outcome: 'failure',
      aMCCChange: -10,
      newaMCCLevel: newLevel
    });
  };

  const handleStopChallenge = () => {
    if (!currentChallenge) return;

    setIsActive(false);
    setCurrentChallenge(null);
    setTimeRemaining(0);
    setStatusMessage('Challenge stopped');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background ambient-glow">
      <Sidebar 
        user={user}
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-60'}`}>
        <Header 
          onMenuToggle={toggleSidebar}
          user={user}
        />
        
        <main className="p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} color="#0d0d0d" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-text-primary">
                    Willpower Challenges
                  </h1>
                  <p className="text-text-secondary font-body">
                    Build mental resilience through timed challenges
                  </p>
                </div>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className="bg-surface/50 border border-border rounded-lg p-3 mb-4">
                  <p className="text-sm text-accent font-body">{statusMessage}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Challenge Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* aMCC Level Visualization */}
                <div className="card p-8 text-center">
                  <aMCCLevelVisualization 
                    level={aMCCLevel}
                    isActive={isActive}
                    lastPerformance={lastPerformance}
                  />
                </div>

                {/* Challenge Form or Active Challenge */}
                {!currentChallenge ? (
                  <div className="card p-6">
                    <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Create New Challenge
                    </h2>
                    <ChallengeForm
                      taskDescription={taskDescription}
                      selectedTimeframe={selectedTimeframe}
                      customDuration={customDuration}
                      onTaskDescriptionChange={setTaskDescription}
                      onTimeframeChange={setSelectedTimeframe}
                      onCustomDurationChange={setCustomDuration}
                      onCreateChallenge={handleCreateChallenge}
                    />
                  </div>
                ) : (
                  <div className="card p-6">
                    <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Active Challenge
                    </h2>
                    <ActiveChallenge
                      challenge={currentChallenge}
                      timeRemaining={timeRemaining}
                      isActive={isActive}
                      onSuccess={handleChallengeSuccess}
                      onFailure={handleChallengeFailure}
                      onStop={handleStopChallenge}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Motivational Message */}
                <MotivationalMessage 
                  aMCCLevel={aMCCLevel}
                  lastPerformance={lastPerformance}
                  challengeHistory={challengeHistory}
                />

                {/* Challenge History */}
                <ChallengeHistory 
                  history={challengeHistory}
                />

                {/* Quick Actions */}
                <div className="card p-6">
                  <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/focus-hub')}
                      className="w-full flex items-center space-x-3 p-3 bg-surface hover:bg-surface/80 rounded-lg transition-all duration-150"
                    >
                      <Icon name="Target" size={20} color="currentColor" />
                      <span className="text-sm font-body text-text-primary">
                        Focus Hub
                      </span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/task-management')}
                      className="w-full flex items-center space-x-3 p-3 bg-surface hover:bg-surface/80 rounded-lg transition-all duration-150"
                    >
                      <Icon name="CheckSquare" size={20} color="currentColor" />
                      <span className="text-sm font-body text-text-primary">
                        Manage Tasks
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WillpowerChallenges;