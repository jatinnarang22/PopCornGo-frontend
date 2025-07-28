import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode theme colors
  const theme = {
    bg: {
      primary: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%)',
      secondary: 'rgba(15, 15, 35, 0.95)',
      glass: 'rgba(255, 255, 255, 0.05)',
      card: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.12)'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)'
    },
    accent: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tertiary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    border: 'rgba(255, 255, 255, 0.1)'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Handle successful sign in
      console.log('Sign in successful:', formData);
      
      // Redirect or update app state here
      alert('Sign in successful! (This is a demo)');
      
    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({ general: 'Sign in failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg.primary,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: `linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
              animation: `float ${6 + i * 2}s ease-in-out infinite`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%)`,
              filter: 'blur(50px)'
            }}
          />
        ))}
      </div>

      {/* Fixed Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? theme.bg.secondary : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${theme.border}` : 'none',
        transition: 'all 0.3s ease',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: theme.accent.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            PopcornGo
          </Link>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/" style={{ color: theme.text.secondary, textDecoration: 'none', transition: 'color 0.3s ease' }}>Home</Link>
            <Link to="/movies" style={{ color: theme.text.secondary, textDecoration: 'none', transition: 'color 0.3s ease' }}>Movies</Link>
            <Link to="/events" style={{ color: theme.text.secondary, textDecoration: 'none', transition: 'color 0.3s ease' }}>Events</Link>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                background: theme.bg.glass,
                color: theme.text.primary,
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'all 0.3s ease'
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '120px 24px 60px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '100%',
          maxWidth: '450px',
          background: theme.bg.glass,
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          border: `1px solid ${theme.border}`,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              background: theme.accent.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
              textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
            }}>
              Welcome Back
            </h1>
            <p style={{ 
              fontSize: '16px', 
              color: theme.text.secondary,
              margin: 0
            }}>
              Sign in to your PopcornGo account
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                color: '#ef4444',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: theme.text.primary,
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: errors.email ? `2px solid #ef4444` : `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  background: theme.bg.card,
                  color: theme.text.primary,
                  boxSizing: 'border-box'
                }}
              />
              {errors.email && (
                <p style={{ 
                  fontSize: '12px', 
                  color: '#ef4444', 
                  marginTop: '6px',
                  margin: '6px 0 0 0'
                }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: theme.text.primary,
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 50px 14px 16px',
                    border: errors.password ? `2px solid #ef4444` : `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    background: theme.bg.card,
                    color: theme.text.primary,
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: theme.text.muted,
                    cursor: 'pointer',
                    fontSize: '18px',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p style={{ 
                  fontSize: '12px', 
                  color: '#ef4444', 
                  marginTop: '6px',
                  margin: '6px 0 0 0'
                }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: theme.text.secondary,
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#667eea'
                  }}
                />
                Remember me
              </label>
              
              <Link
                to="/forgot-password"
                style={{
                  color: theme.text.secondary,
                  fontSize: '14px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                background: isLoading ? theme.bg.card : theme.accent.primary,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isLoading ? 'none' : '0 4px 20px rgba(102, 126, 234, 0.4)',
                marginBottom: '24px'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: theme.border
              }} />
              <span style={{
                padding: '0 16px',
                color: theme.text.muted,
                fontSize: '14px'
              }}>
                or
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: theme.border
              }} />
            </div>

            {/* Social Sign In */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: theme.bg.card,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text.primary,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                🔍 Google
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: theme.bg.card,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  color: theme.text.primary,
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                📘 Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: theme.text.secondary, fontSize: '14px' }}>
                Don't have an account?{' '}
              </span>
              <Link
                to="/signup"
                style={{
                  color: theme.text.primary,
                  fontSize: '14px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  background: theme.accent.primary,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SignIn;
