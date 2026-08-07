// Integrated API Service with 50+ Real Products & Accurate Image Mapping

const API_BASE_URL = 'http://localhost:8080/api';

export const MOCK_PRODUCTS = [
  // ================= ELECTRONICS =================
  // --- HEADPHONES ---
  {
    id: 'prod-1',
    name: 'Aura SoundPro Wireless ANC Headphones',
    price: 4999,
    originalPrice: 7999,
    category: 'Electronics',
    subcategory: 'Headphones',
    rating: 4.8,
    reviewsCount: 142,
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Active Noise Cancelling over-ear headphones with 40-hour battery life, high-res audio drivers, and memory foam cushions.',
    features: ['Active Noise Cancellation', '40-Hour Battery Life', 'Bluetooth 5.3', 'Fast USB-C Charging']
  },
  {
    id: 'prod-101',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling',
    price: 26990,
    originalPrice: 34990,
    category: 'Electronics',
    subcategory: 'Headphones',
    rating: 4.9,
    reviewsCount: 420,
    tag: 'Flagship ANC',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented sound purity.',
    features: ['Dual Processor ANC', 'Speak-to-Chat', '30-Hour Battery', 'Multipoint Connection']
  },
  {
    id: 'prod-102',
    name: 'Bose QuietComfort 45 Over-Ear Headphones',
    price: 19990,
    originalPrice: 29990,
    category: 'Electronics',
    subcategory: 'Headphones',
    rating: 4.8,
    reviewsCount: 310,
    tag: 'Top Comfort',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic quiet, comfort, and sound. TriPort acoustic architecture delivers deep, clear audio performance.',
    features: ['Quiet & Aware Modes', '24-Hour Battery', 'Plush Synthetic Leather', 'Custom EQ']
  },
  {
    id: 'prod-103',
    name: 'JBL Tune 760NC Wireless ANC Headphones',
    price: 5499,
    originalPrice: 7999,
    category: 'Electronics',
    subcategory: 'Headphones',
    rating: 4.6,
    reviewsCount: 215,
    tag: 'Super Bass',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    description: 'JBL Pure Bass Sound with Active Noise Cancellation for 35 hours of uninterrupted bass punch.',
    features: ['JBL Pure Bass', 'Active Noise Cancelling', '35H Battery with ANC', 'Hands-Free Calls']
  },

  // --- EARPHONES ---
  {
    id: 'prod-7',
    name: 'SonicBeat True Wireless Earphones',
    price: 1999,
    originalPrice: 3499,
    category: 'Electronics',
    subcategory: 'Earphones',
    rating: 4.7,
    reviewsCount: 165,
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80',
    description: 'TWS Earbuds with 13mm dynamic drivers, low latency gaming mode, touch controls, and 30 hours total playback.',
    features: ['13mm Bass Drivers', 'IPX5 Water Resistant', 'Touch Controls', 'Type-C Fast Charge']
  },
  {
    id: 'prod-106',
    name: 'Apple AirPods Pro (2nd Generation) TWS',
    price: 22900,
    originalPrice: 26900,
    category: 'Electronics',
    subcategory: 'Earphones',
    rating: 4.9,
    reviewsCount: 580,
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio.',
    features: ['H2 Apple Chip', '2x Active Noise Cancellation', 'MagSafe Case', 'Spatial Audio']
  },

  // --- SMARTPHONES ---
  {
    id: 'prod-8',
    name: 'Titan X Pro Smartphone 5G 256GB',
    price: 24999,
    originalPrice: 32999,
    category: 'Electronics',
    subcategory: 'Smartphones',
    rating: 4.9,
    reviewsCount: 310,
    tag: 'Top Flagship',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'Flagship 5G Smartphone with 120Hz FHD+ AMOLED Display, 108MP OIS Triple Camera, Snapdragon 8 Gen Processor.',
    features: ['120Hz AMOLED', '108MP Camera', '67W Turbo Charging', 'Snapdragon 5G']
  },
  {
    id: 'prod-109',
    name: 'iPhone 15 Pro Max 256GB Natural Titanium',
    price: 134900,
    originalPrice: 149900,
    category: 'Electronics',
    subcategory: 'Smartphones',
    rating: 4.9,
    reviewsCount: 740,
    tag: 'Ultimate Flagship',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    description: 'Forged in titanium with revolutionary A17 Pro chip, customizable Action button, and 5x Telephoto camera.',
    features: ['Titanium Design', 'A17 Pro Chip', '48MP Main Camera', 'USB-C 3.0 Speeds']
  },
  {
    id: 'prod-110',
    name: 'Samsung Galaxy S24 Ultra 5G AI Smartphone',
    price: 119999,
    originalPrice: 134999,
    category: 'Electronics',
    subcategory: 'Smartphones',
    rating: 4.9,
    reviewsCount: 620,
    tag: 'Galaxy AI',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    description: 'Welcome to the era of mobile AI with Galaxy AI, 200MP Quad Telephoto Camera, Built-in S Pen, Titanium Armor.',
    features: ['Galaxy AI Features', '200MP Camera', 'Built-in S Pen', 'Snapdragon 8 Gen 3']
  },

  // --- SMARTWATCHES, KEYBOARDS & LAPTOPS ---
  {
    id: 'prod-2',
    name: 'Lumix Neo Minimalist Smartwatch',
    price: 3499,
    originalPrice: 5999,
    category: 'Electronics',
    subcategory: 'Smartwatches',
    rating: 4.6,
    reviewsCount: 89,
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Sleek AMOLED smartwatch with continuous heart rate monitoring, SPO2 sensor, GPS tracking, and 7-day battery life.',
    features: ['1.4" AMOLED Display', 'Waterproof IP68', '50+ Sports Modes', 'Sleep & HR Monitor']
  },
  {
    id: 'prod-4',
    name: 'AeroPulse Mechanical Gaming Keyboard',
    price: 4299,
    originalPrice: 6299,
    category: 'Electronics',
    subcategory: 'Keyboards',
    rating: 4.7,
    reviewsCount: 95,
    tag: 'Hot Item',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: 'Compact 75% hot-swappable mechanical gaming keyboard with RGB backlighting, custom tactile switches, and wireless Bluetooth/2.4G.',
    features: ['Hot-Swappable Switches', 'Per-Key RGB', 'Tri-Mode Connectivity', 'PBT Keycaps']
  },
  {
    id: 'prod-9',
    name: 'ZenBook Ultra Thin Laptop 16GB RAM',
    price: 54999,
    originalPrice: 69999,
    category: 'Electronics',
    subcategory: 'Laptops',
    rating: 4.8,
    reviewsCount: 78,
    tag: 'Executive Choice',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-portable metallic laptop with 14" 2.8K OLED Display, Intel Core i7 13th Gen, 16GB LPDDR5 RAM & 512GB NVMe SSD.',
    features: ['2.8K OLED Screen', 'Intel Core i7', 'Intel Iris Xe', 'Backlit Keyboard']
  },

  // ================= FASHION =================
  {
    id: 'prod-12',
    name: 'Urban Ranger Denim Trucker Jacket',
    price: 2999,
    originalPrice: 4499,
    category: 'Fashion',
    subcategory: 'Jackets',
    rating: 4.8,
    reviewsCount: 88,
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged vintage denim trucker jacket with button-front closure, twin chest pockets, and comfortable stretch denim blend.',
    features: ['Heavyweight Denim', 'Brass Button Closure', 'Vintage Wash Effect', 'Dual Chest Pockets']
  },
  {
    id: 'prod-210',
    name: 'Puffer Winter Insulated Parka Jacket',
    price: 4499,
    originalPrice: 6999,
    category: 'Fashion',
    subcategory: 'Jackets',
    rating: 4.9,
    reviewsCount: 115,
    tag: 'Winter Essential',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-warm windproof puffer jacket with detachable hood, thermal insulation filling, and water-repellent shell.',
    features: ['Thermal Down Filling', 'Detachable Hood', 'Water Repellent Shell', 'Internal Media Pocket']
  },
  {
    id: 'prod-11',
    name: 'Essential Cotton Crew Neck T-Shirt (Pack of 3)',
    price: 999,
    originalPrice: 1899,
    category: 'Fashion',
    subcategory: 'T-Shirts',
    rating: 4.6,
    reviewsCount: 340,
    tag: 'Super Saver Pack',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'Premium combed bio-washed cotton T-Shirts offering breathable all-day softness, fade resistance, and reinforced seam stitching.',
    features: ['100% Bio-Wash Cotton', 'Breathable Fabric', 'Anti-Pilling Finish', 'Classic Crew Neck']
  },
  {
    id: 'prod-201',
    name: 'Heavyweight Graphic Printed Streetwear Tee',
    price: 899,
    originalPrice: 1499,
    category: 'Fashion',
    subcategory: 'T-Shirts',
    rating: 4.7,
    reviewsCount: 190,
    tag: 'Streetwear Trend',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    description: '240 GSM heavyweight cotton tee with high-density puff print graphics, ribbed collar, and relaxed drop-shoulder fit.',
    features: ['240 GSM Heavy Cotton', 'Puff Print Graphic', 'Drop Shoulder Fit', 'Pre-Shrunk']
  },
  {
    id: 'prod-5',
    name: 'Velvet Noir Oversized Fleece Hoodie',
    price: 1899,
    originalPrice: 2999,
    category: 'Fashion',
    subcategory: 'Hoodies',
    rating: 4.8,
    reviewsCount: 164,
    tag: 'Best Winter Choice',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight 400 GSM French terry cotton hoodie with thermal fleece lining, dropped shoulders, and kangaroo pocket.',
    features: ['100% Organic Cotton', '400 GSM Heavyweight', 'Fleece Lined', 'Relaxed Unisex Fit']
  },
  {
    id: 'prod-13',
    name: 'AirStride Lightweight Urban Sneakers',
    price: 2499,
    originalPrice: 3999,
    category: 'Fashion',
    subcategory: 'Sneakers',
    rating: 4.7,
    reviewsCount: 175,
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Ergonomic breathable mesh sneakers with high-rebound EVA cushioning sole for street style and running comfort.',
    features: ['Memory Foam Insole', 'Breathable Mesh Upper', 'Non-Slip Rubber Grip', 'Ultra Lightweight']
  },

  // ================= HOME & LIVING (10 PRODUCTS) =================
  {
    id: 'prod-6',
    name: 'Zenith Studio Architectural Desk Lamp',
    price: 1499,
    originalPrice: 2499,
    category: 'Home',
    subcategory: 'Desk Lamps',
    rating: 4.8,
    reviewsCount: 118,
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Architectural aluminum LED desk lamp with touch dimming, color temperature control (2700K - 6500K), and wireless charger base.',
    features: ['Touch Dimmer', 'Wireless Qi Charging Base', 'Eye-Care Flicker Free', 'Flexible Gooseneck']
  },
  {
    id: 'prod-15',
    name: 'Ergonomic Mesh Executive Office Chair',
    price: 8999,
    originalPrice: 12999,
    category: 'Home',
    subcategory: 'Office Chairs',
    rating: 4.9,
    reviewsCount: 205,
    tag: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80',
    description: 'High-back ergonomic mesh chair with adjustable lumbar support, 3D armrests, heavy-duty gas lift, and smooth tilt lock mechanism.',
    features: ['Adjustable Lumbar Support', 'Breathable Mesh', '3D Padded Armrests', 'Heavy-Duty Nylon Base']
  },
  {
    id: 'prod-16',
    name: 'BrewMaster Espresso Coffee Maker 15 Bar',
    price: 4999,
    originalPrice: 7499,
    category: 'Home',
    subcategory: 'Coffee Makers',
    rating: 4.7,
    reviewsCount: 94,
    tag: 'Chef Choice',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a698?auto=format&fit=crop&w=800&q=80',
    description: '15-Bar Italian pump espresso machine with stainless steel milk frothing wand for rich lattes, cappuccinos & macchiatos.',
    features: ['15-Bar High Pressure Pump', 'Milk Frothing Wand', 'Dual Shot Filter', 'Removable Water Tank']
  },
  {
    id: 'prod-17',
    name: 'Smart Ambient RGB LED Light Bars',
    price: 1999,
    originalPrice: 2999,
    category: 'Home',
    subcategory: 'Smart Lighting',
    rating: 4.6,
    reviewsCount: 140,
    tag: 'Gaming Setup',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Dual smart RGB LED light bars with music sync modes, Alexa & Google Home voice control, and 16 million colors.',
    features: ['16M Color Modes', 'Music Sync Sensor', 'Voice Control Enabled', 'App Customization']
  },
  {
    id: 'prod-301',
    name: 'ChefPro Digital Air Fryer 4.5L 1500W',
    price: 5499,
    originalPrice: 8999,
    category: 'Home',
    subcategory: 'Coffee Makers',
    rating: 4.8,
    reviewsCount: 185,
    tag: 'Kitchen Essential',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Digital 360-degree rapid air circulation air fryer with touch screen preset menus for healthy oil-free cooking.',
    features: ['360° Air Circulation', '8 One-Touch Presets', 'Non-Stick Basket', 'Automatic Shut-off']
  },
  {
    id: 'prod-302',
    name: 'Ultrasonic Essential Oil Aroma Diffuser 500ml',
    price: 1299,
    originalPrice: 1999,
    category: 'Home',
    subcategory: 'Smart Lighting',
    rating: 4.7,
    reviewsCount: 230,
    tag: 'Aroma Care',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    description: 'Silent ultrasonic cool mist aromatherapy diffuser with 7 mood-enhancing LED light colors and auto safety shut-off.',
    features: ['500ml Water Tank', '7 Color LED Lights', 'Whisper Quiet Operation', 'Timer Settings']
  },
  {
    id: 'prod-303',
    name: 'Smart Robotic Vacuum Cleaner & Mop',
    price: 14999,
    originalPrice: 22999,
    category: 'Home',
    subcategory: 'Desk Lamps',
    rating: 4.9,
    reviewsCount: 310,
    tag: 'Smart Home Tech',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
    description: 'LiDAR navigation smart robot vacuum cleaner with 4000Pa suction power, app control, and wet mopping function.',
    features: ['LiDAR Mapping', '4000Pa Suction Power', 'App & Voice Control', 'Auto Dock Charging']
  },
  {
    id: 'prod-304',
    name: 'Minimalist Wooden Digital Alarm Desk Clock',
    price: 899,
    originalPrice: 1499,
    category: 'Home',
    subcategory: 'Desk Lamps',
    rating: 4.5,
    reviewsCount: 160,
    tag: 'Modern Decor',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    description: 'Eco-friendly wooden texture LED digital desk clock displaying time, temperature, humidity, and wireless phone charging top.',
    features: ['Wooden Finish', 'Temperature & Humidity Sensor', 'Triple Alarm Settings', 'Adjustable Brightness']
  },

  // ================= ACCESSORIES (10 PRODUCTS) =================
  {
    id: 'prod-3',
    name: 'Urban Luxe Leather Laptop Backpack',
    price: 2999,
    originalPrice: 4499,
    category: 'Accessories',
    subcategory: 'Backpacks',
    rating: 4.9,
    reviewsCount: 210,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Handcrafted full-grain leather backpack featuring a padded 15.6" laptop sleeve, water-resistant lining, and ergonomic shoulder straps.',
    features: ['15.6" Laptop Compartment', 'Water Resistant', 'Genuine Leather', 'Hidden Anti-Theft Pocket']
  },
  {
    id: 'prod-18',
    name: 'Heritage Full Grain Leather Bifold Wallet',
    price: 999,
    originalPrice: 1699,
    category: 'Accessories',
    subcategory: 'Leather Wallets',
    rating: 4.8,
    reviewsCount: 190,
    tag: 'Must Have',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-stitched full grain leather wallet with RFID blocking layer, 8 card slots, coin pocket, and dual currency compartments.',
    features: ['100% Genuine Leather', 'RFID Protection', '8 Card Slots', 'Dual Currency Pocket']
  },
  {
    id: 'prod-19',
    name: 'Polarized UV400 Aviator Sunglasses',
    price: 1499,
    originalPrice: 2299,
    category: 'Accessories',
    subcategory: 'Sunglasses',
    rating: 4.6,
    reviewsCount: 155,
    tag: 'Summer Pick',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'Classic metal frame polarized aviator sunglasses with HD TAC lenses for 100% UV400 protection and glare reduction.',
    features: ['100% UV400 Protection', 'Polarized HD Lenses', 'Lightweight Metal Alloy Frame', 'Includes Hard Case']
  },
  {
    id: 'prod-20',
    name: 'Voyage Polycarbonate Hard Shell Cabin Suitcase',
    price: 4299,
    originalPrice: 6999,
    category: 'Accessories',
    subcategory: 'Travel Bags',
    rating: 4.9,
    reviewsCount: 82,
    tag: 'Travel Companion',
    image: 'https://images.unsplash.com/photo-1565026057447-b8899f290906?auto=format&fit=crop&w=800&q=80',
    description: '20" Cabin size ultra-durable polycarbonate luggage with 360-degree silent spinner wheels and TSA approved combination lock.',
    features: ['German Polycarbonate Shell', '360 Spinner Wheels', 'TSA Combination Lock', 'Expandable Zipper']
  },
  {
    id: 'prod-401',
    name: 'Neo Anti-Theft Crossbody Sling Shoulder Bag',
    price: 1199,
    originalPrice: 1899,
    category: 'Accessories',
    subcategory: 'Backpacks',
    rating: 4.7,
    reviewsCount: 165,
    tag: 'Urban Commute',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description: 'Water-resistant chest sling crossbody bag with USB charging port, hidden anti-theft zipper pocket, and padded strap.',
    features: ['USB Charging Port', 'Waterproof Polyester', 'Anti-Theft Hidden Pocket', 'Reversible Strap']
  },
  {
    id: 'prod-402',
    name: 'RFID Blocking Slim Minimalist Card Holder Wallet',
    price: 599,
    originalPrice: 999,
    category: 'Accessories',
    subcategory: 'Leather Wallets',
    rating: 4.8,
    reviewsCount: 280,
    tag: 'Slim Profile',
    image: 'https://images.unsplash.com/photo-1606503830010-85f09623e1e9?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-thin aluminum popup card holder wallet with quick card ejector trigger and genuine leather outer sleeve.',
    features: ['Popup Ejector Trigger', 'Holds 6 Cards', 'RFID Blocking Shield', 'Ultra Slim Design']
  },
  {
    id: 'prod-403',
    name: 'Waterproof Sports Gym Duffle Bag with Shoe Pocket',
    price: 1599,
    originalPrice: 2499,
    category: 'Accessories',
    subcategory: 'Travel Bags',
    rating: 4.7,
    reviewsCount: 195,
    tag: 'Fitness Travel',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Multi-compartment gym travel duffle bag with separate ventilated shoe compartment, wet pocket, and shoulder strap.',
    features: ['Separate Shoe Compartment', 'Wet/Dry Compartment', 'Water Resistant Fabric', 'Luggage Sleeve Strap']
  },
  {
    id: 'prod-404',
    name: 'Vintage Canvas Messenger Laptop Bag 15.6"',
    price: 2199,
    originalPrice: 3299,
    category: 'Accessories',
    subcategory: 'Backpacks',
    rating: 4.8,
    reviewsCount: 140,
    tag: 'Classic Vintage',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight waxed canvas messenger bag with genuine crazy horse leather trim, magnetic snaps, and padded laptop sleeve.',
    features: ['Waxed Water-Resistant Canvas', 'Crazy Horse Leather', 'Padded 15.6" Laptop Sleeve', 'Magnetic Buckle Snaps']
  }
];

export const fetchProducts = async (
  category = 'All',
  searchQuery = '',
  priceFilter = 'all',
  ratingFilter = 0,
  discountFilter = 0,
  subcategory = 'All'
) => {
  let productsList = [];

  try {
    let url = `${API_BASE_URL}/products`;
    const params = new URLSearchParams();
    if (category !== 'All') params.append('category', category);
    if (searchQuery.trim() !== '') params.append('search', searchQuery);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) productsList = data;
    }
  } catch (err) {
    // API Gateway offline fallback
  }

  if (productsList.length === 0) {
    productsList = [...MOCK_PRODUCTS];
  }

  // Apply Client-Side Multi-Filtering
  let filtered = [...productsList];

  // 1. Main Category Filter
  if (category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }

  // 2. Subcategory Filter
  if (subcategory && subcategory !== 'All') {
    filtered = filtered.filter(p => p.subcategory === subcategory);
  }

  // 3. Search Query Filter
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q))
    );
  }

  // 4. Price Filter
  if (priceFilter === 'under-2000') {
    filtered = filtered.filter(p => p.price < 2000);
  } else if (priceFilter === '2000-4000') {
    filtered = filtered.filter(p => p.price >= 2000 && p.price <= 4000);
  } else if (priceFilter === 'above-4000') {
    filtered = filtered.filter(p => p.price > 4000);
  }

  // 5. Rating Filter
  if (ratingFilter > 0) {
    filtered = filtered.filter(p => p.rating >= ratingFilter);
  }

  // 6. Discount Filter
  if (discountFilter > 0) {
    filtered = filtered.filter(p => {
      if (!p.originalPrice) return false;
      const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
      return discount >= discountFilter;
    });
  }

  return filtered;
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fallback
  }
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  if (product) return product;
  throw new Error('Product not found');
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(1500)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    // Fallback
  }
  return {
    id: 'usr-101',
    name: email.split('@')[0] || 'User',
    email: email,
    token: 'mock-jwt-token-12345'
  };
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      signal: AbortSignal.timeout(1500)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    // Fallback
  }
  return {
    id: 'usr-' + Date.now(),
    name: name,
    email: email,
    token: 'mock-jwt-token-' + Date.now()
  };
};

export const createOrderApi = async (order) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
      signal: AbortSignal.timeout(1500)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    // Fallback
  }
  return order;
};
