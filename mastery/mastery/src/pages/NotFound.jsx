import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 ambient-glow">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-surface rounded-full flex items-center justify-center mb-6">
            <Icon name="AlertTriangle" size={64} color="var(--color-accent)" />
          </div>
          
          <h1 className="text-6xl font-heading font-bold text-accent mb-4">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
            Page Not Found
          </h2>
          <p className="text-text-secondary font-body">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full btn-secondary flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Mastery. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;