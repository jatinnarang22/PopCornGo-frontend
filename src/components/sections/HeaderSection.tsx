import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderSectionProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cities: string[];
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  selectedCity,
  setSelectedCity,
  searchQuery,
  setSearchQuery,
  cities
}) => (
  <section style={{
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #e5e7eb'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '16px 0'
      }}>
        {/* City Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            color: '#6b7280',
            fontSize: '14px'
          }}>📍</span>
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div style={{
          flex: 1,
          maxWidth: '448px',
          width: '100%'
        }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <div style={{
              position: 'absolute',
              left: '12px',
              top: '14px',
              color: '#9ca3af'
            }}>
              🔍
            </div>
          </div>
        </div>

        {/* Sign In Button */}
        <Link 
          to="/profile" 
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
        >
          Sign In
        </Link>
      </div>
    </div>
  </section>
);

export default HeaderSection;
