import React, { useState } from 'react';
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

  const bookingHistory: BookingHistory[] = [
    {
      id: 'BK001',
      movieTitle: 'Avengers: Endgame',
      theater: 'PVR Phoenix Mills',
      date: '2024-02-10',
      time: '7:30 PM',
      seats: ['F7', 'F8'],
      amount: 540,
      status: 'completed',
      poster: 'https://images.unsplash.com/photo-1489599904472-c2269952b9e4?w=100&h=150&fit=crop'
    },
    {
      id: 'BK002',
      movieTitle: 'Spider-Man: No Way Home',
      theater: 'INOX Megaplex',
      date: '2024-02-15',
      time: '9:00 PM',
      seats: ['D5', 'D6', 'D7'],
      amount: 750,
      status: 'confirmed',
      poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=100&h=150&fit=crop'
    },
    {
      id: 'BK003',
      movieTitle: 'The Batman',
      theater: 'Cinepolis Fun Republic',
      date: '2024-01-28',
      time: '6:00 PM',
      seats: ['G10'],
      amount: 200,
      status: 'cancelled',
      poster: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=100&h=150&fit=crop'
    }
  ];

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditProfile(userProfile);
  };

  const handleSaveProfile = () => {
    setUserProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditProfile(userProfile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'completed': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
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
            
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
              My Account
            </h1>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                to="/signin"
                style={{
                  backgroundColor: 'white',
                  color: '#dc2626',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid #dc2626',
                  transition: 'all 0.2s'
                }}
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px' }}>
          
          {/* Sidebar */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            {/* Profile Summary */}
            <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundImage: `url(${userProfile.profileImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: '0 auto 12px',
                border: '3px solid #dc2626'
              }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                {userProfile.firstName} {userProfile.lastName}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                {userProfile.email}
              </p>
            </div>
            
            {/* Navigation Tabs */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'profile', label: '👤 Profile Details', icon: '👤' },
                { id: 'bookings', label: '🎟️ Booking History', icon: '🎟️' },
                { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: activeTab === tab.id ? '#fef2f2' : 'transparent',
                    color: activeTab === tab.id ? '#dc2626' : '#6b7280',
                    border: activeTab === tab.id ? '1px solid #fecaca' : 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label.split(' ').slice(1).join(' ')}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            
            {/* Profile Details Tab */}
            {activeTab === 'profile' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>Profile Details</h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEditProfile}
                      style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={handleSaveProfile}
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          backgroundColor: '#6b7280',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          border: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  {/* Personal Information */}
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Personal Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>First Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editProfile.firstName}
                            onChange={e => handleInputChange('firstName', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        ) : (
                          <p style={{ fontSize: '14px', color: '#111827', padding: '8px 0' }}>{userProfile.firstName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Last Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editProfile.lastName}
                            onChange={e => handleInputChange('lastName', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        ) : (
                          <p style={{ fontSize: '14px', color: '#111827', padding: '8px 0' }}>{userProfile.lastName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Date of Birth</label>
                        {isEditing ? (
                          <input
                            type="date"
                            value={editProfile.dateOfBirth}
                            onChange={e => handleInputChange('dateOfBirth', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        ) : (
                          <p style={{ fontSize: '14px', color: '#111827', padding: '8px 0' }}>{new Date(userProfile.dateOfBirth).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Contact Information</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editProfile.email}
                            onChange={e => handleInputChange('email', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        ) : (
                          <p style={{ fontSize: '14px', color: '#111827', padding: '8px 0' }}>{userProfile.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editProfile.phone}
                            onChange={e => handleInputChange('phone', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        ) : (
                          <p style={{ fontSize: '14px', color: '#111827', padding: '8px 0' }}>{userProfile.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>City</label>
                        {isEditing ? (
                          <select
                            value={editProfile.city}
                            onChange={e => handleInputChange('city', e.target.value)}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          >
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Pune">Pune</option>
                          </select>
                        ) : (
                          <p style={{ fontSize: '14px', color: '#111827', padding: '8px 0' }}>{userProfile.city}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Booking History Tab */}
            {activeTab === 'bookings' && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>Booking History</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {bookingHistory.map(booking => (
                    <div key={booking.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '20px',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '90px',
                        backgroundImage: `url(${booking.poster})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '4px',
                        flexShrink: 0
                      }}></div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>{booking.movieTitle}</h3>
                          <span style={{
                            backgroundColor: getStatusColor(booking.status),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                          <div>
                            <p><strong>Theater:</strong> {booking.theater}</p>
                            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p><strong>Time:</strong> {booking.time}</p>
                            <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
                          </div>
                          <div>
                            <p><strong>Amount:</strong> ₹{booking.amount}</p>
                            <p><strong>Booking ID:</strong> {booking.id}</p>
                          </div>
                        </div>
                      </div>
                      
                      {booking.status === 'confirmed' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <button style={{
                            backgroundColor: '#dc2626',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}>
                            Download Ticket
                          </button>
                          <button style={{
                            backgroundColor: 'white',
                            color: '#ef4444',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: '1px solid #ef4444',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}>
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>Settings</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Notifications */}
                  <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Notifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { id: 'email', label: 'Email notifications for bookings' },
                        { id: 'sms', label: 'SMS notifications for bookings' },
                        { id: 'promotions', label: 'Promotional emails and offers' },
                        { id: 'reminders', label: 'Movie reminder notifications' }
                      ].map(setting => (
                        <label key={setting.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" defaultChecked style={{ accentColor: '#dc2626' }} />
                          {setting.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Privacy */}
                  <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Privacy</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { id: 'profile', label: 'Make profile public' },
                        { id: 'history', label: 'Show booking history to friends' },
                        { id: 'recommendations', label: 'Allow personalized recommendations' }
                      ].map(setting => (
                        <label key={setting.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                          <input type="checkbox" defaultChecked={setting.id !== 'profile'} style={{ accentColor: '#dc2626' }} />
                          {setting.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Account Actions */}
                  <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>Account Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <button style={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        width: 'fit-content'
                      }}>
                        Change Password
                      </button>
                      <button style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        width: 'fit-content'
                      }}>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;