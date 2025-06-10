import React from 'react';
import Icon from '../AppIcon';

const MobileNavToggle = ({ isOpen, onToggle, className = "" }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        p-2 rounded-md hover:bg-surface transition-all duration-150 ease-smooth
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
        lg:hidden ${className}
      `}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      <div className="relative w-5 h-5">
        {/* Hamburger Icon */}
        <div 
          className={`
            absolute inset-0 transition-all duration-200 ease-smooth
            ${isOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}
          `}
        >
          <Icon name="Menu" size={20} color="currentColor" />
        </div>
        
        {/* Close Icon */}
        <div 
          className={`
            absolute inset-0 transition-all duration-200 ease-smooth
            ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}
          `}
        >
          <Icon name="X" size={20} color="currentColor" />
        </div>
      </div>
    </button>
  );
};

export default MobileNavToggle;