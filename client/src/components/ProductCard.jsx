import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { ShoppingBag, Star, Heart, CheckCircle2 } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext);

  const isWish = isInWishlist(product.id);

  const calculateDiscount = () => {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discountPercent = calculateDiscount();
  const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return (
    <div
      className="card-box"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        fontFamily: fontFamily
      }}
    >
      {/* Product Image Container */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '80%', background: '#f8fafc', overflow: 'hidden' }}>
        <Link to={`/product/${product.id}`} style={{ position: 'absolute', inset: 0 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            loading="lazy"
          />
        </Link>

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isWish ? "Remove from Wishlist" : "Add to Wishlist"}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
            zIndex: 3
          }}
        >
          <Heart size={15} color={isWish ? "#ec4899" : "#64748b"} fill={isWish ? "#ec4899" : "none"} />
        </button>

        {/* Tag Overlay (Best Seller, Trending) */}
        {product.tag && (
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              zIndex: 3,
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              fontFamily: fontFamily
            }}
          >
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Info & CTA Body */}
      <div style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', flexGrow: 1, fontFamily: fontFamily }}>
        
        {/* Category & Title */}
        <div style={{ flexGrow: 1, marginBottom: '0.5rem' }}>
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <h3
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.35,
                minHeight: '2.5rem',
                maxHeight: '2.5rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '0.4rem',
                fontFamily: fontFamily
              }}
              title={product.name}
            >
              {product.name}
            </h3>
          </Link>

          {/* Rating Pill & Verified Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="rating-badge" style={{ fontFamily: fontFamily }}>
                {product.rating} <Star size={11} fill="#ffffff" />
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, fontFamily: fontFamily }}>
                ({product.reviewsCount})
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem', color: '#06b6d4', fontWeight: 700, fontFamily: fontFamily }}>
              <CheckCircle2 size={12} />
              <span>Verified</span>
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', fontFamily: fontFamily }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'line-through', fontFamily: fontFamily }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="discount-tag" style={{ fontFamily: fontFamily }}>
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* PERFECTLY ALIGNED ADD TO CART CTA BUTTON */}
        <button
          onClick={() => addToCart(product)}
          style={{
            width: '100%',
            padding: '0.6rem',
            fontSize: '0.82rem',
            borderRadius: '6px',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            background: 'linear-gradient(135deg, #ff5722 0%, #ea4816 100%)',
            color: '#ffffff',
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)',
            fontFamily: fontFamily
          }}
        >
          <ShoppingBag size={14} />
          <span>Add to Cart</span>
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
