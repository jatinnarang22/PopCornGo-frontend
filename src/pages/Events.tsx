import React, { useState, useMemo } from 'react';
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
  const [filters, setFilters] = useState<EventFilterOptions>({
    category: 'All',
    city: 'All',
    priceRange: 'All',
    date: 'All'
  });

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
      title: 'Shakespeare\'s Hamlet',
      category: 'Theatre',
      date: '2024-02-12',
      venue: 'Prithvi Theatre, Mumbai',
      price: 600,
      image: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400&h=300&fit=crop'
    },
    {
      title: 'Digital Marketing Workshop',
      category: 'Workshops',
      date: '2024-02-18',
      venue: 'ITC Grand Central, Mumbai',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop'
    },
    {
      title: 'Art Exhibition: Modern Masters',
      category: 'Exhibitions',
      date: '2024-02-25',
      venue: 'National Gallery, Delhi',
      price: 300,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    },
    {
      title: 'Sunburn Music Festival',
      category: 'Concerts',
      date: '2024-03-01',
      venue: 'Vagator Beach, Goa',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop'
    },
    {
      title: 'Tech Talk: AI & Future',
      category: 'Workshops',
      date: '2024-02-14',
      venue: 'Bangalore International Centre',
      price: 0,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
    },
    {
      title: 'Classical Dance Performance',
      category: 'Theatre',
      date: '2024-02-22',
      venue: 'Music Academy, Chennai',
      price: 750,
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop'
    },
    {
      title: 'Food & Wine Festival',
      category: 'Exhibitions',
      date: '2024-02-28',
      venue: 'Mahalaxmi Racecourse, Mumbai',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
    }
  ];

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      // Search filter
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
  }, [allEvents, searchQuery, filters]);

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
            Events in {selectedCity}
          </h1>
          
          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search events by title, category, or venue..."
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
            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Category
              </label>
              <select
                value={filters.category}
                onChange={e => handleFilterChange('category', e.target.value)}
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
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Date Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Date
              </label>
              <select
                value={filters.date}
                onChange={e => handleFilterChange('date', e.target.value)}
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
                {dateRanges.map(date => (
                  <option key={date} value={date}>{date}</option>
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
              {filteredEvents.length} Events Found
            </h2>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Showing results for {selectedCity}
            </div>
          </div>
          
          {filteredEvents.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {filteredEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '64px 16px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
                No events found
              </h3>
              <p style={{ fontSize: '16px', marginBottom: '24px' }}>
                Try adjusting your search or filters to find more events.
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

export default Events;
