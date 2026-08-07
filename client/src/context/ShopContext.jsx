import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'prod-1',
        name: 'Aura SoundPro Wireless Headphones',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        quantity: 1
      }
    ];
  });

  // User state defaults to null (User must explicitly log in)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('aura_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const savedWish = localStorage.getItem('aura_wishlist');
    return savedWish ? JSON.parse(savedWish) : [];
  });

  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('aura_addresses');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  
  // Filter States for Left Sidebar
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [discountFilter, setDiscountFilter] = useState(0);

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('aura_orders');
    return savedOrders ? JSON.parse(savedOrders) : [
      {
        id: 'ORD-9842',
        date: '2026-08-05',
        status: 'Delivered',
        total: 4999,
        items: [
          { name: 'Aura SoundPro Wireless Headphones', quantity: 1, price: 4999 }
        ]
      }
    ];
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('aura_user', JSON.stringify(user));
    else localStorage.removeItem('aura_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aura_addresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWish) => {
      const exists = prevWish.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Wishlist.`);
        return prevWish.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to Wishlist! ❤️`);
        return [...prevWish, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setPriceFilter('all');
    setRatingFilter(0);
    setDiscountFilter(0);
    setSearchQuery('');
  };

  const addAddress = (newAddr) => {
    const created = {
      id: 'addr-' + Date.now(),
      name: user?.name || newAddr.name || 'Customer',
      ...newAddr,
      isDefault: savedAddresses.length === 0
    };
    setSavedAddresses([...savedAddresses, created]);
    showToast('New delivery address saved!');
  };

  const removeAddress = (id) => {
    setSavedAddresses(savedAddresses.filter(a => a.id !== id));
    showToast('Address removed.');
  };

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: qty
        }
      ];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) return null;
    const subtotal = getCartSubtotal();
    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      total: subtotal,
      items: [...cart]
    };
    setOrders([newOrder, ...orders]);
    clearCart();
    showToast('Order placed successfully! 🎉');
    return newOrder;
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully.');
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        getCartSubtotal,
        getCartCount,
        user,
        setUser,
        logout,
        wishlist,
        toggleWishlist,
        isInWishlist,
        savedAddresses,
        addAddress,
        removeAddress,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        priceFilter,
        setPriceFilter,
        ratingFilter,
        setRatingFilter,
        discountFilter,
        setDiscountFilter,
        clearFilters,
        orders,
        placeOrder,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
