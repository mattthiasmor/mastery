import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = ({ onMenuToggle, user }) => {
  const location = useLocation();

  const getPageTitle = () => {
    const pathMap = {
      '/dashboard': 'Dashboard',
      '/task-management': 'Task Management',
      '/focus-hub': 'Focus Hub',
      '/willpower-challenges': 'Willpower Challenges'
    };
    return pathMap[location.pathname] || 'FocusFlow';
  };

  const getPageDescription = () => {
    const descriptionMap = {
      '/dashboard': 'Your productivity overview and quick access hub',
      '/task-management': 'Organize and track your tasks efficiently',
      '/focus-hub': 'Deep work sessions with ambient focus tools',
      '/willpower-challenges': 'Build mental resilience through targeted challenges'
    };
    return descriptionMap[location.pathname] || '';
  };

  return (
    <header className="bg-primary border-b border-border sticky top-0 z-80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Section - Mobile Menu & Page Info */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-md hover:bg-surface transition-colors duration-150 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Icon name="Menu" size={20} color="currentColor" />
          </button>

          {/* Page Title & Description */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-heading font-semibold text-text-primary">
              {getPageTitle()}
            </h1>
            {getPageDescription() && (
              <p className="text-sm text-text-secondary font-body">
                {getPageDescription()}
              </p>
            )}
          </div>

          {/* Mobile Page Title */}
          <div className="sm:hidden">
            <h1 className="text-base font-heading font-medium text-text-primary">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              className="p-2 rounded-md hover:bg-surface transition-all duration-150 hover:scale-105"
              title="Notifications"
            >
              <Icon name="Bell" size={18} color="currentColor" />
            </button>
            
            <button
              className="p-2 rounded-md hover:bg-surface transition-all duration-150 hover:scale-105"
              title="Settings"
            >
              <Icon name="Settings" size={18} color="currentColor" />
            </button>
          </div>

          {/* User Profile Indicator */}
          {user && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-surface/50 rounded-lg">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="#0d0d0d" />
              </div>
              <span className="hidden sm:block text-sm font-body text-text-primary">
                {user.name || 'User'}
              </span>
            </div>
          )}

          {/* Focus Mode Toggle */}
          <button
            className="flex items-center space-x-2 px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-lg transition-all duration-150 hover:scale-105"
            title="Toggle Focus Mode"
          >
            <Icon name="Eye" size={16} color="currentColor" />
            <span className="hidden lg:block text-sm font-body text-text-secondary">
              Focus
            </span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="h-1 bg-surface">
        <div 
          className="h-full bg-gradient-to-r from-accent to-success transition-all duration-300"
          style={{ width: '35%' }}
        />
      </div>
    </header>
  );
};

export default Header;