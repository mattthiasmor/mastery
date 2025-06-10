import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({ 
  item, 
  isActive, 
  onClick, 
  showTooltip = true,
  variant = 'default' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (onClick) {
      onClick(item.path);
    } else {
      navigate(item.path);
    }
  };

  const active = isActive !== undefined ? isActive : location.pathname === item.path;

  return (
    <button
      onClick={handleClick}
      className={`
        w-full flex items-center space-x-3 px-3 py-3 rounded-lg
        transition-all duration-150 ease-smooth group relative
        ${active 
          ? 'bg-surface text-accent border-l-2 border-accent shadow-md' 
          : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
        }
        ${variant === 'compact' ? 'py-2' : 'py-3'}
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-secondary
      `}
      title={showTooltip ? item.tooltip : undefined}
      aria-current={active ? 'page' : undefined}
    >
      {/* Icon */}
      <Icon 
        name={item.icon} 
        size={variant === 'compact' ? 18 : 20} 
        color="currentColor"
        className={`
          transition-transform duration-150 flex-shrink-0
          ${active ? 'scale-110' : 'group-hover:scale-105'}
        `}
      />
      
      {/* Label */}
      <span className={`
        font-body font-medium flex-1 text-left
        ${variant === 'compact' ? 'text-sm' : 'text-base'}
      `}>
        {item.label}
      </span>
      
      {/* Active Indicator */}
      {active && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      )}

      {/* Hover Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none
          ${active ? 'bg-accent/5' : 'bg-surface/20'}
        `}
      />

      {/* Notification Badge (if item has notifications) */}
      {item.notifications && item.notifications > 0 && (
        <div className="flex items-center justify-center w-5 h-5 bg-error text-white text-xs font-bold rounded-full">
          {item.notifications > 99 ? '99+' : item.notifications}
        </div>
      )}
    </button>
  );
};

export default NavigationItem;