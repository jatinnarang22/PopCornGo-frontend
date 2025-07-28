import React from 'react';

export interface EventCardProps {
  title: string;
  venue: string;
  date: string;
  price: number;
  image: string;
  category: string;
}

const EventCard: React.FC<EventCardProps> = ({ 
  title, 
  venue, 
  date, 
  price, 
  image, 
  category 
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
          height: '192px',
          objectFit: 'cover'
        }}
        loading="lazy"
      />
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        backgroundColor: '#9333ea',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {category}
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
        marginBottom: '4px'
      }}>
        {venue}
      </p>
      <p style={{
        color: '#9ca3af',
        fontSize: '12px',
        marginBottom: '12px'
      }}>
        {date}
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
        <button 
          style={{
            backgroundColor: '#9333ea',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9333ea'}
        >
          Book
        </button>
      </div>
    </div>
  </div>
);

export default EventCard;
