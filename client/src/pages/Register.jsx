import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { registerUser } from '../services/api';
import { User, Mail, Lock, UserPlus, ShieldCheck, Zap } from 'lucide-react';

export const Register = () => {
  const { setUser, showToast } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const userData = await registerUser(name, email, password);
      setUser(userData);
      showToast(`Account created! Welcome, ${userData.name}!`);
      navigate('/');
    } catch (err) {
      setError('Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      
      <div className="card-box" style={{ width: '100%', maxWidth: '800px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', overflow: 'hidden' }}>
        
        {/* LEFT BANNER */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #4f46e5 100%)', color: '#ffffff', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <Zap size={22} color="#06b6d4" fill="#06b6d4" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Aura<span style={{ color: '#06b6d4' }}>Express</span></span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.8rem' }}>Create Account</h2>
            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              Sign up today to enjoy verified products, fast shipping & instant savings.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#38bdf8' }}>
            <ShieldCheck size={18} /> Verified & Authentic Products Only
          </div>
        </div>

        {/* RIGHT FORM */}
        <div style={{ padding: '2.5rem 2rem', background: '#ffffff' }}>
          
          {error && (
            <div style={{ background: '#fff1f2', color: '#e11d48', padding: '0.6rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginBottom: '0.3rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginBottom: '0.3rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginBottom: '0.3rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginBottom: '0.3rem' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="btn-buy"
              style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', fontSize: '0.92rem' }}
            >
              <UserPlus size={16} />
              <span>{loading ? 'CREATING ACCOUNT...' : 'CONTINUE'}</span>
            </button>

          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: '#64748b' }}>
            Existing User?{' '}
            <Link to="/login" style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'none' }}>
              Log In
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
