import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Real-time validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors on input change
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password).isValid) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Mock duplicate email check
    if (formData.email === 'existing@example.com') {
      newErrors.email = 'An account with this email already exists';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const mockUser = {
        id: 'user_123',
        email: formData.email,
        name: formData.email.split('@')[0],
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('authToken', 'mock_token_123');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 ambient-glow">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 reveal-stagger">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
              <Icon name="Zap" size={28} color="#0d0d0d" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Create Account
          </h1>
          <p className="text-text-secondary font-body">
            Join Mastery and start your productivity journey
          </p>
        </div>

        {/* Registration Form */}
        <div className="card card-elevated p-6 reveal-stagger">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="toast toast-error">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-text-primary font-body">
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
                    w-full px-4 py-3 pl-12 bg-surface/50 border rounded-lg
                    text-text-primary placeholder-text-secondary font-body
                    transition-all duration-200 ease-smooth
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                    ${errors.email ? 'border-error' : 'border-border'}
                  `}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <Icon 
                  name="Mail" 
                  size={20} 
                  color="currentColor"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm font-body flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-text-primary font-body">
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
                    w-full px-4 py-3 pl-12 pr-12 bg-surface/50 border rounded-lg
                    text-text-primary placeholder-text-secondary font-body
                    transition-all duration-200 ease-smooth
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                    ${errors.password ? 'border-error' : 'border-border'}
                  `}
                  placeholder="Create a strong password"
                  disabled={isLoading}
                />
                <Icon 
                  name="Lock" 
                  size={20} 
                  color="currentColor"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`
                          h-1 flex-1 rounded-full transition-colors duration-200
                          ${Object.values(passwordValidation).filter(Boolean).length >= level
                            ? level <= 2 ? 'bg-error' : level <= 4 ? 'bg-warning' : 'bg-success' :'bg-surface'
                          }
                        `}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-text-secondary space-y-1">
                    <div className={`flex items-center space-x-2 ${passwordValidation.minLength ? 'text-success' : ''}`}>
                      <Icon name={passwordValidation.minLength ? 'Check' : 'X'} size={12} />
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.hasUpperCase ? 'text-success' : ''}`}>
                      <Icon name={passwordValidation.hasUpperCase ? 'Check' : 'X'} size={12} />
                      <span>One uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.hasLowerCase ? 'text-success' : ''}`}>
                      <Icon name={passwordValidation.hasLowerCase ? 'Check' : 'X'} size={12} />
                      <span>One lowercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.hasNumbers ? 'text-success' : ''}`}>
                      <Icon name={passwordValidation.hasNumbers ? 'Check' : 'X'} size={12} />
                      <span>One number</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.hasSpecialChar ? 'text-success' : ''}`}>
                      <Icon name={passwordValidation.hasSpecialChar ? 'Check' : 'X'} size={12} />
                      <span>One special character</span>
                    </div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-error text-sm font-body flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary font-body">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-3 pl-12 pr-12 bg-surface/50 border rounded-lg
                    text-text-primary placeholder-text-secondary font-body
                    transition-all duration-200 ease-smooth
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                    ${errors.confirmPassword ? 'border-error' : 'border-border'}
                  `}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <Icon 
                  name="Lock" 
                  size={20} 
                  color="currentColor"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors duration-150"
                >
                  <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-error text-sm font-body flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full btn-primary py-3 font-semibold text-base
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center space-x-2
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Icon name="UserPlus" size={20} color="#0d0d0d" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6 reveal-stagger">
          <p className="text-text-secondary font-body">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login-screen')}
              className="text-accent hover:text-accent/80 font-medium transition-colors duration-150"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-text-secondary reveal-stagger">
          <p>&copy; {new Date().getFullYear()} Mastery. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;