import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MovieCard, {  type MovieCardProps } from '../components/cards/MovieCard';
import EventCard, { type EventCardProps } from '../components/cards/EventCard';
import CategoryCard from '../components/cards/CategoryCard';
import type { CategoryProps } from '../components/cards/CategoryCard';

const Home: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header Section */}
      <section
        style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>📍</span>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
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
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, maxWidth: '448px', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search for Movies, Events, Plays, Sports and Activities"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '14px',
                    color: '#9ca3af'
                  }}
                >
                  🔍
                </div>
              </div>
            </div>
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
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #ec4899 50%, #9333ea 100%)',
          color: 'white',
          padding: '64px 0',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.2' }}>
            Welcome to <span style={{ color: '#fde047' }}>PopcornGo</span>
          </h1>
          <p style={{ fontSize: '24px', marginBottom: '32px', opacity: 0.9 }}>
            Book tickets for Movies, Events, Activities & more in {selectedCity}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
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
            >
              🎪 Discover Events
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '48px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', color: '#111827', textAlign: 'center' }}>
            Browse by Categories
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section style={{ padding: '48px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827' }}>Recommended Movies</h2>
            <Link to="/movies" style={{ color: '#dc2626', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              See All <span>→</span>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {recommendedMovies.map((movie, index) => (
              <MovieCard key={index} {...movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section style={{ padding: '48px 0', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#111827' }}>Upcoming Events</h2>
            <Link to="/events" style={{ color: '#9333ea', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              See All <span>→</span>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section style={{ padding: '48px 0', backgroundColor: '#111827', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Get the PopcornGo App</h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.8 }}>Book tickets on the go with our mobile app</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ backgroundColor: 'white', color: '#111827', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>📱 Download for iOS</button>
            <button style={{ backgroundColor: 'white', color: '#111827', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>🤖 Download for Android</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
