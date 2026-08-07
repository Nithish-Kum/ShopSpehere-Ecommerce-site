import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle, CreditCard, Smartphone, Building, Banknote, MapPin, Plus, Lock, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartSubtotal, placeOrder, user, savedAddresses, addAddress, showToast } = useContext(ShopContext);
  const navigate = useNavigate();

  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'checkout_modal'
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0] || null);
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'cod'
  const [selectedUpiApp, setSelectedUpiApp] = useState('phonepe'); // 'gpay', 'phonepe', 'paytm', 'bhim'
  const [upiMobileNumber, setUpiMobileNumber] = useState(user?.mobile || '');
  
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const subtotal = getCartSubtotal();
  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  const handleStartCheckout = () => {
    if (!user) {
      showToast('Please login to your account to proceed with checkout!');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }
    setCheckoutStep('checkout_modal');
  };

  const handleConfirmPaymentAndOrder = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    let upiAppName = 'PhonePe';
    if (selectedUpiApp === 'gpay') upiAppName = 'Google Pay';
    if (selectedUpiApp === 'paytm') upiAppName = 'Paytm';
    if (selectedUpiApp === 'bhim') upiAppName = 'BHIM UPI';

    if (paymentMethod === 'upi') {
      showToast(`Payment request sent to +91 ${upiMobileNumber || '9876543210'}! Opening ${upiAppName}...`);
      
      // Attempt UPI Deep-Link Trigger for mobile devices
      const upiUrl = `upi://pay?pa=shopsphere@upi&pn=ShopSphere&am=${grandTotal}&tr=ORD-${Date.now()}`;
      window.location.href = upiUrl;
    }

    setTimeout(() => {
      const createdOrder = placeOrder();
      setOrderPlaced(createdOrder);
      setIsProcessingPayment(false);
      setCheckoutStep('success');
    }, 2200);
  };

  if (orderPlaced && checkoutStep === 'success') {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: fontFamily }}>
        <div className="card-box" style={{ maxWidth: '520px', margin: '0 auto', padding: '2.5rem 2rem', borderRadius: '12px', background: '#ffffff' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <CheckCircle size={38} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', fontFamily: fontFamily }}>
            Order Placed Successfully!
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem', fontFamily: fontFamily }}>
            Order Reference ID: <strong style={{ color: '#0f172a' }}>{orderPlaced.id}</strong>
          </p>

          <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', textAlign: 'left', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ color: '#64748b' }}>Total Amount Paid:</span>
              <span style={{ fontWeight: 800, color: '#0f172a' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Estimated Delivery:</span>
              <span style={{ fontWeight: 700, color: '#059669' }}>2-3 Business Days</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/profile', { state: { tab: 'orders' } })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.8rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              fontFamily: fontFamily
            }}
          >
            <span>Track Orders & View Timeline</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center', fontFamily: fontFamily }}>
        <div className="card-box" style={{ maxWidth: '440px', margin: '0 auto', padding: '3rem 2rem', borderRadius: '12px' }}>
          <ShoppingBag size={54} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontFamily: fontFamily }}>
            Your Shopping Cart is Empty
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.75rem', fontFamily: fontFamily }}>
            Explore thousands of products across electronics, fashion, and home decor.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #ff5722 0%, #ea4816 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)',
              fontFamily: fontFamily
            }}
          >
            Start Shopping Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 120px)', padding: '2rem 0 4rem 0', fontFamily: fontFamily }}>
      <div className="container">
        
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', fontFamily: fontFamily }}>
          Shopping Cart ({cart.length} Items)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 360px)', gap: '1.5rem', alignItems: 'start' }}>
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="card-box" style={{ padding: '1.25rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #f1f5f9'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', fontFamily: fontFamily }}>
                      {item.name}
                    </h3>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', fontFamily: fontFamily }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      style={{ padding: '0.35rem 0.65rem', background: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', fontWeight: 800, background: '#ffffff', color: '#0f172a' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      style={{ padding: '0.35rem 0.65rem', background: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                    style={{ background: 'none', border: 'none', color: '#e11d48', cursor: 'pointer', padding: '0.4rem' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY CARD */}
          <div className="card-box" style={{ padding: '1.5rem', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', fontFamily: fontFamily }}>
              Order Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Items Subtotal</span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Delivery Charges</span>
                <span style={{ fontWeight: 700, color: shippingFee === 0 ? '#059669' : '#0f172a' }}>
                  {shippingFee === 0 ? 'FREE Express Shipping' : `₹${shippingFee}`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
              <span>Total Payable</span>
              <span style={{ color: '#ff5722' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* CHECKOUT BUTTON (REQUIRES LOGGED IN USER) */}
            <button
              onClick={handleStartCheckout}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #ff5722 0%, #ea4816 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.92rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 87, 34, 0.35)',
                fontFamily: fontFamily,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            {!user && (
              <div style={{ marginTop: '0.85rem', textAlign: 'center', fontSize: '0.78rem', color: '#e11d48', fontWeight: 700 }}>
                ⚠️ Login required to complete order checkout
              </div>
            )}
          </div>

        </div>

      </div>

      {/* CHECKOUT & PAYMENT MODAL */}
      {checkoutStep === 'checkout_modal' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: fontFamily }}>
          
          <div className="card-box" style={{ width: '100%', maxWidth: '640px', padding: '2rem', background: '#ffffff', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', fontFamily: fontFamily }}>
                  Checkout & Secure Payment
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Total Amount: <strong style={{ color: '#ff5722' }}>₹{grandTotal.toLocaleString('en-IN')}</strong>
                </span>
              </div>

              <button onClick={() => setCheckoutStep('cart')} style={{ background: 'none', border: 'none', fontSize: '1.2rem', fontWeight: 800, color: '#64748b', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmPaymentAndOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* STEP 1: SELECT DELIVERY ADDRESS */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  1. Select Delivery Address
                </label>
                
                {savedAddresses.length === 0 ? (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', color: '#64748b' }}>
                    No saved addresses found. Delivering to registered account address (+91 {user.mobile || user.email}).
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr)}
                        style={{
                          border: selectedAddress?.id === addr.id ? '2px solid #06b6d4' : '1px solid #cbd5e1',
                          background: selectedAddress?.id === addr.id ? 'rgba(6, 182, 212, 0.04)' : '#ffffff',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#0f172a', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase', marginRight: '0.5rem' }}>
                            {addr.type}
                          </span>
                          <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{user?.name || addr.name}</strong>
                          <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '2px' }}>
                            {addr.flat}, {addr.area}, {addr.city} - {addr.pincode}
                          </div>
                        </div>

                        {selectedAddress?.id === addr.id && <Check size={18} color="#06b6d4" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* STEP 2: SELECT PAYMENT METHOD */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  2. Choose Payment Method
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.65rem', marginBottom: '1rem' }}>
                  {[
                    { id: 'upi', label: 'Instant UPI', icon: Smartphone, color: '#06b6d4' },
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, color: '#4f46e5' },
                    { id: 'netbanking', label: 'Net Banking', icon: Building, color: '#10b981' },
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, color: '#ff5722' }
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        style={{
                          border: isSelected ? '2px solid #ff5722' : '1px solid #cbd5e1',
                          background: isSelected ? 'rgba(255, 87, 34, 0.05)' : '#ffffff',
                          borderRadius: '8px',
                          padding: '0.65rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Icon size={18} color={isSelected ? '#ff5722' : method.color} />
                        <span style={{ fontSize: '0.78rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#ff5722' : '#0f172a' }}>
                          {method.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* SUB-OPTION A: INSTANT UPI APPS (Google Pay, PhonePe, Paytm, BHIM) */}
                {paymentMethod === 'upi' && (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Select UPI Mobile App:</span>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                      {[
                        { id: 'phonepe', label: 'PhonePe', color: '#5f259f' },
                        { id: 'gpay', label: 'Google Pay', color: '#4285f4' },
                        { id: 'paytm', label: 'Paytm', color: '#00baf2' },
                        { id: 'bhim', label: 'BHIM UPI', color: '#ff6600' }
                      ].map((app) => (
                        <button
                          type="button"
                          key={app.id}
                          onClick={() => setSelectedUpiApp(app.id)}
                          style={{
                            border: selectedUpiApp === app.id ? `2px solid ${app.color}` : '1px solid #cbd5e1',
                            background: selectedUpiApp === app.id ? `${app.color}15` : '#ffffff',
                            color: selectedUpiApp === app.id ? app.color : '#0f172a',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          {app.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.3rem' }}>
                        Registered UPI Mobile Number
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ background: '#e2e8f0', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                          +91
                        </span>
                        <input
                          type="tel"
                          value={upiMobileNumber}
                          onChange={(e) => setUpiMobileNumber(e.target.value)}
                          placeholder="Enter mobile number"
                          style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1.5px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem' }}
                          required
                        />
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '4px', display: 'block' }}>
                        📲 Clicking pay will open or send payment request directly to your {selectedUpiApp.toUpperCase()} app!
                      </span>
                    </div>
                  </div>
                )}

                {/* SUB-OPTION B: CREDIT / DEBIT CARDS */}
                {paymentMethod === 'card' && (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <input type="text" placeholder="Card Number (e.g. 4532 •••• •••• 8921)" style={{ padding: '0.55rem 0.75rem', border: '1.5px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} required />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '0.55rem 0.75rem', border: '1.5px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} required />
                      <input type="password" placeholder="CVV" maxLength={3} style={{ flex: 1, padding: '0.55rem 0.75rem', border: '1.5px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }} required />
                    </div>
                  </div>
                )}

                {/* SUB-OPTION C: NET BANKING */}
                {paymentMethod === 'netbanking' && (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <select style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1.5px solid #cbd5e1', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="sbi">State Bank of India (SBI)</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  </div>
                )}

                {/* SUB-OPTION D: CASH ON DELIVERY */}
                {paymentMethod === 'cod' && (
                  <div style={{ background: '#fff7ed', padding: '0.85rem', borderRadius: '8px', border: '1px solid #fed7aa', fontSize: '0.82rem', color: '#c2410c', fontWeight: 700 }}>
                    💵 Cash on Delivery available! Pay ₹{grandTotal.toLocaleString('en-IN')} via Cash or UPI QR at time of delivery.
                  </div>
                )}

              </div>

              {/* CONFIRM ORDER SUBMIT BUTTON */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  style={{ flex: 1, padding: '0.75rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontWeight: 700, borderRadius: '8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  style={{
                    flex: 1.5,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #ff5722 0%, #ea4816 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 87, 34, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {isProcessingPayment ? <span>Processing Payment...</span> : <span>PAY & PLACE ORDER</span>}
                </button>
              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;
