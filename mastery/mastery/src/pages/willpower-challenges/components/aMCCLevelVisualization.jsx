// src/pages/willpower-challenges/components/aMCCLevelVisualization.jsx
import React, { useRef, useEffect } from 'react';
import Icon from 'components/AppIcon';

const aMCCLevelVisualization = ({ level, isActive, lastPerformance }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const currentLevelRef = useRef(level);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    const animateLevel = () => {
      // Smooth animation towards target level
      const diff = level - currentLevelRef.current;
      if (Math.abs(diff) > 0.1) {
        currentLevelRef.current += diff * 0.05;
      } else {
        currentLevelRef.current = level;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Draw progress arc
      const progressAngle = (currentLevelRef.current / 100) * 2 * Math.PI - Math.PI / 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, progressAngle);
      
      // Dynamic color based on level and performance
      let strokeStyle = '#f9f871'; // Default accent yellow
      if (lastPerformance === 'success') {
        strokeStyle = '#22c55e'; // Success green
      } else if (lastPerformance === 'failure') {
        strokeStyle = '#ef4444'; // Error red
      }
      
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Add glow effect when active
      if (isActive) {
        ctx.shadowColor = strokeStyle;
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw percentage text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 2rem JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(currentLevelRef.current)}%`, centerX, centerY - 10);

      // Draw aMCC label
      ctx.fillStyle = '#a3a3a3';
      ctx.font = '0.875rem Inter, sans-serif';
      ctx.fillText('aMCC Level', centerX, centerY + 25);

      // Continue animation if level hasn't reached target
      if (Math.abs(level - currentLevelRef.current) > 0.1) {
        animationRef.current = requestAnimationFrame(animateLevel);
      }
    };

    animateLevel();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [level, isActive, lastPerformance]);

  const handleCanvasClick = () => {
    // Easter egg: clicking the canvas triggers a small animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transform = 'scale(1.05)';
    setTimeout(() => {
      canvas.style.transform = 'scale(1)';
    }, 150);
  };

  const getLevelDescription = () => {
    if (level >= 80) return 'Elite Mental Strength';
    if (level >= 60) return 'Strong Willpower';
    if (level >= 40) return 'Developing Resilience';
    if (level >= 20) return 'Building Foundation';
    return 'Starting Journey';
  };

  const getLevelColor = () => {
    if (level >= 80) return 'text-success';
    if (level >= 60) return 'text-accent';
    if (level >= 40) return 'text-warning';
    if (level >= 20) return 'text-text-secondary';
    return 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Main Visualization */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="mx-auto transition-transform duration-150 cursor-pointer"
          onClick={handleCanvasClick}
          style={{
            filter: isActive ? 'drop-shadow(0 0 20px rgba(249, 248, 113, 0.3))' : 'none'
          }}
        />
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-4 right-4">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Level Information */}
      <div className="text-center space-y-2">
        <div className={`text-lg font-heading font-semibold ${getLevelColor()}`}>
          {getLevelDescription()}
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Brain" size={16} color="currentColor" />
          <span className="text-sm text-text-secondary font-body">
            Anterior Mid-Cingulate Cortex Development
          </span>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="bg-surface rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-caption text-text-secondary">Progress</span>
          <span className="text-sm font-mono font-bold text-accent">{level.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-background rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500 ease-smooth"
            style={{
              width: `${level}%`,
              background: `linear-gradient(90deg, #ef4444 0%, #f59e0b 25%, #f9f871 50%, #22c55e 100%)`,
              boxShadow: isActive ? '0 0 8px rgba(249, 248, 113, 0.5)' : 'none'
            }}
          />
        </div>
      </div>

      {/* Performance Indicator */}
      {lastPerformance && (
        <div className={`
          text-center p-3 rounded-lg border-2 transition-all duration-300
          ${lastPerformance === 'success' ?'border-success bg-success/10 text-success' :'border-error bg-error/10 text-error'
          }
        `}>
          <div className="flex items-center justify-center space-x-2">
            <Icon 
              name={lastPerformance === 'success' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              color="currentColor" 
            />
            <span className="text-sm font-body">
              {lastPerformance === 'success' ? 'Level Increased!' : 'Level Decreased'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default aMCCLevelVisualization;