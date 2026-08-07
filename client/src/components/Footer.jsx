import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{ background: '#0f172a', color: '#cbd5e1', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      {/* FEATURES RIBBON */}
      <div style={{ background: '#1e293b', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4', padding: '0.65rem', borderRadius: '8px' }}>
              <Truck size={22} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700 }}>24-Hour Express Delivery</h4>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Free shipping on orders above ₹499</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.12)', color: '#4f46e5', padding: '0.65rem', borderRadius: '8px' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700 }}>100% Original Products</h4>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Directly sourced from top brand hubs</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(236, 72, 153, 0.12)', color: '#ec4899', padding: '0.65rem', borderRadius: '8px' }}>
              <RotateCcw size={22} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700 }}>Easy 7-Day Returns</h4>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Hassle-free replacement policy</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', padding: '0.65rem', borderRadius: '8px' }}>
              <Headphones size={22} />
            </div>
            <div>
              <h4 style={{ color: '#ffffff', fontSize: '0.92rem', fontWeight: 700 }}>24/7 Dedicated Support</h4>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Call or chat with our experts anytime</p>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER MAIN */}
      <div className="container" style={{ padding: '3rem 1rem 2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', padding: '0.35rem', borderRadius: '6px' }}>
                <Zap size={18} color="#ffffff" fill="#ffffff" />
              </div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                Shop<span style={{ color: '#06b6d4' }}>Sphere</span>
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.6 }}>
              India's premier modern e-commerce destination for high-end electronics, apparel, smart gadgets, and lifestyle products.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              CATEGORIES
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><a href="#" style={{ color: '#94a3b8' }}>Electronics & Audio</a></li>
              <li><a href="#" style={{ color: '#94a3b8' }}>Fashion & Apparel</a></li>
              <li><a href="#" style={{ color: '#94a3b8' }}>Home & Smart Living</a></li>
              <li><a href="#" style={{ color: '#94a3b8' }}>Accessories & Travel</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              CUSTOMER HELP
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li><a href="#" style={{ color: '#94a3b8' }}>Track Your Order</a></li>
              <li><a href="#" style={{ color: '#94a3b8' }}>Shipping Policy</a></li>
              <li><a href="#" style={{ color: '#94a3b8' }}>Returns & Refunds</a></li>
              <li><a href="#" style={{ color: '#94a3b8' }}>Help & Support</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              PAYMENT METHODS
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
              100% Secure Checkout with Credit/Debit Cards, UPI, NetBanking & COD.
            </p>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
          © 2026 <strong>ShopSphere E-Commerce Ltd</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
