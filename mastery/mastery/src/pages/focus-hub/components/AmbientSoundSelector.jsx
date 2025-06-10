import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AmbientSoundSelector = ({ selectedSound, volume, onSoundChange, onVolumeChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const soundOptions = [
    {
      id: 'none',
      name: 'None',
      description: 'Complete silence',
      icon: 'VolumeX',
      color: 'text-text-secondary'
    },
    {
      id: 'binaural-beats',
      name: 'Binaural Beats',
      description: 'Focus-enhancing frequencies',
      icon: 'Waves',
      color: 'text-accent'
    },
    {
      id: 'white-noise',
      name: 'White Noise',
      description: 'Consistent background sound',
      icon: 'Radio',
      color: 'text-blue-400'
    },
    {
      id: 'gentle-rain',
      name: 'Gentle Rain',
      description: 'Calming nature sounds',
      icon: 'CloudRain',
      color: 'text-blue-300'
    }
  ];

  const handleSoundSelect = (soundId) => {
    onSoundChange(soundId);
    if (soundId !== 'none') {
      setIsPlaying(true);
      // Mock playback - in real app, this would start audio
      setTimeout(() => setIsPlaying(false), 2000);
    } else {
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume) => {
    onVolumeChange(newVolume);
  };

  const togglePlayback = () => {
    if (selectedSound === 'none') return;
    
    setIsPlaying(!isPlaying);
    // Mock playback toggle
  };

  const getSelectedSound = () => {
    return soundOptions.find(sound => sound.id === selectedSound);
  };

  return (
    <div className="space-y-4">
      {/* Sound Options */}
      <div className="space-y-2">
        {soundOptions.map((sound) => (
          <button
            key={sound.id}
            onClick={() => handleSoundSelect(sound.id)}
            className={`
              w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-150 text-left
              ${selectedSound === sound.id 
                ? 'border-accent bg-accent/10' :'border-border bg-surface hover:border-accent/50'
              }
            `}
          >
            <Icon 
              name={sound.icon} 
              size={20} 
              color={selectedSound === sound.id ? "var(--color-accent)" : "currentColor"}
            />
            
            <div className="flex-1">
              <div className={`
                font-body font-medium
                ${selectedSound === sound.id ? 'text-accent' : 'text-text-primary'}
              `}>
                {sound.name}
              </div>
              <div className="text-xs text-text-secondary font-caption">
                {sound.description}
              </div>
            </div>
            
            {selectedSound === sound.id && (
              <div className="flex items-center space-x-2">
                {isPlaying && selectedSound !== 'none' && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-accent rounded-full animate-pulse" />
                    <div className="w-1 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1 h-5 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
                <Icon name="Check" size={16} color="var(--color-accent)" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Volume Control */}
      {selectedSound !== 'none' && (
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-text-primary">Volume</span>
            <span className="text-sm font-mono text-accent">{volume}%</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Volume1" size={16} color="currentColor" />
            
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${volume}%, var(--color-surface) ${volume}%, var(--color-surface) 100%)`
                }}
              />
            </div>
            
            <Icon name="Volume2" size={16} color="currentColor" />
          </div>
        </div>
      )}

      {/* Playback Controls */}
      {selectedSound !== 'none' && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getSelectedSound()?.icon} 
              size={16} 
              color="var(--color-accent)" 
            />
            <span className="text-sm font-body text-text-primary">
              {getSelectedSound()?.name}
            </span>
          </div>
          
          <button
            onClick={togglePlayback}
            className="flex items-center space-x-2 px-3 py-1.5 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-all duration-150 font-body font-medium"
          >
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={14} 
              color="#0d0d0d" 
            />
            <span className="text-sm">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </button>
        </div>
      )}

      {/* Sound Tips */}
      <div className="bg-surface/30 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Headphones" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <div className="text-xs text-text-secondary font-caption">
            <strong className="text-accent">Tip:</strong> Use headphones for the best binaural beats experience. 
            Keep volume at a comfortable level to avoid fatigue.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbientSoundSelector;