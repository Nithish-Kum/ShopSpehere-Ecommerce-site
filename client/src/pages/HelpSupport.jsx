import React, { useState } from 'react';
import { HelpCircle, MessageSquare, PhoneCall, Mail, Truck, RefreshCw, ShieldCheck, ChevronDown, ChevronUp, Search, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HelpSupport = () => {
  const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  
  // Live Chat Drawer State
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! 👋 Welcome to ShopSphere 24/7 Customer Care. How can I assist you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const faqs = [
    {
      question: 'How do I track my live order shipment status?',
      answer: 'You can track your order by clicking on "My Account & Settings" -> "My Orders & Trackers". Each order features a 4-step live progress timeline showing when your item is Packed, Dispatched, Out for Delivery, and Delivered.'
    },
    {
      question: 'What payment options are accepted on ShopSphere?',
      answer: 'We accept all major Indian payment methods including Instant UPI Apps (PhonePe, Google Pay, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking (SBI, HDFC, ICICI, Axis), and Cash on Delivery (COD).'
    },
    {
      question: 'What is the return and replacement policy?',
      answer: 'We offer a 7-day hassle-free doorstep return & replacement guarantee on all eligible products. If your item is damaged, defective, or incorrect, you can request a return directly from your Order Details page.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard Express Shipping takes 2-3 business days. Express Deals and Metro Cities (Hyderabad, Mumbai, Delhi, Bengaluru) qualify for 24-Hour Next-Day Delivery.'
    },
    {
      question: 'Is my mobile OTP verification safe?',
      answer: 'Yes! ShopSphere uses bank-grade end-to-end encrypted mobile OTP verification. We never store or share your personal phone numbers or card details.'
    }
  ];

  const filteredFaqs = faqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    // Simulated Auto Response
    setTimeout(() => {
      let reply = 'Thank you for reaching out! A customer support executive will review your message regarding: "' + userText + '". Is there anything else I can help with?';
      if (userText.toLowerCase().includes('track') || userText.toLowerCase().includes('order')) {
        reply = 'To track your order status live, please visit "My Profile" -> "My Orders & Trackers" tab.';
      } else if (userText.toLowerCase().includes('refund') || userText.toLowerCase().includes('return')) {
        reply = 'Refunds are processed within 24 hours of item pick-up directly to your original payment method / UPI ID.';
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  return (
    <div style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 120px)', padding: '2.5rem 0 4rem 0', fontFamily: fontFamily }}>
      <div className="container">
        
        {/* HEADER HERO BANNER */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #06b6d4 100%)',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            boxShadow: '0 8px 25px rgba(15, 23, 42, 0.12)'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)', color: '#06b6d4', fontSize: '0.78rem', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
            <HelpCircle size={14} color="#06b6d4" /> 24/7 Dedicated Customer Care
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', fontFamily: fontFamily }}>
            How can we help you today?
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#cbd5e1', marginBottom: '1.5rem', fontFamily: fontFamily }}>
            Search help articles or select a support channel below.
          </p>

          {/* SEARCH HELP INPUT */}
          <div style={{ maxWidth: '540px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search help topics (e.g. tracking, refund, delivery)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 3rem 0.85rem 1.25rem',
                borderRadius: '30px',
                border: 'none',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#ffffff',
                color: '#0f172a',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                fontFamily: fontFamily
              }}
            />
            <Search size={18} color="#64748b" style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* 3 SUPPORT CHANNELS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          
          {/* CHANNEL 1: LIVE CHAT */}
          <div
            onClick={() => setShowChat(true)}
            className="card-box"
            style={{ padding: '1.5rem', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s', background: '#ffffff' }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <MessageSquare size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: fontFamily }}>
              Live Support Chat
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.85rem', fontFamily: fontFamily }}>
              Instant response from customer service agents in under 2 minutes.
            </p>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Start Chat Agent ➔
            </span>
          </div>

          {/* CHANNEL 2: TOLL-FREE CALL */}
          <a
            href="tel:18007467743"
            className="card-box"
            style={{ padding: '1.5rem', borderRadius: '12px', textDecoration: 'none', background: '#ffffff' }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <PhoneCall size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: fontFamily }}>
              24/7 Call Center
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.85rem', fontFamily: fontFamily }}>
              Toll-free customer hotline for urgent delivery assistance.
            </p>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>
              📞 1800-SHOP-SPHERE
            </span>
          </a>

          {/* CHANNEL 3: EMAIL TICKET */}
          <a
            href="mailto:support@shopsphere.com"
            className="card-box"
            style={{ padding: '1.5rem', borderRadius: '12px', textDecoration: 'none', background: '#ffffff' }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
              <Mail size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem', fontFamily: fontFamily }}>
              Email Support Ticket
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.85rem', fontFamily: fontFamily }}>
              Send detailed inquiry or return attachments to our team.
            </p>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06b6d4' }}>
              support@shopsphere.com ➔
            </span>
          </a>

        </div>

        {/* FREQUENTLY ASKED QUESTIONS (FAQS) ACCORDION */}
        <div className="card-box" style={{ padding: '2rem', borderRadius: '14px', background: '#ffffff' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem', fontFamily: fontFamily }}>
            Frequently Asked Questions (FAQs)
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', fontFamily: fontFamily }}>
            Quick answers to common questions about orders, payments, and shipping.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #cbd5e1',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transition: 'all 0.2s'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      background: isOpen ? '#f8fafc' : '#ffffff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      fontFamily: fontFamily
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={18} color="#4f46e5" /> : <ChevronDown size={18} color="#64748b" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '1rem 1.25rem', background: '#ffffff', borderTop: '1px solid #f1f5f9', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, fontFamily: fontFamily }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* LIVE SUPPORT CHAT DRAWER */}
      {showChat && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', width: '360px', height: '480px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 12px 35px rgba(0,0,0,0.2)', border: '1px solid #cbd5e1', zIndex: 300, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: fontFamily }}>
          
          {/* CHAT HEADER */}
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#ffffff', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>ShopSphere Assistant</div>
                <div style={{ fontSize: '0.72rem', color: '#38bdf8' }}>Online 24/7</div>
              </div>
            </div>

            <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 800 }}>
              ✕
            </button>
          </div>

          {/* CHAT BODY */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#f8fafc' }}>
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                  background: msg.sender === 'user' ? '#4f46e5' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                  padding: '0.65rem 0.95rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  fontSize: '0.85rem',
                  lineHeight: 1.45,
                  border: msg.sender === 'bot' ? '1px solid #e2e8f0' : 'none'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* CHAT INPUT */}
          <form onSubmit={handleSendMessage} style={{ padding: '0.75rem', background: '#ffffff', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1, padding: '0.6rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '20px', fontSize: '0.85rem', outline: 'none' }}
            />
            <button
              type="submit"
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ff5722', border: 'none', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

export default HelpSupport;
