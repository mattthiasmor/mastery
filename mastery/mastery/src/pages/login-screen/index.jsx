import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Logo from './components/Logo';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mock credentials for authentication
  const mockCredentials = {
    email: "user@mastery.com",
    password: "mastery123"
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogin = (credentials) => {
    if (credentials.email === mockCredentials.email && credentials.password === mockCredentials.password) {
      // Store auth token
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: "Alex Johnson",
        email: credentials.email,
        avatar: null,
        stats: {
          tasksCompleted: 47,
          focusHours: 23,
          streak: 7
        }
      }));
      
      // Navigate to dashboard
      navigate('/dashboard');
      return { success: true };
    } else {
      return { 
        success: false, 
        error: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}` 
      };
    }
  };

  const handleCreateAccount = () => {
    navigate('/register-screen');
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email address.');
  };

  return (
    <div 
      className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 248, 113, 0.05), transparent 40%)`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-accent) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, var(--color-accent) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8 reveal-stagger">
          <Logo />
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-text-secondary font-body">
            Sign in to continue your productivity journey
          </p>
        </div>

        {/* Login Form */}
        <div className="card card-elevated p-6 reveal-stagger">
          <LoginForm 
            onLogin={handleLogin}
            onCreateAccount={handleCreateAccount}
            onForgotPassword={handleForgotPassword}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 reveal-stagger">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Mastery. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button className="text-xs text-text-secondary hover:text-accent transition-colors duration-150">
              Privacy Policy
            </button>
            <span className="text-text-secondary">•</span>
            <button className="text-xs text-text-secondary hover:text-accent transition-colors duration-150">
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-accent rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-accent rounded-full animate-pulse opacity-40" />
      <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-accent rounded-full animate-pulse opacity-50" />
    </div>
  );
};

export default LoginScreen;