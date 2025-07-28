import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/signin');
    }, 2000);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    border: `1px solid ${theme.border}`,
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: theme.bg.card,
    color: theme.text.primary,
    boxSizing: 'border-box' as const
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    background: theme.accent.secondary,
    border: 'none',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: isLoading ? 0.7 : 1
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
        padding: '120px 24px 40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          background: theme.bg.card,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: `1px solid ${theme.border}`,
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              background: theme.accent.secondary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              Create Account
            </h1>
            <p style={{ fontSize: '16px', color: theme.text.muted }}>
              Join PopcornGo and start your movie journey
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  style={{
                    ...inputStyle,
                    border: errors.firstName ? `2px solid #ef4444` : `1px solid ${theme.border}`
                  }}
                />
                {errors.firstName && (
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#ef4444', 
                    marginTop: '6px',
                    margin: '6px 0 0 0'
                  }}>{errors.firstName}</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  style={{
                    ...inputStyle,
                    border: errors.lastName ? `2px solid #ef4444` : `1px solid ${theme.border}`
                  }}
                />
                {errors.lastName && (
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#ef4444', 
                    marginTop: '6px',
                    margin: '6px 0 0 0'
                  }}>{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
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
                  ...inputStyle,
                  border: errors.email ? `2px solid #ef4444` : `1px solid ${theme.border}`
                }}
              />
              {errors.email && (
                <p style={{ 
                  fontSize: '12px', 
                  color: '#ef4444', 
                  marginTop: '6px',
                  margin: '6px 0 0 0'
                }}>{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: theme.text.primary,
                marginBottom: '8px'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                style={{
                  ...inputStyle,
                  border: errors.phone ? `2px solid #ef4444` : `1px solid ${theme.border}`
                }}
              />
              {errors.phone && (
                <p style={{ 
                  fontSize: '12px', 
                  color: '#ef4444', 
                  marginTop: '6px',
                  margin: '6px 0 0 0'
                }}>{errors.phone}</p>
              )}
            </div>

            {/* Password Fields */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1 }}>
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
                    placeholder="Create password"
                    style={{
                      ...inputStyle,
                      paddingRight: '50px',
                      border: errors.password ? `2px solid #ef4444` : `1px solid ${theme.border}`
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
                  }}>{errors.password}</p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    style={{
                      ...inputStyle,
                      paddingRight: '50px',
                      border: errors.confirmPassword ? `2px solid #ef4444` : `1px solid ${theme.border}`
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#ef4444', 
                    marginTop: '6px',
                    margin: '6px 0 0 0'
                  }}>{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{ marginTop: '4px' }}
              />
              <label htmlFor="terms" style={{ fontSize: '14px', color: theme.text.secondary, lineHeight: '1.5' }}>
                I agree to PopcornGo's{' '}
                <Link to="/terms" style={{ color: '#f093fb', textDecoration: 'none' }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" style={{ color: '#f093fb', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '-16px' }}>{errors.terms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={buttonStyle}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: theme.text.muted, fontSize: '14px' }}>
              Already have an account?{' '}
              <Link
                to="/signin"
                style={{
                  color: '#f093fb',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
        
        input:focus {
          border-color: rgba(240, 147, 251, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1) !important;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(240, 147, 251, 0.2);
        }
      `}</style>
    </div>
  );
};

export default SignUp;
