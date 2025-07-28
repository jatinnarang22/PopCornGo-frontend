import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard, { type MovieCardProps } from '../cards/MovieCard';

interface MoviesSectionProps {
  movies: MovieCardProps[];
  title: string;
  linkTo: string;
}

const MoviesSection: React.FC<MoviesSectionProps> = ({ movies, title, linkTo }) => (
  <section style={{
    padding: '48px 0',
    backgroundColor: 'white'
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
            color: '#dc2626',
            fontWeight: '500',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#b91c1c'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
        >
          See All <span>→</span>
        </Link>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px'
      }}>
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  </section>
);

export default MoviesSection;
