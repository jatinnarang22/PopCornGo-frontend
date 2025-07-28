import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  city: string;
  profileImage: string;
}

interface BookingHistory {
  id: string;
  movieTitle: string;
  theater: string;
  date: string;
  time: string;
  seats: string[];
  amount: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  poster: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    dateOfBirth: '1990-05-15',
    city: 'Mumbai',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const [editProfile, setEditProfile] = useState<UserProfile>(userProfile);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode theme colors
  const theme = {
    bg: {
      primary: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%)',
      secondary: 'rgba(15, 15, 35, 0.95)',
      glass: 'rgba(255, 255, 255, 0.05)',
      card: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.12)'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)'
    },
    accent: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      tertiary: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    border: 'rgba(255, 255, 255, 0.1)'
  };

  const bookingHistory: BookingHistory[] = [
    {
      id: 'BK001',
      movieTitle: 'Avengers: Endgame',
      theater: 'PVR Phoenix Mills',
      date: '2024-02-10',
      time: '7:30 PM',
      seats: ['F7', 'F8'],
      amount: 540,
      status: 'confirmed',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&h=150&fit=crop'
    },
    {
      id: 'BK002',
      movieTitle: 'Spider-Man: No Way Home',
      theater: 'INOX Megaplex',
      date: '2024-01-28',
      time: '9:15 PM',
      seats: ['H5', 'H6'],
      amount: 480,
      status: 'completed',
      poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop'
    },
    {
      id: 'BK003',
      movieTitle: 'The Batman',
      theater: 'Cinepolis Fun Republic',
      date: '2024-01-15',
      time: '6:00 PM',
      seats: ['D3', 'D4', 'D5'],
      amount: 720,
      status: 'cancelled',
      poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=100&h=150&fit=crop'
    }
  ];

  const handleSaveProfile = () => {
    setUserProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditProfile(userProfile);
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✓';
      case 'completed': return '★';
      case 'cancelled': return '✗';
      default: return '?';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg.primary,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: `linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%)`,
              filter: 'blur(60px)'
            }}
          />
        ))}
      </div>

      {/* Fixed Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isScrolled ? theme.bg.secondary : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? `1px solid ${theme.border}` : 'none',
        transition: 'all 0.3s ease',
        padding: '16px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            background: theme.accent.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none'
          }}>
            PopcornGo
          </Link>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/" style={{ color: theme.text.secondary, textDecoration: 'none', transition: 'color 0.3s ease' }}>Home</Link>
            <Link to="/movies" style={{ color: theme.text.secondary, textDecoration: 'none', transition: 'color 0.3s ease' }}>Movies</Link>
            <Link to="/events" style={{ color: theme.text.secondary, textDecoration: 'none', transition: 'color 0.3s ease' }}>Events</Link>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                padding: '8px',
                border: 'none',
                borderRadius: '8px',
                background: theme.bg.glass,
                color: theme.text.primary,
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'all 0.3s ease'
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            
            <button style={{
              padding: '10px 20px',
              background: theme.accent.secondary,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}>
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '120px 24px 60px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Profile Header */}
        <div style={{
          background: theme.bg.glass,
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '32px',
          border: `1px solid ${theme.border}`,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '40px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={userProfile.profileImage}
                alt="Profile"
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `4px solid transparent`,
                  background: theme.accent.primary,
                  padding: '4px'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                width: '24px',
                height: '24px',
                background: '#10b981',
                borderRadius: '50%',
                border: '3px solid #0f0f23'
              }} />
            </div>
            <div>
              <h1 style={{
                fontSize: '36px',
                fontWeight: 'bold',
                background: theme.accent.primary,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '12px',
                textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
              }}>
                {userProfile.firstName} {userProfile.lastName}
              </h1>
              <p style={{ 
                color: theme.text.secondary, 
                fontSize: '18px', 
                marginBottom: '20px' 
              }}>
                {userProfile.email}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '8px 16px',
                  background: theme.accent.primary,
                  color: 'white',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}>
                  ⭐ Premium Member
                </span>
                <span style={{
                  padding: '8px 16px',
                  background: theme.bg.card,
                  color: theme.text.primary,
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: `1px solid ${theme.border}`
                }}>
                  📍 {userProfile.city}
                </span>
                <span style={{
                  padding: '8px 16px',
                  background: theme.accent.tertiary,
                  color: 'white',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: '0 4px 15px rgba(79, 172, 254, 0.3)'
                }}>
                  🎬 {bookingHistory.length} Bookings
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            background: theme.bg.card,
            borderRadius: '12px',
            padding: '4px',
            border: `1px solid ${theme.border}`
          }}>
            {(['profile', 'bookings', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTab === tab ? theme.accent.primary : 'transparent',
                  color: activeTab === tab ? 'white' : theme.text.secondary,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? '600' : '500',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease',
                  fontSize: '16px'
                }}
              >
                {tab === 'profile' && '👤 '}
                {tab === 'bookings' && '🎫 '}
                {tab === 'settings' && '⚙️ '}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Details Tab */}
        {activeTab === 'profile' && (
          <div style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '32px',
            border: `1px solid ${theme.border}`,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: theme.text.primary, margin: 0 }}>
                Profile Details
              </h2>
              {!isEditing ? (
                <button
                  onClick={handleEditProfile}
                  style={{
                    background: theme.accent.secondary,
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleSaveProfile}
                    style={{
                      background: theme.accent.tertiary,
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ✓ Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={{
                      background: theme.bg.card,
                      color: theme.text.secondary,
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: `1px solid ${theme.border}`,
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    ✗ Cancel
                  </button>
                </div>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {Object.entries(isEditing ? editProfile : userProfile).map(([key, value]) => {
                if (key === 'profileImage') return null;
                
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                
                return (
                  <div key={key}>
                    <label style={{
                      display: 'block',
                      color: theme.text.secondary,
                      marginBottom: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {label}
                    </label>
                    {isEditing ? (
                      <input
                        type={key === 'email' ? 'email' : key === 'dateOfBirth' ? 'date' : 'text'}
                        value={value}
                        onChange={(e) => setEditProfile(prev => ({ ...prev, [key]: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: `1px solid ${theme.border}`,
                          borderRadius: '8px',
                          background: theme.bg.card,
                          color: theme.text.primary,
                          fontSize: '16px',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ) : (
                      <div style={{
                        padding: '12px 16px',
                        background: theme.bg.card,
                        borderRadius: '8px',
                        color: theme.text.primary,
                        fontSize: '16px',
                        border: `1px solid ${theme.border}`
                      }}>
                        {value}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '32px',
            border: `1px solid ${theme.border}`,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: theme.text.primary, marginBottom: '32px' }}>
              Booking History
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {bookingHistory.map((booking) => (
                <div
                  key={booking.id}
                  style={{
                    background: theme.bg.card,
                    borderRadius: '12px',
                    padding: '24px',
                    border: `1px solid ${theme.border}`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <img
                      src={booking.poster}
                      alt={booking.movieTitle}
                      style={{
                        width: '80px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: theme.text.primary,
                          margin: 0
                        }}>
                          {booking.movieTitle}
                        </h3>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 12px',
                          background: getStatusColor(booking.status),
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          <span>{getStatusIcon(booking.status)}</span>
                          <span style={{ textTransform: 'capitalize' }}>{booking.status}</span>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <span style={{ color: theme.text.muted, fontSize: '14px' }}>Theater:</span>
                          <p style={{ color: theme.text.primary, margin: '4px 0 0', fontWeight: '500' }}>
                            {booking.theater}
                          </p>
                        </div>
                        
                        <div>
                          <span style={{ color: theme.text.muted, fontSize: '14px' }}>Date & Time:</span>
                          <p style={{ color: theme.text.primary, margin: '4px 0 0', fontWeight: '500' }}>
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                        </div>
                        
                        <div>
                          <span style={{ color: theme.text.muted, fontSize: '14px' }}>Seats:</span>
                          <p style={{ color: theme.text.primary, margin: '4px 0 0', fontWeight: '500' }}>
                            {booking.seats.join(', ')}
                          </p>
                        </div>
                        
                        <div>
                          <span style={{ color: theme.text.muted, fontSize: '14px' }}>Amount:</span>
                          <p style={{ color: theme.text.primary, margin: '4px 0 0', fontWeight: '600', fontSize: '16px' }}>
                            ₹{booking.amount}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          background: theme.bg.glass,
                          color: theme.text.secondary,
                          borderRadius: '4px',
                          fontSize: '12px',
                          border: `1px solid ${theme.border}`
                        }}>
                          ID: {booking.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div style={{
            background: theme.bg.glass,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '32px',
            border: `1px solid ${theme.border}`,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: theme.text.primary, marginBottom: '32px' }}>
              Settings
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{
                background: theme.bg.card,
                borderRadius: '12px',
                padding: '24px',
                border: `1px solid ${theme.border}`
              }}>
                <h3 style={{ color: theme.text.primary, marginBottom: '16px', fontSize: '18px' }}>
                  Notifications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Email notifications for bookings',
                    'SMS alerts for show reminders',
                    'Push notifications for offers',
                    'Newsletter subscription'
                  ].map((setting, index) => (
                    <label key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: theme.text.secondary,
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        defaultChecked={index < 2}
                        style={{
                          width: '18px',
                          height: '18px',
                          accentColor: '#667eea'
                        }}
                      />
                      {setting}
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={{
                background: theme.bg.card,
                borderRadius: '12px',
                padding: '24px',
                border: `1px solid ${theme.border}`
              }}>
                <h3 style={{ color: theme.text.primary, marginBottom: '16px', fontSize: '18px' }}>
                  Account Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button style={{
                    padding: '12px 20px',
                    background: theme.accent.tertiary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}>
                    🔄 Change Password
                  </button>
                  <button style={{
                    padding: '12px 20px',
                    background: theme.bg.hover,
                    color: theme.text.primary,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}>
                    📱 Two-Factor Authentication
                  </button>
                  <button style={{
                    padding: '12px 20px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    textAlign: 'left'
                  }}>
                    🗑️ Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default Profile;
