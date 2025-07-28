import React from 'react';

export interface CategoryProps {
  name: string;
  icon: string;
  count: number;
}

const CategoryCard: React.FC<CategoryProps> = ({ name, icon, count }) => (
  <div 
    style={{
      background: 'linear-gradient(135deg, #ec4899 0%, #9333ea 100%)',
      borderRadius: '8px',
      padding: '24px',
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center'
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
    <div style={{
      fontSize: '48px',
      marginBottom: '12px'
    }}>
      {icon}
    </div>
    <h3 style={{
      fontWeight: 'bold',
      fontSize: '20px',
      marginBottom: '4px'
    }}>
      {name}
    </h3>
    <p style={{
      color: '#fce7f3',
      fontSize: '14px'
    }}>
      {count}+ Events
    </p>
  </div>
);

export default CategoryCard;
