import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { User, MapPin, Package, Heart, LogOut, Plus, Trash2, CheckCircle, Clock, ShieldCheck, ShoppingBag, HelpCircle, Truck, FileText, MessageSquare, PhoneCall, ChevronRight } from 'lucide-react';

export const Profile = () => {
  const { user, setUser, savedAddresses, addAddress, removeAddress, orders, wishlist, toggleWishlist, addToCart, logout, showToast } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-switch active tab if passed from router state (e.g. { tab: 'orders' })
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'account');

  // Support Modal State
  const [supportOrder, setSupportOrder] = useState(null);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // Edit User Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '');

  // Add Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    type: 'Home',
    name: user?.name || '',
    mobile: user?.mobile?.replace(/\D/g, '') || '9876543210',
    pincode: '500081',
    flat: '',
    area: '',
    city: 'Hyderabad',
    state: 'Telangana'
  });

  const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    fontSize: '0.88rem',
    background: '#ffffff',
    color: '#0f172a',
    fontFamily: fontFamily,
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
  };

  const buttonStyle = {
    padding: '0.75rem 1.75rem',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #ff5722 0%, #ea4816 100%)',
    color: '#ffffff',
    fontWeight: 800,
    fontSize: '0.88rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(255, 87, 34, 0.35)',
    fontFamily: fontFamily,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUser({ ...user, name, email, mobile });
    showToast('Profile information updated successfully!');
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.flat || !newAddr.area || !newAddr.pincode) {
      showToast('Please fill all required address fields.');
      return;
    }
    addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({
      type: 'Home',
      name: user?.name || '',
      mobile: '9876543210',
      pincode: '500081',
      flat: '',
      area: '',
      city: 'Hyderabad',
      state: 'Telangana'
    });
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: fontFamily }}>
        <div className="card-box" style={{ maxWidth: '440px', margin: '0 auto', padding: '2.5rem', borderRadius: '12px' }}>
          <User size={48} color="#4f46e5" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontFamily: fontFamily }}>
            Please Login to View Profile
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.5rem', fontFamily: fontFamily }}>
            Access your saved addresses, track orders, and manage account preferences.
          </p>
          <Link to="/login" style={{ ...buttonStyle, width: '100%', textDecoration: 'none' }}>
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 120px)', padding: '2rem 0 4rem 0', fontFamily: fontFamily }}>
      <div className="container">
        
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', fontFamily: fontFamily }}>
          My Account & Settings
        </h1>

        {/* 2-COLUMN PROFILE LAYOUT: LEFT NAVIGATION + RIGHT CONTENT TAB */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 270px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* LEFT NAVIGATION SIDEBAR */}
          <div className="card-box" style={{ padding: '1.25rem', borderRadius: '12px' }}>
            
            {/* User Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', color: '#ffffff', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, fontFamily: fontFamily, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{user.name}</h3>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: fontFamily }}>{user.mobile || user.email}</span>
              </div>
            </div>

            {/* Profile Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {[
                { id: 'account', label: 'Account Information', icon: User, color: '#4f46e5' },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin, color: '#ff5722' },
                { id: 'orders', label: `My Orders & Trackers (${orders.length})`, icon: Package, color: '#06b6d4' },
                { id: 'wishlist', label: `Wishlist & Saved (${wishlist.length})`, icon: Heart, color: '#ec4899' }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? 800 : 600,
                      background: isActive ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                      color: isActive ? '#4f46e5' : '#334155',
                      border: isActive ? '1px solid rgba(79, 70, 229, 0.2)' : 'none',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                      fontFamily: fontFamily
                    }}
                  >
                    <Icon size={16} color={isActive ? '#4f46e5' : tab.color} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              {/* DEDICATED HELP & SUPPORT LINK BUTTON */}
              <Link
                to="/help-support"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#059669',
                  background: 'rgba(5, 150, 105, 0.08)',
                  border: '1px solid rgba(5, 150, 105, 0.2)',
                  textDecoration: 'none',
                  marginTop: '0.35rem'
                }}
              >
                <HelpCircle size={16} color="#059669" />
                <span>Help & Customer Support ➔</span>
              </Link>

              <button
                onClick={logout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#e11d48',
                  background: 'transparent',
                  textAlign: 'left',
                  marginTop: '0.85rem',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: '0.85rem',
                  fontFamily: fontFamily
                }}
              >
                <LogOut size={16} />
                <span>Logout Account</span>
              </button>
            </div>

          </div>

          {/* RIGHT CONTENT BODY */}
          <div>

            {/* TAB 1: ACCOUNT INFORMATION */}
            {activeTab === 'account' && (
              <div className="card-box" style={{ padding: '1.75rem', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem', fontFamily: fontFamily }}>
                  Personal Information
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontFamily: fontFamily }}>
                  Update your contact details and account profile.
                </p>

                <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '480px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', fontFamily: fontFamily }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', fontFamily: fontFamily }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', fontFamily: fontFamily }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      style={inputStyle}
                      placeholder="+91 10-Digit Mobile"
                      required
                    />
                  </div>

                  <button type="submit" style={{ ...buttonStyle, width: 'fit-content', marginTop: '0.5rem' }}>
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="card-box" style={{ padding: '1.75rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', fontFamily: fontFamily }}>
                      Saved Delivery Addresses
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', fontFamily: fontFamily }}>
                      Manage your home and work delivery locations for 1-click checkout.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddressModal(true)}
                    style={{ ...buttonStyle, padding: '0.55rem 1.1rem', fontSize: '0.82rem' }}
                  >
                    <Plus size={15} /> Add New Address
                  </button>
                </div>

                {savedAddresses.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                    <MapPin size={36} color="#cbd5e1" style={{ marginBottom: '0.5rem' }} />
                    <p style={{ fontWeight: 600, fontFamily: fontFamily }}>No saved addresses found. Add one above!</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        style={{
                          border: addr.isDefault ? '2px solid #06b6d4' : '1px solid #cbd5e1',
                          borderRadius: '10px',
                          padding: '1.25rem',
                          background: addr.isDefault ? 'rgba(6, 182, 212, 0.03)' : '#ffffff',
                          position: 'relative',
                          fontFamily: fontFamily
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ background: '#0f172a', color: '#ffffff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                            {addr.type}
                          </span>

                          <button
                            onClick={() => removeAddress(addr.id)}
                            title="Delete address"
                            style={{ background: 'none', border: 'none', color: '#e11d48', cursor: 'pointer' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: fontFamily }}>
                          {user?.name || addr.name || 'Delivery Contact'}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4, marginBottom: '0.5rem', fontFamily: fontFamily }}>
                          {addr.flat}, {addr.area}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                        </p>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, fontFamily: fontFamily }}>
                          Mobile: +91 {addr.mobile || user?.mobile}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: MY ORDERS & LIVE TRACKERS */}
            {activeTab === 'orders' && (
              <div className="card-box" style={{ padding: '1.75rem', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem', fontFamily: fontFamily }}>
                  My Orders & Delivery Trackers ({orders.length})
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontFamily: fontFamily }}>
                  View live shipment progress, product details, and contact 24/7 customer support.
                </p>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
                    <Package size={36} color="#cbd5e1" style={{ marginBottom: '0.5rem' }} />
                    <p style={{ fontWeight: 600, fontFamily: fontFamily }}>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {orders.map((order) => {
                      const isDelivered = order.status === 'Delivered';

                      return (
                        <div key={order.id} style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1.35rem', background: '#ffffff', fontFamily: fontFamily }}>
                          
                          {/* ORDER HEADER */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.85rem', marginBottom: '1.1rem', gap: '0.75rem' }}>
                            <div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800 }}>ORDER REFERENCE ID</span>
                              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{order.id}</div>
                            </div>

                            <div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800 }}>PLACED ON</span>
                              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{order.date}</div>
                            </div>

                            <div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800 }}>TOTAL AMOUNT</span>
                              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>₹{order.total.toLocaleString('en-IN')}</div>
                            </div>

                            {/* HELP & SUPPORT BUTTON */}
                            <button
                              onClick={() => setSupportOrder(order)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                background: '#f1f5f9',
                                border: '1px solid #cbd5e1',
                                color: '#0f172a',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                                padding: '0.45rem 0.85rem',
                                borderRadius: '6px',
                                cursor: 'pointer'
                              }}
                            >
                              <HelpCircle size={15} color="#4f46e5" />
                              <span>Help & Support</span>
                            </button>
                          </div>

                          {/* VISUAL ORDER TIMELINE TRACKER (FLIPKART/AMAZON STYLE) */}
                          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.25rem', border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.85rem' }}>
                              🚚 Live Delivery Status: <span style={{ color: isDelivered ? '#059669' : '#06b6d4' }}>{isDelivered ? '✓ Delivered to Customer' : '⏱ Order Dispatched & In Transit'}</span>
                            </div>

                            {/* 4-STEP TIMELINE TRACKER */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', position: 'relative', textAlign: 'center' }}>
                              
                              {[
                                { title: 'Ordered', desc: 'Confirmed', icon: CheckCircle, active: true },
                                { title: 'Packed', desc: 'Dispatched', icon: Truck, active: true },
                                { title: 'Out for Delivery', desc: 'In Transit', icon: Package, active: !isDelivered },
                                { title: 'Delivered', desc: isDelivered ? 'Delivered' : 'Expected 2 Days', icon: MapPin, active: isDelivered }
                              ].map((step, idx) => {
                                const StepIcon = step.icon;
                                const isCompleted = step.active;
                                return (
                                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                                    <div
                                      style={{
                                        width: '34px',
                                        height: '34px',
                                        borderRadius: '50%',
                                        background: isCompleted ? (idx === 3 && isDelivered ? '#059669' : '#4f46e5') : '#e2e8f0',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: isCompleted ? '0 2px 8px rgba(79, 70, 229, 0.3)' : 'none'
                                      }}
                                    >
                                      <StepIcon size={17} color={isCompleted ? '#ffffff' : '#64748b'} />
                                    </div>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isCompleted ? '#0f172a' : '#64748b' }}>
                                      {step.title}
                                    </span>
                                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                      {step.desc}
                                    </span>
                                  </div>
                                );
                              })}

                            </div>
                          </div>

                          {/* ORDER PURCHASED PRODUCTS LIST */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a' }}>PURCHASED PRODUCTS</span>
                            {order.items.map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid #f1f5f9', padding: '0.65rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  {item.image && (
                                    <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }} />
                                  )}
                                  <div>
                                    <span style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.88rem' }}>{item.name}</span>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Quantity: {item.quantity}</div>
                                  </div>
                                </div>
                                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: WISHLIST & SAVED ITEMS */}
            {activeTab === 'wishlist' && (
              <div className="card-box" style={{ padding: '1.75rem', borderRadius: '12px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem', fontFamily: fontFamily }}>
                  Wishlist & Saved Items ({wishlist.length})
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontFamily: fontFamily }}>
                  Products saved for later purchase.
                </p>

                {wishlist.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
                    <Heart size={40} color="#ec4899" style={{ marginBottom: '0.75rem' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>Your Wishlist is Empty</h3>
                    <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>Click the heart icon on any product to save it here for later.</p>
                    <Link to="/" style={{ ...buttonStyle, textDecoration: 'none' }}>
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.1rem' }}>
                    {wishlist.map((product) => (
                      <div
                        key={product.id}
                        style={{
                          border: '1px solid #cbd5e1',
                          borderRadius: '10px',
                          padding: '0.9rem',
                          background: '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative'
                        }}
                      >
                        <button
                          onClick={() => toggleWishlist(product)}
                          title="Remove from Wishlist"
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: '#fff1f2',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 3
                          }}
                        >
                          <Trash2 size={14} color="#e11d48" />
                        </button>

                        <div style={{ height: '140px', borderRadius: '6px', overflow: 'hidden', marginBottom: '0.75rem', background: '#f8fafc' }}>
                          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', height: '2.4rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {product.name}
                        </h4>

                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          style={{
                            ...buttonStyle,
                            padding: '0.5rem',
                            fontSize: '0.8rem',
                            marginTop: 'auto'
                          }}
                        >
                          <ShoppingBag size={14} /> Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* HELP & CUSTOMER SUPPORT MODAL */}
      {supportOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: fontFamily }}>
          <div className="card-box" style={{ width: '100%', maxWidth: '480px', padding: '2rem', background: '#ffffff', borderRadius: '16px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Customer Support Assistance
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Order Ref: <strong style={{ color: '#0f172a' }}>{supportOrder.id}</strong>
                </span>
              </div>

              <button onClick={() => setSupportOrder(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', fontWeight: 800, color: '#64748b', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              
              <button
                onClick={() => {
                  setSupportOrder(null);
                  navigate('/help-support');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MessageSquare size={20} color="#4f46e5" />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Open 24/7 Help & Support Center</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Live chat agent, FAQs & ticket support</div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </button>

              <button
                onClick={() => {
                  showToast('Return request initiated for Order ' + supportOrder.id);
                  setSupportOrder(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Truck size={20} color="#ff5722" />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Return or Replace Product</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>7-day hassle-free doorstep replacement</div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </button>

              <button
                onClick={() => {
                  showToast('Downloading Tax Invoice PDF...');
                  setSupportOrder(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  background: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={20} color="#06b6d4" />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Download Invoice Receipt</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>PDF tax invoice with GST details</div>
                  </div>
                </div>
                <ChevronRight size={18} color="#94a3b8" />
              </button>

              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <PhoneCall size={20} color="#059669" />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>24/7 Toll-Free Support Helpline</div>
                  <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>1800-SHOP-SPHERE (1800-746-7743)</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ADD ADDRESS MODAL */}
      {showAddressModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: fontFamily }}>
          <div className="card-box" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: '#ffffff', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', fontFamily: fontFamily }}>
              Add New Delivery Address
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem', fontFamily: fontFamily }}>
              Save address for quick express delivery checkout.
            </p>

            <form onSubmit={handleAddAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: fontFamily }}>Full Name</label>
                  <input type="text" value={newAddr.name} onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: fontFamily }}>Mobile Number</label>
                  <input type="text" value={newAddr.mobile} onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })} style={inputStyle} required />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: fontFamily }}>Flat, House No., Building</label>
                <input type="text" placeholder="e.g. Flat 402, Skyline Apartments" value={newAddr.flat} onChange={(e) => setNewAddr({ ...newAddr, flat: e.target.value })} style={inputStyle} required />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: fontFamily }}>Street, Area, Colony</label>
                <input type="text" placeholder="e.g. Hitech City Road, Madhapur" value={newAddr.area} onChange={(e) => setNewAddr({ ...newAddr, area: e.target.value })} style={inputStyle} required />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: fontFamily }}>City</label>
                  <input type="text" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} style={inputStyle} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: fontFamily }}>Pincode</label>
                  <input type="text" value={newAddr.pincode} onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })} style={inputStyle} required maxLength={6} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem', fontFamily: fontFamily }}>Address Type</label>
                <select value={newAddr.type} onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value })} style={inputStyle}>
                  <option value="Home">Home (All Day Delivery)</option>
                  <option value="Work">Work (Delivery between 10 AM - 6 PM)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button type="button" onClick={() => setShowAddressModal(false)} style={{ flex: 1, padding: '0.65rem', border: '1px solid #cbd5e1', background: '#ffffff', fontWeight: 700, borderRadius: '8px', fontFamily: fontFamily, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ ...buttonStyle, flex: 1, padding: '0.65rem' }}>
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
