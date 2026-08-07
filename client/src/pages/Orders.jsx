import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Package, CheckCircle2, Clock, Truck, ArrowLeft } from 'lucide-react';

export const Orders = () => {
  const { orders } = useContext(ShopContext);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="rating-badge" style={{ background: '#059669', fontSize: '0.8rem', padding: '3px 8px' }}><CheckCircle2 size={12} /> Delivered</span>;
      case 'Processing':
        return <span className="rating-badge" style={{ background: '#4f46e5', fontSize: '0.8rem', padding: '3px 8px' }}><Clock size={12} /> Processing</span>;
      case 'Shipped':
        return <span className="rating-badge" style={{ background: '#06b6d4', fontSize: '0.8rem', padding: '3px 8px' }}><Truck size={12} /> Shipped</span>;
      default:
        return <span className="rating-badge" style={{ background: '#4f46e5' }}>{status}</span>;
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: 'calc(100vh - 120px)', padding: '1.75rem 0 4rem 0' }}>
      
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>My Orders & Trackers</h1>
          <Link to="/" style={{ color: '#4f46e5', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="card-box" style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748b' }}>
            <Package size={44} color="#06b6d4" style={{ marginBottom: '0.75rem' }} />
            <h2 style={{ fontSize: '1.2rem', color: '#0f172a' }}>No Placed Orders Found</h2>
            <p style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>When you order items from AuraExpress, they will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map((order) => (
              <div key={order.id} className="card-box" style={{ padding: '1.25rem' }}>
                
                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase' }}>ORDER ID</span>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{order.id}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase' }}>DATE PLACED</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>{order.date}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase' }}>TOTAL AMOUNT</span>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>₹{order.total.toLocaleString('en-IN')}</div>
                  </div>

                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {item.image && (
                          <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
                        )}
                        <span style={{ color: '#0f172a', fontWeight: 600 }}>{item.name}</span>
                        <span style={{ color: '#64748b', fontSize: '0.82rem' }}>x{item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default Orders;
