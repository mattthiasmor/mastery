import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import TimerDisplay from './components/TimerDisplay';
import TaskSelector from './components/TaskSelector';
import DurationSelector from './components/DurationSelector';
import AmbientSoundSelector from './components/AmbientSoundSelector';
import SessionControls from './components/SessionControls';
import SessionStats from './components/SessionStats';

const FocusHub = () => {
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

  // Session state
  const [selectedTask, setSelectedTask] = useState(null);
  const [duration, setDuration] = useState(25 * 60); // 25 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [ambientSound, setAmbientSound] = useState('none');
  const [volume, setVolume] = useState(50);
  const [statusMessage, setStatusMessage] = useState('');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);

  const intervalRef = useRef(null);

  // Mock tasks data
  const mockTasks = [
    {
      id: 1,
      title: "Complete React Dashboard",
      tags: ["react", "frontend", "urgent"],
      status: "in-progress",
      focusTime: 45,
      lastFocusSession: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: "Review API Documentation",
      tags: ["backend", "documentation"],
      status: "todo",
      focusTime: 30,
      lastFocusSession: null
    },
    {
      id: 3,
      title: "Design System Updates",
      tags: ["design", "ui", "components"],
      status: "in-progress",
      focusTime: 90,
      lastFocusSession: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      title: "Database Optimization",
      tags: ["database", "performance"],
      status: "todo",
      focusTime: 0,
      lastFocusSession: null
    },
    {
      id: 5,
      title: "User Testing Analysis",
      tags: ["ux", "research", "analysis"],
      status: "todo",
      focusTime: 15,
      lastFocusSession: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  // Timer effect
  useEffect(() => {
    if (isActive && !isPaused && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, timeRemaining]);

  // Update time remaining when duration changes
  useEffect(() => {
    if (!isActive) {
      setTimeRemaining(duration);
    }
  }, [duration, isActive]);

  const handleStartSession = () => {
    if (!selectedTask) {
      setStatusMessage('Please select a task before starting a focus session');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    setIsActive(true);
    setIsPaused(false);
    setSessionStartTime(new Date());
    setStatusMessage(`Focus session started for "${selectedTask.title}"`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handlePauseSession = () => {
    setIsPaused(!isPaused);
    setStatusMessage(isPaused ? 'Session resumed' : 'Session paused');
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const handleStopSession = () => {
    const focusedTime = Math.floor((duration - timeRemaining) / 60);
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(duration);
    setSessionStartTime(null);
    
    if (focusedTime > 0) {
      setTotalFocusTime(prev => prev + focusedTime);
      setStatusMessage(`Session stopped. You focused for ${focusedTime} minutes.`);
    } else {
      setStatusMessage('Session stopped');
    }
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSessionComplete = () => {
    setIsActive(false);
    setIsPaused(false);
    setCompletedSessions(prev => prev + 1);
    setTotalFocusTime(prev => prev + Math.floor(duration / 60));
    setTimeRemaining(duration);
    setSessionStartTime(null);
    setStatusMessage(`🎉 Focus session completed! Great work on "${selectedTask?.title}"`);
    setTimeout(() => setStatusMessage(''), 5000);
  };

  const handleTaskSelect = (task) => {
    if (isActive) {
      setStatusMessage('Cannot change task during an active session');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }
    setSelectedTask(task);
    setStatusMessage(`Task selected: "${task.title}"`);
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const handleDurationChange = (newDuration) => {
    if (isActive) {
      setStatusMessage('Cannot change duration during an active session');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }
    setDuration(newDuration);
  };

  const handleSoundChange = (sound) => {
    setAmbientSound(sound);
    setStatusMessage(`Ambient sound: ${sound === 'none' ? 'None' : sound}`);
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={24} color="#0d0d0d" />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-text-primary">
                    Focus Hub
                  </h1>
                  <p className="text-text-secondary font-body">
                    Deep work sessions with ambient focus tools
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
              {/* Main Focus Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Task Selection */}
                <div className="card p-6">
                  <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Select Task
                  </h2>
                  <TaskSelector
                    tasks={mockTasks}
                    selectedTask={selectedTask}
                    onTaskSelect={handleTaskSelect}
                    disabled={isActive}
                  />
                </div>

                {/* Timer Display */}
                <div className="card p-8 text-center">
                  <TimerDisplay
                    timeRemaining={timeRemaining}
                    duration={duration}
                    isActive={isActive}
                    isPaused={isPaused}
                    selectedTask={selectedTask}
                  />
                  
                  {/* Session Controls */}
                  <div className="mt-8">
                    <SessionControls
                      isActive={isActive}
                      isPaused={isPaused}
                      onStart={handleStartSession}
                      onPause={handlePauseSession}
                      onStop={handleStopSession}
                      disabled={!selectedTask}
                    />
                  </div>
                </div>

                {/* Duration Selection */}
                <div className="card p-6">
                  <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Session Duration
                  </h2>
                  <DurationSelector
                    duration={duration}
                    onDurationChange={handleDurationChange}
                    disabled={isActive}
                  />
                </div>
              </div>

              {/* Sidebar Controls */}
              <div className="space-y-6">
                {/* Session Stats */}
                <SessionStats
                  completedSessions={completedSessions}
                  totalFocusTime={totalFocusTime}
                  currentStreak={user.stats.streak}
                />

                {/* Ambient Sound Controls */}
                <div className="card p-6">
                  <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Ambient Sounds
                  </h2>
                  <AmbientSoundSelector
                    selectedSound={ambientSound}
                    volume={volume}
                    onSoundChange={handleSoundChange}
                    onVolumeChange={setVolume}
                  />
                </div>

                {/* Quick Actions */}
                <div className="card p-6">
                  <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate('/task-management')}
                      className="w-full flex items-center space-x-3 p-3 bg-surface hover:bg-surface/80 rounded-lg transition-all duration-150"
                    >
                      <Icon name="CheckSquare" size={20} color="currentColor" />
                      <span className="text-sm font-body text-text-primary">
                        Manage Tasks
                      </span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/willpower-challenges')}
                      className="w-full flex items-center space-x-3 p-3 bg-surface hover:bg-surface/80 rounded-lg transition-all duration-150"
                    >
                      <Icon name="Zap" size={20} color="currentColor" />
                      <span className="text-sm font-body text-text-primary">
                        Willpower Challenge
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

export default FocusHub;