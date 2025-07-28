import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard, { type EventCardProps } from '../components/cards/EventCard';

interface EventFilterOptions {
  category: string;
  city: string;
  priceRange: string;
  date: string;
}

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [filters, setFilters] = useState<EventFilterOptions>({
    category: 'All',
    city: 'All',
    priceRange: 'All',
    date: 'All'
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

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];
  const categories = ['All', 'Concerts', 'Comedy Shows', 'Theatre', 'Sports', 'Workshops', 'Exhibitions'];
  const priceRanges = ['All', 'Free', 'Under ₹500', '₹500-₹1000', '₹1000-₹2000', 'Above ₹2000'];
  const dateRanges = ['All', 'Today', 'Tomorrow', 'This Weekend', 'Next Week', 'This Month'];

  const allEvents: EventCardProps[] = [
    {
      title: 'Arijit Singh Live Concert',
      category: 'Concerts',
      date: '2024-02-15',
      venue: 'NSCI Stadium, Mumbai',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    },
    {
      title: 'Stand-up Comedy Night',
      category: 'Comedy Shows',
      date: '2024-02-10',
      venue: 'Phoenix Marketcity, Bangalore',
      price: 800,
      image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop'
    },
    {
      title: 'Mumbai Indians vs CSK',
      category: 'Sports',
      date: '2024-02-20',
      venue: 'Wankhede Stadium, Mumbai',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop'
    },
    {
      title: 'Art Exhibition: Modern Masters',
      category: 'Exhibitions',
      date: '2024-02-12',
      venue: 'National Gallery, Delhi',
      price: 200,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    },
    {
      title: 'Photography Workshop',
      category: 'Workshops',
      date: '2024-02-18',
      venue: 'Creative Hub, Bangalore',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop'
    },
    {
      title: 'Shakespeare in the Park',
      category: 'Theatre',
      date: '2024-02-25',
      venue: 'Cubbon Park, Bangalore',
      price: 600,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    }
  ];

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.category === 'All' || event.category === filters.category;
      
      // Price range filter
      let matchesPrice = true;
      if (filters.priceRange !== 'All') {
        switch (filters.priceRange) {
          case 'Free':
            matchesPrice = event.price === 0;
            break;
          case 'Under ₹500':
            matchesPrice = event.price > 0 && event.price < 500;
            break;
          case '₹500-₹1000':
            matchesPrice = event.price >= 500 && event.price <= 1000;
            break;
          case '₹1000-₹2000':
            matchesPrice = event.price >= 1000 && event.price <= 2000;
            break;
          case 'Above ₹2000':
            matchesPrice = event.price > 2000;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, filters]);

  const handleFilterChange = (filterType: keyof EventFilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'All',
      city: 'All',
      priceRange: 'All',
      date: 'All'
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
            <Link to="/events" style={{ color: theme.text.primary, textDecoration: 'none', fontWeight: 'bold' }}>Events</Link>
            
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
        paddingTop: '100px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Page Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              background: theme.accent.secondary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px'
            }}>
              Events in {selectedCity}
            </h1>
            <p style={{
              fontSize: '18px',
              color: theme.text.muted,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover amazing events happening in your city
            </p>
          </div>

          {/* Search and Filters */}
          <div style={{
            background: theme.bg.card,
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: `1px solid ${theme.border}`,
            padding: '32px',
            marginBottom: '40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            {/* Search Bar */}
            <div style={{ marginBottom: '32px' }}>
              <input
                type="text"
                placeholder="Search events by title or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: theme.bg.glass,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  color: theme.text.primary,
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Filters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              {/* City Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: theme.bg.glass,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text.primary,
                    fontSize: '14px',
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

              {/* Category Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: theme.bg.glass,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text.primary,
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: theme.bg.glass,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text.primary,
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text.primary,
                  marginBottom: '8px'
                }}>
                  Date
                </label>
                <select
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: theme.bg.glass,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    color: theme.text.primary,
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {dateRanges.map(date => (
                    <option key={date} value={date} style={{ background: '#1a1a2e', color: '#ffffff' }}>
                      {date}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearAllFilters}
              style={{
                padding: '12px 24px',
                background: theme.accent.tertiary,
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Clear All Filters
            </button>
          </div>

          {/* Results Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: theme.text.primary
            }}>
              {filteredEvents.length} Events Found
            </h2>
            <p style={{
              color: theme.text.muted,
              fontSize: '14px'
            }}>
              Showing results for {selectedCity}
            </p>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px',
              marginBottom: '60px'
            }}>
              {filteredEvents.map((event, index) => (
                <div
                  key={index}
                  style={{
                    background: theme.bg.card,
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    border: `1px solid ${theme.border}`,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(240, 147, 251, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: theme.bg.card,
              borderRadius: '16px',
              border: `1px solid ${theme.border}`
            }}>
              <h3 style={{
                fontSize: '24px',
                color: theme.text.primary,
                marginBottom: '16px'
              }}>
                No Events Found
              </h3>
              <p style={{
                color: theme.text.muted,
                fontSize: '16px',
                marginBottom: '24px'
              }}>
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearAllFilters}
                style={{
                  padding: '12px 24px',
                  background: theme.accent.secondary,
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
        
        input:focus, select:focus {
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

export default Events;
