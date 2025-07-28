import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import MovieCard, { type MovieCardProps } from '../components/cards/MovieCard';

interface FilterOptions {
  genre: string;
  language: string;
  format: string;
  priceRange: string;
}

const Movies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [filters, setFilters] = useState<FilterOptions>({
    genre: 'All',
    language: 'All',
    format: 'All',
    priceRange: 'All'
  });

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune'];
  
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Adventure'];
  const languages = ['All', 'English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Bengali'];
  const formats = ['All', '2D', '3D', 'IMAX', '4DX'];
  const priceRanges = ['All', 'Under ₹150', '₹150-₹250', '₹250-₹350', 'Above ₹350'];

  const allMovies: MovieCardProps[] = [
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
    },
    {
      title: 'Dune',
      genre: 'Sci-Fi, Adventure, Drama',
      rating: 8.0,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      price: 160,
      language: 'English, Hindi',
      format: '2D, IMAX'
    },
    {
      title: 'Black Widow',
      genre: 'Action, Adventure, Thriller',
      rating: 6.7,
      image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
      price: 140,
      language: 'English, Hindi',
      format: '2D, 3D'
    },
    {
      title: 'Fast & Furious 9',
      genre: 'Action, Crime, Thriller',
      rating: 5.2,
      image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
      price: 130,
      language: 'English, Hindi',
      format: '2D, 3D'
    },
    {
      title: 'Eternals',
      genre: 'Action, Adventure, Drama',
      rating: 6.3,
      image: 'https://images.unsplash.com/photo-1635863138275-d9864d3e8e2f?w=400&h=600&fit=crop',
      price: 190,
      language: 'English, Hindi, Tamil',
      format: '2D, 3D, IMAX'
    },
    {
      title: 'No Time to Die',
      genre: 'Action, Adventure, Thriller',
      rating: 7.3,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop',
      price: 175,
      language: 'English, Hindi',
      format: '2D, IMAX'
    },
    {
      title: 'Shang-Chi',
      genre: 'Action, Adventure, Fantasy',
      rating: 7.4,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
      price: 165,
      language: 'English, Hindi',
      format: '2D, 3D, IMAX'
    },
    {
      title: 'Venom: Let There Be Carnage',
      genre: 'Action, Sci-Fi, Thriller',
      rating: 5.9,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      price: 155,
      language: 'English, Hindi',
      format: '2D, 3D'
    },
    {
      title: 'The Matrix Resurrections',
      genre: 'Action, Sci-Fi',
      rating: 5.7,
      image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
      price: 185,
      language: 'English, Hindi',
      format: '2D, IMAX'
    }
  ];

  // Filter movies based on search and filters
  const filteredMovies = useMemo(() => {
    return allMovies.filter(movie => {
      // Search filter
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Genre filter
      const matchesGenre = filters.genre === 'All' || movie.genre.includes(filters.genre);
      
      // Language filter
      const matchesLanguage = filters.language === 'All' || movie.language.includes(filters.language);
      
      // Format filter
      const matchesFormat = filters.format === 'All' || movie.format.includes(filters.format);
      
      // Price range filter
      let matchesPrice = true;
      if (filters.priceRange !== 'All') {
        switch (filters.priceRange) {
          case 'Under ₹150':
            matchesPrice = movie.price < 150;
            break;
          case '₹150-₹250':
            matchesPrice = movie.price >= 150 && movie.price <= 250;
            break;
          case '₹250-₹350':
            matchesPrice = movie.price >= 250 && movie.price <= 350;
            break;
          case 'Above ₹350':
            matchesPrice = movie.price > 350;
            break;
        }
      }
      
      return matchesSearch && matchesGenre && matchesLanguage && matchesFormat && matchesPrice;
    });
  }, [allMovies, searchQuery, filters]);

  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

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
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header Section */}
      <section style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0'
          }}>
            {/* Logo/Back */}
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#dc2626',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              ← PopcornGo
            </Link>
            
            {/* City Selector */}
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
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Page Title & Search */}
      <section style={{ padding: '32px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Movies in {selectedCity}
          </h1>
          
          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search movies by title or genre..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 50px',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#dc2626'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
            <div style={{
              position: 'absolute',
              left: '16px',
              top: '18px',
              color: '#9ca3af',
              fontSize: '20px'
            }}>
              🔍
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section style={{ padding: '24px 0', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Filters</h3>
            <button
              onClick={clearAllFilters}
              style={{
                backgroundColor: 'transparent',
                color: '#dc2626',
                border: '1px solid #dc2626',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#dc2626';
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
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={e => handleFilterChange('genre', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            {/* Language Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Language
              </label>
              <select
                value={filters.language}
                onChange={e => handleFilterChange('language', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
            
            {/* Format Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Format
              </label>
              <select
                value={filters.format}
                onChange={e => handleFilterChange('format', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {formats.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={e => handleFilterChange('priceRange', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section style={{ padding: '32px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
              {filteredMovies.length} Movies Found
            </h2>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Showing results for {selectedCity}
            </div>
          </div>
          
          {filteredMovies.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px'
            }}>
              {filteredMovies.map((movie, index) => (
                <MovieCard key={index} {...movie} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '64px 16px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                No movies found
              </h3>
              <p style={{ fontSize: '16px', marginBottom: '24px' }}>
                Try adjusting your search or filters to find more movies.
              </p>
              <button
                onClick={clearAllFilters}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc2626'}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Movies;