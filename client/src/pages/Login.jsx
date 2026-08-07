import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { loginUser } from '../services/api';
import { Smartphone, Mail, Lock, ShieldCheck, Zap, ArrowRight, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';

export const Login = () => {
  const { setUser, showToast } = useContext(ShopContext);
  const navigate = useNavigate();

  // Login Mode: 'mobile' (default) vs 'email'
  const [loginMode, setLoginMode] = useState('mobile');

  // Mobile OTP State
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');

  // Email State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (mobileNumber.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(mockOtp);
      setOtpSent(true);
      setLoading(false);
      showToast(`OTP Sent to +91 ${mobileNumber}! (Use OTP: ${mockOtp})`);
    }, 800);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp) {
      showToast('Incorrect OTP! Please try entering ' + generatedOtp);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const loggedUser = {
        id: 'usr-' + Date.now(),
        name: 'User ' + mobileNumber.slice(-4),
        email: `user_${mobileNumber.slice(-4)}@shopsphere.com`,
        mobile: `+91 ${mobileNumber}`,
        token: 'jwt-otp-token-' + Date.now()
      };
      setUser(loggedUser);
      setLoading(false);
      showToast('Mobile number verified! Welcome to ShopSphere.');
      navigate('/');
    }, 600);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      showToast('Logged in successfully!');
      navigate('/');
    } catch (err) {
      showToast('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    fontSize: '0.88rem',
    background: '#ffffff',
    color: '#0f172a',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #ff5722 0%, #ea4816 100%)',
    color: '#ffffff',
    fontWeight: 800,
    fontSize: '0.88rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(255, 87, 34, 0.35)',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  return (
    <div style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* FULLY RESPONSIVE FLEX SPLIT PANEL CONTAINER */}
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          display: 'flex',
          flexWrap: 'wrap',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 12px 35px rgba(15, 23, 42, 0.12)',
          border: '1px solid #cbd5e1',
          background: '#ffffff'
        }}
      >
        
        {/* LEFT BRANDED PROMOTIONAL BANNER */}
        <div
          style={{
            flex: '1 1 260px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #06b6d4 100%)',
            color: '#ffffff',
            padding: '2.25rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minWidth: '240px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.25)', border: '1px solid rgba(6, 182, 212, 0.4)', padding: '0.35rem', borderRadius: '8px' }}>
                <Zap size={20} color="#06b6d4" fill="#06b6d4" />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                Shop<span style={{ color: '#06b6d4' }}>Sphere</span>
              </span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.25, color: '#ffffff', marginBottom: '0.75rem' }}>
              Login to access Orders & Rewards
            </h2>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Get access to your Orders, Wishlist, Saved Delivery Addresses & Instant Checkout.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={15} color="#06b6d4" />
              <span>100% Secure OTP Verification</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={15} color="#06b6d4" />
              <span>24-Hour Express Shipping</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM CONTAINER WITH CONTROLLED COMPACT WIDTH */}
        <div style={{ flex: '1.2 1 320px', padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '260px' }}>
          
          <div style={{ maxWidth: '340px', width: '100%', margin: '0 auto' }}>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
              {loginMode === 'mobile' ? 'Mobile Verification' : 'Email Account Login'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.5rem' }}>
              {loginMode === 'mobile' ? 'Enter 10-digit mobile number to receive instant OTP' : 'Enter registered email & password to access account'}
            </p>

            {/* 1. MOBILE OTP LOGIN MODE */}
            {loginMode === 'mobile' && (
              <div>
                {!otpSent ? (
                  <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                        Mobile Number
                      </label>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <span style={{ background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '0.55rem 0.75rem', fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Smartphone size={15} color="#4f46e5" /> +91
                        </span>
                        <input
                          type="tel"
                          placeholder="Enter 10-digit number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          style={inputStyle}
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={loading} style={buttonStyle}>
                      {loading ? <RefreshCw size={18} className="spin" /> : <span>REQUEST OTP</span>}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                          Enter 4-Digit OTP
                        </label>
                        <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700 }}>
                          Sent to +91 {mobileNumber}
                        </span>
                      </div>

                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        style={{
                          ...inputStyle,
                          border: '2px solid #06b6d4',
                          background: '#f0fdf4',
                          textAlign: 'center',
                          fontSize: '1.2rem',
                          letterSpacing: '0.3em',
                          fontWeight: 800
                        }}
                        maxLength={4}
                        required
                      />
                      {generatedOtp && (
                        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', fontSize: '0.8rem', fontWeight: 800, padding: '0.45rem', borderRadius: '6px', marginTop: '0.4rem', textAlign: 'center' }}>
                          🔑 Test Verification OTP: {generatedOtp}
                        </div>
                      )}
                    </div>

                    <button type="submit" disabled={loading} style={buttonStyle}>
                      {loading ? <RefreshCw size={18} className="spin" /> : <span>VERIFY & LOGIN</span>}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}
                    >
                      Change Mobile Number
                    </button>
                  </form>
                )}

                {/* TOGGLE TO EMAIL LOGIN */}
                <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1.5rem', paddingTop: '1rem', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setLoginMode('email')}
                    style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '0.84rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Or Continue with Email & Password ➔
                  </button>
                </div>
              </div>
            )}

            {/* 2. EMAIL & PASSWORD LOGIN MODE */}
            {loginMode === 'email' && (
              <div>
                <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? <RefreshCw size={18} className="spin" /> : <span>LOGIN TO ACCOUNT</span>}
                  </button>
                </form>

                <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '1.5rem', paddingTop: '1rem', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setLoginMode('mobile')}
                    style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '0.84rem', fontWeight: 800, cursor: 'pointer' }}
                  >
                    📱 Login using Mobile Number & OTP ➔
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
