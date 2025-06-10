import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LoginForm = ({ onLogin, onCreateAccount, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = onLogin(formData);
      
      if (!result.success) {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="toast toast-error p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm">{errors.general}</span>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`
              w-full px-4 py-3 bg-surface/50 border rounded-lg
              text-text-primary placeholder-text-secondary
              focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
              transition-all duration-150
              ${errors.email ? 'border-error' : 'border-border'}
            `}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Icon 
              name="Mail" 
              size={18} 
              color={errors.email ? 'var(--color-error)' : 'var(--color-text-secondary)'} 
            />
          </div>
        </div>
        {errors.email && (
          <p className="text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-text-primary">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`
              w-full px-4 py-3 bg-surface/50 border rounded-lg
              text-text-primary placeholder-text-secondary
              focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
              transition-all duration-150
              ${errors.password ? 'border-error' : 'border-border'}
            `}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-surface/20 rounded-r-lg transition-colors duration-150"
            disabled={isLoading}
          >
            <Icon 
              name={showPassword ? 'EyeOff' : 'Eye'} 
              size={18} 
              color="var(--color-text-secondary)" 
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Forgot Password Link */}
      <div className="text-right">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-accent hover:text-accent/80 transition-colors duration-150"
          disabled={isLoading}
        >
          Forgot your password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full btn-primary flex items-center justify-center space-x-2 py-3
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} color="#0d0d0d" />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Create Account Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-text-secondary mb-2">
          Don't have an account?
        </p>
        <button
          type="button"
          onClick={onCreateAccount}
          className="text-accent hover:text-accent/80 font-medium transition-colors duration-150"
          disabled={isLoading}
        >
          Create Account
        </button>
      </div>

      {/* Demo Credentials Info */}
      <div className="mt-6 p-4 bg-surface/30 rounded-lg border border-border">
        <h4 className="text-sm font-medium text-text-primary mb-2 flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span>Demo Credentials</span>
        </h4>
        <div className="space-y-1 text-xs text-text-secondary font-mono">
          <p>Email: user@mastery.com</p>
          <p>Password: mastery123</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;