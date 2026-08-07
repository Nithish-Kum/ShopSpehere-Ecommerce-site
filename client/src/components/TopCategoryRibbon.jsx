import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Tag, Headphones, Shirt, Home as HomeIcon, Watch, Smartphone, Zap } from 'lucide-react';

const TOP_CATEGORIES = [
  { name: 'All', label: 'Top Offers', icon: Tag, color: '#ff5722' },
  { name: 'Electronics', label: 'Electronics & Audio', icon: Headphones, color: '#4f46e5' },
  { name: 'Fashion', label: 'Fashion & Apparel', icon: Shirt, color: '#ec4899' },
  { name: 'Home', label: 'Home & Living', icon: HomeIcon, color: '#10b981' },
  { name: 'Accessories', label: 'Accessories', icon: Watch, color: '#06b6d4' },
];

export const TopCategoryRibbon = () => {
  const { selectedCategory, setSelectedCategory, setSelectedSubcategory } = useContext(ShopContext);

  const handleSelect = (catName) => {
    setSelectedCategory(catName);
    setSelectedSubcategory('All');
  };

  return (
    <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.05)', marginBottom: '1.25rem' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '0.85rem 1rem', overflowX: 'auto' }}>
        {TOP_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => handleSelect(cat.name)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                padding: '0.2rem 0.6rem',
                borderBottom: isActive ? '3px solid #06b6d4' : '3px solid transparent',
                transition: 'all 0.2s ease',
                minWidth: '95px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(6, 182, 212, 0.12)' : '#f8fafc',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#06b6d4' : cat.color,
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={22} />
              </div>
              <span style={{ fontSize: '0.84rem', fontWeight: isActive ? 800 : 600, color: isActive ? '#0f172a' : '#475569', whitespace: 'nowrap' }}>
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategoryRibbon;
