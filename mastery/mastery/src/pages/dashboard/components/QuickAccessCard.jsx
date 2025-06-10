import React from 'react';
import Icon from 'components/AppIcon';

const QuickAccessCard = ({ card, onClick }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      'accent': {
        bg: 'bg-accent/10',
        border: 'border-accent/20',
        icon: 'bg-accent/20',
        iconColor: 'var(--color-accent)',
        hover: 'hover:bg-accent/20'
      },
      'success': {
        bg: 'bg-success/10',
        border: 'border-success/20',
        icon: 'bg-success/20',
        iconColor: 'var(--color-success)',
        hover: 'hover:bg-success/20'
      },
      'warning': {
        bg: 'bg-warning/10',
        border: 'border-warning/20',
        icon: 'bg-warning/20',
        iconColor: 'var(--color-warning)',
        hover: 'hover:bg-warning/20'
      },
      'error': {
        bg: 'bg-error/10',
        border: 'border-error/20',
        icon: 'bg-error/20',
        iconColor: 'var(--color-error)',
        hover: 'hover:bg-error/20'
      }
    };
    return colorMap[color] || colorMap.accent;
  };

  const colors = getColorClasses(card.color);

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-xl border transition-all duration-200 ease-smooth
        bg-surface/50 backdrop-blur-sm border-border
        hover:scale-105 hover:shadow-lg group
        ${colors.hover}
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
      `}
    >
      {/* Icon */}
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto
        ${colors.icon}
        group-hover:scale-110 transition-transform duration-200
      `}>
        <Icon 
          name={card.icon} 
          size={24} 
          color={colors.iconColor}
        />
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-200">
          {card.title}
        </h3>
        <p className="text-sm text-text-secondary font-body mb-3 leading-relaxed">
          {card.description}
        </p>
        
        {/* Stats */}
        {card.stats && (
          <div className={`
            inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
            ${colors.bg} ${colors.border} border
          `}>
            <span style={{ color: colors.iconColor }}>
              {card.stats}
            </span>
          </div>
        )}
      </div>

      {/* Hover Arrow */}
      <div className="flex justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Icon 
          name="ArrowRight" 
          size={16} 
          color="var(--color-accent)"
          className="transform group-hover:translate-x-1 transition-transform duration-200"
        />
      </div>

      {/* Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
          ${colors.bg}
        `}
      />
    </button>
  );
};

export default QuickAccessCard;