import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ShoppingBag, Search, User, LogOut, Package, Zap, MapPin, ChevronDown, HelpCircle, Heart } from 'lucide-react';

export const Navbar = () => {
  const { getCartCount, searchQuery, setSearchQuery, user, logout, showToast } = useContext(ShopContext);
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const [deliveryLocation, setDeliveryLocation] = useState('Hyderabad 500001');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [tempPincode, setTempPincode] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLocationUpdate = (e) => {
    e.preventDefault();
    if (tempPincode.trim().length >= 6) {
      setDeliveryLocation(`Pincode ${tempPincode}`);
      setShowLocationModal(false);
      showToast(`Delivery location set to Pincode ${tempPincode}!`);
    }
  };

  return (
    <>
      <header style={{ background: '#0f172a', color: '#ffffff', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 4px 20px rgba(15, 23, 42, 0.15)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', width: '100%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px', gap: '0.75rem' }}>
          
          {/* 1. BRAND LOGO - SHOPSPHERE (FAR LEFT) */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', flexShrink: 0 }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                padding: '0.35rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)'
              }}
            >
              <Zap size={17} color="#ffffff" fill="#ffffff" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Shop<span style={{ color: '#06b6d4' }}>Sphere</span>
              </span>
              <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '0.05em' }}>
                PREMIUM E-STORE
              </span>
            </div>
          </Link>

          {/* 2. COMPACT DELIVERY LOCATION SELECTOR (LEFT CENTER) */}
          <div
            onClick={() => setShowLocationModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              cursor: 'pointer',
              padding: '0.25rem 0.45rem',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'rgba(255, 255, 255, 0.04)',
              flexShrink: 0,
              transition: 'background 0.2s'
            }}
          >
            <MapPin size={14} color="#ff5722" />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, fontSize: '0.7rem' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.62rem' }}>Delivering to</span>
              <span style={{ color: '#f8fafc', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                {deliveryLocation} <ChevronDown size={10} color="#06b6d4" />
              </span>
            </div>
          </div>

          {/* 3. PREMIUM FLIPKART/AMAZON STYLE SEARCH BAR (MIDDLE) */}
          <form 
            onSubmit={handleSearchSubmit} 
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: '1 1 180px',
              maxWidth: '460px',
              height: '36px',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <input
              type="text"
              placeholder="Search for products, brands and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                height: '100%',
                padding: '0 0.85rem',
                border: 'none',
                fontSize: '0.85rem',
                outline: 'none',
                background: '#ffffff',
                color: '#0f172a',
                fontFamily: 'Inter, sans-serif'
              }}
            />
            <button
              type="submit"
              style={{
                height: '100%',
                padding: '0 0.9rem',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              title="Search"
            >
              <Search size={16} color="#ffffff" />
            </button>
          </form>

          {/* 4. RIGHT NAV ACTIONS (PROFILE & CART AT FAR RIGHT) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
            
            {/* RICH USER PROFILE DROPDOWN MENU */}
            <div style={{ position: 'relative' }}>
              {user ? (
                <div
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    padding: '0.3rem 0.55rem',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <User size={15} color="#06b6d4" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    {user.name}
                  </span>
                  <ChevronDown size={12} color="#94a3b8" />
                </div>
              ) : (
                <Link to="/login">
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      padding: '0.4rem 1rem',
                      borderRadius: '6px',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <User size={14} /> Login
                  </button>
                </Link>
              )}

              {/* DROPDOWN MENU CONTAINER */}
              {user && showProfileMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '210px',
                    background: '#ffffff',
                    color: '#0f172a',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    border: '1px solid #cbd5e1',
                    padding: '0.5rem 0',
                    zIndex: 150
                  }}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <div style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>{user.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{user.mobile || user.email}</div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#334155',
                      textDecoration: 'none'
                    }}
                  >
                    <User size={14} color="#4f46e5" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setShowProfileMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#334155',
                      textDecoration: 'none'
                    }}
                  >
                    <Package size={14} color="#06b6d4" />
                    <span>My Orders</span>
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#334155',
                      textDecoration: 'none'
                    }}
                  >
                    <MapPin size={14} color="#ff5722" />
                    <span>Saved Addresses</span>
                  </Link>

                  <Link
                    to="/help-support"
                    onClick={() => setShowProfileMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.6rem 1rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#059669',
                      textDecoration: 'none'
                    }}
                  >
                    <HelpCircle size={14} color="#059669" />
                    <span>Help & Support</span>
                  </Link>

                  <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '0.6rem 1rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#e11d48',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut size={14} />
                      <span>Logout Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon (GUARANTEED 100% VISIBLE) */}
            <Link to="/cart" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <ShoppingBag size={19} color="#ff5722" />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-10px',
                      background: '#ff5722',
                      color: '#ffffff',
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(255, 87, 34, 0.4)'
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <span style={{ color: '#ffffff' }}>Cart</span>
            </Link>

          </div>

        </div>
      </header>

      {/* LOCATION SELECTOR MODAL */}
      {showLocationModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card-box" style={{ width: '100%', maxWidth: '420px', padding: '2rem', background: '#ffffff', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              Select Delivery Location
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Enter your Pincode to check product availability and delivery timelines.
            </p>

            <form onSubmit={handleLocationUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                  Enter 6-Digit Pincode
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500001 or 110001"
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value)}
                  className="input-field"
                  maxLength={6}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowLocationModal(false)}
                  style={{ flex: 1, padding: '0.65rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontWeight: 700, borderRadius: '6px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-buy"
                  style={{ flex: 1, padding: '0.65rem' }}
                >
                  Apply Pincode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
