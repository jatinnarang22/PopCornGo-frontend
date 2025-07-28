import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  selectedCity: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ selectedCity }) => (
  <section style={{
    background: 'linear-gradient(135deg, #dc2626 0%, #ec4899 50%, #9333ea 100%)',
    color: 'white',
    padding: '64px 0',
    textAlign: 'center'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '16px',
        lineHeight: '1.2'
      }}>
        Welcome to <span style={{ color: '#fde047' }}>PopcornGo</span>
      </h1>
      <p style={{
        fontSize: '24px',
        marginBottom: '32px',
        opacity: 0.9
      }}>
        Book tickets for Movies, Events, Activities & more in {selectedCity}
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Link
          to="/movies"
          style={{
            backgroundColor: 'white',
            color: '#dc2626',
            fontWeight: 'bold',
            padding: '12px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🎬 Explore Movies
        </Link>
        <Link
          to="/events"
          style={{
            border: '2px solid white',
            backgroundColor: 'transparent',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#dc2626';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🎪 Discover Events
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
