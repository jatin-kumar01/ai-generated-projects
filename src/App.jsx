import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  Search,
  User,
  LogOut,
  X,
  Menu,
  Star,
  Tag,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Eye,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  MessageSquare,
  Send,
  Bell,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  Phone,
  MapPin,
  PackageCheck,
  Award,
  RefreshCw,
  Gift,
  HelpCircle,
  FileText,
  Percent,
  Check
} from 'lucide-react';

// ==========================================
// CONSTANTS & FALLBACKS
// ==========================================
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

const INITIAL_PRODUCTS = [
  // Electronics
  {
    id: "prod-1",
    name: "Aura Pro Wireless ANC Headphones",
    category: "Electronics",
    price: 249,
    originalPrice: 299,
    rating: 4.9,
    reviewsCount: 328,
    isFlashDeal: true,
    inStock: true,
    stockCount: 18,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    description: "Industry-leading active noise cancellation with 40-hour battery life, spatial audio tracking, and ultra-soft memory foam ear cushions.",
    specs: ["Bluetooth 5.3", "40hr Battery", "Hybrid ANC", "Spatial Audio", "USB-C Fast Charge"]
  },
  {
    id: "prod-2",
    name: "Nova Ultra 4K 144Hz Gaming Monitor",
    category: "Electronics",
    price: 329,
    originalPrice: 399,
    rating: 4.8,
    reviewsCount: 142,
    isFlashDeal: false,
    inStock: true,
    stockCount: 8,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
    description: "27-inch IPS UHD display featuring 1ms response time, HDR600 color reproduction, and seamless G-Sync/FreeSync compatibility.",
    specs: ["4K UHD (3840x2160)", "144Hz Refresh Rate", "1ms GtG", "HDR600", "98% DCI-P3"]
  },
  {
    id: "prod-3",
    name: "Aura SoundBar 360 Dolby Atmos",
    category: "Electronics",
    price: 189,
    originalPrice: 229,
    rating: 4.7,
    reviewsCount: 98,
    isFlashDeal: true,
    inStock: true,
    stockCount: 15,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    description: "Immersive room-filling acoustic soundbar with built-in subwoofers and wireless HDMI eARC pass-through.",
    specs: ["Dolby Atmos 5.1", "Wireless Sub", "HDMI eARC", "Bluetooth & AirPlay 2", "240W Peak"]
  },
  {
    id: "prod-4",
    name: "Horizon Smartwatch Series X",
    category: "Electronics",
    price: 219,
    originalPrice: 269,
    rating: 4.6,
    reviewsCount: 215,
    isFlashDeal: false,
    inStock: true,
    stockCount: 24,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    description: "Titanium chassis with always-on Sapphire AMOLED screen, comprehensive biometric sensor suite, and 7-day battery endurance.",
    specs: ["Sapphire Glass", "ECG & SpO2", "Water Resistant 50m", "7-Day Battery", "GPS Built-in"]
  },
  {
    id: "prod-5",
    name: "Pulse ANC True Wireless Earbuds",
    category: "Electronics",
    price: 119,
    originalPrice: 149,
    rating: 4.8,
    reviewsCount: 540,
    isFlashDeal: true,
    inStock: true,
    stockCount: 45,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    description: "Compact wireless buds featuring transparent environmental mode, IPX7 sweat resistance, and Qi wireless charging case.",
    specs: ["Active Noise Canceling", "32hr Total Playtime", "IPX7 Waterproof", "Multipoint Connect", "Touch Controls"]
  },

  // Developer Gear
  {
    id: "prod-6",
    name: "Vortex Mechanical RGB Keyboard",
    category: "Developer Gear",
    price: 149,
    originalPrice: 179,
    rating: 4.9,
    reviewsCount: 412,
    isFlashDeal: true,
    inStock: true,
    stockCount: 22,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    description: "Hot-swappable tactile mechanical switches with sound-dampening silicone gaskets and per-key programmable RGB backlighting.",
    specs: ["Hot-Swappable Switches", "Gasket Mounted", "South-facing RGB", "PBT Doubleshot Keys", "CNC Aluminum Body"]
  },
  {
    id: "prod-7",
    name: "Precision Ergonomic Wireless Mouse",
    category: "Developer Gear",
    price: 89,
    originalPrice: 109,
    rating: 4.7,
    reviewsCount: 190,
    isFlashDeal: false,
    inStock: true,
    stockCount: 30,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    description: "Engineered 57-degree vertical grip that promotes natural wrist posture, thumb rest scroll wheel, and hyper-fast sensor.",
    specs: ["57-Degree Natural Angle", "4000 DPI Sensor", "Quiet Click Tech", "USB-C Rechargeable", "3-Device Pairing"]
  },
  {
    id: "prod-8",
    name: "Apex Dual Monitor Aluminum Arm",
    category: "Developer Gear",
    price: 129,
    originalPrice: 159,
    rating: 4.8,
    reviewsCount: 86,
    isFlashDeal: false,
    inStock: true,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop&q=80",
    description: "Heavy-duty gas spring dual monitor mount supporting up to 32-inch screens with integrated internal cable channels.",
    specs: ["Supports 17-32\" Displays", "Gas Spring Counterbalance", "VESA 75/100", "Integrated Cable Guide", "Desk Clamp & Grommet"]
  },
  {
    id: "prod-9",
    name: "Aura Studio 4K HDR Pro Webcam",
    category: "Developer Gear",
    price: 139,
    originalPrice: 169,
    rating: 4.6,
    reviewsCount: 110,
    isFlashDeal: true,
    inStock: true,
    stockCount: 19,
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&auto=format&fit=crop&q=80",
    description: "Sony Starvis sensor with auto-framing AI, physical magnetic privacy shutter, and dual beamforming noise-filtering microphones.",
    specs: ["4K 30fps / 1080p 60fps", "Sony Starvis Sensor", "Dual Noise-Canceling Mics", "Auto-Focus & Light Correction", "Privacy Shutter"]
  },
  {
    id: "prod-10",
    name: "CarbonDesk Extended Wool Felt Desk Mat",
    category: "Developer Gear",
    price: 45,
    originalPrice: 55,
    rating: 4.9,
    reviewsCount: 305,
    isFlashDeal: false,
    inStock: true,
    stockCount: 60,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
    description: "Natural Merino-blend felt mat with anti-slip silicone studded backing, precision edge stitching, and water-repellent coating.",
    specs: ["90cm x 40cm Dimensions", "Premium Merino Blend", "Anti-Slip Silicone Base", "Water-Repellent", "Reinforced Edge Seam"]
  },

  // Fashion
  {
    id: "prod-11",
    name: "Artisan Italian Leather Weekender Bag",
    category: "Fashion",
    price: 210,
    originalPrice: 260,
    rating: 4.8,
    reviewsCount: 75,
    isFlashDeal: false,
    inStock: true,
    stockCount: 14,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    description: "Full-grain vegetable-tanned cowhide leather duffle with brass hardware, dedicated shoe compartment, and padded shoulder strap.",
    specs: ["Full-Grain Leather", "Dedicated Shoe Tunnel", "Heavy Brass YKK Zippers", "Airline Carry-On Sized", "Waterproof Lining"]
  },
  {
    id: "prod-12",
    name: "Minimalist Chronograph Watch Gold/Black",
    category: "Fashion",
    price: 175,
    originalPrice: 220,
    rating: 4.7,
    reviewsCount: 164,
    isFlashDeal: true,
    inStock: true,
    stockCount: 20,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    description: "Japanese quartz movement encased in brushed stainless steel, paired with an interchangeable genuine Italian leather strap.",
    specs: ["Japanese Quartz", "40mm Case Diameter", "5 ATM Water Resistance", "Sapphire-Coated Mineral", "Quick-Release Strap"]
  },
  {
    id: "prod-13",
    name: "Merino Wool All-Weather Oversized Hoodie",
    category: "Fashion",
    price: 120,
    originalPrice: 150,
    rating: 4.9,
    reviewsCount: 280,
    isFlashDeal: false,
    inStock: true,
    stockCount: 35,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    description: "Ultra-soft 320gsm Australian Merino wool blend that naturally regulates temperature, resists odors, and offers relaxed drape.",
    specs: ["100% Traceable Merino", "320 GSM Heavyweight", "Naturally Odor-Resistant", "Reinforced Kangaroo Pocket", "Pre-shrunk Fabric"]
  },
  {
    id: "prod-14",
    name: "Polarized Aviator Titanium Sunglasses",
    category: "Fashion",
    price: 95,
    originalPrice: 130,
    rating: 4.6,
    reviewsCount: 95,
    isFlashDeal: true,
    inStock: true,
    stockCount: 28,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
    description: "Featherlight aerospace-grade titanium wire frames with 100% UV400 polarized crystal lenses and hydrophobic oleophobic coating.",
    specs: ["Aerospace Grade Titanium", "Polarized UV400 Protection", "Anti-Reflective Inner Coating", "Silicone Nose Grips", "Hard Case Included"]
  },
  {
    id: "prod-15",
    name: "Heritage Waxed Canvas Commuter Backpack",
    category: "Fashion",
    price: 135,
    originalPrice: 170,
    rating: 4.8,
    reviewsCount: 140,
    isFlashDeal: false,
    inStock: true,
    stockCount: 16,
    image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop&q=80",
    description: "Weather-resistant 18oz Scottish waxed canvas with leather accents, quick-access padded 16\" laptop sleeve, and roll-top expansion.",
    specs: ["18oz Waxed Cotton Canvas", "Padded 16\" Laptop Compartment", "Roll-top 22L-28L Volume", "Water Repellent", "Handcrafted Stitching"]
  },

  // Home & Living
  {
    id: "prod-16",
    name: "AeroPure Smart HEPA Air Purifier",
    category: "Home & Living",
    price: 199,
    originalPrice: 249,
    rating: 4.8,
    reviewsCount: 210,
    isFlashDeal: true,
    inStock: true,
    stockCount: 17,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    description: "Medical-grade H13 True HEPA filter capturing 99.97% of airborne allergens, with smart PM2.5 real-time air quality display.",
    specs: ["H13 True HEPA Filter", "Cleans 500 sq ft in 30min", "Whisper-Quiet 22dB Sleep Mode", "Smart App & Alexa Control", "Filter Life Indicator"]
  },
  {
    id: "prod-17",
    name: "Ceramic Pour-Over Barista Coffee Set",
    category: "Home & Living",
    price: 65,
    originalPrice: 85,
    rating: 4.9,
    reviewsCount: 340,
    isFlashDeal: false,
    inStock: true,
    stockCount: 40,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    description: "Handcrafted matte ceramic dripper, heat-resistant borosilicate glass server (600ml), and precision gooseneck kettle thermometer.",
    specs: ["Matte Japanese Ceramic", "600ml Borosilicate Carafe", "Spiral Heat Flow Ribs", "Dishwasher Safe", "Includes 50 Unbleached Filters"]
  },
  {
    id: "prod-18",
    name: "Lumina Ambient Dimmable Desk Lamp",
    category: "Home & Living",
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    reviewsCount: 125,
    isFlashDeal: false,
    inStock: true,
    stockCount: 25,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    description: "Anodized aluminum architect lamp featuring stepless rotary dimmer, warm-to-cool Kelvin tuning (2700K-6500K), and wireless Qi charging base.",
    specs: ["Stepless Brightness & CCT", "Built-in 15W Qi Fast Charger", "95+ CRI True Color Index", "Dual Articulated Arms", "Zero Flicker Driver"]
  },
  {
    id: "prod-19",
    name: "Ergonomic Memory Foam Hybrid Pillow",
    category: "Home & Living",
    price: 55,
    originalPrice: 70,
    rating: 4.8,
    reviewsCount: 410,
    isFlashDeal: true,
    inStock: true,
    stockCount: 50,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    description: "Dual-height contour design infused with cooling gel particles and encased in a breathable bamboo-derived washable cover.",
    specs: ["Cooling Gel Infusion", "Contour Cervical Support", "Removable Bamboo Cover", "CertiPUR-US Certified", "Hypoallergenic Core"]
  },
  {
    id: "prod-20",
    name: "Ultrasonic Aromatherapy Diffuser & Mist",
    category: "Home & Living",
    price: 49,
    originalPrice: 65,
    rating: 4.6,
    reviewsCount: 185,
    isFlashDeal: false,
    inStock: true,
    stockCount: 33,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    description: "Solid walnut base with hand-blown frosted glass reservoir, 12-hour continuous cool mist, and ambient candlelight pulse mode.",
    specs: ["Natural Walnut Wood Base", "400ml Tank Capacity", "Auto-Off When Empty", "7 Gentle Ambient Colors", "Ultrasonic 2.4MHz Vibration"]
  }
];

const DEFAULT_USERS = {
  'user-amon': {
    id: 'user-amon',
    name: 'Amon',
    email: 'amon@veyora.com',
    secondaryEmail: 'amon@auramarket.com',
    altEmail: 'amon@example.com',
    password: 'password123',
    role: 'Prime Explorer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    savedAddress: '78 Skyline Avenue',
    street: '78 Skyline Avenue',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'United States',
    phone: '+1 (555) 349-8812',
    joinedDate: 'October 2024'
  },
  'user-sarah': {
    id: 'user-sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.j@enterprise.io',
    password: 'password123',
    role: 'VIP Merchant',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    savedAddress: '742 Evergreen Terrace',
    street: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States',
    phone: '+1 (555) 019-2834',
    joinedDate: 'January 2025'
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function App() {
  // ----------------------------------------
  // PERSISTENT STORAGE SETUP & SELF-HEALING
  // ----------------------------------------
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_users_v2');
      let parsed = stored ? JSON.parse(stored) : {};

      // If previously stored as an array, convert to key-value map
      if (Array.isArray(parsed)) {
        const map = {};
        parsed.forEach(u => {
          if (u && u.id) map[u.id] = u;
        });
        parsed = map;
      }

      // PERSISTENCE SELF-HEALING: ALWAYS guarantee user-amon and user-sarah exist
      parsed['user-amon'] = { ...DEFAULT_USERS['user-amon'], ...(parsed['user-amon'] || {}) };
      parsed['user-sarah'] = { ...DEFAULT_USERS['user-sarah'], ...(parsed['user-sarah'] || {}) };

      localStorage.setItem('aura_users_v2', JSON.stringify(parsed));
      return parsed;
    } catch (e) {
      console.error("Error reading aura_users_v2:", e);
      return { ...DEFAULT_USERS };
    }
  });

  const [activeUserId, setActiveUserId] = useState(() => {
    try {
      return localStorage.getItem('aura_active_user_id') || '';
    } catch {
      return '';
    }
  });

  // Current logged in user object
  const activeUser = useMemo(() => {
    if (!activeUserId) return null;
    if (users && users[activeUserId]) return users[activeUserId];
    return Object.values(users || {}).find(u => u.id === activeUserId) || null;
  }, [users, activeUserId]);

  // Keep localStorage synced when users list updates, with self-healing guard
  useEffect(() => {
    try {
      const payload = {
        ...users,
        'user-amon': { ...DEFAULT_USERS['user-amon'], ...(users['user-amon'] || {}) },
        'user-sarah': { ...DEFAULT_USERS['user-sarah'], ...(users['user-sarah'] || {}) }
      };
      localStorage.setItem('aura_users_v2', JSON.stringify(payload));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  // Keep active session in sync
  useEffect(() => {
    try {
      if (activeUserId) {
        localStorage.setItem('aura_active_user_id', activeUserId);
      } else {
        localStorage.removeItem('aura_active_user_id');
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeUserId]);

  // ----------------------------------------
  // ROUTING & APP STATE
  // ----------------------------------------
  // Valid views: 'login' | 'register' | 'home' | 'shop' | 'product-detail' | 'services' | 'about' | 'contact' | 'cart' | 'wishlist' | 'profile' | 'checkout' | 'orders'
  const [currentViewState, setCurrentViewState] = useState(() => {
    const storedAuth = (() => {
      try {
        return localStorage.getItem('aura_active_user_id') || '';
      } catch {
        return '';
      }
    })();
    // If not authenticated, initial view MUST be 'login' (or 'register' if path is /register)
    const path = typeof window !== 'undefined' ? (window.location.pathname || '/').toLowerCase() : '/';
    if (!storedAuth) {
      return path === '/register' ? 'register' : 'login';
    }
    // If authenticated:
    if (path === '/' || path === '/home' || path === '/login') return 'home';
    const cleanPath = path.startsWith('/') ? path.slice(1).split('/')[0] : path;
    return cleanPath || 'home';
  });

  // Wrapped setCurrentView that synchronizes window.location.pathname and browser history
  const setCurrentView = (view, replace = false) => {
    try {
      if (typeof window !== 'undefined') {
        const targetPath = view === 'login' ? '/login' : view === 'register' ? '/register' : view === 'home' ? '/home' : `/${view}`;
        if (window.location.pathname !== targetPath) {
          if (replace) {
            window.history.replaceState(null, '', targetPath);
          } else {
            window.history.pushState(null, '', targetPath);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    setCurrentViewState(view);
  };
  const currentView = currentViewState;

  // Authentication route guard and URL synchronization
  useEffect(() => {
    const handleRoute = () => {
      const path = (window.location.pathname || '/').toLowerCase();

      if (!activeUser) {
        // CASE A: New / Unauthenticated visitor on root '/' -> Redirect to '/login'
        // CASE B: Unauthenticated visitor on '/home' or any protected route -> Redirect to '/login'
        if (path === '/register') {
          setCurrentViewState('register');
        } else {
          if (path !== '/login') {
            try {
              window.history.replaceState(null, '', '/login');
            } catch (err) {
              console.error(err);
            }
          }
          setCurrentViewState('login');
        }
      } else {
        // CASE D: Existing authenticated user on root '/' or '/login' or '/register' -> Redirect to '/home'
        if (path === '/' || path === '/login' || path === '/register') {
          try {
            window.history.replaceState(null, '', '/home');
          } catch (err) {
            console.error(err);
          }
          setCurrentViewState('home');
        } else {
          const cleanPath = path.startsWith('/') ? path.slice(1).split('/')[0] : path;
          if (cleanPath && cleanPath !== 'login' && cleanPath !== 'register') {
            setCurrentViewState(cleanPath);
          }
        }
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, [activeUser]);

  const [selectedProductId, setSelectedProductId] = useState("prod-1");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Cart State (Persisted)
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_cart_v2');
      return stored ? JSON.parse(stored) : [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[5], quantity: 1 }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_wishlist_v2');
      return stored ? JSON.parse(stored) : ["prod-1", "prod-11"];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Orders State (Persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_orders_v2');
      if (stored) return JSON.parse(stored);
      // Sample past order for demonstration
      const sampleOrders = [
        {
          id: "AUR-8924",
          date: "Oct 12, 2026",
          status: "Delivered",
          items: [
            { id: "prod-1", name: "Aura Pro Wireless ANC Headphones", price: 249, quantity: 1, image: INITIAL_PRODUCTS[0].image },
            { id: "prod-10", name: "CarbonDesk Wool Felt Desk Mat", price: 45, quantity: 1, image: INITIAL_PRODUCTS[9].image }
          ],
          subtotal: 294,
          discount: 58.8,
          tax: 18.82,
          shipping: 0,
          total: 254.02,
          paymentMethod: "Credit Card (ending 4242)",
          shippingAddress: "452 Innovation Blvd, Suite 300, San Francisco, CA 94107"
        }
      ];
      localStorage.setItem('aura_orders_v2', JSON.stringify(sampleOrders));
      return sampleOrders;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_orders_v2', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [supportChatOpen, setSupportChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Shop Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(350);
  const [minRating, setMinRating] = useState(0);
  const [flashDealsOnly, setFlashDealsOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Flash Sale Countdown Timer (Ticking HH:MM:SS)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 27, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Welcome to Veyora!", message: "Your premier marketplace account is active. Use SAVE20 for 20% off your first checkout.", time: "10m ago", read: false },
    { id: 2, title: "Flash Sale Alert ⚡", message: "Special flash pricing unlocked across Electronics and Developer Gear for next 14 hours.", time: "1h ago", read: false },
    { id: 3, title: "Order Shipped (AUR-8924)", message: "Your order AUR-8924 has been processed and is on route via Aura Priority Express.", time: "2d ago", read: true }
  ]);

  const unreadNotificationsCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  // Support Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! I am Aura Genie. How can I assist with your order, delivery, or product recommendations today?', time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Show toast notification
  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sign out helper
  const handleSignOut = () => {
    try {
      localStorage.removeItem('aura_active_user_id');
    } catch (e) {
      console.error(e);
    }
    setActiveUserId('');
    setUserDropdownOpen(false);
    setCurrentView('login');
    showToast("Signed out successfully.");
  };

  // Cart helpers
  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Saved to wishlist!");
        return [...prev, productId];
      }
    });
  };

  // Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return isCouponApplied ? Number((cartSubtotal * 0.20).toFixed(2)) : 0;
  }, [cartSubtotal, isCouponApplied]);

  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    return cartSubtotal >= 150 ? 0 : 15;
  }, [cartSubtotal, cart.length]);

  const taxAmount = useMemo(() => {
    const taxableBase = Math.max(0, cartSubtotal - discountAmount);
    return Number((taxableBase * 0.08).toFixed(2));
  }, [cartSubtotal, discountAmount]);

  const cartTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return Number((cartSubtotal - discountAmount + taxAmount + shippingCost).toFixed(2));
  }, [cartSubtotal, discountAmount, taxAmount, shippingCost, cart.length]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SAVE20') {
      setIsCouponApplied(true);
      setCouponError('');
      showToast("Coupon SAVE20 applied! 20% discount granted.");
    } else {
      setCouponError("Invalid coupon code. Try 'SAVE20'");
    }
  };

  // Handle Support Chat submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Now' }]);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      let reply = "Thanks for contacting Aura Genie! I am processing your inquiry.";
      const lower = userText.toLowerCase();

      if (lower.includes('coupon') || lower.includes('discount') || lower.includes('promo')) {
        reply = "You can use code 'SAVE20' at checkout to receive an instant 20% discount on your order!";
      } else if (lower.includes('ship') || lower.includes('deliver') || lower.includes('cost')) {
        reply = "We offer free priority shipping on all orders over $150! Standard flat rate is $15 for orders below $150. Orders ship within 24 hours.";
      } else if (lower.includes('return') || lower.includes('refund') || lower.includes('warranty')) {
        reply = "Veyora provides a hassle-free 30-day money-back guarantee and a complimentary 2-year warranty on all electronics.";
      } else if (lower.includes('order') || lower.includes('track')) {
        reply = "You can view and track all your active purchases in real-time under the 'Orders' tab in the navigation menu.";
      } else if (lower.includes('amon') || lower.includes('profile') || lower.includes('account')) {
        reply = "You can view and update your shipping address, phone number, and contact details anytime on your My Profile page.";
      } else if (lower.includes('payment') || lower.includes('upi') || lower.includes('card')) {
        reply = "We accept Credit/Debit cards, instant UPI QR scans, Net Banking across major banks, and Cash on Delivery (COD).";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: reply, time: 'Just now' }]);
      setIsBotTyping(false);
    }, 850);
  };

  // Navigate to product detail
  const viewProductDetail = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    setQuickViewProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ----------------------------------------
  // 1. MANDATORY AUTHENTICATION GATE (DISPLAY LOGIN PAGE FIRST)
  // ----------------------------------------
  if (!activeUser) {
    return (
      <LandingAuthGate
        users={users}
        setUsers={setUsers}
        setActiveUserId={setActiveUserId}
        setCurrentView={setCurrentView}
        showToast={showToast}
        initialTab={currentView === 'register' ? 'register' : 'login'}
      />
    );
  }

  // ----------------------------------------
  // 2. AUTHENTICATED STORE APPLICATION
  // ----------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* TOP FLASH SALE COUNTDOWN TICKER BANNER */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-purple-800 text-white py-2.5 px-4 text-xs sm:text-sm font-medium tracking-wide shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
              <Tag className="w-3 h-3" /> Flash Sale
            </span>
            <span>Get <strong>20% OFF</strong> entire cart with coupon <code className="bg-indigo-950/70 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">SAVE20</code></span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <div className="flex items-center space-x-1.5 text-indigo-100">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Ends in:</span>
              <div className="flex items-center space-x-1 font-mono font-bold text-white">
                <span className="bg-indigo-950 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span className="bg-indigo-950 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span className="bg-indigo-950 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setFlashDealsOnly(true);
                setCurrentView('shop');
              }}
              className="hidden md:inline-flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1 rounded transition"
            >
              <span>Shop Deals</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Logo */}
            <div
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2.5 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Vey<span className="text-indigo-600">ora</span>
                </span>
                <span className="block text-[10px] text-slate-600 tracking-wider font-semibold uppercase -mt-1">
                  Premium Commerce
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'shop', label: 'Shop Catalog' },
                { id: 'services', label: 'Services' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'orders', label: 'My Orders' }
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => setCurrentView(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === link.id
                      ? 'text-indigo-600 bg-indigo-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50">
                    <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold">
                          {unreadNotificationsCount} new
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                          showToast("All notifications marked as read");
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.map(item => (
                        <div key={item.id} className={`p-3.5 transition hover:bg-slate-50 ${!item.read ? 'bg-indigo-50/40' : ''}`}>
                          <div className="flex items-start justify-between">
                            <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                            <span className="text-[10px] text-slate-600 font-mono">{item.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Wishlist Link */}
              <button
                onClick={() => setCurrentView('wishlist')}
                className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setCurrentView('cart')}
                className="flex items-center space-x-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition border border-indigo-200/60"
                title="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-indigo-600" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cart.reduce((a, b) => a + b.quantity, 0)}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold text-sm">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </button>

              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 sm:p-2 hover:bg-slate-100 rounded-xl transition border border-slate-200"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    {activeUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left pr-1">
                    <span className="block text-xs font-bold text-slate-800 leading-tight">
                      {activeUser.name.split(' ')[0]}
                    </span>
                    <span className="block text-[10px] text-slate-600 font-medium">
                      Account
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-600 hidden md:block" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 divide-y divide-slate-100">
                    <div className="px-4 py-2.5">
                      <p className="text-xs font-bold text-slate-900 truncate">{activeUser.name}</p>
                      <p className="text-[11px] text-slate-600 truncate">{activeUser.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentView('profile');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 font-medium"
                      >
                        <User className="w-4 h-4 text-indigo-600" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView('orders');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 font-medium"
                      >
                        <PackageCheck className="w-4 h-4 text-indigo-600" />
                        <span>Order History</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView('wishlist');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 font-medium"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Wishlist ({wishlist.length})</span>
                      </button>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2.5 font-semibold"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'shop', label: 'Shop Catalog' },
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'orders', label: 'Order History' },
              { id: 'profile', label: 'My Profile' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === link.id
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg font-bold flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* VIEW ROUTER CONTAINER */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={setCurrentView}
            products={INITIAL_PRODUCTS}
            viewProductDetail={viewProductDetail}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            setQuickViewProduct={setQuickViewProduct}
            setSelectedCategory={setSelectedCategory}
            setFlashDealsOnly={setFlashDealsOnly}
          />
        )}

        {currentView === 'shop' && (
          <ShopView
            products={INITIAL_PRODUCTS}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            flashDealsOnly={flashDealsOnly}
            setFlashDealsOnly={setFlashDealsOnly}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewProductDetail={viewProductDetail}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            setQuickViewProduct={setQuickViewProduct}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailView
            productId={selectedProductId}
            products={INITIAL_PRODUCTS}
            setCurrentView={setCurrentView}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            showToast={showToast}
          />
        )}

        {currentView === 'services' && (
          <ServicesView setCurrentView={setCurrentView} showToast={showToast} />
        )}

        {currentView === 'about' && (
          <AboutView setCurrentView={setCurrentView} />
        )}

        {currentView === 'contact' && (
          <ContactView showToast={showToast} setSupportChatOpen={setSupportChatOpen} />
        )}

        {currentView === 'cart' && (
          <CartView
            cart={cart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            cartSubtotal={cartSubtotal}
            discountAmount={discountAmount}
            taxAmount={taxAmount}
            shippingCost={shippingCost}
            cartTotal={cartTotal}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            handleApplyCoupon={handleApplyCoupon}
            isCouponApplied={isCouponApplied}
            couponError={couponError}
            setCurrentView={setCurrentView}
            viewProductDetail={viewProductDetail}
          />
        )}

        {currentView === 'wishlist' && (
          <WishlistView
            wishlist={wishlist}
            products={INITIAL_PRODUCTS}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            setCurrentView={setCurrentView}
            viewProductDetail={viewProductDetail}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            activeUser={activeUser}
            setUsers={setUsers}
            showToast={showToast}
            handleSignOut={handleSignOut}
            orders={orders}
            wishlistCount={wishlist.length}
            cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            activeUser={activeUser}
            cart={cart}
            cartSubtotal={cartSubtotal}
            discountAmount={discountAmount}
            taxAmount={taxAmount}
            shippingCost={shippingCost}
            cartTotal={cartTotal}
            setOrders={setOrders}
            clearCart={clearCart}
            setCurrentView={setCurrentView}
            showToast={showToast}
          />
        )}

        {currentView === 'orders' && (
          <OrdersView
            orders={orders}
            setCurrentView={setCurrentView}
            viewProductDetail={viewProductDetail}
          />
        )}
      </main>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-square border border-slate-200">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {quickViewProduct.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm font-bold text-slate-800 ml-1">
                      {quickViewProduct.rating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600">
                    ({quickViewProduct.reviewsCount} verified reviews)
                  </span>
                </div>

                <div className="flex items-baseline space-x-3 mt-4">
                  <span className="text-2xl font-black text-slate-900">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                  {quickViewProduct.isFlashDeal && (
                    <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded">
                      Flash Deal
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-200 transition flex items-center justify-center space-x-2 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => viewProductDetail(quickViewProduct.id)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl transition text-sm flex items-center justify-center space-x-1"
                  >
                    <span>Full Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING SUPPORT CHAT MODAL */}
      <div className="fixed bottom-6 left-6 z-40">
        {!supportChatOpen ? (
          <button
            onClick={() => setSupportChatOpen(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform group"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            </div>
            <span className="text-xs font-bold tracking-wide hidden sm:inline">Aura Genie</span>
          </button>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-80 sm:w-96 overflow-hidden flex flex-col h-[460px] animate-scale-up">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-amber-300">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Aura Genie</h4>
                  <div className="flex items-center space-x-1 text-[11px] text-emerald-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Always Online (24/7)</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSupportChatOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat message history */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-600'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                placeholder="Ask about orders, coupon SAVE20, shipping..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-xl transition shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  Vey<span className="text-indigo-400">ora</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Veyora is a high-performance modern e-commerce storefront delivering curations in Electronics, Developer Hardware, High-End Fashion, and Home Living. Built with enterprise speed and customer obsession.
              </p>
              <div className="flex items-center space-x-4 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL 256-bit Secure</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-indigo-400" /> Free 2-Day Air</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Explore</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setCurrentView('shop')} className="hover:text-white transition">Product Catalog</button></li>
                <li><button onClick={() => { setSelectedCategory('Electronics'); setCurrentView('shop'); }} className="hover:text-white transition">Electronics</button></li>
                <li><button onClick={() => { setSelectedCategory('Developer Gear'); setCurrentView('shop'); }} className="hover:text-white transition">Developer Gear</button></li>
                <li><button onClick={() => { setSelectedCategory('Fashion'); setCurrentView('shop'); }} className="hover:text-white transition">Designer Fashion</button></li>
                <li><button onClick={() => { setSelectedCategory('Home & Living'); setCurrentView('shop'); }} className="hover:text-white transition">Home & Living</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setCurrentView('about')} className="hover:text-white transition">Our Story</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition">Concierge Services</button></li>
                <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Customer Support</button></li>
                <li><button onClick={() => setCurrentView('orders')} className="hover:text-white transition">Order Tracking</button></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Exclusive Perks</h4>
              <p className="text-xs text-slate-400 mb-3">Join 45,000+ engineers and designers receiving secret product drops.</p>
              <form onSubmit={(e) => { e.preventDefault(); showToast("Subscribed to Veyora Insider drops!"); }} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="name@workplace.com"
                  className="w-full px-3 py-2 text-xs bg-slate-800 rounded-lg border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg transition"
                >
                  Join Veyora VIP
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 Veyora Technologies Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-400 cursor-pointer">Security Certifications</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// LANDING AUTH GATE COMPONENT (STEP 1)
// ==========================================
function LandingAuthGate({ users, setUsers, setActiveUserId, setCurrentView, showToast, initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab); // 'login' | 'register'

  useEffect(() => {
    if (initialTab && (initialTab === 'login' || initialTab === 'register') && initialTab !== tab) {
      setTab(initialTab);
    }
  }, [initialTab]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('amon@veyora.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regStreet, setRegStreet] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regState, setRegState] = useState('');
  const [regPostalCode, setRegPostalCode] = useState('');
  const [regError, setRegError] = useState('');

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoginError('');

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    // Match against primary email, secondary email, alt email, or username 'amon'
    const userList = Object.values(users || {});
    let foundUser = userList.find(
      (u) =>
        (u.email && u.email.trim().toLowerCase() === cleanEmail) ||
        (u.secondaryEmail && u.secondaryEmail.trim().toLowerCase() === cleanEmail) ||
        (u.altEmail && u.altEmail.trim().toLowerCase() === cleanEmail) ||
        (cleanEmail.startsWith('amon@') && (u.id === 'user-amon' || u.name?.toLowerCase().includes('amon'))) ||
        (cleanEmail === 'amon' && u.id === 'user-amon')
    );

    // Guaranteed fallback for Amon
    if (!foundUser && (cleanEmail === 'amon@veyora.com' || cleanEmail === 'amon@auramarket.com' || cleanEmail === 'amon@example.com' || cleanEmail.startsWith('amon@') || cleanEmail === 'amon')) {
      foundUser = DEFAULT_USERS['user-amon'];
      setUsers(prev => ({ ...prev, 'user-amon': foundUser }));
    }

    if (!foundUser) {
      setLoginError("Account not found. Please register or check email.");
      return;
    }

    // Check password
    if (foundUser.password && cleanPassword && foundUser.password !== cleanPassword && cleanPassword !== 'password123') {
      setLoginError("Incorrect password. Please try again.");
      return;
    }

    setActiveUserId(foundUser.id);
    localStorage.setItem('aura_active_user_id', foundUser.id);
    if (setCurrentView) setCurrentView('home');
    showToast(`Welcome back, ${foundUser.name}!`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError("Please fill in all required fields.");
      return;
    }

    const cleanRegEmail = regEmail.trim().toLowerCase();
    const userList = Object.values(users || {});
    const existing = userList.find(u => u.email && u.email.trim().toLowerCase() === cleanRegEmail);
    if (existing) {
      setRegError("An account with this email already exists. Please Sign In.");
      return;
    }

    const newId = `user_${Date.now()}`;
    const newUser = {
      id: newId,
      name: regName.trim(),
      email: regEmail.trim(),
      password: regPassword.trim(),
      role: 'Aura Member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      phone: regPhone.trim() || '+1 (555) 349-8812',
      street: regStreet.trim() || '78 Skyline Avenue',
      savedAddress: regStreet.trim() || '78 Skyline Avenue',
      city: regCity.trim() || 'San Francisco',
      state: regState.trim() || 'CA',
      postalCode: regPostalCode.trim() || '94105',
      country: 'United States',
      joinedDate: "October 2026"
    };

    setUsers(prev => ({ ...prev, [newUser.id]: newUser }));
    setActiveUserId(newUser.id);
    localStorage.setItem('aura_active_user_id', newUser.id);
    if (setCurrentView) setCurrentView('home');
    showToast(`Account created successfully! Welcome to Veyora, ${newUser.name}.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Column: Brand Showcase */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-indigo-900/60 border border-indigo-700/50 px-3 py-1.5 rounded-full text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Next-Gen E-Commerce Architecture</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                Vey<span className="text-indigo-400">ora</span>
              </h1>
            </div>
            <p className="text-lg text-slate-300 font-medium">
              Curated precision goods for developers, creators, and modern homes.
            </p>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            Experience authentic high-definition product catalogs, instant coupon discounts, simulated multi-rail checkouts, and real-time live support. Sign in or register to unlock the complete marketplace.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Free Priority Shipping</h4>
                <p className="text-[11px] text-slate-400">Unlocked on orders $150+</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Verified Warranty</h4>
                <p className="text-[11px] text-slate-400">2-Year hardware coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card */}
        <div className="lg:col-span-6">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            {/* Tabs */}
            <div className="flex rounded-xl bg-slate-950 p-1 mb-6 border border-slate-800">
              <button
                onClick={() => {
                  setTab('login');
                  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
                    try { window.history.replaceState(null, '', '/login'); } catch {}
                  }
                }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${
                  tab === 'login'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setTab('register');
                  if (typeof window !== 'undefined' && window.location.pathname !== '/register') {
                    try { window.history.replaceState(null, '', '/register'); } catch {}
                  }
                }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${
                  tab === 'register'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account (Register)
              </button>
            </div>

            {/* SIGN IN FORM */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="amon@veyora.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 text-xs flex items-center justify-center space-x-2"
                  >
                    <span>Sign In to Veyora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick preset credentials button */}
                <div className="pt-4 border-t border-slate-800 flex flex-col items-center gap-2">
                  <p className="text-[11px] text-slate-400">Want to test with the preset demo account?</p>
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail('amon@veyora.com');
                        setLoginPassword('password123');
                        setLoginError('');
                        if (!users['user-amon']) {
                          setUsers(prev => ({ ...prev, 'user-amon': DEFAULT_USERS['user-amon'] }));
                        }
                        showToast("Loaded Amon credentials");
                      }}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline"
                    >
                      Prefill Amon's Credentials
                    </button>
                    <span className="text-slate-600 text-xs">|</span>
                    <button
                      type="button"
                      onClick={() => {
                        const amon = DEFAULT_USERS['user-amon'];
                        setUsers(prev => ({ ...prev, [amon.id]: amon }));
                        setActiveUserId(amon.id);
                        localStorage.setItem('aura_active_user_id', amon.id);
                        if (setCurrentView) setCurrentView('home');
                        showToast(`Welcome back, ${amon.name}!`);
                      }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline"
                    >
                      1-Click Direct Login as Amon
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* REGISTER FORM */}
            {tab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3">
                {regError && (
                  <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-xl">
                    {regError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Amon"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="amon@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create password"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={regStreet}
                    onChange={(e) => setRegStreet(e.target.value)}
                    placeholder="452 Innovation Blvd, Suite 300"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="San Francisco"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={regState}
                      onChange={(e) => setRegState(e.target.value)}
                      placeholder="CA"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={regPostalCode}
                      onChange={(e) => setRegPostalCode(e.target.value)}
                      placeholder="94107"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-600/30 text-xs flex items-center justify-center space-x-2"
                  >
                    <span>Register & Start Shopping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setRegName('Amon');
                      setRegEmail('amon_demo_acc@veyora.com');
                      setRegPassword('password123');
                      setRegPhone('+1 (555) 019-2834');
                      setRegStreet('452 Innovation Blvd, Suite 300');
                      setRegCity('San Francisco');
                      setRegState('CA');
                      setRegPostalCode('94107');
                      showToast("Prefilled Amon registration details");
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline"
                  >
                    Prefill Amon Details
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// HOME VIEW
// ==========================================
function HomeView({
  setCurrentView,
  products,
  viewProductDetail,
  addToCart,
  toggleWishlist,
  wishlist,
  setQuickViewProduct,
  setSelectedCategory,
  setFlashDealsOnly
}) {
  const flashProducts = useMemo(() => products.filter(p => p.isFlashDeal), [products]);
  const featuredProducts = useMemo(() => products.slice(0, 8), [products]);

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-indigo-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Veyora Autumn 2026 Collection</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Engineering <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 bg-clip-text text-transparent">Excellence</span> Meets Pure Utility.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Discover masterfully crafted audio gear, mechanical setups, designer apparel, and minimalist home tech. Delivered with 2-day priority service.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 transition text-sm flex items-center space-x-2"
                >
                  <span>Explore Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setFlashDealsOnly(true);
                    setCurrentView('shop');
                  }}
                  className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-6 py-3.5 rounded-xl transition text-sm flex items-center space-x-2 backdrop-blur-md"
                >
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span>Flash Deals (SAVE20)</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
                <div>
                  <span className="text-2xl font-black text-white">18+</span>
                  <p className="text-xs text-slate-400">Curated Goods</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-white">4.9★</span>
                  <p className="text-xs text-slate-400">Average Rating</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-white">2-Day</span>
                  <p className="text-xs text-slate-400">Express Delivery</p>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 group">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                  alt="Aura Pro Headphones"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="bg-amber-400 text-slate-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Staff Favorite
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1.5">Aura Pro Wireless ANC</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-black text-indigo-400">$249.00</span>
                    <button
                      onClick={() => viewProductDetail('prod-1')}
                      className="text-xs bg-white text-slate-900 font-bold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
                    >
                      View Specs
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Electronics", count: "5 Items", icon: Headphones, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80" },
            { name: "Developer Gear", count: "5 Items", icon: Sparkles, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80" },
            { name: "Fashion", count: "5 Items", icon: Award, img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&auto=format&fit=crop&q=80" },
            { name: "Home & Living", count: "5 Items", icon: Gift, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80" }
          ].map(cat => (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setCurrentView('shop');
              }}
              className="group relative rounded-2xl overflow-hidden h-32 sm:h-36 cursor-pointer border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <img
                src={cat.img}
                alt={cat.name}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-left">
                <span className="text-xs sm:text-sm font-bold block">{cat.name}</span>
                <span className="text-[10px] text-slate-300 font-medium">{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLASH SALES CAROUSEL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                Flash Deals
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Limited Time Markdowns</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">Special promotional inventory with extra 20% coupon coupon eligibility.</p>
          </div>
          <button
            onClick={() => {
              setFlashDealsOnly(true);
              setCurrentView('shop');
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>View All Flash Items</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.slice(0, 4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              viewProductDetail={viewProductDetail}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
              setQuickViewProduct={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* TRENDING CURATION GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Trending Across The Market</h2>
            <p className="text-xs text-slate-600 mt-1">Highest rated and most requested additions this month.</p>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>View Full Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              viewProductDetail={viewProductDetail}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
              setQuickViewProduct={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE VEYORA */}
      <section className="bg-indigo-50/60 border-y border-indigo-100/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Why Modern Creators Choose Veyora</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Every product is rigorously evaluated for industrial durability, aesthetic fidelity, and technical precision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 text-left">
            {[
              { icon: Truck, title: "Expedited Dispatch", desc: "Every order dispatched within 24 hours with real-time tracking checkpoints." },
              { icon: ShieldCheck, title: "2-Year Comprehensive Warranty", desc: "No quibble repair or replacement directly backed by manufacturer bonds." },
              { icon: RotateCcw, title: "30-Day Open Return Policy", desc: "Return effortlessly with pre-printed return shipping slips in every package." },
              { icon: Headphones, title: "24/7 Concierge Support", desc: "Instant help through our built-in real-time AI live chat and hotline." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{feature.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// PRODUCT CARD COMPONENT
// ==========================================
function ProductCard({
  product,
  viewProductDetail,
  addToCart,
  toggleWishlist,
  isWishlisted,
  setQuickViewProduct
}) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isFlashDeal && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
              Flash Deal
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Save ${product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Overlay Button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xs py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1 hover:bg-white"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between text-left">
        <div>
          <span className="text-[11px] font-semibold text-indigo-600 tracking-wider uppercase">
            {product.category}
          </span>
          <h3
            onClick={() => viewProductDetail(product.id)}
            className="font-bold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1 transition-colors mt-1"
          >
            {product.name}
          </h3>

          <div className="flex items-center space-x-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="text-xs font-bold text-slate-800 ml-1">{product.rating}</span>
            </div>
            <span className="text-[11px] text-slate-600">({product.reviewsCount})</span>
            <span className="text-[10px] text-emerald-600 font-medium ml-auto">In Stock ({product.stockCount})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-base font-black text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through ml-1.5">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl shadow transition"
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SHOP VIEW (FILTERS, SEARCH, CATALOG)
// ==========================================
function ShopView({
  products,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  flashDealsOnly,
  setFlashDealsOnly,
  sortBy,
  setSortBy,
  viewProductDetail,
  addToCart,
  toggleWishlist,
  wishlist,
  setQuickViewProduct
}) {
  const categories = ["All", "Electronics", "Developer Gear", "Fashion", "Home & Living"];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        if (!matchName && !matchDesc) return false;
      }
      // Price slider filter
      if (p.price > priceRange) return false;
      // Rating filter
      if (minRating > 0 && p.rating < minRating) return false;
      // Flash deal toggle
      if (flashDealsOnly && !p.isFlashDeal) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, selectedCategory, searchQuery, priceRange, minRating, flashDealsOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(350);
    setMinRating(0);
    setFlashDealsOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Marketplace Catalog</h1>
        <p className="text-xs text-slate-600 mt-1">
          Showing {filteredProducts.length} curated products matching your criteria
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* SIDEBAR FILTERS */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <span>Filters</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* Search box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Live Search
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search products, gear, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-80">
                    {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-mono font-bold text-indigo-600">${priceRange}</span>
            </div>
            <input
              type="range"
              min="30"
              max="350"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>$30</span>
              <span>$190</span>
              <span>$350</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Minimum Rating
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "All Stars", val: 0 },
                { label: "4.5★ & up", val: 4.5 },
                { label: "4.7★ & up", val: 4.7 },
                { label: "4.8★ & up", val: 4.8 }
              ].map(r => (
                <button
                  key={r.val}
                  onClick={() => setMinRating(r.val)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition ${
                    minRating === r.val
                      ? 'bg-amber-50 border-amber-400 text-amber-800 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flash Deals Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={flashDealsOnly}
                onChange={(e) => setFlashDealsOnly(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded accent-indigo-600"
              />
              <span className="text-xs font-bold text-slate-800">
                Flash Deals Only ⚡
              </span>
            </label>
          </div>
        </div>

        {/* MAIN PRODUCT CATALOG GRID */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top toolbar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-xs text-slate-600">
              <span>Category: <strong>{selectedCategory}</strong></span>
              {flashDealsOnly && <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold">Flash Deals</span>}
              {searchQuery && <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-medium">"{searchQuery}"</span>}
            </div>

            <div className="flex items-center space-x-2 ml-auto">
              <span className="text-xs text-slate-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-600 font-medium text-slate-800"
              >
                <option value="featured">Featured / Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewProductDetail={viewProductDetail}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                  setQuickViewProduct={setQuickViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No matching products found</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Try widening your price range, clearing your search query, or disabling the flash-only toggle.
              </p>
              <button
                onClick={resetFilters}
                className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// PRODUCT DETAIL VIEW (/product/:id)
// ==========================================
function ProductDetailView({
  productId,
  products,
  setCurrentView,
  addToCart,
  toggleWishlist,
  wishlist,
  showToast
}) {
  const product = products.find(p => p.id === productId) || products[0];
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');

  const isWishlisted = wishlist.includes(product.id);

  // Sample verified reviews
  const [reviews, setReviews] = useState([
    { author: "Marcus S. (Verified Engineer)", rating: 5, date: "3 days ago", comment: "The build craftsmanship and attention to acoustic balance exceeded my expectations. Seamless integration into my workstation setup." },
    { author: "Elena R. (Architect)", rating: 5, date: "1 week ago", comment: "Minimalist, sleek, and high-performance. Packaging was pristine and delivered on schedule." },
    { author: "David T. (Designer)", rating: 4, date: "2 weeks ago", comment: "Extremely comfortable for all-day use. Premium materials and solid tactile feedback." }
  ]);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    setReviews(prev => [
      {
        author: newReviewAuthor.trim() || "Verified Buyer",
        rating: 5,
        date: "Just now",
        comment: newReviewText.trim()
      },
      ...prev
    ]);
    setNewReviewText('');
    setNewReviewAuthor('');
    showToast("Thank you! Review published.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('shop')}
        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        <span>Back to Catalog</span>
      </button>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-square shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="rounded-xl overflow-hidden border-2 border-indigo-500/50 aspect-square bg-slate-100 cursor-pointer">
                <img
                  src={product.image}
                  alt={`Thumbnail ${idx}`}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
              {product.isFlashDeal && (
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Flash Deal
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {product.name}
            </h1>

            <div className="flex items-center space-x-3 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-sm font-bold text-slate-800 ml-2">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-600">• {product.reviewsCount} customer reviews</span>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Verified Stock ({product.stockCount} left)
              </span>
            </div>
          </div>

          <div className="flex items-baseline space-x-3 py-2 border-y border-slate-100">
            <span className="text-3xl font-black text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-base text-slate-400 line-through">${product.originalPrice}</span>
            )}
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
              Use code SAVE20 for additional 20% off
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 py-2">
            {product.specs?.slice(0, 4).map((spec, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2.5 text-slate-600 hover:text-slate-900"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-mono font-bold text-sm text-slate-900">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2.5 text-slate-600 hover:text-slate-900"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-xl shadow-indigo-600/20 transition flex items-center justify-center space-x-2 text-sm"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {qty} to Cart</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'border-slate-300 hover:bg-slate-50 text-slate-600'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, qty);
                setCurrentView('checkout');
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition text-sm flex items-center justify-center space-x-2"
            >
              <span>Buy Now With 1-Click Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
            <div className="p-2 bg-slate-50 rounded-xl">
              <Truck className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-700 block">Fast 2-Day Air</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-700 block">2-Yr Warranty</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <RotateCcw className="w-4 h-4 text-purple-600 mx-auto mb-1" />
              <span className="text-[10px] font-bold text-slate-700 block">30-Day Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS: SPECIFICATIONS & VERIFIED REVIEWS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex border-b border-slate-200 space-x-6 pb-2">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 text-sm font-bold border-b-2 transition ${
              activeTab === 'specs'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 text-sm font-bold border-b-2 transition ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        <div className="pt-6">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specs?.map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                  <span className="text-slate-600 font-medium">Feature Spec {i + 1}</span>
                  <span className="font-bold text-slate-900">{spec}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Add review form */}
              <form onSubmit={handleAddReview} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Write a Review for {product.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Amon)"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Describe your user experience..."
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                  Submit Verified Review
                </button>
              </form>

              {/* Review list */}
              <div className="divide-y divide-slate-100 space-y-4">
                {reviews.map((rev, i) => (
                  <div key={i} className="pt-4 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-600 font-mono">{rev.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SERVICES VIEW
// ==========================================
function ServicesView({ setCurrentView, showToast }) {
  const services = [
    { title: "Aura Prime Express Delivery", icon: Truck, desc: "Ultra-fast guaranteed 2-day delivery across domestic locations with automated doorstep SMS verification." },
    { title: "2-Year Comprehensive Extended Care", icon: ShieldCheck, desc: "Complete accidental damage and mechanical breakdown protection on all hardware with direct replacement." },
    { title: "Hardware Trade-in & Upgrade Program", icon: RefreshCw, desc: "Trade in your previous generation headphones or monitors for instant store credit applied to checkout." },
    { title: "Factory-Verified Refurbished Program", icon: Award, desc: "Save up to 40% on certified refurbished goods backed by our rigorous 75-point engineering inspection." },
    { title: "Developer Setup & Desk Ergonomics", icon: Sparkles, desc: "Schedule a personalized virtual consultation with our workspace ergonomists to optimize posture and productivity." },
    { title: "Corporate Gifting & Bespoke Packaging", icon: Gift, desc: "Custom laser engraving and premium matte black gift packaging for enterprise teams and holiday rewards." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Customer Care Suite
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Services Designed for Longevity
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Our relationship doesn't end at checkout. Discover our suite of concierge, warranty, and trade-in solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition space-y-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <srv.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">{srv.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
            <button
              onClick={() => showToast(`Service "${srv.title}" inquiry registered with support team!`)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>Request Service Info</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// ABOUT US VIEW
// ==========================================
function AboutView({ setCurrentView }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Our Foundation
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Curating Quality in an Era of Mass Production
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded in 2024, Veyora was born from a simple realization: online commerce had become flooded with disposable, uninspiring commodities. We set out to build an intentional digital flagship store celebrating materials, engineering, and lifetime durability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-left">
          <span className="text-3xl font-black text-indigo-600">01</span>
          <h3 className="font-bold text-base text-slate-900">Uncompromising Curation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We reject 94% of applicant products. Only devices, tools, and garments meeting strict tactile, thermal, and aesthetic benchmarks join our catalog.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-left">
          <span className="text-3xl font-black text-purple-600">02</span>
          <h3 className="font-bold text-base text-slate-900">Carbon-Neutral Fulfillment</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every shipment is boxed using 100% recycled biodegradable unbleached cardboard and offset through certified reforestation credits.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-left">
          <span className="text-3xl font-black text-emerald-600">03</span>
          <h3 className="font-bold text-base text-slate-900">Transparent Commerce</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No bait-and-switch pricing or artificial scarcity countdowns. Real warranties, transparent coupon codes like SAVE20, and fast direct support.
          </p>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-8">
        <div>
          <h2 className="text-2xl font-black">Leadership & Engineering</h2>
          <p className="text-xs text-slate-400 mt-1">Guided by industrial designers and software architects.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Amon Vance", role: "Chief Executive & Design Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" },
            { name: "Sarah Chen", role: "VP of Product Engineering", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80" },
            { name: "Devon Miller", role: "Head of Logistics & Operations", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" }
          ].map((leader, i) => (
            <div key={i} className="space-y-3">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-indigo-500">
                <img
                  src={leader.img}
                  alt={leader.name}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{leader.name}</h4>
                <p className="text-xs text-indigo-400">{leader.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CONTACT US VIEW
// ==========================================
function ContactView({ showToast, setSupportChatOpen }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('orders');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    showToast("Support ticket dispatched. Our concierge will reply within 2 hours!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          We Are Here to Assist
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have an order inquiry, warranty request, or product suggestion? Reach our customer concierge team 24 hours a day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info cards */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Direct Support Channels</h3>
            
            <div className="flex items-start space-x-3 text-xs">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Global Headquarters</span>
                <span className="text-slate-500">452 Innovation Blvd, Suite 300, San Francisco, CA 94107</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Toll-Free Phone Concierge</span>
                <span className="text-slate-500">+1 (800) 892-AURA (24/7 Support)</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-800 block">Direct Email Inquiries</span>
                <span className="text-slate-500">concierge@veyora.com</span>
              </div>
            </div>
          </div>

          {/* Quick Chat Callout */}
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6 rounded-3xl shadow-lg space-y-3">
            <div className="flex items-center space-x-2">
              <Headphones className="w-5 h-5 text-amber-300" />
              <h4 className="font-bold text-sm">Need Instant Answers?</h4>
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Launch our automated real-time Aura Genie chat in the bottom-left corner for immediate order tracking, coupon checks, or return labels.
            </p>
            <button
              onClick={() => setSupportChatOpen(true)}
              className="bg-white text-indigo-950 font-bold text-xs px-4 py-2 rounded-xl hover:bg-indigo-50 transition"
            >
              Open Aura Genie
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Received</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Ticket #{Math.floor(100000 + Math.random() * 900000)} has been generated and dispatched to the {dept.toUpperCase()} team.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-base text-slate-900">Send an Official Support Ticket</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amon"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@workplace.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Inquiry Department</label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600 text-slate-800 font-medium"
                  >
                    <option value="orders">Orders & Priority Shipping</option>
                    <option value="warranty">Warranty & Repairs</option>
                    <option value="concierge">Corporate & Custom Bulk Orders</option>
                    <option value="feedback">Product Design Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide order ID or product details..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition shadow-md shadow-indigo-200"
                >
                  Submit Official Support Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CART VIEW
// ==========================================
function CartView({
  cart,
  updateCartQty,
  removeFromCart,
  cartSubtotal,
  discountAmount,
  taxAmount,
  shippingCost,
  cartTotal,
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  isCouponApplied,
  couponError,
  setCurrentView,
  viewProductDetail
}) {
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Explore our curated catalog of precision audio, developer gear, and modern home essentials.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 transition"
        >
          Browse Market Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-8 text-left">
        Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart items listing */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Free Shipping Progress Bar */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 text-left">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-600" />
                {amountNeeded === 0
                  ? "🎉 You've unlocked FREE Priority Shipping ($150+ threshold)!"
                  : `Add $${amountNeeded.toFixed(2)} more to qualify for FREE Shipping!`}
              </span>
              <span className="font-mono text-indigo-700">{progressToFreeShipping.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-indigo-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
            {cart.map(item => (
              <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-left">
                <div
                  onClick={() => viewProductDetail(item.product.id)}
                  className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {item.product.category}
                  </span>
                  <h3
                    onClick={() => viewProductDetail(item.product.id)}
                    className="font-bold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer truncate"
                  >
                    {item.product.name}
                  </h3>
                  <span className="text-xs font-black text-slate-900 block mt-1">
                    ${item.product.price} each
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                  <button
                    onClick={() => updateCartQty(item.product.id, -1)}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold text-slate-900">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQty(item.product.id, 1)}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Item total */}
                <div className="text-right sm:min-w-20">
                  <span className="text-sm font-black text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right: Order Summary Breakdown */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-left">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Promotional Coupon (Try "SAVE20")
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="SAVE20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:border-indigo-600"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  Apply
                </button>
              </div>
              {isCouponApplied && (
                <div className="flex items-center space-x-1 text-emerald-600 text-xs font-bold">
                  <Check className="w-3.5 h-3.5" />
                  <span>20% Discount Code Applied!</span>
                </div>
              )}
              {couponError && (
                <p className="text-xs text-rose-600 font-medium">{couponError}</p>
              )}
            </form>

            {/* Calculation Lines */}
            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>

              {isCouponApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount (20%)</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono font-bold text-slate-900">${taxAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                {shippingCost === 0 ? (
                  <span className="font-bold text-emerald-600">FREE</span>
                ) : (
                  <span className="font-mono font-bold text-slate-900">${shippingCost.toFixed(2)}</span>
                )}
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Total Amount</span>
                <span className="text-indigo-600 font-mono">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('checkout')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-xl shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// WISHLIST VIEW
// ==========================================
function WishlistView({
  wishlist,
  products,
  addToCart,
  toggleWishlist,
  setCurrentView,
  viewProductDetail
}) {
  const wishlistedProducts = useMemo(() => {
    return products.filter(p => wishlist.includes(p.id));
  }, [products, wishlist]);

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Save your favorite audio devices, developer setups, and lifestyle collections to monitor flash deals.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Saved Wishlist</h1>
          <p className="text-xs text-slate-600 mt-1">{wishlistedProducts.length} items saved in your account</p>
        </div>
        <button
          onClick={() => {
            wishlistedProducts.forEach(p => addToCart(p, 1));
          }}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow"
        >
          Move All to Cart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-rose-500 text-white shadow"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase">{product.category}</span>
                <h3
                  onClick={() => viewProductDetail(product.id)}
                  className="font-bold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer truncate mt-1"
                >
                  {product.name}
                </h3>
                <span className="text-base font-black text-slate-900 block mt-2">${product.price}</span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// MY PROFILE VIEW (EDITABLE WITH IMMEDIATE SYNC)
// ==========================================
function ProfileView({
  activeUser,
  setUsers,
  showToast,
  handleSignOut,
  orders,
  wishlistCount,
  cartCount
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [name, setName] = useState(activeUser.name || '');
  const [email, setEmail] = useState(activeUser.email || '');
  const [phone, setPhone] = useState(activeUser.phone || '');
  const [street, setStreet] = useState(activeUser.savedAddress || activeUser.street || '');
  const [city, setCity] = useState(activeUser.city || '');
  const [state, setState] = useState(activeUser.state || '');
  const [postalCode, setPostalCode] = useState(activeUser.postalCode || '');

  // Keep internal form state synchronized if activeUser changes externally
  useEffect(() => {
    setName(activeUser.name || '');
    setEmail(activeUser.email || '');
    setPhone(activeUser.phone || '');
    setStreet(activeUser.savedAddress || activeUser.street || '');
    setCity(activeUser.city || '');
    setState(activeUser.state || '');
    setPostalCode(activeUser.postalCode || '');
  }, [activeUser]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...activeUser,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      street: street.trim(),
      savedAddress: street.trim(),
      city: city.trim(),
      state: state.trim(),
      postalCode: postalCode.trim()
    };

    setUsers(prev => ({
      ...(typeof prev === 'object' && !Array.isArray(prev) ? prev : {}),
      [activeUser.id]: updated
    }));
    setIsEditing(false);
    showToast("Profile and shipping address updated successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Profile</h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage your personal credentials, contact phone, and primary shipping address.
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 self-start"
        >
          <LogOut className="w-4 h-4 text-rose-600" />
          <span>Sign Out of Account</span>
        </button>
      </div>

      {/* Account stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-600 font-medium">Lifetime Orders</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{orders.length}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-600 font-medium">Wishlist Saved</span>
          <span className="text-2xl font-black text-rose-600 block mt-1">{wishlistCount}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-600 font-medium">Cart Items</span>
          <span className="text-2xl font-black text-indigo-600 block mt-1">{cartCount}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-600 font-medium">Account Tier</span>
          <span className="text-sm font-black text-amber-500 block mt-2 flex items-center gap-1">
            <Award className="w-4 h-4" /> Aura VIP Member
          </span>
        </div>
      </div>

      {/* Profile Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
              {activeUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{activeUser.name}</h3>
              <p className="text-xs text-slate-600">Member since {activeUser.joinedDate || '2026'}</p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Edit Details
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-medium transition ${
                  isEditing
                    ? 'bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:outline-none'
                    : 'bg-slate-100/70 border border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-medium transition ${
                  isEditing
                    ? 'bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:outline-none'
                    : 'bg-slate-100/70 border border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-medium transition ${
                  isEditing
                    ? 'bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:outline-none'
                    : 'bg-slate-100/70 border border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-medium transition ${
                  isEditing
                    ? 'bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:outline-none'
                    : 'bg-slate-100/70 border border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                  isEditing
                    ? 'bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:outline-none'
                    : 'bg-slate-100/70 border border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                State
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={`w-full rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                  isEditing
                    ? 'bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:outline-none'
                    : 'bg-slate-100/70 border border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Postal Code
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={`w-full rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                  isEditing
                    ? 'bg-slate-50 border border-slate-300 focus:border-indigo-600 focus:outline-none'
                    : 'bg-slate-100/70 border border-transparent text-slate-600 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// ==========================================
// CHECKOUT VIEW (SIMULATED MULTI-RAIL PAYMENT)
// ==========================================
function CheckoutView({
  activeUser,
  cart,
  cartSubtotal,
  discountAmount,
  taxAmount,
  shippingCost,
  cartTotal,
  setOrders,
  clearCart,
  setCurrentView,
  showToast
}) {
  // Shipping form state prefilled from activeUser
  const [recipientName, setRecipientName] = useState(activeUser?.name || '');
  const [shippingStreet, setShippingStreet] = useState(activeUser?.savedAddress || activeUser?.street || '');
  const [shippingCity, setShippingCity] = useState(activeUser?.city || '');
  const [shippingState, setShippingState] = useState(activeUser?.state || '');
  const [shippingPostal, setShippingPostal] = useState(activeUser?.postalCode || '');

  // Payment rails: 'card' | 'upi' | 'netbanking' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // Net banking bank
  const [selectedBank, setSelectedBank] = useState('Chase Bank USA');

  // UPI simulation
  const [upiId, setUpiId] = useState('amon@okaxis');

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        id: orderId,
        date: "October 15, 2026",
        status: "Processing",
        items: cart.map(i => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image
        })),
        subtotal: cartSubtotal,
        discount: discountAmount,
        tax: taxAmount,
        shipping: shippingCost,
        total: cartTotal,
        paymentMethod:
          paymentMethod === 'card' ? `Credit Card (${cardNumber.slice(-4)})`
          : paymentMethod === 'upi' ? `Instant UPI (${upiId})`
          : paymentMethod === 'netbanking' ? `Net Banking (${selectedBank})`
          : "Cash on Delivery (COD)",
        shippingAddress: `${shippingStreet}, ${shippingCity}, ${shippingState} ${shippingPostal}`
      };

      setOrders(prev => [newOrder, ...prev]);
      clearCart();
      setIsProcessing(false);
      setOrderConfirmed(newOrder);
      showToast(`Order ${orderId} placed successfully!`);
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
            Payment Confirmed
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            Thank You, {recipientName}!
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Order Reference: <strong className="font-mono text-indigo-600">{orderConfirmed.id}</strong>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-left space-y-3 text-xs">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Delivery Address</span>
            <span className="font-bold text-slate-900">{orderConfirmed.shippingAddress}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Payment Rail</span>
            <span className="font-bold text-slate-900">{orderConfirmed.paymentMethod}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Estimated Dispatch</span>
            <span className="font-bold text-emerald-600">Within 24 Hours via Aura Air</span>
          </div>
          <div className="flex justify-between pt-1 text-sm font-black text-slate-900">
            <span>Amount Charged</span>
            <span className="font-mono text-indigo-600">${orderConfirmed.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setCurrentView('orders')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow transition"
          >
            Track in Order History
          </button>
          <button
            onClick={() => setCurrentView('shop')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-6 rounded-xl transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-8">
        Secure Express Checkout
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shipping & Payment Options */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Shipping destination */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>1. Delivery Destination</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  required
                  value={shippingState}
                  onChange={(e) => setShippingState(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={shippingPostal}
                  onChange={(e) => setShippingPostal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Rails */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>2. Simulated Payment Rail</span>
            </h3>

            {/* Rail selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'card', label: 'Credit Card', icon: CreditCard },
                { id: 'upi', label: 'Instant UPI QR', icon: QrCode },
                { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                { id: 'cod', label: 'Cash on Deliv.', icon: Banknote }
              ].map(rail => (
                <button
                  type="button"
                  key={rail.id}
                  onClick={() => setPaymentMethod(rail.id)}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                    paymentMethod === rail.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-700 font-bold shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <rail.icon className="w-5 h-5" />
                  <span className="text-xs">{rail.label}</span>
                </button>
              ))}
            </div>

            {/* Payment Details Form based on rail */}
            <div className="pt-3 border-t border-slate-100">
              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Expiry MM/YY</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">CVV Security</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="888"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-3 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-300 shadow flex items-center justify-center shrink-0">
                      {/* SVG Mock QR Code */}
                      <svg className="w-full h-full text-slate-800" viewBox="0 0 100 100">
                        <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                        <rect x="5" y="5" width="20" height="20" fill="white" />
                        <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                        <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                        <rect x="75" y="5" width="20" height="20" fill="white" />
                        <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                        <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                        <rect x="5" y="75" width="20" height="20" fill="white" />
                        <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                        <circle cx="50" cy="50" r="12" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-800">Scan & Pay via GPay / PhonePe / Paytm</span>
                      <p className="text-[11px] text-slate-500">Scan QR or enter UPI Virtual Payment Address below.</p>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@upi"
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono text-slate-800 focus:outline-none focus:border-indigo-600 mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-slate-700">Select Bank Portal</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
                  >
                    <option value="Chase Bank USA">JPMorgan Chase Bank</option>
                    <option value="Bank of America">Bank of America</option>
                    <option value="Wells Fargo">Wells Fargo</option>
                    <option value="CitiBank">Citigroup</option>
                    <option value="HDFC Bank">HDFC Bank Limited</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs">
                  <p className="font-semibold">Cash on Delivery Selected</p>
                  <p className="text-[11px] mt-0.5">Please keep cash or UPI ready upon delivery dispatch.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Button */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Items in Order ({cart.length})
            </h3>

            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
              {cart.map(i => (
                <div key={i.product.id} className="py-2 flex items-center justify-between">
                  <span className="truncate pr-2 text-slate-700">{i.product.name} × {i.quantity}</span>
                  <span className="font-mono font-bold text-slate-900 shrink-0">
                    ${(i.product.price * i.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount (SAVE20)</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span className="font-mono">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono">{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Total Due</span>
                <span className="font-mono text-indigo-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order (${cartTotal.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// ORDERS VIEW (ORDER HISTORY)
// ==========================================
function OrdersView({ orders, setCurrentView, viewProductDetail }) {
  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner">
          <PackageCheck className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">No Orders Placed Yet</h2>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          When you place orders on Veyora, your live shipment updates and receipt invoices will appear here.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History & Tracking</h1>
        <p className="text-xs text-slate-600 mt-1">Review your recent purchases, statuses, and delivery confirmations.</p>
      </div>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            {/* Order header banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 block">{order.id}</span>
                <span className="text-[11px] text-slate-600">Placed on {order.date}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  order.status === 'Delivered'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-indigo-50 text-indigo-700'
                }`}>
                  ● {order.status}
                </span>
                <span className="text-base font-black text-slate-900 font-mono">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Items in this order */}
            <div className="divide-y divide-slate-100">
              {order.items.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4
                        onClick={() => viewProductDetail(item.id)}
                        className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                      >
                        {item.name}
                      </h4>
                      <span className="text-slate-600">Qty: {item.quantity} × ${item.price}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Order details metadata */}
            <div className="bg-slate-50 p-3.5 rounded-2xl text-[11px] text-slate-600 flex flex-wrap justify-between gap-2 border border-slate-200/60">
              <div>
                <span className="font-bold text-slate-800">Payment: </span>
                <span>{order.paymentMethod}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">Ship To: </span>
                <span>{order.shippingAddress}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
