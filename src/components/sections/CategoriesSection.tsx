import React from 'react';
import CategoryCard, { type CategoryProps } from '../cards/CategoryCard';

interface CategoriesSectionProps {
  categories: CategoryProps[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => (
  <section style={{ padding: '48px 0' }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    }}>
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '32px',
        color: '#111827',
        textAlign: 'center'
      }}>
        Browse by Categories
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px'
      }}>
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
