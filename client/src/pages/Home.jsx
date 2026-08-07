import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar';
import TopCategoryRibbon from '../components/TopCategoryRibbon';
import ProductSliderRow from '../components/ProductSliderRow';
import { Clock, Zap, ArrowRight, RefreshCw, SlidersHorizontal, ChevronRight, Headphones, Shirt, Home as HomeIcon, Watch } from 'lucide-react';

export const Home = () => {
  const {
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    priceFilter,
    ratingFilter,
    discountFilter
  } = useContext(ShopContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchProducts(
      selectedCategory,
      searchQuery,
      priceFilter,
      ratingFilter,
      discountFilter,
      selectedSubcategory
    ).then((data) => {
      if (isMounted) {
        let sorted = [...data];
        if (sortBy === 'low-high') sorted.sort((a, b) => a.price - b.price);
        if (sortBy === 'high-low') sorted.sort((a, b) => b.price - a.price);
        if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
        setProducts(sorted);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [selectedCategory, selectedSubcategory, searchQuery, priceFilter, ratingFilter, discountFilter, sortBy]);

  const isFiltering = selectedCategory !== 'All' || selectedSubcategory !== 'All' || searchQuery.trim() !== '' || priceFilter !== 'all' || ratingFilter > 0 || discountFilter > 0;

  // Category grouped subsets for home page slider rows (limited to 6 featured items per row)
  const electronicsItems = products.filter(p => p.category === 'Electronics');
  const fashionItems = products.filter(p => p.category === 'Fashion');
  const homeItems = products.filter(p => p.category === 'Home');
  const accessoryItems = products.filter(p => p.category === 'Accessories');

  const handleCategoryRedirect = (catName) => {
    setSelectedCategory(catName);
    setSelectedSubcategory('All');
  };

  return (
    <div style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 120px)', paddingBottom: '3.5rem' }}>
      
      {/* 1. TOP HORIZONTAL CATEGORY RIBBON */}
      <TopCategoryRibbon />

      <div className="container">

        {/* 2. FILTERED VIEW: 2-Column Sidebar + Full Catalog Grid */}
        {isFiltering ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 270px) 1fr', gap: '1.25rem', alignItems: 'start' }}>
            <CategoryBar />

            <div className="card-box" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '1.25rem', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: '#06b6d4', fontWeight: 700, marginBottom: '0.2rem' }}>
                    <span>{selectedCategory}</span>
                    {selectedSubcategory !== 'All' && (
                      <>
                        <ChevronRight size={12} color="#94a3b8" />
                        <span style={{ color: '#0f172a' }}>{selectedSubcategory}</span>
                      </>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                    {selectedSubcategory !== 'All' ? `${selectedSubcategory}` : selectedCategory === 'All' ? 'Search Results' : `${selectedCategory} Store`}
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Showing {products.length} items
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <SlidersHorizontal size={15} color="#64748b" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      border: '1px solid #cbd5e1',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.85rem',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#0f172a',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <option value="featured">Featured / Popular</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Top Customer Ratings</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '260px', flexDirection: 'column', gap: '0.8rem', color: '#64748b' }}>
                  <RefreshCw size={28} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span style={{ fontSize: '0.9rem' }}>Loading products...</span>
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                  <h3>No products matched your selected filters.</h3>
                  <p style={{ fontSize: '0.88rem', marginTop: '0.4rem' }}>Try adjusting filters on the left sidebar.</p>
                </div>
              ) : (
                <div className="grid-responsive">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 3. FULL HOMEPAGE LANDING VIEW (Featured 6-Item Sliders + VIEW ALL Button) */
          <div>
            
            {/* HERO PROMOTIONAL BANNER WITH CRISP CONTRAST CTA */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #06b6d4 100%)',
                color: '#ffffff',
                borderRadius: '10px',
                padding: '2.5rem 2.5rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ maxWidth: '640px', zIndex: 2 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)', color: '#06b6d4', fontSize: '0.78rem', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                  <Zap size={14} fill="#06b6d4" /> Express Deals • Up to 60% Instant Savings
                </div>

                <h1 style={{ fontSize: '2.3rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '0.75rem', color: '#ffffff' }}>
                  Top Brands & Best Sellers in Electronics, Tech & Fashion
                </h1>

                <p style={{ fontSize: '0.98rem', color: '#cbd5e1', marginBottom: '1.75rem' }}>
                  Shop 100% verified original products with 24-Hour Express Delivery.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <a
                    href="#electronics-slider"
                    className="btn-buy"
                    style={{
                      background: 'linear-gradient(135deg, #ff5722 0%, #ea4816 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      padding: '0.75rem 1.8rem',
                      fontSize: '0.92rem',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 14px rgba(255, 87, 34, 0.4)',
                      textDecoration: 'none'
                    }}
                  >
                    <span style={{ color: '#ffffff' }}>Shop Deals</span>
                    <ArrowRight size={16} color="#ffffff" />
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: '#38bdf8', fontWeight: 700 }}>
                    <Clock size={15} color="#38bdf8" />
                    <span>Sale ends in 03h : 45m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDER ROW 1: TOP DEALS ON ELECTRONICS */}
            <div id="electronics-slider">
              <ProductSliderRow
                title="Top Deals on Electronics & Audio"
                subtitle="Headphones, Smartwatches, 5G Smartphones, Laptops & Keyboards"
                icon={Headphones}
                iconColor="#4f46e5"
                products={electronicsItems.slice(0, 6)}
                onViewAll={() => handleCategoryRedirect('Electronics')}
              />
            </div>

            {/* SLIDER ROW 2: TRENDING FASHION & LIFESTYLE */}
            <ProductSliderRow
              title="Trending Fashion & Apparel"
              subtitle="Denim Jackets, Oversized Hoodies, Bio-Wash Tees & Court Sneakers"
              icon={Shirt}
              iconColor="#ec4899"
              products={fashionItems.slice(0, 6)}
              onViewAll={() => handleCategoryRedirect('Fashion')}
            />

            {/* SLIDER ROW 3: HOME & LIVING ESSENTIALS */}
            <ProductSliderRow
              title="Home & Smart Living Essentials"
              subtitle="Studio Lamps, Ergonomic Mesh Office Chairs, Espresso Makers & Smart Lighting"
              icon={HomeIcon}
              iconColor="#10b981"
              products={homeItems.slice(0, 6)}
              onViewAll={() => handleCategoryRedirect('Home')}
            />

            {/* SLIDER ROW 4: ACCESSORIES & TRAVEL */}
            <ProductSliderRow
              title="Accessories & Travel Essentials"
              subtitle="Leather Laptop Backpacks, RFID Wallets, Polarized Aviators & Cabin Luggage"
              icon={Watch}
              iconColor="#06b6d4"
              products={accessoryItems.slice(0, 6)}
              onViewAll={() => handleCategoryRedirect('Accessories')}
            />

          </div>
        )}

      </div>

    </div>
  );
};

export default Home;
