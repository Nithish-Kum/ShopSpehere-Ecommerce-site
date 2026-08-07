import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export const ProductSliderRow = ({ title, subtitle, icon: Icon, iconColor, products, onViewAll }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="card-box" style={{ padding: '1.25rem', marginBottom: '1.25rem', position: 'relative' }}>
      
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {Icon && <Icon size={22} color={iconColor || '#4f46e5'} />}
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>{title}</h2>
            {subtitle && <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{subtitle}</span>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Scroll Navigation Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              onClick={() => scroll('left')}
              title="Scroll Left"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              title="Scroll Right"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* VIEW ALL BUTTON */}
          <button
            onClick={onViewAll}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.8rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
            }}
          >
            <span>VIEW ALL</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Horizontal Overflow Slider */}
      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          paddingBottom: '0.5rem',
          scrollbarWidth: 'thin'
        }}
      >
        {products.map((product) => (
          <div key={product.id} style={{ minWidth: '225px', maxWidth: '240px', flexShrink: 0 }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductSliderRow;
