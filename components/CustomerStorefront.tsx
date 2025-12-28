import React, { useState, useEffect } from 'react';
import { User as AuthUser } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  ShoppingCart, 
  Cpu, 
  Gem, 
  Star, 
  ArrowRight, 
  LogOut,
  Menu,
  X,
  Smartphone,
  Laptop,
  Headphones,
  Volume2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Truck,
  History,
  Clock,
  Globe,
  Speaker,
  Usb,
  BatteryCharging,
  Zap,
  User,
  MessageCircle,
  Send,
  ChevronDown,
  ArrowUpDown,
  CalendarDays,
  IndianRupee,
  Filter,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  MapPin,
  Wallet,
  Banknote,
  SmartphoneNfc,
  QrCode,
  Lock,
  CreditCard as CardIcon,
  RefreshCw,
  Bell,
  Settings,
  Shield,
  BadgeCheck,
  ToggleRight,
  Mail,
  Box,
  MapPinned,
  Package,
  Calendar
} from 'lucide-react';

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  subCategory: string;
  material?: string;
  brandCategory?: string;
  price: string;
  rating: number;
  images: string[];
  tag: string;
  trending: boolean;
  description: string;
  specs: string[];
  reviews: Review[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Address {
  id: number;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface Order {
  id: string;
  date: string;
  total: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: CartItem[];
  trackingId: string;
  estimatedDelivery: string;
}

interface CustomerStorefrontProps {
  user: AuthUser;
  products: Product[];
  onLogout: () => void;
}

const INITIAL_REVIEWS: Review[] = [
  { id: 1, userName: "Sarah J.", rating: 5, comment: "Absolutely stunning. The quality exceeded my expectations!", date: "2 days ago" },
  { id: 2, userName: "Michael R.", rating: 4, comment: "Very satisfied with the performance. Quick delivery too.", date: "1 week ago" }
];

const MOCK_ADDRESSES: Address[] = [
  { id: 1, label: "Home", street: "123 Silicon Valley Way, Apartment 4B", city: "Bangalore", state: "Karnataka", zip: "560001", phone: "+91 98765 43210" }
];

export const PRODUCTS: Product[] = [
  // Electronics - Phone
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Electronics',
    brandCategory: 'phone',
    subCategory: 'iphone',
    price: '₹1,59,900',
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d256e?auto=format&fit=crop&q=80&w=800'],
    tag: 'Flagship',
    trending: true,
    description: 'Titanium design with A17 Pro chip.',
    specs: ['256GB', 'Titanium'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 2,
    name: 'Realme GT 5',
    category: 'Electronics',
    brandCategory: 'phone',
    subCategory: 'realme',
    price: '₹34,999',
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'],
    tag: 'Performance',
    trending: false,
    description: 'Ultra-fast charging flagship killer.',
    specs: ['16GB RAM', '240W Charge'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Electronics - Laptop
  {
    id: 3,
    name: 'MacBook Pro M3',
    category: 'Electronics',
    brandCategory: 'laptop',
    subCategory: 'apple',
    price: '₹1,69,900',
    rating: 5.0,
    images: ['https://images.unsplash.com/photo-1517336712461-461ad7c50334?auto=format&fit=crop&q=80&w=800'],
    tag: 'Pro Power',
    trending: true,
    description: 'The most advanced chips for personal computers.',
    specs: ['M3 Pro Chip', 'Liquid Retina XDR'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 4,
    name: 'Dell XPS 13 Plus',
    category: 'Electronics',
    brandCategory: 'laptop',
    subCategory: 'dell',
    price: '₹1,45,000',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800'],
    tag: 'Premium',
    trending: false,
    description: 'Stunning design meets peak productivity.',
    specs: ['4K OLED', 'Intel i7'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 5,
    name: 'Asus VivoBook 16',
    category: 'Electronics',
    brandCategory: 'laptop',
    subCategory: 'asus vivo',
    price: '₹58,990',
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'],
    tag: 'Value',
    trending: true,
    description: 'Bigger screen, better performance.',
    specs: ['16-inch Display', 'Ryzen 5'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Electronics - Headphone
  {
    id: 6,
    name: 'Sony WH-1000XM5',
    category: 'Electronics',
    brandCategory: 'headphone',
    subCategory: 'sony',
    price: '₹29,990',
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
    tag: 'Noise Cancelling',
    trending: true,
    description: 'Industry-leading noise cancellation.',
    specs: ['30h Battery', 'LDAC'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Electronics - Bluetooth Speaker
  {
    id: 7,
    name: 'Bose SoundLink Revolve+',
    category: 'Electronics',
    brandCategory: 'Bluetooth speaker',
    subCategory: 'bose',
    price: '₹24,500',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800'],
    tag: '360 Sound',
    trending: true,
    description: 'Deep, loud and immersive sound.',
    specs: ['Water resistant', '17h Battery'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Electronics - Others
  {
    id: 8,
    name: 'Ultra Fast USB-C Cable',
    category: 'Electronics',
    brandCategory: 'others',
    subCategory: 'cables',
    price: '₹999',
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=800'],
    tag: 'Essential',
    trending: false,
    description: 'High speed data and power delivery.',
    specs: ['100W PD', 'Braided'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Jewellery - Gold
  {
    id: 101,
    name: 'Classic Gold Band',
    category: 'Jewellery',
    material: 'Gold',
    subCategory: 'Gold Rings',
    price: '₹45,000',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'],
    tag: 'Classic',
    trending: false,
    description: 'A timeless 22K gold ring.',
    specs: ['22K Gold', 'Polished'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 102,
    name: 'Royal Heritage Necklace',
    category: 'Jewellery',
    material: 'Gold',
    subCategory: 'Gold Necklace',
    price: '₹1,25,000',
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'],
    tag: 'Regal',
    trending: true,
    description: 'Intricately designed 22K gold necklace for special occasions.',
    specs: ['22K Gold', 'Heritage Design'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 103,
    name: 'Temple Gold Earrings',
    category: 'Jewellery',
    material: 'Gold',
    subCategory: 'Gold Earrings',
    price: '₹35,000',
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'],
    tag: 'Traditional',
    trending: false,
    description: 'Exquisite temple design gold earrings.',
    specs: ['22K Gold', 'Temple Art'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 104,
    name: 'Classic Gold Bangles',
    category: 'Jewellery',
    material: 'Gold',
    subCategory: 'Gold Bangles',
    price: '₹1,85,000',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
    tag: 'Best Seller',
    trending: true,
    description: 'Set of two heavy gold bangles with polished finish.',
    specs: ['22K Gold', 'Set of 2'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Jewellery - Silver
  {
    id: 105,
    name: 'Ethereal Silver Studs',
    category: 'Jewellery',
    material: 'Silver',
    subCategory: 'Silver Earrings',
    price: '₹8,500',
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=800'],
    tag: 'Minimalist',
    trending: false,
    description: 'Sterling silver studs with a polished star design.',
    specs: ['925 Sterling Silver', 'Studs'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 106,
    name: 'Artisan Silver Choker',
    category: 'Jewellery',
    material: 'Silver',
    subCategory: 'Silver Necklace',
    price: '₹15,000',
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&q=80&w=800'],
    tag: 'Artisan',
    trending: true,
    description: 'Handcrafted silver choker with intricate filigree work.',
    specs: ['925 Sterling Silver', 'Handmade'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 107,
    name: 'Silver Filigree Ring',
    category: 'Jewellery',
    material: 'Silver',
    subCategory: 'Silver Rings',
    price: '₹4,500',
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1603561591411-0e7320b97d33?auto=format&fit=crop&q=80&w=800'],
    tag: 'Casual',
    trending: false,
    description: 'Delicate silver ring featuring artisan filigree.',
    specs: ['925 Sterling Silver'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Jewellery - Diamond
  {
    id: 108,
    name: 'Solitaire Diamond Ring',
    category: 'Jewellery',
    material: 'Diamond',
    subCategory: 'Diamond Rings',
    price: '₹4,50,000',
    rating: 5.0,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800'],
    tag: 'Premium',
    trending: true,
    description: 'Brilliant cut solitaire diamond in a platinum setting.',
    specs: ['1ct Diamond', 'VVS1 Clarity', 'Platinum Setting'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 109,
    name: 'Celestial Diamond Necklace',
    category: 'Jewellery',
    material: 'Diamond',
    subCategory: 'Diamond Necklace',
    price: '₹2,10,000',
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800'],
    tag: 'Luxury',
    trending: true,
    description: 'Dazzling diamond clusters in a starry pattern.',
    specs: ['18K White Gold', 'Conflict-Free Diamonds'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 110,
    name: 'Brilliant Diamond Studs',
    category: 'Jewellery',
    material: 'Diamond',
    subCategory: 'Diamond Earrings',
    price: '₹85,000',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1588444839799-eb00f490465c?auto=format&fit=crop&q=80&w=800'],
    tag: 'Essential Luxury',
    trending: false,
    description: 'Timeless diamond stud earrings in white gold.',
    specs: ['0.5ct total Diamonds', '14K White Gold'],
    reviews: [...INITIAL_REVIEWS]
  },
  // Jewellery - Rose Gold
  {
    id: 111,
    name: 'Infinity Rose Gold Ring',
    category: 'Jewellery',
    material: 'Rose Gold',
    subCategory: 'Rose Gold Rings',
    price: '₹22,000',
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'],
    tag: 'Modern',
    trending: true,
    description: 'Sleek infinity design in warm rose gold.',
    specs: ['18K Rose Gold', 'Infinity Design'],
    reviews: [...INITIAL_REVIEWS]
  },
  {
    id: 112,
    name: 'Rose Gold Heart Pendant',
    category: 'Jewellery',
    material: 'Rose Gold',
    subCategory: 'Rose Gold Necklace',
    price: '₹18,500',
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&q=80&w=800'],
    tag: 'Romantic',
    trending: false,
    description: 'Charming heart pendant in polished rose gold.',
    specs: ['18K Rose Gold', '16-inch Chain'],
    reviews: [...INITIAL_REVIEWS]
  }
];

const JEWELLERY_STRUCTURE: Record<string, string[]> = {
  'Gold': ['Gold Rings', 'Gold Necklace', 'Gold Bangles', 'Gold Earrings'],
  'Silver': ['Silver Rings', 'Silver Necklace', 'Silver Bangles', 'Silver Earrings'],
  'Rose Gold': ['Rose Gold Rings', 'Rose Gold Necklace', 'Rose Gold Bangles', 'Rose Gold Earrings'],
  'Diamond': ['Diamond Rings', 'Diamond Necklace', 'Diamond Bangles', 'Diamond Earrings']
};

const ELECTRONICS_STRUCTURE: Record<string, string[]> = {
  'phone': ['iphone', 'realme'],
  'laptop': ['dell', 'hp', 'asus vivo', 'apple'],
  'headphone': ['boat', 'boss', 'jbl', 'sony'],
  'speakers': ['party speaker'],
  'Bluetooth speaker': ['jbl', 'bose'],
  'ear buds': ['boat', 'noise'],
  'others': ['cables', 'charge', 'pendrive', 'USB']
};

const JEWELLERY_CATEGORIES = [
  { name: 'Gold', icon: <div className="text-2xl">🟡</div> },
  { name: 'Silver', icon: <div className="text-2xl">⚪</div> },
  { name: 'Rose Gold', icon: <div className="text-2xl">🌸</div> },
  { name: 'Diamond', icon: <Gem className="w-6 h-6" /> },
];

const ELECTRONICS_CATEGORIES = [
  { name: 'phone', icon: <Smartphone className="w-6 h-6" /> },
  { name: 'laptop', icon: <Laptop className="w-6 h-6" /> },
  { name: 'headphone', icon: <Headphones className="w-6 h-6" /> },
  { name: 'speakers', icon: <Speaker className="w-6 h-6" /> },
  { name: 'Bluetooth speaker', icon: <Volume2 className="w-6 h-6" /> },
  { name: 'ear buds', icon: <Headphones className="w-6 h-6" /> },
  { name: 'others', icon: <Usb className="w-6 h-6" /> },
];

const NAV_LINKS = ['Home', 'Shop', 'Electronics', 'Jewellery', 'About Us', 'Services', 'Contact Us', 'Profile'];

type SortOrder = 'default' | 'priceLowHigh' | 'priceHighLow' | 'dateNewest' | 'dateOldest';

const CustomerStorefront: React.FC<CustomerStorefrontProps> = ({ user, products, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);
  const [activeBrandCategory, setActiveBrandCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  
  // Cart State
  const [cartItems, setCartItems] = useState<Map<number, CartItem>>(new Map());
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderNotification, setOrderNotification] = useState(false);
  
  // Order & Tracking State
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  
  // Checkout/Review/Payment State
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(MOCK_ADDRESSES[0].id);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('COD');
  
  // Payment Details State
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [walletBalance, setWalletBalance] = useState(5000);
  const [topUpAmount, setTopUpAmount] = useState('');

  // Wishlist State
  const [wishlist, setWishlist] = useState<Map<number, number>>(new Map());
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');
  
  // Price Filtering State
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  
  // Review System State
  const [productReviews, setProductReviews] = useState<Record<number, Review[]>>(() => {
    const initial: Record<number, Review[]> = {};
    products.forEach(p => initial[p.id] = p.reviews);
    return initial;
  });
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const themeColors = activeTab === 'Jewellery' 
    ? { primary: 'amber-500', bg: 'bg-[#1a140a]', accent: 'from-amber-400 to-orange-600' }
    : activeTab === 'Wishlist'
    ? { primary: 'rose-500', bg: 'bg-[#0f0408]', accent: 'from-rose-500 to-pink-600' }
    : activeTab === 'Cart' || activeTab === 'Review' || activeTab === 'Payment' || activeTab === 'Tracking'
    ? { primary: 'emerald-500', bg: 'bg-[#040f0a]', accent: 'from-emerald-500 to-teal-600' }
    : activeTab === 'Profile'
    ? { primary: 'indigo-500', bg: 'bg-[#04060f]', accent: 'from-indigo-500 to-blue-600' }
    : { primary: 'indigo-600', bg: 'bg-[#020617]', accent: 'from-indigo-500 to-cyan-500' };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProductId, activeTrackingOrder]);

  useEffect(() => {
    setDetailQuantity(1);
  }, [selectedProductId]);

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^\d]/g, ''), 10);

  const handleNavClick = (name: string) => {
    setActiveTab(name);
    setActiveSubCategory('All');
    setActiveMaterial(null);
    setActiveBrandCategory(null);
    setSelectedProductId(null);
    setActiveTrackingOrder(null);
    setSortOrder('default');
    setMinPrice('');
    setMaxPrice('');
    setIsMobileMenuOpen(false);
  };

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => {
      const next = new Map(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.set(productId, Date.now());
      }
      return next;
    });
  };

  const addToCart = (product: Product, quantity: number = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems(prev => {
      const next = new Map<number, CartItem>(prev);
      const existing = next.get(product.id);
      if (existing) {
        next.set(product.id, { ...existing, quantity: existing.quantity + quantity });
      } else {
        next.set(product.id, { product, quantity: quantity });
      }
      return next;
    });
    
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }, 800);
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCartItems(prev => {
      const next = new Map<number, CartItem>(prev);
      const item = next.get(productId);
      if (item) {
        const newQty = Math.max(0, item.quantity + delta);
        if (newQty === 0) {
          next.delete(productId);
        } else {
          next.set(productId, { ...item, quantity: newQty });
        }
      }
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const next = new Map(prev);
      next.delete(productId);
      return next;
    });
  };

  const handleBuyNow = (product: Product, quantity: number = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCheckoutItems([{ product, quantity: quantity }]);
    setSelectedProductId(null);
    setActiveTab('Review');
  };

  const handleCartToReview = () => {
    setCheckoutItems(Array.from(cartItems.values()));
    setActiveTab('Review');
  };

  const handleProceedToPayment = () => {
    setActiveTab('Payment');
  };

  const handleFinalPayment = () => {
    const subtotal = checkoutItems.reduce((acc, curr) => acc + parsePrice(curr.product.price) * curr.quantity, 0);
    const totalWithTax = (subtotal * 1.12) + 500;
    
    if (selectedPaymentMethod === 'Wallet' && totalWithTax > walletBalance) {
      alert("Insufficient wallet balance. Please top up your Hub Wallet.");
      return;
    }

    if (selectedPaymentMethod === 'Wallet') {
        setWalletBalance(prev => prev - totalWithTax);
    }
    
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      
      const newOrder: Order = {
        id: `SH-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        total: `₹${totalWithTax.toLocaleString()}`,
        status: 'Processing',
        items: [...checkoutItems],
        trackingId: `TRK-XP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      setOrders(prev => [newOrder, ...prev]);
      setCartItems(new Map());
      setCheckoutItems([]);
      setOrderNotification(true);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setOrderNotification(false);
        setActiveTrackingOrder(newOrder);
        setActiveTab('Tracking');
      }, 2000);
    }, 2500);
  };

  const handleTopUp = () => {
    const amount = parseInt(topUpAmount);
    if (!isNaN(amount) && amount > 0) {
      setWalletBalance(prev => prev + amount);
      setTopUpAmount('');
    }
  };

  const handleSubmitReview = (productId: number) => {
    if (!newReviewComment.trim() || isSubmittingReview) return;
    
    setIsSubmittingReview(true);
    setTimeout(() => {
      const review: Review = {
        id: Date.now(),
        userName: user.fullName,
        rating: newReviewRating,
        comment: newReviewComment,
        date: "Just now"
      };
      
      setProductReviews(prev => ({
        ...prev,
        [productId]: [review, ...(prev[productId] || [])]
      }));
      
      setNewReviewComment('');
      setNewReviewRating(5);
      setIsSubmittingReview(false);
    }, 1000);
  };

  const getFilteredAndSortedProducts = () => {
    let baseProducts = products;
    
    if (activeTab === 'Wishlist') {
      baseProducts = products.filter(p => wishlist.has(p.id));
    }

    const filtered = baseProducts.filter((product) => {
      let matchesTab = true;
      if (activeTab === 'Electronics') matchesTab = product.category === 'Electronics';
      if (activeTab === 'Jewellery') matchesTab = product.category === 'Jewellery';
      if (['Wishlist', 'Shop', 'Cart', 'Review', 'Payment', 'Profile', 'Tracking'].includes(activeTab)) matchesTab = true; 
      
      let matchesFilter = true;
      if (activeTab === 'Jewellery' && activeMaterial) {
        matchesFilter = product.material === activeMaterial;
      } else if (activeTab === 'Electronics' && activeBrandCategory) {
        matchesFilter = product.brandCategory === activeBrandCategory;
      }

      const matchesSub = activeSubCategory === 'All' || product.subCategory === activeSubCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const productVal = parsePrice(product.price);
      const minVal = minPrice ? parseInt(minPrice, 10) : 0;
      const maxVal = maxPrice ? parseInt(maxPrice, 10) : Infinity;
      const matchesPrice = productVal >= minVal && productVal <= maxVal;

      return matchesTab && matchesFilter && matchesSub && matchesSearch && matchesPrice;
    });

    if (sortOrder === 'default') return filtered;

    return [...filtered].sort((a, b) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);
      const timeA = wishlist.get(a.id) || 0;
      const timeB = wishlist.get(b.id) || 0;
      
      if (sortOrder === 'priceLowHigh') return priceA - priceB;
      if (sortOrder === 'priceHighLow') return priceB - priceA;
      if (sortOrder === 'dateNewest') return timeB - timeA;
      if (sortOrder === 'dateOldest') return timeA - timeB;
      return 0;
    });
  };

  const filteredSortedProducts = getFilteredAndSortedProducts();
  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const totalCartCount = Array.from(cartItems.values()).reduce<number>((acc: number, curr: CartItem) => acc + curr.quantity, 0);

  const renderProductCard = (product: Product) => (
    <div 
      key={product.id} 
      onClick={() => setSelectedProductId(product.id)}
      className="glass rounded-[2.5rem] p-6 group transition-all border border-white/5 hover:border-white/10 cursor-pointer"
    >
      <div className="aspect-square rounded-3xl overflow-hidden mb-6 relative">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
        <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1.5 border border-white/10">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-black text-white">{product.rating}</span>
        </div>
        {wishlist.has(product.id) && (
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-rose-500/20 backdrop-blur-md rounded-full border border-rose-500/30 flex items-center gap-2">
            <Heart className="w-3 h-3 text-rose-400 fill-current" />
            <span className="text-[8px] font-black text-rose-300 uppercase tracking-widest">In Vault</span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">{product.subCategory}</span>
        <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{product.name}</h4>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <p className="text-xl font-black text-white">{product.price}</p>
            <button 
              onClick={(e) => toggleWishlist(product.id, e)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-90 ${
                wishlist.has(product.id) ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="flex items-center gap-2">
             <button 
              onClick={(e) => handleBuyNow(product, 1, e)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all active:scale-95 shadow-lg bg-${themeColors.primary} hover:brightness-110`}
            >
              <Zap className="w-3 h-3 fill-current" />
              Buy
            </button>
            <div 
              onClick={(e) => addToCart(product, 1, e)}
              className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:bg-white/10 transition-all border border-white/5"
            >
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrderTracking = (order: Order) => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12">
      <button onClick={() => handleNavClick('Home')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors glass px-6 py-3 rounded-full w-fit border border-white/5">
        <ArrowLeft className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
      </button>

      <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Globe className="w-64 h-64" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
          <div className="space-y-2">
            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Order <span className="text-emerald-500">#{order.id}</span></h3>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Transmission Registry: {order.trackingId}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Current Status</p>
                <p className="text-white font-black text-xl uppercase italic">{order.status}</p>
             </div>
             <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest animate-pulse">In Progress</div>
          </div>
        </div>

        {/* Tracking Stepper */}
        <div className="relative pt-12 pb-8">
           <div className="absolute top-[72px] left-[5%] right-[5%] h-1 bg-white/5" />
           <div className="absolute top-[72px] left-[5%] h-1 bg-emerald-500 transition-all duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.5)]" style={{ width: '10%' }} />
           
           <div className="grid grid-cols-4 gap-4 relative">
              {[
                { name: 'Manifested', icon: <Box />, done: true },
                { name: 'In Transit', icon: <Truck />, done: false },
                { name: 'Portal Proximity', icon: <MapPinned />, done: false },
                { name: 'Secured', icon: <CheckCircle2 />, done: false }
              ].map((stage, i) => (
                <div key={i} className="flex flex-col items-center gap-4 text-center">
                   <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 z-10 border-2 ${
                     stage.done ? 'bg-emerald-500 text-white border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'glass text-slate-700 border-white/5'
                   }`}>{React.cloneElement(stage.icon as React.ReactElement, { className: 'w-7 h-7' })}</div>
                   <div>
                     <p className={`text-[10px] font-black uppercase tracking-widest ${stage.done ? 'text-white' : 'text-slate-600'}`}>{stage.name}</p>
                     {stage.done && i === 0 && <p className="text-[9px] text-slate-500 font-bold mt-1">Today, {order.date}</p>}
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-white/5">
           <div className="space-y-6">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-[0.4em]">Artifact Manifest</h4>
              <div className="space-y-4">
                 {order.items.map((item, idx) => (
                   <div key={idx} className="flex items-center gap-6 p-5 bg-white/5 rounded-[2rem] border border-white/5 group hover:border-emerald-500/20 transition-all">
                      <img src={item.product.images[0]} className="w-20 h-20 rounded-2xl object-cover shadow-xl group-hover:scale-105 transition-transform" alt="" />
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg">{item.product.name}</p>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Qty: {item.quantity} • {item.product.price}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-emerald-400 font-black">₹{(parsePrice(item.product.price) * item.quantity).toLocaleString()}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="space-y-8">
              <div className="glass p-8 rounded-[2.5rem] space-y-6 border border-white/5">
                 <h4 className="text-xs font-black uppercase text-slate-500 tracking-[0.4em]">Delivery Coordinates</h4>
                 <div className="space-y-3 text-slate-300">
                    <p className="font-bold text-white text-lg">{user.fullName}</p>
                    <p className="text-sm">123 Silicon Valley Way, Suite 4B</p>
                    <p className="text-sm">Bangalore, Karnataka 560001</p>
                    <div className="h-px bg-white/5 my-4" />
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Estimated Ingress</span>
                       </div>
                       <p className="text-white font-black">{order.estimatedDelivery}</p>
                    </div>
                 </div>
              </div>
              
              <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl"><ShieldCheck className="w-6 h-6 text-emerald-500" /></div>
                    <div>
                       <p className="text-white font-bold uppercase tracking-widest text-xs">Buyer Protection Active</p>
                       <p className="text-[10px] text-slate-500 font-bold uppercase">Secured by StoreHub protocols</p>
                    </div>
                 </div>
                 <p className="text-2xl font-black text-white">{order.total}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderFilterHub = () => {
    const isJewellery = activeTab === 'Jewellery';
    const categories = isJewellery ? JEWELLERY_CATEGORIES : ELECTRONICS_CATEGORIES;
    const currentActiveRoot = isJewellery ? activeMaterial : activeBrandCategory;
    const setRootFilter = isJewellery ? setActiveMaterial : setActiveBrandCategory;
    const structure = isJewellery ? JEWELLERY_STRUCTURE : ELECTRONICS_STRUCTURE;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex flex-wrap items-center gap-4 pb-2">
          <button 
            onClick={() => { setRootFilter(null); setActiveSubCategory('All'); }}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${!currentActiveRoot ? `bg-${themeColors.primary} text-white shadow-xl` : 'glass text-slate-500 border-white/5'}`}
          >
            All {activeTab}
          </button>
          {categories.map(cat => (
            <button 
              key={cat.name} 
              onClick={() => { setRootFilter(cat.name); setActiveSubCategory('All'); }}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 ${currentActiveRoot === cat.name ? `bg-${themeColors.primary} text-white shadow-xl` : 'glass text-slate-500 border-white/5 hover:bg-white/5'}`}
            >
              <span className="shrink-0">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {currentActiveRoot && (
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar animate-in zoom-in duration-300">
            <button 
              onClick={() => setActiveSubCategory('All')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeSubCategory === 'All' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              All {currentActiveRoot}
            </button>
            {structure[currentActiveRoot]?.map(sub => (
              <button 
                key={sub} 
                onClick={() => setActiveSubCategory(sub)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeSubCategory === sub ? `bg-${themeColors.primary}/20 text-${themeColors.primary} border border-${themeColors.primary}/30` : 'text-slate-500 hover:text-slate-300'}`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderCartPortal = () => {
    const items: CartItem[] = Array.from(cartItems.values());
    const subtotal = items.reduce<number>((acc: number, curr: CartItem) => acc + parsePrice(curr.product.price) * curr.quantity, 0);
    const tax = subtotal * 0.12;
    const shipping = subtotal > 10000 ? 0 : 500;
    const total = subtotal + shipping + tax;

    if (items.length === 0) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 py-32 text-center space-y-8">
           <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto border border-white/5">
              <ShoppingCart className="w-10 h-10 text-slate-800" />
           </div>
           <div className="space-y-4">
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Your Hub Cart is <span className="text-emerald-500">Empty</span></h2>
              <p className="text-slate-500 max-w-md mx-auto text-sm font-medium leading-relaxed">It seems you haven't added any futuristic artifacts or artisanal gems to your portal yet.</p>
           </div>
           <button 
            onClick={() => handleNavClick('Shop')}
            className="px-10 py-5 bg-emerald-600 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
           >
             Begin Exploration
           </button>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-8 mb-4">
             <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Cart <span className="text-emerald-500">Manifest</span></h2>
             <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{items.length} Unique Items</span>
          </div>
          
          <div className="space-y-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="glass p-6 rounded-[2.5rem] border border-white/5 group hover:border-white/10 transition-all flex flex-col md:flex-row items-center gap-8">
                 <div className="w-32 h-32 rounded-3xl overflow-hidden shrink-0 border border-white/5 relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 </div>
                 <div className="flex-1 space-y-2 text-center md:text-left">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{product.subCategory}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{product.name}</h3>
                    <p className="text-slate-400 text-sm line-clamp-1">{product.description}</p>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
                       <button 
                        onClick={() => updateCartQuantity(product.id, -1)}
                        className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
                       >
                         <Minus className="w-4 h-4" />
                       </button>
                       <span className="text-sm font-black text-white w-6 text-center">{quantity}</span>
                       <button 
                        onClick={() => updateCartQuantity(product.id, 1)}
                        className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
                       >
                         <Plus className="w-4 h-4" />
                       </button>
                    </div>
                    <div className="text-right min-w-[120px]">
                       <p className="text-xl font-black text-white">₹{(parsePrice(product.price) * quantity).toLocaleString()}</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase">Unit: {product.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="p-3 rounded-2xl text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-32">
          <div className="glass p-10 rounded-[3rem] border border-white/10 bg-white/[0.01] space-y-10 shadow-2xl">
             <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                   <CreditCard className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Order <span className="text-emerald-500">Summary</span></h4>
             </div>

             <div className="space-y-6">
                <div className="flex justify-between text-slate-400 text-sm font-medium">
                   <span>Subtotal</span>
                   <span className="text-white font-black">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm font-medium">
                   <span>Eco Tax (12%)</span>
                   <span className="text-white font-black">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm font-medium">
                   <span>Logistics (Eco-Friendly)</span>
                   <span className="text-emerald-500 font-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Payable</p>
                      <p className="text-4xl font-black text-white mt-1">₹{total.toLocaleString()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-black text-emerald-400/60 uppercase tracking-widest">Gst Incl.</p>
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <button 
                  onClick={handleCartToReview}
                  className="w-full py-6 rounded-3xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 shadow-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98]"
                >
                  <Zap className="w-5 h-5 fill-current" />
                  Proceed to Review
                </button>
                <div className="flex items-center justify-center gap-2 text-slate-500">
                   <ShieldCheck className="w-4 h-4" />
                   <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encrypted Portal</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReviewPortal = () => {
    const subtotal = checkoutItems.reduce<number>((acc: number, curr: CartItem) => acc + parsePrice(curr.product.price) * curr.quantity, 0);
    const tax = subtotal * 0.12;
    const shipping = subtotal > 10000 ? 0 : 500;
    const total = subtotal + shipping + tax;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-16">
        <button onClick={() => setActiveTab(cartItems.size > 0 ? 'Cart' : 'Home')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 bg-white/5 rounded-full border border-white/5 w-fit">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Review Your <span className="text-emerald-500">Order</span></h2>
              <p className="text-slate-500 text-sm font-medium">Verify your shipping details and artifact selection below.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <MapPin className="w-5 h-5 text-emerald-500" />
                 <h4 className="text-xs font-black uppercase tracking-widest text-white">Delivery Artifact Path</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {MOCK_ADDRESSES.map(addr => (
                   <div 
                    key={addr.id} 
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`glass p-6 rounded-[2rem] border cursor-pointer transition-all ${
                      selectedAddressId === addr.id ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 hover:border-white/10'
                    }`}
                   >
                     <div className="flex items-start justify-between mb-4">
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${selectedAddressId === addr.id ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-500'}`}>{addr.label}</span>
                        {selectedAddressId === addr.id && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                     </div>
                     <div className="space-y-1">
                        <p className="text-white font-bold">{user.fullName}</p>
                        <p className="text-slate-400 text-sm">{addr.street}</p>
                        <p className="text-slate-400 text-sm">{addr.city}, {addr.state} - {addr.zip}</p>
                        <p className="text-slate-500 text-[10px] font-black mt-2 uppercase tracking-widest">{addr.phone}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-emerald-500" />
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Manifest Selection ({checkoutItems.length})</h4>
               </div>
               <div className="space-y-4">
                 {checkoutItems.map(({ product, quantity }) => (
                   <div key={product.id} className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                         <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <h5 className="text-white font-bold">{product.name}</h5>
                         <p className="text-slate-500 text-[10px] font-black uppercase">{product.subCategory}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-white font-black">{product.price}</p>
                         <p className="text-[10px] font-bold text-slate-500 uppercase">Qty: {quantity}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="glass p-10 rounded-[3rem] border border-white/10 bg-white/[0.01] space-y-10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Portal <span className="text-emerald-500">Bill</span></h4>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between text-slate-400 text-sm font-medium">
                    <span>Artifact Value</span>
                    <span className="text-white font-black">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-sm font-medium">
                    <span>Eco Tax (12%)</span>
                    <span className="text-white font-black">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-sm font-medium">
                    <span>Ecosystem Delivery</span>
                    <span className="text-emerald-500 font-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Final Contribution</p>
                      <p className="text-4xl font-black text-white mt-1">₹{total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                   <button 
                    onClick={handleProceedToPayment}
                    className="w-full py-6 rounded-3xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 shadow-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98]"
                   >
                     <Zap className="w-5 h-5 fill-current" />
                     Place Artifact Order
                   </button>
                   <p className="text-center text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">30-Day Guarantee Protected</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentPortal = () => {
    const subtotal = checkoutItems.reduce<number>((acc: number, curr: CartItem) => acc + parsePrice(curr.product.price) * curr.quantity, 0);
    const tax = subtotal * 0.12;
    const shipping = subtotal > 10000 ? 0 : 500;
    const total = subtotal + shipping + tax;

    const paymentMethods = [
      { id: 'COD', name: 'Cash on Delivery', icon: <Banknote className="w-6 h-6" />, desc: 'Pay when artifact arrives' },
      { id: 'PhonePe', name: 'PhonePe', icon: <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center"><Smartphone className="w-4 h-4 text-white" /></div>, desc: 'Instant UPI Transfer' },
      { id: 'GPay', name: 'Google Pay', icon: <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-200"><SmartphoneNfc className="w-4 h-4 text-blue-500" /></div>, desc: 'Secure Google Ecosystem' },
      { id: 'Paytm', name: 'Paytm', icon: <div className="w-6 h-6 bg-sky-500 rounded-lg flex items-center justify-center"><QrCode className="w-4 h-4 text-white" /></div>, desc: 'Digital Wallet & UPI' },
      { id: 'RazorPay', name: 'RazorPay', icon: <div className="w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>, desc: 'Advanced Payment Gateway' },
      { id: 'Card', name: 'Credit Card', icon: <CreditCard className="w-6 h-6" />, desc: 'Visa, Mastercard, Amex' },
      { id: 'Wallet', name: 'Hub Wallet', icon: <Wallet className="w-6 h-6" />, desc: 'Stored StoreHub Credits' },
    ];

    const isUPISelected = ['PhonePe', 'GPay', 'Paytm', 'RazorPay'].includes(selectedPaymentMethod);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-16">
        <button onClick={() => setActiveTab('Review')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 bg-white/5 rounded-full border border-white/5 w-fit">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Review</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Select <span className="text-emerald-500">Method</span></h2>
              <p className="text-slate-500 text-sm font-medium">Choose your preferred portal for value contribution.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map(method => (
                <div 
                  key={method.id} 
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`glass p-8 rounded-[2.5rem] border cursor-pointer transition-all flex items-center gap-6 ${
                    selectedPaymentMethod === method.id ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`p-4 rounded-2xl ${selectedPaymentMethod === method.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{method.name}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{method.desc}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPaymentMethod === method.id ? 'border-emerald-500 bg-emerald-500' : 'border-slate-800'
                  }`}>
                    {selectedPaymentMethod === method.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              {isUPISelected && (
                <div className="glass p-8 rounded-[2.5rem] border border-emerald-500/20 space-y-6">
                   <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">UPI Authentication</h4>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">UPI ID</label>
                     <input 
                       type="text"
                       value={upiId}
                       onChange={(e) => setUpiId(e.target.value)}
                       placeholder="username@bank"
                       className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white"
                     />
                   </div>
                </div>
              )}

              {selectedPaymentMethod === 'Card' && (
                <div className="glass p-8 rounded-[2.5rem] border border-emerald-500/20 space-y-8">
                   <div className="flex items-center gap-3">
                      <CardIcon className="w-5 h-5 text-emerald-500" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">Artifact Credit Registry</h4>
                   </div>
                   <div className="space-y-4">
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Card Number</label>
                       <input 
                         type="text"
                         value={cardNumber}
                         onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                         placeholder="0000 0000 0000 0000"
                         className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white tracking-widest"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Expiry Date</label>
                         <input 
                           type="text"
                           value={expiry}
                           onChange={(e) => setExpiry(e.target.value)}
                           placeholder="MM / YY"
                           className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white"
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">CVV</label>
                         <input 
                           type="password"
                           value={cvv}
                           onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                           placeholder="***"
                           maxLength={3}
                           className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white"
                         />
                       </div>
                     </div>
                   </div>
                </div>
              )}

              {selectedPaymentMethod === 'Wallet' && (
                <div className="glass p-8 rounded-[2.5rem] border border-emerald-500/20 space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-emerald-500" />
                        <h4 className="text-xs font-black uppercase tracking-widest text-white">Hub Wallet Reserve</h4>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Available Reserve</p>
                         <p className="text-2xl font-black text-emerald-400">₹{walletBalance.toLocaleString()}</p>
                      </div>
                   </div>
                   
                   <div className="h-px bg-white/5" />
                   
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="w-4 h-4 text-emerald-500" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Inject Credits</h5>
                      </div>
                      <div className="flex gap-4">
                        <input 
                          type="number"
                          value={topUpAmount}
                          onChange={(e) => setTopUpAmount(e.target.value)}
                          placeholder="Amount"
                          className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-white"
                        />
                        <button 
                          onClick={handleTopUp}
                          className="px-8 py-3 bg-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-emerald-500 transition-all"
                        >
                          Inject
                        </button>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 rounded-[3rem] border border-white/10 bg-white/[0.01] space-y-10 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Final <span className="text-emerald-500">Entry</span></h4>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between text-slate-400 text-sm font-medium">
                  <span>Artifacts</span>
                  <span className="text-white font-black">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm font-medium">
                  <span>Eco Tax (12%)</span>
                  <span className="text-white font-black">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm font-medium">
                  <span>Ecosystem Delivery</span>
                  <span className="text-emerald-500 font-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Commitment Total</p>
                      <p className="text-4xl font-black text-white mt-1">₹{total.toLocaleString()}</p>
                    </div>
                </div>
                <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-1">Selected Method</p>
                  <p className="text-white font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handleFinalPayment}
                  disabled={isCheckingOut || isSuccess}
                  className={`w-full py-6 rounded-3xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 shadow-2xl ${
                    isSuccess ? 'bg-emerald-600' : isCheckingOut ? 'bg-emerald-500/50 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98]'
                  }`}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Finalizing Portal...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Transaction Success
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-current" />
                      Complete Transaction
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-slate-500">
                   <Lock className="w-4 h-4" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-center">Secure Gateway Integration Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUserProfile = () => {
    const stats = [
      { label: 'Artifacts Acquired', value: String(42 + orders.length), icon: <ShoppingBag className="w-5 h-5 text-indigo-400" /> },
      { label: 'Vault Security Level', value: 'Alpha-9', icon: <Shield className="w-5 h-5 text-emerald-400" /> },
      { label: 'Portal Contribution', value: '₹12.4L', icon: <IndianRupee className="w-5 h-5 text-amber-400" /> },
      { label: 'Trust Index', value: '99.8%', icon: <BadgeCheck className="w-5 h-5 text-blue-400" /> },
    ];

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-12 pb-20">
        <div className="flex flex-col md:flex-row items-center gap-10 border-b border-white/5 pb-12">
          <div className="relative group">
             <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl border-4 border-white/10 group-hover:scale-105 transition-transform`}>
               {user.fullName.charAt(0)}
             </div>
             <div className="absolute -bottom-2 -right-2 p-3 bg-emerald-500 rounded-2xl border-4 border-[#04060f] shadow-lg">
                <BadgeCheck className="w-5 h-5 text-white" />
             </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
             <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">{user.fullName}</h2>
                <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/30 w-fit mx-auto md:mx-0">Legacy Member</span>
             </div>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2">
               <Mail className="w-3 h-3" /> {user.email}
             </p>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2">
               <Globe className="w-3 h-3" /> Hub Access ID: {user.id.slice(0, 12)}...
             </p>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 glass rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all flex items-center gap-2 border border-white/5">
                <Settings className="w-4 h-4" /> Calibration
             </button>
             <button onClick={onLogout} className="px-6 py-3 bg-rose-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/20 transition-all flex items-center gap-2 border border-rose-500/10">
                <LogOut className="w-4 h-4" /> De-authorize
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {stats.map((stat, i) => (
             <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                   {stat.icon}
                </div>
                <div>
                   <p className="text-2xl font-black text-white">{stat.value}</p>
                   <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           <div className="lg:col-span-8 space-y-8">
              <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-8">
                 <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Acquisition History</h3>
                 </div>
                 <div className="space-y-4">
                    {orders.length > 0 ? orders.map(order => (
                      <div 
                        key={order.id} 
                        onClick={() => { setActiveTrackingOrder(order); setActiveTab('Tracking'); }}
                        className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-emerald-500/20 transition-all cursor-pointer"
                      >
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden border border-white/10">
                               <img src={order.items[0].product.images[0]} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                               <p className="text-white font-bold uppercase tracking-widest text-xs">Artifact Protocol #{order.id}</p>
                               <p className="text-slate-500 text-[10px] font-bold">Placed on {order.date} • {order.status}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-white font-black">{order.total}</p>
                            <span className="text-emerald-500 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Track Order</span>
                         </div>
                      </div>
                    )) : (
                      [1, 2].map(i => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-indigo-500/20 transition-all">
                           <div className="flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden border border-white/10">
                                 <img src={`https://images.unsplash.com/photo-${1510000000000 + i}?auto=format&fit=crop&q=80&w=100`} className="w-full h-full object-cover" alt="" />
                              </div>
                              <div>
                                 <p className="text-white font-bold uppercase tracking-widest text-xs">Artifact Protocol #{8422 + i}</p>
                                 <p className="text-slate-500 text-[10px] font-bold">Transferred via Hyper-Logistics • {i + 2} days ago</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-white font-black">₹{ (12500 * (i + 1)).toLocaleString() }</p>
                              <span className="text-emerald-500 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Secured</span>
                           </div>
                        </div>
                      ))
                    )}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-8">
              <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-8">
                 <div className="flex items-center gap-3">
                    <ToggleRight className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Ecosystem Preferences</h3>
                 </div>
                 <div className="space-y-6">
                    {[
                      { label: 'Neural Notifications', desc: 'Real-time price drop telemetry', active: true },
                      { label: 'AI Shopping Consultant', desc: 'Predictive artifact sourcing', active: true },
                      { label: 'Dark Mode Portal', desc: 'Optimize visual sensory input', active: true },
                      { label: 'Eco-Friendly Logistics', desc: 'Prioritize low-carbon delivery', active: false }
                    ].map((pref, i) => (
                      <div key={i} className="flex items-center justify-between gap-4">
                         <div>
                            <p className="text-white font-bold text-sm uppercase tracking-widest">{pref.label}</p>
                            <p className="text-[10px] text-slate-500 font-bold">{pref.desc}</p>
                         </div>
                         <div className={`w-10 h-5 rounded-full p-1 transition-colors ${pref.active ? 'bg-indigo-500' : 'bg-slate-800'}`}>
                            <div className={`w-3 h-3 rounded-full bg-white transition-transform ${pref.active ? 'translate-x-5' : 'translate-x-0'}`} />
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="h-px bg-white/5" />
                 <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase text-slate-500 text-center tracking-[0.2em]">Security Protocol</p>
                    <button className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black uppercase text-[10px] tracking-widest transition-all border border-white/5">Change Access Key</button>
                    <button className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black uppercase text-[10px] tracking-widest transition-all border border-white/5">Multi-Portal Sync</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderProductDetail = (product: Product) => {
    const reviews = productReviews[product.id] || [];
    
    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-24">
        <button onClick={() => setSelectedProductId(null)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 bg-white/5 rounded-full border border-white/5 w-fit">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 aspect-[4/5] rounded-[3.5rem] overflow-hidden glass border border-white/10 relative shadow-2xl">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-8 left-8"><span className="px-5 py-2 bg-indigo-600/50 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">{product.tag}</span></div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 border border-white/5">{product.category}</span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-black text-amber-400">{product.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">{product.name}</h2>
                <button 
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className={`p-4 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90 ${
                    wishlist.has(product.id) ? 'bg-rose-500 text-white shadow-xl' : 'glass text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${wishlist.has(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <p className={`text-4xl font-black text-${themeColors.primary}`}>{product.price}</p>
            </div>
            <p className="text-slate-400 text-xl font-medium leading-relaxed">{product.description}</p>
            
            <div className="space-y-8 pt-6 border-t border-white/5">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between glass px-8 py-5 rounded-3xl border border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Select Batch Size</span>
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <span className="text-2xl font-black text-white min-w-[2rem] text-center">{detailQuantity}</span>
                  <button 
                    onClick={() => setDetailQuantity(detailQuantity + 1)}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-90"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={(e) => handleBuyNow(product, detailQuantity, e)}
                  className={`group py-6 relative overflow-hidden font-black uppercase tracking-[0.2em] text-sm rounded-3xl shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 bg-${themeColors.primary} hover:brightness-110 active:scale-95`}
                >
                  <Zap className="w-6 h-6 fill-current" />
                  Buy Now
                </button>
                <button 
                  onClick={(e) => addToCart(product, detailQuantity, e)}
                  disabled={isAdding}
                  className="group py-6 relative overflow-hidden font-black uppercase tracking-[0.2em] text-sm rounded-3xl glass border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-4 active:scale-95"
                >
                  {isAdding ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <ShoppingCart className="w-6 h-6" />}
                  Add to Cart
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 glass rounded-3xl border border-white/5"><Truck className="w-5 h-5 text-indigo-400" /><span className="text-[8px] font-black uppercase text-slate-500">Fast Delivery</span></div>
                <div className="flex flex-col items-center gap-2 p-4 glass rounded-3xl border border-white/5"><ShieldCheck className="w-5 h-5 text-emerald-400" /><span className="text-[8px] font-black uppercase text-slate-500">Certified</span></div>
                <div className="flex flex-col items-center gap-2 p-4 glass rounded-3xl border border-white/5"><History className="w-5 h-5 text-rose-400" /><span className="text-[8px] font-black uppercase text-slate-500">30-Day Return</span></div>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-16 border-t border-white/5 pt-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white">Customer <span className={`text-${themeColors.primary}`}>Insights</span></h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Voices from our global community</p>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5 flex items-center gap-10">
              <div className="text-center">
                <p className="text-4xl font-black text-white">{product.rating}</p>
                <div className="flex items-center gap-1 mt-1 justify-center">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-amber-500 fill-amber-500" />)}
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{(productReviews[product.id] || []).length} Verified Reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div className="glass p-10 rounded-[3rem] border border-white/10 bg-white/[0.01] space-y-8">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl bg-${themeColors.primary}/10 text-${themeColors.primary}`}>
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Share Your Experience</h4>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">How would you rate it?</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setNewReviewRating(star)}
                          className={`p-2 rounded-xl transition-all ${newReviewRating >= star ? 'text-amber-500 bg-amber-500/10' : 'text-slate-600 bg-white/5 hover:bg-white/10'}`}
                        >
                          <Star className={`w-6 h-6 ${newReviewRating >= star ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Your Thoughts</label>
                    <textarea
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="What did you love about this piece?"
                      rows={4}
                      className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    onClick={() => handleSubmitReview(product.id)}
                    disabled={!newReviewComment.trim() || isSubmittingReview}
                    className={`w-full py-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 shadow-xl ${
                      isSubmittingReview ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />
                    }`}
                  >
                    {isSubmittingReview ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                    Submit Insight
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="glass p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.02] transition-colors space-y-6 animate-in slide-in-from-right-4 duration-500">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{review.userName}</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 glass rounded-xl border border-white/5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
              
              {reviews.length === 0 && (
                <div className="py-20 text-center space-y-4 glass rounded-[3rem] border-white/5 border-dashed">
                  <MessageCircle className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-slate-500 font-bold italic">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderInformationalPages = () => {
    const pages: Record<string, React.ReactNode> = {
      'About Us': (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">The <span className={`text-${themeColors.primary}`}>ShopHub</span> Legacy</h2>
            <p className="text-slate-400 text-lg leading-relaxed">ShopHub 3.0 represents the pinnacle of digital commerce, blending high-end curation with cutting-edge technology to create a seamless marketplace for the modern world.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-4">
              <Globe className="w-10 h-10 text-indigo-400" />
              <h4 className="text-xl font-bold text-white">Global Reach</h4>
              <p className="text-slate-500 text-sm">Operating across 45 countries with localized fulfillment centers ensuring rapid delivery.</p>
            </div>
            <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-4">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
              <h4 className="text-xl font-bold text-white">Secure Trading</h4>
              <p className="text-slate-500 text-sm">Every transaction is protected by enterprise-grade encryption and fraud prevention.</p>
            </div>
            <div className="glass p-10 rounded-[2.5rem] border border-white/5 space-y-4">
              <Sparkles className="w-10 h-10 text-amber-400" />
              <h4 className="text-xl font-bold text-white">Curated Quality</h4>
              <p className="text-slate-500 text-sm">Our team of experts hand-selects every brand and product in our ecosystem.</p>
            </div>
          </div>
        </div>
      ),
      'Services': (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Our <span className={`text-${themeColors.primary}`}>Expertise</span></h2>
            <p className="text-slate-400">Beyond retail, we provide a full suite of luxury ecosystem services.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { title: 'Authenticity Guarantee', desc: 'Rigorous 12-point inspection for every high-value item.', icon: <CheckCircle2 className="w-6 h-6" /> },
              { title: 'Global Concierge', desc: '24/7 dedicated support for our premium hub members.', icon: <User className="w-6 h-6" /> },
              { title: 'Express Logistics', desc: 'Next-day delivery available in over 150 major metropolitan areas.', icon: <Truck className="w-6 h-6" /> },
              { title: 'Extended Protection', desc: 'Comprehensive warranty coverage for all electronics and jewelry.', icon: <ShieldCheck className="w-6 h-6" /> }
            ].map((service, i) => (
              <div key={i} className="glass p-8 rounded-3xl border border-white/5 flex items-start gap-6">
                <div className={`p-4 rounded-2xl bg-${themeColors.primary}/10 text-${themeColors.primary}`}>{service.icon}</div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{service.title}</h4>
                  <p className="text-slate-500 text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      'Contact Us': (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase">Get In <span className={`text-${themeColors.primary}`}>Touch</span></h2>
            <p className="text-slate-400 text-lg">Have questions about an order or want to learn more about our portal? Our team is standing by.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-indigo-400"><Globe className="w-6 h-6" /></div>
                <div><p className="text-xs font-black uppercase text-slate-500">Headquarters</p><p>Silicon Valley, CA • Dubai, UAE</p></div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center text-emerald-400"><MessageCircle className="w-6 h-6" /></div>
                <div><p className="text-xs font-black uppercase text-slate-500">Live Chat</p><p>Available 24/7 in the portal</p></div>
              </div>
            </div>
          </div>
          <div className="glass p-10 rounded-[3rem] border border-white/10 space-y-6">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subject</label>
               <input type="text" placeholder="How can we help?" className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Message</label>
               <textarea rows={5} placeholder="Describe your inquiry..." className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all text-sm resize-none" />
             </div>
             <button className={`w-full py-5 rounded-2xl bg-${themeColors.primary} text-white font-black uppercase tracking-[0.2em] text-xs transition-all hover:brightness-110 flex items-center justify-center gap-3`}>
               <Send className="w-4 h-4" /> Send Inquiry
             </button>
          </div>
        </div>
      ),
      'Profile': renderUserProfile()
    };

    return pages[activeTab] || (
      <div className="py-40 text-center space-y-6">
        <Sparkles className="w-20 h-20 text-slate-800 mx-auto" />
        <h2 className="text-4xl font-black text-slate-700 uppercase italic tracking-tighter">Portal Section Under Development</h2>
        <p className="text-slate-500 max-w-md mx-auto"> we are currently calibrating this section of the ShopHub 3.0 ecosystem. Please check back shortly.</p>
        <button onClick={() => handleNavClick('Home')} className={`px-10 py-4 bg-${themeColors.primary} text-white rounded-2xl font-bold uppercase tracking-widest text-xs`}>Return to Hub</button>
      </div>
    );
  };

  const renderPriceFilters = () => {
    const presets = [
      { label: 'Under ₹50k', min: '', max: '50000' },
      { label: '₹50k - ₹1.5L', min: '50000', max: '150000' },
      { label: 'Above ₹1.5L', min: '150000', max: '' },
    ];

    return (
      <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <Filter className={`w-4 h-4 text-${themeColors.primary}`} />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Refine by Price</h4>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Min Price</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] font-black group-focus-within:text-white transition-colors">₹</span>
                <input 
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all text-xs text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Max Price</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-[10px] font-black group-focus-within:text-white transition-colors">₹</span>
                <input 
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Any"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => { setMinPrice(preset.min); setMaxPrice(preset.max); }}
                className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  minPrice === preset.min && maxPrice === preset.max
                    ? `bg-${themeColors.primary}/20 text-${themeColors.primary} border border-${themeColors.primary}/30`
                    : 'glass text-slate-500 border-white/5 hover:bg-white/5 hover:text-slate-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
            {(minPrice || maxPrice) && (
              <button 
                onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-all"
                title="Clear Price Filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const SortDropdown = ({ showDateOptions = false }: { showDateOptions?: boolean }) => (
    <div className="relative group">
      <div className="flex items-center gap-3 px-5 py-2.5 glass rounded-2xl border border-white/5 cursor-pointer hover:border-white/10 transition-all">
        <ArrowUpDown className="w-3 h-3 text-slate-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-white whitespace-nowrap">
          Sort By: {
            sortOrder === 'default' ? 'Relevance' : 
            sortOrder === 'priceLowHigh' ? 'Price: Low to High' : 
            sortOrder === 'priceHighLow' ? 'Price: High to Low' :
            sortOrder === 'dateNewest' ? 'Added: Newest' : 'Added: Oldest'
          }
        </span>
        <ChevronDown className="w-3 h-3 text-slate-500 group-hover:rotate-180 transition-transform" />
      </div>
      
      <div className="absolute top-full right-0 mt-2 w-56 glass border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
        <button 
          onClick={() => setSortOrder('default')}
          className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${sortOrder === 'default' ? `text-${themeColors.primary} bg-white/5` : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Default Relevance
        </button>
        <button 
          onClick={() => setSortOrder('priceLowHigh')}
          className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-t border-white/5 ${sortOrder === 'priceLowHigh' ? `text-${themeColors.primary} bg-white/5` : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Price: Low to High
        </button>
        <button 
          onClick={() => setSortOrder('priceHighLow')}
          className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-t border-white/5 ${sortOrder === 'priceHighLow' ? `text-${themeColors.primary} bg-white/5` : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Price: High to Low
        </button>
        {showDateOptions && (
          <>
            <button 
              onClick={() => setSortOrder('dateNewest')}
              className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-t border-white/5 ${sortOrder === 'dateNewest' ? `text-${themeColors.primary} bg-white/5` : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Added: Newest First
            </button>
            <button 
              onClick={() => setSortOrder('dateOldest')}
              className={`w-full text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-t border-white/5 ${sortOrder === 'dateOldest' ? `text-${themeColors.primary} bg-white/5` : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              Added: Oldest First
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${themeColors.bg} text-slate-100 flex flex-col relative`}>
      {orderNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-10 duration-500">
           <div className="glass px-10 py-5 rounded-[2.5rem] border border-emerald-500/30 flex items-center gap-4 bg-emerald-500/10 shadow-2xl backdrop-blur-2xl">
              <div className="p-2 bg-emerald-500 rounded-full animate-pulse">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-black uppercase tracking-widest text-xs">Transmission Secure</p>
                <p className="text-emerald-400 text-[10px] font-bold">Artifact Order Has Been Placed Successfully!</p>
              </div>
           </div>
        </div>
      )}

      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4 gap-4 md:gap-8">
            <div className="flex items-center gap-2 shrink-0">
              <div 
                onClick={() => handleNavClick('Home')}
                className={`w-10 h-10 bg-${themeColors.primary} rounded-xl flex items-center justify-center shadow-lg transition-colors cursor-pointer hover:scale-105 active:scale-95`}
              >
                <ShoppingBag className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tighter hidden sm:block">ShopHub <span className={`text-${themeColors.primary}`}>3.0</span></h1>
            </div>
            <div className="flex-1 max-w-md relative group hidden md:block">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-${themeColors.primary} transition-colors`} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Explore the ecosystem..."
                className="w-full bg-slate-900/50 border border-white/5 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all text-sm placeholder:text-slate-600"
              />
            </div>
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <div className="hidden sm:flex items-center gap-4">
                <button 
                  onClick={() => handleNavClick('Wishlist')}
                  className={`transition-colors relative ${activeTab === 'Wishlist' ? 'text-rose-500' : 'text-slate-400 hover:text-white'}`}
                >
                  <Heart className={`w-6 h-6 ${activeTab === 'Wishlist' ? 'fill-current' : ''}`} />
                  {wishlist.size > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-full animate-in zoom-in">{wishlist.size}</span>}
                </button>
                <button 
                  onClick={() => handleNavClick('Cart')}
                  className={`transition-colors relative ${activeTab === 'Cart' ? 'text-emerald-500' : 'text-slate-400 hover:text-white'}`}
                >
                  <ShoppingCart className={`w-6 h-6 ${activeTab === 'Cart' ? 'fill-current' : ''}`} />
                  {totalCartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[8px] font-black flex items-center justify-center rounded-full animate-in zoom-in">{totalCartCount}</span>}
                </button>
              </div>
              <button onClick={() => handleNavClick('Profile')} className={`p-2 rounded-lg bg-white/5 transition-all ${activeTab === 'Profile' ? 'text-indigo-400 bg-indigo-400/10' : 'text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10'}`}>
                 <User className="w-5 h-5" />
              </button>
              <button onClick={onLogout} className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition-all"><LogOut className="w-5 h-5" /></button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden p-2 rounded-lg bg-white/5 text-slate-400">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          <nav className="hidden xl:flex items-center justify-center gap-8 py-3 border-t border-white/5 overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((name) => (
              <button
                key={name}
                onClick={() => handleNavClick(name)}
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-${themeColors.primary} whitespace-nowrap ${activeTab === name ? `text-${themeColors.primary}` : 'text-slate-500'}`}
              >
                {name}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#020617] xl:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-bold tracking-tighter">Navigation Hub</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl bg-white/5"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <button 
                onClick={() => handleNavClick('Profile')} 
                className={`w-full text-left py-4 px-6 rounded-2xl text-xl font-black uppercase tracking-tighter transition-all flex items-center justify-between ${activeTab === 'Profile' ? 'bg-indigo-500 text-white' : 'text-slate-500 hover:bg-white/5'}`}
              >
                User Profile
                <User className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleNavClick('Wishlist')} 
                className={`w-full text-left py-4 px-6 rounded-2xl text-xl font-black uppercase tracking-tighter transition-all flex items-center justify-between ${activeTab === 'Wishlist' ? 'bg-rose-500 text-white' : 'text-slate-500 hover:bg-white/5'}`}
              >
                Wishlist
                <Heart className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleNavClick('Cart')} 
                className={`w-full text-left py-4 px-6 rounded-2xl text-xl font-black uppercase tracking-tighter transition-all flex items-center justify-between ${activeTab === 'Cart' ? 'bg-emerald-500 text-white' : 'text-slate-500 hover:bg-white/5'}`}
              >
                Shopping Cart
                <ShoppingCart className="w-5 h-5" />
              </button>
              {NAV_LINKS.map((name) => (
                <button key={name} onClick={() => handleNavClick(name)} className={`w-full text-left py-4 px-6 rounded-2xl text-xl font-black uppercase tracking-tighter transition-all ${activeTab === name ? `bg-${themeColors.primary} text-white` : 'text-slate-500 hover:bg-white/5'}`}>{name}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-16 w-full overflow-hidden flex-1">
        {activeTrackingOrder ? (
          renderOrderTracking(activeTrackingOrder)
        ) : selectedProduct ? (
          renderProductDetail(selectedProduct)
        ) : activeTab === 'Cart' ? (
          renderCartPortal()
        ) : activeTab === 'Review' ? (
          renderReviewPortal()
        ) : activeTab === 'Payment' ? (
          renderPaymentPortal()
        ) : (
          <>
            {['Home', 'Shop', 'Electronics', 'Jewellery', 'Wishlist', 'Profile'].includes(activeTab) ? (
              <>
                <section className="relative h-[400px] md:h-[500px] rounded-[3.5rem] overflow-hidden group shadow-2xl">
                  {activeTab === 'Jewellery' || (activeTab === 'Home' && (Number(Math.random()) > 0.5)) ? (
                    <div className="absolute inset-0">
                      <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1a140a]/90 via-transparent flex flex-col justify-center px-10 md:px-20 space-y-6">
                        <div className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest w-fit border border-amber-500/30">Artisanal Sourcing</div>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight italic uppercase tracking-tighter">Artisan <span className="text-amber-500">Jewels</span></h2>
                        <button 
                          onClick={() => handleNavClick('Jewellery')}
                          className="flex items-center gap-3 px-8 py-4 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-500 transition-all shadow-xl w-fit"
                        >
                          Explore Portal <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : activeTab === 'Wishlist' ? (
                    <div className="absolute inset-0">
                      <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0408]/90 via-transparent flex flex-col justify-center px-10 md:px-20 space-y-6">
                        <div className="px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest w-fit border border-rose-500/30">Your Curated Collection</div>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight italic uppercase tracking-tighter">Private <span className="text-rose-500">Vault</span></h2>
                        <div className="flex items-center gap-4">
                          <div className="px-6 py-3 glass rounded-2xl border border-white/10 flex items-center gap-3">
                            <Heart className="w-5 h-5 text-rose-500 fill-current" />
                            <span className="text-white font-bold">{wishlist.size} Saved Items</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : activeTab === 'Profile' ? (
                    <div className="absolute inset-0">
                      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#04060f]/90 via-transparent flex flex-col justify-center px-10 md:px-20 space-y-6">
                        <div className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest w-fit border border-indigo-500/30">Hub Identity Hub</div>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight italic uppercase tracking-tighter">Account <span className="text-indigo-400">Registry</span></h2>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-transparent flex flex-col justify-center px-10 md:px-20 space-y-6">
                        <div className="px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest w-fit border border-indigo-500/30">Next-Gen Hardware</div>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-tight italic uppercase tracking-tighter">Quantum <span className="text-indigo-500">Power</span></h2>
                        <button 
                          onClick={() => handleNavClick('Electronics')}
                          className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all shadow-xl w-fit"
                        >
                          View Portal <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </section>

                <section className="space-y-12">
                  {activeTab !== 'Profile' && (
                  <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                       <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">
                         {activeTab === 'Home' ? 'Curated' : activeTab === 'Wishlist' ? 'Personal' : activeTab} <span className={`text-${themeColors.primary}`}>{activeTab === 'Wishlist' ? 'Wishlist' : 'Selection'}</span>
                       </h3>
                       <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Precision filtering across {filteredSortedProducts.length} items</p>
                    </div>
                  </div>
                  )}

                  {(activeTab === 'Jewellery' || activeTab === 'Electronics' || activeTab === 'Shop' || activeTab === 'Wishlist') && (
                    <div className="space-y-12">
                      {activeTab !== 'Wishlist' && activeTab !== 'Shop' && renderFilterHub()}
                      {(activeTab === 'Shop' || activeTab === 'Electronics' || activeTab === 'Jewellery') && renderPriceFilters()}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                         <div className="flex items-center gap-4">
                            <button 
                              onClick={() => { 
                                setActiveSubCategory('All'); 
                                setActiveMaterial(null); 
                                setActiveBrandCategory(null); 
                                setSortOrder('default'); 
                                setMinPrice('');
                                setMaxPrice('');
                              }} 
                              className="text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-colors"
                            >
                              <History className="w-3 h-3" />
                              Reset All Filters
                            </button>
                         </div>

                         <SortDropdown showDateOptions={activeTab === 'Wishlist'} />
                      </div>
                    </div>
                  )}

                  {activeTab === 'Profile' ? renderInformationalPages() : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredSortedProducts.length > 0 ? (
                      filteredSortedProducts.map(product => renderProductCard(product))
                    ) : (
                      <div className="col-span-full py-20 text-center space-y-4 glass rounded-[3rem] border-white/5">
                        {activeTab === 'Wishlist' ? (
                          <>
                            <Heart className="w-12 h-12 text-slate-800 mx-auto" />
                            <h4 className="text-xl font-bold text-slate-400">Your wishlist is currently empty</h4>
                            <button onClick={() => handleNavClick('Shop')} className="text-indigo-500 font-black uppercase text-[10px] tracking-widest">Discover Products</button>
                          </>
                        ) : (
                          <>
                            <Search className="w-12 h-12 text-slate-600 mx-auto" />
                            <h4 className="text-xl font-bold text-slate-400">No matches found with current filters</h4>
                            <button onClick={() => { setActiveSubCategory('All'); setActiveMaterial(null); setActiveBrandCategory(null); setSortOrder('default'); setMinPrice(''); setMaxPrice(''); }} className="text-indigo-500 font-black uppercase text-[10px] tracking-widest">Reset All Filters</button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  )}
                </section>
              </>
            ) : renderInformationalPages()}
          </>
        )}
      </main>

      <footer className="glass border-t border-white/5 py-20 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <h5 className="font-bold text-white text-2xl tracking-tighter">ShopHub <span className={`text-${themeColors.primary}`}>3.0</span></h5>
            <p className="text-slate-500 text-sm leading-relaxed">Defining the next generation of high-end retail across global markets.</p>
          </div>
          <div className="space-y-4">
            <h6 className="text-xs font-black uppercase tracking-widest text-indigo-500">Curation</h6>
            <ul className="space-y-3 text-sm text-slate-500">
              <li onClick={() => handleNavClick('Jewellery')} className="hover:text-white cursor-pointer transition-colors">Jewellery Portal</li>
              <li onClick={() => handleNavClick('Electronics')} className="hover:text-white cursor-pointer transition-colors">Electronics Portal</li>
              <li onClick={() => handleNavClick('Wishlist')} className="hover:text-rose-400 cursor-pointer transition-colors">Private Vault</li>
              <li onClick={() => handleNavClick('Cart')} className="hover:text-emerald-400 cursor-pointer transition-colors">Shopping Cart</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h6 className="text-xs font-black uppercase tracking-widest text-indigo-500">Concierge</h6>
            <ul className="space-y-3 text-sm text-slate-500">
              <li onClick={() => handleNavClick('Services')} className="hover:text-white cursor-pointer transition-colors">Authentication</li>
              <li onClick={() => handleNavClick('Contact Us')} className="hover:text-white cursor-pointer transition-colors">Support Hub</li>
            </ul>
          </div>
          <div className="space-y-6 text-right">
            <div className={`inline-block px-4 py-1.5 rounded-full bg-${themeColors.primary}/10 text-${themeColors.primary} text-[10px] font-black uppercase tracking-widest border border-${themeColors.primary}/20`}>Official Hub Member</div>
            <p className="text-slate-500 text-[10px] font-medium mt-4 tracking-tighter">© 2024 SHOPHUB GLOBAL ECOSYSTEM.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerStorefront;