import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ user, isCollapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and quick access to all features'
    },
    {
      label: 'Tasks',
      path: '/task-management',
      icon: 'CheckSquare',
      tooltip: 'Manage your tasks and projects'
    },
    {
      label: 'Focus',
      path: '/focus-hub',
      icon: 'Target',
      tooltip: 'Focus sessions with timer and ambient sounds'
    },
    {
      label: 'Willpower',
      path: '/willpower-challenges',
      icon: 'Zap',
      tooltip: 'Build mental resilience through challenges'
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && !isCollapsed) {
      onToggle();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login-screen');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-90 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <nav 
        className={`
          fixed top-0 left-0 h-full bg-secondary border-r border-border z-100
          transition-transform duration-300 ease-smooth scrollbar-thin
          ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
          ${isMobile ? 'w-80' : 'w-60'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="#0d0d0d" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-heading font-semibold text-text-primary">
                  FocusFlow
                </span>
                <span className="text-xs text-text-secondary font-caption">
                  Productivity Suite
                </span>
              </div>
            </div>
            
            {/* Mobile Close Button */}
            {isMobile && (
              <button
                onClick={onToggle}
                className="p-2 rounded-md hover:bg-surface transition-colors duration-150"
              >
                <Icon name="X" size={20} color="currentColor" />
              </button>
            )}
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-error hover:bg-surface/50 rounded-md transition-all duration-150"
              >
                <Icon name="LogOut" size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-lg
                  transition-all duration-150 ease-smooth group
                  ${isActive(item.path) 
                    ? 'bg-surface text-accent border-l-2 border-accent' :'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }
                `}
                title={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color="currentColor"
                  className={`
                    transition-transform duration-150
                    ${isActive(item.path) ? 'scale-110' : 'group-hover:scale-105'}
                  `}
                />
                <span className="font-body font-medium">{item.label}</span>
                
                {/* Active Indicator */}
                {isActive(item.path) && (
                  <div className="ml-auto w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
                )}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>v1.0.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;