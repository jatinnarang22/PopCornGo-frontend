import React from 'react';
import { Link } from 'react-router-dom';
import EventCard, { EventCardProps } from '../cards/EventCard';

interface EventsSectionProps {
  events: EventCardProps[];
  title: string;
  linkTo: string;
}

const EventsSection: React.FC<EventsSectionProps> = ({ events, title, linkTo }) => (
  <section style={{
    padding: '48px 0',
    backgroundColor: '#f9fafb'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#111827'
        }}>
          {title}
        </h2>
        <Link 
          to={linkTo} 
          style={{
            color: '#9333ea',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#9333ea'}
        >
          See All <span>→</span>
        </Link>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
