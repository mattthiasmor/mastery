import React from 'react';
import Icon from 'components/AppIcon';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative">
        {/* Logo Background */}
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Zap" size={32} color="#0d0d0d" />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 w-16 h-16 bg-accent rounded-2xl blur-xl opacity-20 animate-pulse" />
      </div>
      
      <div className="ml-4">
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          Mastery
        </h2>
        <p className="text-sm text-text-secondary font-caption">
          Personal Productivity Suite
        </p>
      </div>
    </div>
  );
};

export default Logo;