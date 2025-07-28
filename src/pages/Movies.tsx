import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FilterOptions {
  genre: string;
  language: string;
  format: string;
  priceRange: string;
}

const Movies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    genre: 'All',
    language: 'All',
    format: 'All',
    priceRange: 'All'
  });

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

  // Sample movie data
  const moviesData = [
    {
      id: 1,
      title: 'Avengers: Endgame',
      genre: 'Action',
      language: 'English',
      format: 'IMAX',
      rating: 8.4,
      duration: '181 min',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
      price: '₹350'
    },
    {
      id: 2,
      title: 'Spider-Man: No Way Home',
      genre: 'Action',
      language: 'English',
      format: '4DX',
      rating: 8.2,
      duration: '148 min',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop',
      price: '₹400'
    },
    {
      id: 3,
      title: 'The Batman',
      genre: 'Action',
      language: 'English',
      format: 'Dolby Atmos',
      rating: 7.8,
      duration: '176 min',
      image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop',
      price: '₹320'
    },
    {
      id: 4,
      title: 'Dune',
      genre: 'Sci-Fi',
      language: 'English',
      format: 'IMAX',
      rating: 8.0,
      duration: '155 min',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop',
      price: '₹380'
    },
    {
      id: 5,
      title: 'Top Gun: Maverick',
      genre: 'Action',
      language: 'English',
      format: '4DX',
      rating: 8.3,
      duration: '130 min',
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop',
      price: '₹420'
    },
    {
      id: 6,
      title: 'RRR',
      genre: 'Action',
      language: 'Telugu',
      format: 'Dolby Atmos',
      rating: 7.9,
      duration: '187 min',
      image: 'https://images.unsplash.com/photo-1489599856040-b6c906d1b4b8?w=300&h=450&fit=crop',
      price: '₹280'
    }
  ];

  // Filter movies based on search and filters
  const filteredMovies = useMemo(() => {
    return moviesData.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = filters.genre === 'All' || movie.genre === filters.genre;
      const matchesLanguage = filters.language === 'All' || movie.language === filters.language;
      const matchesFormat = filters.format === 'All' || movie.format === filters.format;
      
      return matchesSearch && matchesGenre && matchesLanguage && matchesFormat;
    });
  }, [searchQuery, filters, moviesData]);

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];
  const languages = ['All', 'English', 'Hindi', 'Telugu', 'Tamil', 'Malayalam'];
  const formats = ['All', 'IMAX', '4DX', 'Dolby Atmos', '3D', '2D'];

  const clearAllFilters = () => {
    setFilters({
      genre: 'All',
      language: 'All',
      format: 'All',
      priceRange: 'All'
    });
    setSearchQuery('');
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
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
              animation: `float ${6 + i}s ease-in-out infinite`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%)`,
              filter: 'blur(40px)'
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
          {/* Logo */}
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

          {/* Search Bar - Desktop */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flex: 1,
            maxWidth: '600px',
            margin: '0 32px'
          }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  background: theme.bg.glass,
                  backdropFilter: 'blur(10px)',
                  color: theme.text.primary,
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.text.muted,
                fontSize: '20px'
              }}>
                🔍
              </div>
            </div>

            {/* City Selector */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                padding: '12px 16px',
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                background: theme.bg.glass,
                backdropFilter: 'blur(10px)',
                color: theme.text.primary,
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {cities.map(city => (
                <option key={city} value={city} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Dark Mode Toggle & Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
            
            <Link to="/signin" style={{
              padding: '10px 20px',
              background: theme.accent.primary,
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}>
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '100px', position: 'relative', zIndex: 1 }}>
        {/* Page Title */}
        <section style={{ padding: '40px 0 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: theme.accent.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              marginBottom: '16px',
              textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
            }}>
              Now Showing
            </h1>
            <p style={{
              fontSize: '18px',
              color: theme.text.secondary,
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover the latest blockbusters and indie gems playing in {selectedCity}
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section style={{ padding: '20px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{
              background: theme.bg.glass,
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${theme.border}`,
              marginBottom: '32px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: theme.text.primary,
                  margin: 0
                }}>
                  Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  style={{
                    padding: '8px 16px',
                    background: theme.accent.secondary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Clear All
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {/* Genre Filter */}
                <div>
                  <label style={{
                    display: 'block',
                    color: theme.text.secondary,
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Genre
                  </label>
                  <select
                    value={filters.genre}
                    onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      background: theme.bg.card,
                      color: theme.text.primary,
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Language Filter */}
                <div>
                  <label style={{
                    display: 'block',
                    color: theme.text.secondary,
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      background: theme.bg.card,
                      color: theme.text.primary,
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {languages.map(language => (
                      <option key={language} value={language} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Format Filter */}
                <div>
                  <label style={{
                    display: 'block',
                    color: theme.text.secondary,
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Format
                  </label>
                  <select
                    value={filters.format}
                    onChange={(e) => setFilters(prev => ({ ...prev, format: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      background: theme.bg.card,
                      color: theme.text.primary,
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {formats.map(format => (
                      <option key={format} value={format} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                        {format}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Movies Grid */}
        <section style={{ padding: '20px 0 60px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: theme.text.primary,
                margin: 0
              }}>
                {filteredMovies.length} Movies Found
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {filteredMovies.map(movie => (
                <div
                  key={movie.id}
                  style={{
                    background: theme.bg.glass,
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: `1px solid ${theme.border}`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    transform: 'translateY(0)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.background = theme.bg.hover;
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = theme.bg.glass;
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={movie.image}
                      alt={movie.title}
                      style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: '#fbbf24',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      ⭐ {movie.rating}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: theme.text.primary,
                      marginBottom: '8px',
                      lineHeight: '1.4'
                    }}>
                      {movie.title}
                    </h3>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '16px'
                    }}>
                      <span style={{
                        background: theme.accent.primary,
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {movie.genre}
                      </span>
                      <span style={{
                        background: theme.bg.card,
                        color: theme.text.secondary,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        border: `1px solid ${theme.border}`
                      }}>
                        {movie.language}
                      </span>
                      <span style={{
                        background: theme.bg.card,
                        color: theme.text.secondary,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        border: `1px solid ${theme.border}`
                      }}>
                        {movie.format}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}>
                      <span style={{
                        color: theme.text.secondary,
                        fontSize: '14px'
                      }}>
                        {movie.duration}
                      </span>
                      <span style={{
                        color: theme.text.primary,
                        fontSize: '16px',
                        fontWeight: '600'
                      }}>
                        {movie.price}
                      </span>
                    </div>

                    <Link
                      to={`/booking/${movie.id}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '12px',
                        background: theme.accent.primary,
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: theme.text.secondary
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
                <h3 style={{
                  fontSize: '24px',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  No movies found
                </h3>
                <p style={{ fontSize: '16px' }}>
                  Try adjusting your search or filters to find more movies.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(180deg); }
        }

        @media (max-width: 768px) {
          .mobile-hidden { display: none !important; }
          .mobile-search { display: block !important; }
        }

        @media (min-width: 769px) {
          .mobile-search { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Movies;
