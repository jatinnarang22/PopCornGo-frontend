import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
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
      // Redirect to sign in or home
      window.location.href = '/signin';
    }, 2000);
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Implement social sign up logic
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#dc2626',
              marginBottom: '8px'
            }}>
              PopcornGo
            </h1>
          </Link>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Create your account
          </p>
        </div>

        {/* Sign Up Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.firstName ? '2px solid #ef4444' : '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#fafafa'
                  }}
                  onFocus={e => {
                    if (!errors.firstName) {
                      e.target.style.borderColor = '#dc2626';
                      e.target.style.backgroundColor = 'white';
                    }
                  }}
                  onBlur={e => {
                    if (!errors.firstName) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#fafafa';
                    }
                  }}
                />
                {errors.firstName && (
                  <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: errors.lastName ? '2px solid #ef4444' : '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: '#fafafa'
                  }}
                  onFocus={e => {
                    if (!errors.lastName) {
                      e.target.style.borderColor = '#dc2626';
                      e.target.style.backgroundColor = 'white';
                    }
                  }}
                  onBlur={e => {
                    if (!errors.lastName) {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.backgroundColor = '#fafafa';
                    }
                  }}
                />
                {errors.lastName && (
                  <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
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
                  padding: '12px 16px',
                  border: errors.email ? '2px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#fafafa'
                }}
                onFocus={e => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#dc2626';
                    e.target.style.backgroundColor = 'white';
                  }
                }}
                onBlur={e => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#fafafa';
                  }
                }}
              />
              {errors.email && (
                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '6px'
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
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.phone ? '2px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: '#fafafa'
                }}
                onFocus={e => {
                  if (!errors.phone) {
                    e.target.style.borderColor = '#dc2626';
                    e.target.style.backgroundColor = 'white';
                  }
                }}
                onBlur={e => {
                  if (!errors.phone) {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.backgroundColor = '#fafafa';
                  }
                }}
              />
              {errors.phone && (
                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
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
                      width: '100%',
                      padding: '12px 48px 12px 16px',
                      border: errors.password ? '2px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={e => {
                      if (!errors.password) {
                        e.target.style.borderColor = '#dc2626';
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                    onBlur={e => {
                      if (!errors.password) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.backgroundColor = '#fafafa';
                      }
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
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: '#6b7280'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
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
                      width: '100%',
                      padding: '12px 48px 12px 16px',
                      border: errors.confirmPassword ? '2px solid #ef4444' : '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      backgroundColor: '#fafafa'
                    }}
                    onFocus={e => {
                      if (!errors.confirmPassword) {
                        e.target.style.borderColor = '#dc2626';
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                    onBlur={e => {
                      if (!errors.confirmPassword) {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.backgroundColor = '#fafafa';
                      }
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
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: '#6b7280'
                    }}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms Agreement */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={e => setAgreedToTerms(e.target.checked)}
                  style={{ marginRight: '8px', marginTop: '2px', accentColor: '#dc2626' }}
                />
                <span>
                  I agree to PopcornGo's{' '}
                  <Link to="/terms" style={{ color: '#dc2626', textDecoration: 'none', fontWeight: '500' }}>
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" style={{ color: '#dc2626', textDecoration: 'none', fontWeight: '500' }}>
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: isLoading ? '#9ca3af' : '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                marginBottom: '20px'
              }}
              onMouseEnter={e => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#b91c1c';
                }
              }}
              onMouseLeave={e => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                }
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
              <span style={{ padding: '0 16px', fontSize: '14px', color: '#6b7280' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
            </div>

            {/* Social Sign Up Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => handleSocialSignUp('google')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'white',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                  e.currentTarget.style.borderColor = '#9ca3af';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
              >
                <span style={{ fontSize: '18px' }}>🔍</span>
                Sign up with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialSignUp('facebook')}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#1877f2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#166fe5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1877f2'}
              >
                <span style={{ fontSize: '18px' }}>📘</span>
                Sign up with Facebook
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Already have an account?{' '}
              <Link
                to="/signin"
                style={{
                  color: '#dc2626',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            By creating an account, you agree to receive promotional emails and updates from PopcornGo.
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
