import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { SlidersHorizontal, Star, Headphones, Shirt, Home, Tag, Watch, RotateCcw, ArrowLeft } from 'lucide-react';

const CATEGORIES = [
  { 
    name: 'All', 
    label: 'All Categories', 
    icon: Tag, 
    color: '#ff5722',
    subcategories: []
  },
  { 
    name: 'Electronics', 
    label: 'Electronics & Audio', 
    icon: Headphones, 
    color: '#4f46e5',
    subcategories: ['Headphones', 'Earphones', 'Smartphones', 'Smartwatches', 'Keyboards', 'Laptops']
  },
  { 
    name: 'Fashion', 
    label: 'Fashion & Apparel', 
    icon: Shirt, 
    color: '#ec4899',
    subcategories: ['Hoodies', 'T-Shirts', 'Jackets', 'Sneakers', 'Watches']
  },
  { 
    name: 'Home', 
    label: 'Home & Living', 
    icon: Home, 
    color: '#10b981',
    subcategories: ['Desk Lamps', 'Office Chairs', 'Coffee Makers', 'Smart Lighting']
  },
  { 
    name: 'Accessories', 
    label: 'Accessories', 
    icon: Watch, 
    color: '#06b6d4',
    subcategories: ['Backpacks', 'Leather Wallets', 'Sunglasses', 'Travel Bags']
  },
];

export const CategoryBar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    priceFilter,
    setPriceFilter,
    ratingFilter,
    setRatingFilter,
    discountFilter,
    setDiscountFilter,
    clearFilters
  } = useContext(ShopContext);

  const activeCategoryObj = CATEGORIES.find(c => c.name === selectedCategory);
  const hasActiveFilters = selectedCategory !== 'All' || selectedSubcategory !== 'All' || priceFilter !== 'all' || ratingFilter > 0 || discountFilter > 0;

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    setSelectedSubcategory('All');
  };

  return (
    <aside className="card-box" style={{ padding: '1.25rem', width: '100%', background: '#ffffff' }}>
      
      {/* Sidebar Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
          <SlidersHorizontal size={18} color="#06b6d4" />
          <span>Filters</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              background: 'none',
              border: 'none',
              color: '#e11d48',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <RotateCcw size={12} /> CLEAR ALL
          </button>
        )}
      </div>

      {/* 1. CATEGORIES / SUBCATEGORIES SECTION */}
      <div style={{ marginBottom: '1.5rem' }}>
        
        {selectedCategory !== 'All' && activeCategoryObj ? (
          /* FOCUS MODE: Show ONLY subcategories for active category */
          <div>
            {/* Back to All Categories header */}
            <div
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubcategory('All');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#4f46e5',
                cursor: 'pointer',
                marginBottom: '0.85rem',
                paddingBottom: '0.4rem',
                borderBottom: '1px border-dash #e2e8f0'
              }}
            >
              <ArrowLeft size={14} /> All Categories
            </div>

            <h4 style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>{activeCategoryObj.label}</span>
            </h4>

            {/* Subcategories List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div
                onClick={() => setSelectedSubcategory('All')}
                style={{
                  padding: '0.5rem 0.65rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: selectedSubcategory === 'All' ? 700 : 500,
                  background: selectedSubcategory === 'All' ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                  color: selectedSubcategory === 'All' ? '#06b6d4' : '#334155',
                  transition: 'all 0.15s ease'
                }}
              >
                All {activeCategoryObj.name}
              </div>

              {activeCategoryObj.subcategories.map((sub) => {
                const isSubActive = selectedSubcategory === sub;
                return (
                  <div
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    style={{
                      padding: '0.5rem 0.65rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: isSubActive ? 700 : 500,
                      background: isSubActive ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
                      color: isSubActive ? '#06b6d4' : '#475569',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {sub}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* DEFAULT MODE: Show all main categories */
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              CATEGORIES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCatActive = selectedCategory === cat.name;
                return (
                  <div
                    key={cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.55rem 0.65rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: isCatActive ? 700 : 500,
                      background: isCatActive ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                      color: isCatActive ? '#06b6d4' : '#334155',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={16} color={isCatActive ? '#06b6d4' : cat.color} />
                    <span>{cat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 2. PRICE RANGE FILTER */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.1rem', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          PRICE RANGE
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.86rem', color: '#334155' }}>
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under-2000', label: 'Under ₹2,000' },
            { id: '2000-4000', label: '₹2,000 to ₹4,000' },
            { id: 'above-4000', label: 'Above ₹4,000' }
          ].map((item) => (
            <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: priceFilter === item.id ? 700 : 500 }}>
              <input
                type="radio"
                name="priceFilter"
                checked={priceFilter === item.id}
                onChange={() => setPriceFilter(item.id)}
                style={{ accentColor: '#06b6d4' }}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. CUSTOMER RATINGS FILTER */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.1rem', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          CUSTOMER RATINGS
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.86rem', color: '#334155' }}>
          {[
            { value: 0, label: 'All Ratings' },
            { value: 4, label: '4★ & above' },
            { value: 4.5, label: '4.5★ & above' }
          ].map((item) => (
            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: ratingFilter === item.value ? 700 : 500 }}>
              <input
                type="radio"
                name="ratingFilter"
                checked={ratingFilter === item.value}
                onChange={() => setRatingFilter(item.value)}
                style={{ accentColor: '#059669' }}
              />
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. DISCOUNT FILTER */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.1rem' }}>
        <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          SPECIAL DISCOUNTS
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.86rem', color: '#334155' }}>
          {[
            { value: 0, label: 'All Discounts' },
            { value: 30, label: '30% or more' },
            { value: 40, label: '40% or more' }
          ].map((item) => (
            <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: discountFilter === item.value ? 700 : 500 }}>
              <input
                type="radio"
                name="discountFilter"
                checked={discountFilter === item.value}
                onChange={() => setDiscountFilter(item.value)}
                style={{ accentColor: '#e11d48' }}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
};

export default CategoryBar;
