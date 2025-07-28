import React from 'react';

const AppDownloadSection: React.FC = () => (
  <section style={{
    padding: '48px 0',
    backgroundColor: '#111827',
    color: 'white'
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }}>
        Get the PopcornGo App
      </h2>
      <p style={{
        fontSize: '18px',
        marginBottom: '32px',
        opacity: 0.8
      }}>
        Book tickets on the go with our mobile app
      </p>
      <div style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          style={{
            backgroundColor: 'white',
            color: '#111827',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          📱 Download for iOS
        </button>
        <button 
          style={{
            backgroundColor: 'white',
            color: '#111827',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🤖 Download for Android
        </button>
      </div>
    </div>
  </section>
);

export default AppDownloadSection;
