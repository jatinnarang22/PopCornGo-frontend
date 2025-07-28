import React from 'react';
import { Link } from 'react-router-dom';

export interface MovieCardProps {
  title: string;
  genre: string;
  rating: number;
  image: string;
  price: number;
  language: string;
  format: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  title, 
  genre, 
  rating, 
  image, 
  price, 
  language, 
  format 
}) => (
  <div 
    style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }}
  >
    <div style={{ position: 'relative' }}>
      <img 
        src={image} 
        alt={title}
        style={{
          width: '100%',
          height: '320px',
          objectFit: 'cover'
        }}
        loading="lazy"
      />
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        ⭐ {rating}/10
      </div>
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        backgroundColor: '#dc2626',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {format}
      </div>
    </div>
    <div style={{ padding: '16px' }}>
      <h3 style={{
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '4px',
        color: '#111827',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {title}
      </h3>
      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        marginBottom: '8px'
      }}>
        {genre}
      </p>
      <p style={{
        color: '#9ca3af',
        fontSize: '12px',
        marginBottom: '12px'
      }}>
        {language}
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#111827'
        }}>
          ₹{price} onwards
        </span>
        <Link 
          to="/booking" 
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc2626'}
        >
          Book Now
        </Link>
      </div>
    </div>
  </div>
);

export default MovieCard;
