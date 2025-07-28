import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  showtimes: string[];
  price: number;
  amenities: string[];
}

interface Seat {
  id: string;
  row: string;
  number: number;
  type: 'available' | 'booked' | 'selected';
  price: number;
}

const Booking: React.FC = () => {
  const [selectedMovie] = useState({
    title: 'Avengers: Endgame',
    genre: 'Action, Adventure, Drama',
    rating: 8.4,
    duration: '3h 1min',
    language: 'English',
    format: 'IMAX'
  });

  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedDate, setSelectedDate] = useState('2024-02-15');
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookingStep, setBookingStep] = useState<'theater' | 'seats' | 'payment'>('theater');

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];
  const dates = [
    { date: '2024-02-15', label: 'Today' },
    { date: '2024-02-16', label: 'Tomorrow' },
    { date: '2024-02-17', label: 'Sat, 17 Feb' },
    { date: '2024-02-18', label: 'Sun, 18 Feb' }
  ];

  const theaters: Theater[] = [
    {
      id: '1',
      name: 'PVR Phoenix Mills',
      location: 'Lower Parel, Mumbai',
      distance: '2.5 km',
      showtimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
      price: 250,
      amenities: ['IMAX', 'Dolby Atmos', 'Recliner Seats']
    },
    {
      id: '2',
      name: 'INOX Megaplex',
      location: 'Inorbit Mall, Malad',
      distance: '8.2 km',
      showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
      price: 200,
      amenities: ['4DX', 'Premium Seats']
    },
    {
      id: '3',
      name: 'Cinepolis Fun Republic',
      location: 'Andheri West, Mumbai',
      distance: '5.1 km',
      showtimes: ['12:00 PM', '3:30 PM', '7:00 PM', '10:30 PM'],
      price: 180,
      amenities: ['VIP Lounge', 'Gourmet Food']
    }
  ];

  // Generate seat layout
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const isBooked = Math.random() < 0.3; // 30% chance of being booked
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          type: isBooked ? 'booked' : 'available',
          price: row <= 'C' ? 300 : row <= 'F' ? 250 : 200
        });
      }
    });
    
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats());

  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.type === 'booked') return;
    
    const isSelected = selectedSeats.find(seat => seat.id === clickedSeat.id);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(seat => seat.id !== clickedSeat.id));
    } else {
      if (selectedSeats.length < 6) { // Max 6 seats
        setSelectedSeats([...selectedSeats, clickedSeat]);
      }
    }
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const convenienceFee = selectedSeats.length * 20;
  const finalAmount = totalAmount + convenienceFee;

  const handleTheaterSelection = (theater: Theater, showtime: string) => {
    setSelectedTheater(theater);
    setSelectedShowtime(showtime);
    setBookingStep('seats');
  };

  const proceedToPayment = () => {
    if (selectedSeats.length > 0) {
      setBookingStep('payment');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
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
            <Link to="/movies" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: '#dc2626',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              ← Back to Movies
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>📍 {selectedCity}</span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>📅 {selectedDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Info */}
      <section style={{ padding: '24px 0', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '80px',
              height: '120px',
              backgroundColor: '#dc2626',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              MOVIE\nPOSTER
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                {selectedMovie.title}
              </h1>
              <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                <span>⭐ {selectedMovie.rating}</span>
                <span>🎭 {selectedMovie.genre}</span>
                <span>⏱️ {selectedMovie.duration}</span>
                <span>🗣️ {selectedMovie.language}</span>
                <span>🎬 {selectedMovie.format}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Date Selection */}
      <section style={{ padding: '16px 0', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
            {dates.map(dateObj => (
              <button
                key={dateObj.date}
                onClick={() => setSelectedDate(dateObj.date)}
                style={{
                  padding: '12px 20px',
                  border: selectedDate === dateObj.date ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: selectedDate === dateObj.date ? '#fef2f2' : 'white',
                  color: selectedDate === dateObj.date ? '#dc2626' : '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {dateObj.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '32px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Theater Selection */}
          {bookingStep === 'theater' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                Select Theater & Showtime
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {theaters.map(theater => (
                  <div key={theater.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                          {theater.name}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                          📍 {theater.location} • {theater.distance}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {theater.amenities.map(amenity => (
                            <span key={amenity} style={{
                              fontSize: '12px',
                              backgroundColor: '#f3f4f6',
                              color: '#374151',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}>
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#dc2626' }}>
                        ₹{theater.price}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {theater.showtimes.map(showtime => (
                        <button
                          key={showtime}
                          onClick={() => handleTheaterSelection(theater, showtime)}
                          style={{
                            padding: '8px 16px',
                            border: '1px solid #dc2626',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            color: '#dc2626',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#dc2626';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#dc2626';
                          }}
                        >
                          {showtime}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seat Selection */}
          {bookingStep === 'seats' && selectedTheater && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                    Select Seats
                  </h2>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {selectedTheater.name} • {selectedShowtime}
                  </p>
                </div>
                <button
                  onClick={() => setBookingStep('theater')}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Change Theater
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
                {/* Seat Map */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  {/* Screen */}
                  <div style={{
                    width: '100%',
                    height: '40px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '32px',
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    SCREEN
                  </div>
                  
                  {/* Seats */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(row => (
                      <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '20px', fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>
                          {row}
                        </span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {seats.filter(seat => seat.row === row).map(seat => {
                            const isSelected = selectedSeats.find(s => s.id === seat.id);
                            return (
                              <button
                                key={seat.id}
                                onClick={() => handleSeatClick(seat)}
                                disabled={seat.type === 'booked'}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  border: 'none',
                                  borderRadius: '6px',
                                  fontSize: '10px',
                                  fontWeight: '500',
                                  cursor: seat.type === 'booked' ? 'not-allowed' : 'pointer',
                                  backgroundColor: 
                                    seat.type === 'booked' ? '#ef4444' :
                                    isSelected ? '#dc2626' :
                                    '#10b981',
                                  color: 'white',
                                  transition: 'all 0.2s'
                                }}
                              >
                                {seat.number}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '16px', backgroundColor: '#10b981', borderRadius: '4px' }}></div>
                      <span>Available</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '16px', backgroundColor: '#dc2626', borderRadius: '4px' }}></div>
                      <span>Selected</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '4px' }}></div>
                      <span>Booked</span>
                    </div>
                  </div>
                </div>
                
                {/* Booking Summary */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  height: 'fit-content'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Booking Summary
                  </h3>
                  
                  {selectedSeats.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                        Selected Seats ({selectedSeats.length})
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                        {selectedSeats.map(seat => (
                          <span key={seat.id} style={{
                            fontSize: '12px',
                            backgroundColor: '#fef2f2',
                            color: '#dc2626',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            border: '1px solid #fecaca'
                          }}>
                            {seat.id}
                          </span>
                        ))}
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>Tickets ({selectedSeats.length})</span>
                          <span>₹{totalAmount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span>Convenience Fee</span>
                          <span>₹{convenienceFee}</span>
                        </div>
                        <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#111827' }}>
                          <span>Total</span>
                          <span>₹{finalAmount}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={proceedToPayment}
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b91c1c'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc2626'}
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  )}
                  
                  {selectedSeats.length === 0 && (
                    <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
                      Please select seats to continue
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payment */}
          {bookingStep === 'payment' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px', textAlign: 'center' }}>
                Payment
              </h2>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '32px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎟️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
                  Booking Confirmed!
                </h3>
                <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
                  Your tickets have been booked successfully.
                </p>
                
                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>Booking Details</h4>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    <p><strong>Movie:</strong> {selectedMovie.title}</p>
                    <p><strong>Theater:</strong> {selectedTheater?.name}</p>
                    <p><strong>Date & Time:</strong> {selectedDate} at {selectedShowtime}</p>
                    <p><strong>Seats:</strong> {selectedSeats.map(seat => seat.id).join(', ')}</p>
                    <p><strong>Total Amount:</strong> ₹{finalAmount}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link
                    to="/movies"
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: 'white',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    Book More
                  </Link>
                  <Link
                    to="/"
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;