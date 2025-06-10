import React, { useState } from 'react';
import Icon from '../AppImage';
import Image from '../AppImage';

const UserProfileHeader = ({ user, onLogout, compact = false }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('authToken');
      window.location.href = '/login-screen';
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`relative ${compact ? 'p-2' : 'p-4'} border-b border-border`}>
      {/* User Info Display */}
      <div 
        className={`
          flex items-center space-x-3 cursor-pointer group
          ${compact ? 'mb-2' : 'mb-3'}
        `}
        onClick={toggleDropdown}
      >
        {/* Avatar */}
        <div className="relative">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name || 'User Avatar'}
              className={`
                ${compact ? 'w-8 h-8' : 'w-10 h-10'} 
                rounded-full object-cover border-2 border-surface
              `}
            />
          ) : (
            <div 
              className={`
                ${compact ? 'w-8 h-8' : 'w-10 h-10'} 
                bg-surface rounded-full flex items-center justify-center
                border-2 border-surface group-hover:border-accent transition-colors duration-150
              `}
            >
              <Icon 
                name="User" 
                size={compact ? 16 : 20} 
                color="currentColor" 
              />
            </div>
          )}
          
          {/* Online Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-secondary rounded-full" />
        </div>

        {/* User Details */}
        <div className="flex-1 min-w-0">
          <p className={`
            ${compact ? 'text-sm' : 'text-base'} 
            font-medium text-text-primary truncate font-body
          `}>
            {user.name || user.email?.split('@')[0] || 'User'}
          </p>
          {!compact && (
            <p className="text-xs text-text-secondary truncate font-caption">
              {user.email}
            </p>
          )}
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          color="currentColor"
          className={`
            text-text-secondary group-hover:text-text-primary
            transition-all duration-150
            ${showDropdown ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </div>

      {/* User Stats (if not compact) */}
      {!compact && user.stats && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div className="text-sm font-bold text-accent font-mono">
              {user.stats.tasksCompleted || 0}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Tasks
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-success font-mono">
              {user.stats.focusHours || 0}h
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Focus
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-warning font-mono">
              {user.stats.streak || 0}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Streak
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-surface border border-border rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="py-2">
            {/* Profile Link */}
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors duration-150">
              <Icon name="User" size={16} />
              <span>Profile Settings</span>
            </button>
            
            {/* Preferences */}
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors duration-150">
              <Icon name="Settings" size={16} />
              <span>Preferences</span>
            </button>
            
            {/* Theme Toggle */}
            <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors duration-150">
              <Icon name="Moon" size={16} />
              <span>Dark Mode</span>
              <div className="ml-auto w-8 h-4 bg-accent rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-primary rounded-full" />
              </div>
            </button>
            
            <div className="border-t border-border my-2" />
            
            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors duration-150"
            >
              <Icon name="LogOut" size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop for dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default UserProfileHeader;