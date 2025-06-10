import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from 'components/ui/Sidebar';
import Header from 'components/ui/Header';
import RecentActivity from './components/RecentActivity';
import QuickStats from './components/QuickStats';
import QuickAccessCard from './components/QuickAccessCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [user, setUser] = useState(null);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    stats: {
      tasksCompleted: 24,
      focusHours: 18,
      streak: 7
    }
  };

  // Mock inspirational quotes
  const inspirationalQuotes = [
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "Don\'t be afraid to give up the good to go for the great.",
      author: "John D. Rockefeller"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle"
    }
  ];

  // Quick access cards data
  const quickAccessCards = [
    {
      id: 'tasks',
      title: 'Task Management',
      description: 'Organize your work with Kanban boards',
      icon: 'CheckSquare',
      route: '/task-management',
      color: 'accent',
      stats: '12 active tasks'
    },
    {
      id: 'focus',
      title: 'Focus Hub',
      description: 'Deep work sessions with ambient sounds',
      icon: 'Target',
      route: '/focus-hub',
      color: 'success',
      stats: '2.5h today'
    },
    {
      id: 'notes',
      title: 'Notes',
      description: 'Rich-text note taking and organization',
      icon: 'FileText',
      route: '/notes',
      color: 'warning',
      stats: '8 notes'
    },
    {
      id: 'willpower',
      title: 'Willpower Challenges',
      description: 'Build mental resilience through challenges',
      icon: 'Zap',
      route: '/willpower-challenges',
      color: 'error',
      stats: '85% aMCC level'
    }
  ];

  useEffect(() => {
    // Simulate user authentication check
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login-screen');
      return;
    }
    setUser(mockUser);

    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, [navigate]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = (completionPercentage) => {
    if (completionPercentage >= 80) {
      return "Outstanding progress! You're crushing your goals today! 🚀";
    } else if (completionPercentage >= 60) {
      return "Great momentum! Keep pushing forward to reach your targets! 💪";
    } else if (completionPercentage >= 40) {
      return "You're making steady progress. Every step counts! 🌟";
    } else if (completionPercentage >= 20) {
      return "Good start! There's still time to make today amazing! ⭐";
    } else {
      return "Every journey begins with a single step. You've got this! 🌱";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background ambient-glow">
      {/* Sidebar */}
      <Sidebar 
        user={user}
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-60'}`}>
        {/* Header */}
        <Header 
          onMenuToggle={handleSidebarToggle}
          user={user}
        />

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Welcome Section */}
          <div className="reveal-stagger">
            <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                    {getGreeting()}, {user.name}! 👋
                  </h1>
                  <p className="text-text-secondary font-body">
                    Ready to make today productive and meaningful?
                  </p>
                </div>
                
                {/* Current Date */}
                <div className="text-right">
                  <div className="text-sm text-text-secondary font-caption">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-lg font-mono text-accent">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              {/* Inspirational Quote */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <blockquote className="text-lg lg:text-xl font-body text-text-primary italic mb-2">
                    "{inspirationalQuotes[currentQuote].text}"
                  </blockquote>
                  <cite className="text-sm text-text-secondary font-caption">
                    — {inspirationalQuotes[currentQuote].author}
                  </cite>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="reveal-stagger">
            <QuickStats 
              user={user}
              getMotivationalMessage={getMotivationalMessage}
            />
          </div>

          {/* Quick Access Grid */}
          <div className="reveal-stagger">
            <div className="mb-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Quick Access
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickAccessCards.map((card, index) => (
                  <div key={card.id} className="reveal-stagger" style={{ animationDelay: `${index * 100}ms` }}>
                    <QuickAccessCard 
                      card={card}
                      onClick={() => navigate(card.route)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="reveal-stagger">
            <RecentActivity />
          </div>

          {/* Footer */}
          <div className="reveal-stagger">
            <div className="text-center py-6 border-t border-border">
              <p className="text-sm text-text-secondary font-caption">
                &copy; {new Date().getFullYear()} Mastery. Empowering your productivity journey.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;