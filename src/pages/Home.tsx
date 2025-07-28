import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { MovieCardProps } from '../components/cards/MovieCard';
import type { EventCardProps } from '../components/cards/EventCard';
import type { CategoryProps } from '../components/cards/CategoryCard';

const Home: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

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

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];

  const categories: CategoryProps[] = [
    { name: 'Movies', icon: '🎬', count: 150 },
    { name: 'Events', icon: '🎪', count: 80 },
    { name: 'Plays', icon: '🎭', count: 45 },
    { name: 'Sports', icon: '⚽', count: 30 },
    { name: 'Activities', icon: '🎨', count: 60 },
    { name: 'Workshops', icon: '🛠️', count: 25 }
  ];

  const recommendedMovies: MovieCardProps[] = [
    // Use your previous objects, same as before
    {
      title: 'Avengers: Endgame',
      genre: 'Action, Adventure, Drama',
      rating: 8.4,
      image: 'https://images.unsplash.com/photo-1489599904472-c2269952b9e4?w=400&h=600&fit=crop',
      price: 150,
      language: 'English, Hindi',
      format: '2D, 3D, IMAX'
    },
    {
      title: 'Spider-Man: No Way Home',
      genre: 'Action, Adventure, Sci-Fi',
      rating: 8.7,
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
      price: 180,
      language: 'English, Hindi',
      format: '2D, 3D, IMAX'
    },
    {
      title: 'The Batman',
      genre: 'Action, Crime, Drama',
      rating: 7.8,
      image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=600&fit=crop',
      price: 200,
      language: 'English, Hindi',
      format: '2D, IMAX'
    },
    {
      title: 'Top Gun: Maverick',
      genre: 'Action, Drama',
      rating: 8.3,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      price: 170,
      language: 'English, Hindi',
      format: '2D, IMAX'
    }
  ];

  const upcomingEvents: EventCardProps[] = [
    {
      title: 'Sunburn Arena ft. Martin Garrix',
      venue: 'Phoenix MarketCity',
      date: 'Sat, 15 Apr onwards',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      category: 'Music'
    },
    {
      title: 'Stand-up Comedy Night',
      venue: 'Comedy Store',
      date: 'Fri, 21 Apr onwards',
      price: 800,
      image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop',
      category: 'Comedy'
    },
    {
      title: 'Food & Music Festival',
      venue: 'Mahalaxmi Racecourse',
      date: 'Sat, 29 Apr onwards',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      category: 'Food'
    }
  ];

  const headerStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: isScrolled 
      ? 'rgba(15, 15, 35, 0.95)' 
      : 'rgba(15, 15, 35, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${theme.border}`,
    transition: 'all 0.3s ease',
    boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.2)'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.bg.primary,
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 118, 117, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(79, 172, 254, 0.2) 0%, transparent 50%)',
        animation: 'float 20s ease-in-out infinite'
      }} />
      
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
          50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
        }
        @media (max-width: 768px) {
          .desktop-search { display: none !important; }
          .mobile-menu { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-search { display: block !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
      {/* Modern Fixed Header */}
      <header style={headerStyles}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            fontSize: '28px',
            fontWeight: '800',
            color: theme.text.primary,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: theme.accent.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🍿 PopcornGo
          </Link>

          {/* Search Bar - Desktop */}
          <div className="desktop-search" style={{
            flex: 1,
            maxWidth: '500px',
            margin: '0 40px',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Search movies, events, activities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 50px',
                border: `1px solid ${theme.border}`,
                borderRadius: '50px',
                fontSize: '16px',
                outline: 'none',
                background: theme.bg.glass,
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                color: theme.text.primary
              }}
              onFocus={e => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.3)';
                e.currentTarget.style.borderColor = '#667eea';
              }}
              onBlur={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = theme.border;
              }}
            />
            <div style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              color: theme.text.muted
            }}>🔍</div>
          </div>

          {/* Right Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                background: theme.bg.glass,
                border: `1px solid ${theme.border}`,
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(20px)',
                fontSize: '20px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = theme.bg.hover;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = theme.bg.glass;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* City Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', color: theme.text.secondary }}>📍</span>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                style={{
                  border: `1px solid ${theme.border}`,
                  borderRadius: '25px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  outline: 'none',
                  cursor: 'pointer',
                  background: theme.bg.glass,
                  color: theme.text.primary,
                  backdropFilter: 'blur(20px)'
                }}
              >
                {cities.map(city => (
                  <option key={city} value={city} style={{ background: '#1a1a2e', color: 'white' }}>{city}</option>
                ))}
              </select>
            </div>

            {/* Auth Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                to="/signin"
                style={{
                  background: 'transparent',
                  color: theme.text.primary,
                  padding: '10px 24px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: `2px solid ${theme.border}`,
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = theme.bg.hover;
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                style={{
                  background: theme.accent.secondary,
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.5)';
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(240, 147, 251, 0.3)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '120px 0 80px',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Hero Background Effects */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          animation: 'glow 4s ease-in-out infinite alternate'
        }} />
        
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Mobile Search Bar */}
          <div className="mobile-menu" style={{
            marginBottom: '40px',
            display: 'none'
          }}>
            <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Search movies, events..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 50px',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '50px',
                  fontSize: '16px',
                  outline: 'none',
                  background: theme.bg.glass,
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  color: theme.text.primary
                }}
              />
              <div style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
                color: theme.text.muted
              }}>🔍</div>
            </div>
          </div>

          {/* Hero Content */}
          <div style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '24px',
            padding: '60px 40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            margin: '0 auto',
            maxWidth: '900px'
          }}>
            <h1 style={{ 
              fontSize: 'clamp(36px, 5vw, 64px)', 
              fontWeight: '800', 
              marginBottom: '24px', 
              lineHeight: '1.1',
              color: theme.text.primary,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              Welcome to{' '}
              <span style={{
                background: theme.accent.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))'
              }}>
                PopcornGo
              </span>
            </h1>
            
            <p style={{ 
              fontSize: 'clamp(18px, 3vw, 28px)', 
              marginBottom: '48px', 
              color: theme.text.secondary,
              lineHeight: '1.4',
              maxWidth: '600px',
              margin: '0 auto 48px'
            }}>
              Discover and book tickets for the best movies, events, and activities in{' '}
              <span style={{ 
                color: theme.text.primary, 
                fontWeight: '600',
                background: theme.accent.tertiary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {selectedCity}
              </span>
            </p>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: window.innerWidth > 640 ? 'row' : 'column',
              gap: '20px', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/movies"
                style={{
                  background: theme.accent.primary,
                  color: 'white',
                  fontWeight: '700',
                  padding: '16px 40px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '18px',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                  border: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
              >
                🎬 Explore Movies
              </Link>
              
              <Link
                to="/events"
                style={{
                  background: theme.bg.glass,
                  border: `2px solid ${theme.border}`,
                  color: theme.text.primary,
                  fontWeight: '700',
                  padding: '14px 40px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '18px',
                  backdropFilter: 'blur(20px)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.background = theme.bg.hover;
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = theme.bg.glass;
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🎪 Discover Events
              </Link>
              
              <Link
                to="/activities"
                style={{
                  background: theme.accent.secondary,
                  color: 'white',
                  fontWeight: '700',
                  padding: '16px 40px',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '18px',
                  boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)',
                  border: 'none'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(240, 147, 251, 0.6)';
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.4)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                🎨 Activities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ 
        padding: '80px 0',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 4vw, 48px)', 
              fontWeight: '800', 
              marginBottom: '16px', 
              color: theme.text.primary,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              Browse by{' '}
              <span style={{
                background: theme.accent.tertiary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Categories
              </span>
            </h2>
            <p style={{
              fontSize: '18px',
              color: theme.text.secondary,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover entertainment tailored to your interests
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '24px',
            marginBottom: '40px'
          }}>
            {categories.map((category, index) => (
              <div
                key={index}
                style={{
                  background: theme.bg.card,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '20px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.background = theme.bg.hover;
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = '#667eea';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.background = theme.bg.card;
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: theme.text.muted,
                  fontWeight: '500'
                }}>
                  {category.count}+ options
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section style={{ 
        padding: '80px 0',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 4vw, 48px)', 
              fontWeight: '800', 
              color: theme.text.primary,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              Recommended{' '}
              <span style={{
                background: theme.accent.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Movies
              </span>
            </h2>
            <Link 
              to="/movies" 
              style={{ 
                background: theme.bg.glass,
                border: `1px solid ${theme.border}`,
                color: theme.text.primary, 
                fontWeight: '600', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '25px',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = theme.bg.hover;
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = theme.bg.glass;
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              See All <span style={{ fontSize: '16px' }}>→</span>
            </Link>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px'
          }}>
            {recommendedMovies.map((movie, index) => (
              <div
                key={index}
                style={{
                  background: theme.bg.card,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = '#667eea';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                <div style={{
                  position: 'relative',
                  height: '400px',
                  backgroundImage: `url(${movie.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: '#fbbf24',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    ⭐ {movie.rating}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: theme.text.primary,
                    marginBottom: '8px'
                  }}>
                    {movie.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: theme.text.muted,
                    marginBottom: '12px'
                  }}>
                    {movie.genre}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: theme.text.primary
                    }}>
                      ₹{movie.price}
                    </span>
                    <div style={{
                      background: theme.accent.primary,
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Book Now
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section style={{ 
        padding: '80px 0',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 4vw, 48px)', 
              fontWeight: '800', 
              color: theme.text.primary,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              Upcoming{' '}
              <span style={{
                background: theme.accent.secondary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Events
              </span>
            </h2>
            <Link 
              to="/events" 
              style={{ 
                background: theme.bg.glass,
                border: `1px solid ${theme.border}`,
                color: theme.text.primary, 
                fontWeight: '600', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '25px',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = theme.bg.hover;
                e.currentTarget.style.borderColor = '#f093fb';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = theme.bg.glass;
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              See All <span style={{ fontSize: '16px' }}>→</span>
            </Link>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px'
          }}>
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                style={{
                  background: theme.bg.card,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.borderColor = '#f093fb';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                <div style={{
                  position: 'relative',
                  height: '200px',
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {event.date}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: theme.text.primary,
                    marginBottom: '8px'
                  }}>
                    {event.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: theme.text.muted,
                    marginBottom: '12px'
                  }}>
                    📍 {event.venue}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: theme.text.primary
                    }}>
                      ₹{event.price}
                    </span>
                    <div style={{
                      background: theme.accent.secondary,
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Book Now
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section style={{ 
        padding: '80px 0',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 24px', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            background: theme.bg.card,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '24px',
            padding: '60px 40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            margin: '0 auto',
            maxWidth: '800px'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(28px, 4vw, 48px)', 
              fontWeight: '800', 
              marginBottom: '16px',
              color: theme.text.primary,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              Get the{' '}
              <span style={{
                background: theme.accent.tertiary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                PopcornGo
              </span>{' '}
              App
            </h2>
            <p style={{ 
              fontSize: '20px', 
              marginBottom: '40px', 
              color: theme.text.secondary,
              lineHeight: '1.5'
            }}>
              Book tickets on the go with our mobile app. Never miss out on your favorite shows!
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center', 
              flexWrap: 'wrap'
            }}>
              <button 
                style={{ 
                  background: theme.accent.primary,
                  color: 'white', 
                  padding: '16px 32px', 
                  borderRadius: '50px', 
                  border: 'none', 
                  fontWeight: '700', 
                  fontSize: '16px',
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                }}
              >
                📱 Download for iOS
              </button>
              <button 
                style={{ 
                  background: theme.accent.secondary,
                  color: 'white', 
                  padding: '16px 32px', 
                  borderRadius: '50px', 
                  border: 'none', 
                  fontWeight: '700', 
                  fontSize: '16px',
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(240, 147, 251, 0.6)';
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.4)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                🤖 Download for Android
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
