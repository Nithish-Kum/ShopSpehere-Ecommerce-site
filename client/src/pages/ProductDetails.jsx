import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { ShopContext } from '../context/ShopContext';
import { Star, ShoppingBag, Zap, ArrowLeft, Check, ShieldCheck, Truck, Tag, MapPin } from 'lucide-react';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, showToast } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState('110001');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: '#64748b' }}>
        <h2>Loading Product Details...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: '#64748b' }}>
        <h2>Product Not Found</h2>
        <Link to="/" className="btn-primary-blue" style={{ marginTop: '1rem', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Return to Store
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    setPincodeChecked(true);
    showToast(`Express Delivery confirmed for Pincode ${pincode}!`);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 120px)', padding: '1.75rem 0 4rem 0' }}>
      
      <div className="container">
        
        {/* Breadcrumb back link */}
        <Link to="/" style={{ color: '#4f46e5', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem', textDecoration: 'none' }}>
          <ArrowLeft size={14} /> Back to Catalog
        </Link>

        <div className="card-box" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* LEFT: IMAGE & ACTION BUTTONS */}
          <div>
            <div style={{ width: '100%', height: '370px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', background: '#fff' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => addToCart(product)}
                className="btn-cart"
                style={{ flex: 1, padding: '0.9rem', fontSize: '0.95rem' }}
              >
                <ShoppingBag size={18} />
                <span>ADD TO CART</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product);
                  navigate('/cart');
                }}
                className="btn-buy"
                style={{ flex: 1, padding: '0.9rem', fontSize: '0.95rem' }}
              >
                <Zap size={18} />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>

          {/* RIGHT: DETAILS, PRICING & BANK OFFERS */}
          <div>
            
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem', lineHeight: 1.35 }}>
              {product.name}
            </h1>

            {/* Rating pill & Verified Express */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <span className="rating-badge" style={{ fontSize: '0.85rem', padding: '3px 9px' }}>
                {product.rating} <Star size={12} fill="#ffffff" stroke="#ffffff" />
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                {product.reviewsCount} Customer Reviews
              </span>
              <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px', marginLeft: '0.5rem', background: '#ecfeff', padding: '2px 8px', borderRadius: '4px', border: '1px solid #cff4fc' }}>
                <ShieldCheck size={14} /> Verified Express
              </span>
            </div>

            {/* Price section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>

              {product.originalPrice && (
                <span style={{ fontSize: '1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}

              {discountPercent > 0 && (
                <span className="discount-tag" style={{ fontSize: '0.95rem' }}>
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Bank Offers Card */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.1rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Tag size={16} color="#059669" /> Exclusive Payment Offers
              </h4>
              <ul style={{ listStyle: 'none', fontSize: '0.84rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} color="#059669" /> <strong>Instant Savings:</strong> 10% Instant Discount via HDFC / ICICI Cards
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} color="#059669" /> <strong>UPI Offer:</strong> Flat ₹100 Cashback on UPI Transactions
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Check size={14} color="#059669" /> <strong>No Cost EMI:</strong> Available on major credit cards starting ₹416/mo
                </li>
              </ul>
            </div>

            {/* Delivery Pincode Checker */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>
                Check Express Delivery Pincode
              </span>
              <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: '0.5rem', maxWidth: '320px' }}>
                <div style={{ position: 'relative', flexGrow: 1 }}>
                  <MapPin size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.2rem', height: '38px' }}
                  />
                </div>
                <button type="submit" style={{ background: '#06b6d4', color: '#fff', fontWeight: 700, fontSize: '0.85rem', padding: '0 1.2rem', borderRadius: '6px' }}>
                  Check
                </button>
              </form>
              {pincodeChecked && (
                <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 600, marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Truck size={15} /> Delivery expected by Tomorrow | Free Shipping
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                Overview & Features
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                {product.description}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;
