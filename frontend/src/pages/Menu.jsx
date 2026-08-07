import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHeart, FaRegHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import mainDish from '../assets/main-dish.png';
import img1 from '../assets/Rainbow Veggie Bowl.png';
import img2 from '../assets/Creamy Mushroom Soup.png';
import img3 from '../assets/Golden Pumpkin Soup.png';
import img4 from '../assets/Creamy Harvest Bowl.png';
import img5 from '../assets/Harvest Garden Bowl.png';
import img6 from '../assets/Creamy Palak Paneer.png';
import img7 from '../assets/Paneer Butter Masala.png';
import img8 from '../assets/Classic Bhindi Masala.png';
import img9 from '../assets/Classic Chicken Curry.png';
import img10 from '../assets/Ruby Paneer Curry.png';
import img11 from '../assets/Hyd Chicken Biryani.png';
import img12 from '../assets/Crispy Fish Fry.png';

// ─── Static demo items shown when API is unavailable ──────────────────────────
const DEMO_FOODS = [
  {
    id: 'd1', name: 'Paneer Butter Masala', description: 'Rich spiced paneer cubes in a tomato-cream gravy.',
    price: 12.99, rating: 4.8, veg: true, category: 'mains', badge: '20% off',
    image: img1,
  },
  {
    id: 'd2', name: 'Harvest Garden Bowl', description: 'Roasted vegetables, grains, and tangy dressing in a fresh bowl.',
    price: 9.49, rating: 4.6, veg: true, category: 'salad', badge: 'Hot',
    image: img2,
  },
  {
    id: 'd3', name: 'Golden Pumpkin Soup', description: 'Silky pumpkin soup with warming spices and a swirl of cream.',
    price: 10.99, rating: 4.5, veg: true, category: 'mains', badge: 'Chef\'s pick',
    image: img3,
  },
  {
    id: 'd4', name: 'Rainbow Veggie Bowl', description: 'Fresh seasonal greens, roasted veggies and creamy dressing.',
    price: 8.49, rating: 4.4, veg: true, category: 'salad', badge: 'New',
    image: img4,
  },
  {
    id: 'd5', name: 'Creamy Mushroom Soup', description: 'Earthy mushrooms in a rich, velvety broth.',
    price: 6.99, rating: 4.9, veg: true, category: 'mains', badge: '15% off',
    image: img5,
  },
  {
    id: 'd6', name: 'Creamy Palak Paneer', description: 'Soft paneer in a spiced spinach curry.',
    price: 17.99, rating: 4.7, veg: true, category: 'mains', badge: 'Limited',
    image: img6,
  },
  {
    id: 'd7', name: 'Paneer Butter Masala', description: 'Paneer cubes simmered in a buttery tomato curry.',
    price: 11.49, rating: 4.7, veg: true, category: 'mains', badge: 'Chef\'s pick',
    image: img7,
  },
  {
    id: 'd8', name: 'Classic Bhindi Masala', description: 'Stir-fried okra with aromatic Indian spices.',
    price: 8.99, rating: 4.5, veg: true, category: 'mains', badge: 'Fresh',
    image: img8,
  },
  {
    id: 'd9', name: 'Classic Chicken Curry', description: 'Tender chicken simmered in a fragrant curry sauce.',
    price: 13.49, rating: 4.8, veg: false, category: 'mains', badge: 'Spicy',
    image: img9,
  },
  {
    id: 'd10', name: 'Hyd Chicken Biryani', description: 'Aromatic basmati rice layered with spiced chicken.',
    price: 15.99, rating: 4.6, veg: false, category: 'mains', badge: 'Popular',
    image: img11,
  },
  {
    id: 'd11', name: 'Ruby Paneer Curry', description: 'Paneer simmered in a rich tomato and spice gravy.',
    price: 7.59, rating: 4.9, veg: true, category: 'mains', badge: 'New',
    image: img10,
  },
  {
    id: 'd12', name: 'Crispy Fish Fry', description: 'Spiced fish fillet crisped to perfection.',
    price: 7.29, rating: 4.3, veg: false, category: 'mains', badge: 'Quick bite',
    image: img12,
  },
];

const getRandomBadge = () => {
  const badges = ['Hot', 'New', "Chef's pick", '20% off', 'Limited', 'Spicy', 'Weekend special', 'Customer favorite'];
  return badges[Math.floor(Math.random() * badges.length)];
};

export default function Menu() {
  const [foods, setFoods] = useState(DEMO_FOODS);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [veg, setVeg] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  const [sort, setSort] = useState('popularity');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('eatrest_favorites') || '[]'); } catch { return []; }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  const { toggleItem, isInCart } = useCart();

  const categoryMap = useMemo(
    () => (categories || []).reduce((acc, cat) => ({ ...acc, [cat.id]: cat.name }), {}),
    [categories]
  );

  const promoCodes = [
    { code: 'SAVE10', title: '10% off', description: 'No minimum spend' },
    { code: 'EATREST20', title: '20% off orders ₹50+', description: 'Works on subtotal ≥ ₹50' },
    { code: 'BIRTHDAY', title: 'Birthday gift', description: 'Free dessert + 15% off' },
    { code: 'ANNIVERSARY', title: 'Anniversary gift', description: 'Free appetizer + 20% off' },
  ];

  const [copiedCode, setCopiedCode] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const copyPromoCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`${code} copied. Paste it in checkout.`);
    } catch {
      toast.error('Unable to copy code.');
    }
  };

  // ── Image helpers ────────────────────────────────────────────────────────────
  const foodImages = {
    mains: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12],
    salad: [img1, img4], dessert: [img5], drinks: [img11],
    default: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12],
  };

  const pickImage = (key, images) => {
    if (!images?.length) return '';
    let hash = 0;
    for (let i = 0; i < key.length; i++) { hash = ((hash << 5) - hash) + key.charCodeAt(i); hash |= 0; }
    return images[Math.abs(hash) % images.length];
  };

  const getFoodImage = (food) => {
    if (food.image) {
      if (typeof food.image === 'string') {
        if (/^(https?:|data:image|\/)/.test(food.image)) return food.image;
        const base = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
        return `${base}${food.image.startsWith('/') ? food.image : `/${food.image}`}`;
      }
      return food.image;
    }
    const n = (food.name || '').toLowerCase();
    if (n.includes('chicken')) return img9;
    if (n.includes('paneer')) return img7;
    if (n.includes('pumpkin')) return img3;
    if (n.includes('mushroom')) return img2;
    if (n.includes('salad')) return img4;
    if (n.includes('fish')) return img12;
    if (n.includes('bowl')) return img1;
    return pickImage(n, foodImages.default);
  };

  const formatPrice = (value) => formatCurrency(value, currency);

  const inferCategory = (name) => {
    const n = (name || '').toLowerCase();
    if (n.includes('chicken')) return 'Mains';
    if (n.includes('paneer')) return 'Mains';
    if (n.includes('pumpkin') || n.includes('mushroom') || n.includes('bowl')) return 'Mains';
    if (n.includes('salad')) return 'Salad';
    if (n.includes('soup')) return 'Mains';
    if (n.includes('cake') || n.includes('dessert') || n.includes('smoothie')) return 'Dessert';
    if (n.includes('fish')) return 'Mains';
    return 'Specials';
  };

  const getCategoryLabel = (food) => {
    const label = categoryMap[food.category] || food.category;
    if (label) return typeof label === 'string' ? label.charAt(0).toUpperCase() + label.slice(1) : label;
    return inferCategory(food.name);
  };

  // ── Favorites helpers ────────────────────────────────────────────────────────
  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = (food) => {
    const alreadyFavorite = isFavorite(food.id);

    setFavorites((prev) => {
      const next = alreadyFavorite ? prev.filter((f) => f.id !== food.id) : [...prev, food];
      localStorage.setItem('eatrest_favorites', JSON.stringify(next));
      return next;
    });

    toast.success(alreadyFavorite ? '💔 Removed from favorites' : '❤️ Added to favorites!');
  };

  const matchesVegFilter = useCallback((food) => {
    if (veg && !nonVeg) return food.veg;
    if (nonVeg && !veg) return !food.veg;
    return true;
  }, [veg, nonVeg]);

  // ── Data fetching ────────────────────────────────────────────────────────────
  useEffect(() => {
    api.get('/categories')
      .then((res) => {
        const p = res.data;
        setCategories(Array.isArray(p) ? p : p?.categories ?? []);
      })
      .catch(() => {/* silently ignore – we show demo data */ });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadFoods = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (veg && !nonVeg) params.veg = true;
        if (nonVeg && !veg) params.veg = false;
        if (sort) params.sort = sort;

        const res = await api.get('/foods', { params });
        if (cancelled) return;
        const p = res.data;
        setCurrency(p.currency || 'INR');
        const list = Array.isArray(p) ? p : p?.foods ?? [];
        if (list.length > 0) {
          setFoods(list.map((f) => ({ ...f, badge: f.badge || getRandomBadge() })));
        } else {
          // API returned empty — keep demo data visible
          demoFallback();
        }
      } catch {
        if (cancelled) return;
        demoFallback();
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const demoFallback = () => {
      const filtered = DEMO_FOODS.filter((f) => {
        if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (!matchesVegFilter(f)) return false;
        if (category && String(f.category || '').toLowerCase() !== String(category || '').toLowerCase()) return false;
        return true;
      });

      setFoods(filtered.map((f) => ({ ...f, badge: f.badge || getRandomBadge() })));
      setCurrency('INR');
      setError('');
    };

    loadFoods();
    return () => { cancelled = true; };
  }, [search, category, veg, nonVeg, sort, matchesVegFilter]);

  const displayFoods = useMemo(() => {
    if (!foods.length) return [];

    const priority = ['pizza', 'burger', 'pasta', 'salad', 'dessert', 'mains', 'wraps', 'noodles', 'starter', 'sandwich', 'rice', 'drinks'];
    const buckets = new Map();
    priority.forEach((key) => buckets.set(key, []));

    foods.forEach((food) => {
      const key = String(food.category || '').toLowerCase();
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(food);
    });

    const arranged = [];
    let loop = 0;

    while (arranged.length < foods.length && loop < foods.length + 5) {
      for (const key of priority) {
        const bucket = buckets.get(key) || [];
        if (bucket.length) {
          arranged.push(bucket.shift());
        }
        if (arranged.length >= foods.length) break;
      }
      loop += 1;
    }

    if (arranged.length < foods.length) {
      const seen = new Set(arranged.map((item) => item.id));
      foods.forEach((food) => {
        if (!seen.has(food.id)) arranged.push(food);
      });
    }

    return arranged;
  }, [foods]);

  // ── Discount helpers ─────────────────────────────────────────────────────────
  const getDiscount = (badge) => {
    const m = String(badge || '').match(/(\d+)%/);
    return m ? parseInt(m[1], 10) : 0;
  };

  // ── Food Card ────────────────────────────────────────────────────────────────
  const renderFoodCard = (food) => {
    const discount = getDiscount(food.badge);
    const discountedPrice = discount
      ? (food.price * (100 - discount) / 100).toFixed(2)
      : food.price.toFixed(2);
    const fav = isFavorite(food.id);
    const inCart = isInCart(food.id);

    return (
      <motion.article
        key={food.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-between rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg p-5 transition-shadow duration-300"
      >
        {/* Image with badges */}
        <div className="relative group w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.1)] border-2 border-slate-100 bg-slate-50">
          <img
            src={getFoodImage(food)}
            alt={food.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = mainDish; }}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-6"
          />

          {/* Discount ribbon */}
          {discount > 0 && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#ce1212] px-3 py-0.5 text-[10px] font-extrabold text-white shadow-md whitespace-nowrap">
              {discount}% OFF
            </div>
          )}

          {/* Non-discount badge / in-cart status */}
          {!discount && (
            <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow whitespace-nowrap ${inCart ? 'bg-emerald-600 text-white' : 'bg-slate-900/80 text-white'}`}>
              {inCart ? 'In cart' : food.badge}
            </div>
          )}

          {/* Favourite heart overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(food);
            }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-2 right-2 rounded-full bg-white/80 p-1.5 shadow transition hover:scale-110 active:scale-95"
          >
            {fav
              ? <FaHeart className="text-[#ce1212] text-sm" />
              : <FaRegHeart className="text-slate-400 text-sm" />}
          </button>
        </div>

        {/* Info */}
        <div className="text-center mt-4 flex-1 flex flex-col justify-between w-full">
          <div>
            <h3 className="text-base font-bold text-slate-800 tracking-tight line-clamp-1">{food.name}</h3>
            <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 max-w-xs mx-auto leading-relaxed">{food.description}</p>

            {/* Meta row */}
            <div className="mt-2 flex items-center justify-center gap-2 flex-wrap">
              <span
                className={`inline-block w-2 h-2 rounded-full ${food.veg ? 'bg-emerald-500' : 'bg-rose-500'}`}
                title={food.veg ? 'Vegetarian' : 'Non-vegetarian'}
              />
              <span className="text-[11px] text-slate-400 font-medium">{getCategoryLabel(food)}</span>
              <span className="text-[11px] text-amber-500 font-semibold">★ {food.rating}</span>
            </div>
          </div>

          {/* Price block */}
          <div className="mt-3">
            <div className="text-base font-extrabold text-[#ce1212]">
                {discount ? (
                <div className="flex items-center justify-center gap-2">
                  <span>{formatPrice(discountedPrice)}</span>
                  <span className="text-xs text-slate-400 line-through font-normal">{formatPrice(food.price)}</span>
                  <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">Save {formatPrice(food.price - parseFloat(discountedPrice))}</span>
                </div>
              ) : (
                <span>{formatPrice(food.price)}</span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(food);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold text-white transition ${inCart ? 'bg-rose-600 hover:bg-rose-500' : 'bg-slate-900 hover:bg-[#ce1212]'} hover:-translate-y-0.5 active:translate-y-0`}
              >
                {inCart ? 'Remove from cart' : 'Add to cart'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(food);
                }}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 active:translate-y-0 ${fav
                  ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                {fav ? '♥ Saved' : '♡ Favorite'}
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  // ── Derived data ─────────────────────────────────────────────────────────────
  const filteredFavorites = favorites.filter((f) => {
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (!matchesVegFilter(f)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-4xl border border-slate-200 bg-white/95 p-6 sm:p-10 shadow-[0_25px_70px_rgba(15,23,42,0.04)] backdrop-blur">

        {/* Category Nav */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 border-b border-slate-100 pb-4 mb-10">
          <button
            onClick={() => setCategory('')}
            className={`relative pb-3 text-sm sm:text-base font-semibold uppercase tracking-wider transition-colors duration-300 ${category === '' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            Today's Menue
            {category === '' && (
              <motion.div layoutId="activeCategory" className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-600 rounded-full" />
            )}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`relative pb-3 text-sm sm:text-base font-semibold uppercase tracking-wider transition-colors duration-300 ${category === cat.id ? 'text-[#ce1212]' : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {cat.name}
              {category === cat.id && (
                <motion.div layoutId="activeCategory" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ce1212] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Page title */}
        <div className="text-center mb-12">
          {/* <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Menu</p> */}
          <h2 className="mt-2 text-4xl font-extrabold uppercase tracking-widest text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
            {category === '' ? 'Our Specialties' : (categoryMap[category] || 'Specialties')}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-[1.95fr_0.85fr] items-start">

          {/* LEFT – menu items */}
          <div className="space-y-12">

            {/* ── Favorites section ── */}
            {favorites.length > 0 && (
              <section className="rounded-3xl border border-rose-100 bg-rose-50/40 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <FaHeart className="text-[#ce1212] text-lg" />
                    <h3 className="text-xl font-bold text-slate-800">Your Favorites</h3>
                    <span className="rounded-full bg-[#ce1212] text-white text-[11px] font-bold px-2 py-0.5">{favorites.length}</span>
                  </div>
                  <button
                    onClick={() => setShowFavorites((v) => !v)}
                    className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800 sm:w-auto"
                  >
                    {showFavorites ? 'Hide Favorites ▲' : 'Show Favorites ▼'}
                  </button>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${showFavorites ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  {filteredFavorites.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">No favorites match the current filters.</p>
                  ) : (
                    <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 ${showFavorites ? 'block' : 'hidden'}`}>
                      {filteredFavorites.map((food) => renderFoodCard(food))}
                    </div>
                  )}
                </div>

                {/* {!showFavorites && (
                  <p className="text-xs text-slate-500">Click <strong>Show ▼</strong> to see your saved items.</p>
                )} */}
              </section>
            )}

            {/* ── Main menu grid ── */}
            {error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 text-center">{error}</div>
            ) : loading ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-slate-700 text-center">
                Loading delicious menu items…
              </div>
            ) : foods.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-[#fcfbf7] p-16 text-center text-slate-600">
                No menu items found. Try adjusting your filters.
              </div>
            ) : (
              <section>
                <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence>
                    {displayFoods.map((food) => renderFoodCard(food))}
                  </AnimatePresence>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT – filters + promos */}
          <aside className="space-y-6 lg:sticky lg:top-6">

            {/* Search & Filters */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Search &amp; Filters</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 bg-slate-50 focus-within:border-slate-400">
                  <FaSearch className="text-slate-400 text-sm" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-slate-700"
                    placeholder="Search food"
                  />
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-full border border-slate-200 px-4 py-2 bg-slate-50 outline-none text-sm text-slate-700"
                >
                  <option value="popularity">Sort by popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>

                <label className="flex items-center gap-2.5 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={veg}
                    onChange={() => {
                      setVeg(!veg);
                      if (!veg && nonVeg) setNonVeg(false);
                    }}
                    className="accent-emerald-800 w-4 h-4"
                  />
                  Vegetarian only
                </label>

                <label className="flex items-center gap-2.5 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={nonVeg}
                    onChange={() => {
                      setNonVeg(!nonVeg);
                      if (!nonVeg && veg) setVeg(false);
                    }}
                    className="accent-red-800 w-4 h-4"
                  />
                  Non-Vegetarian only
                </label>
              </div>
            </div>

            {/* Favorites quick-count card */}
            <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <FaHeart className="text-[#ce1212] text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800">
                  {favorites.length === 0 ? 'No favorites yet' : `${favorites.length} favorite${favorites.length > 1 ? 's' : ''} saved`}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Tap ♡ on any dish to save it</p>
              </div>
              {favorites.length > 0 && (
                <button
                  onClick={() => { setFavorites([]); localStorage.removeItem('eatrest_favorites'); toast('Favorites cleared'); }}
                  className="text-[11px] text-slate-400 hover:text-rose-500 transition font-semibold flex-shrink-0"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Promo Codes */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 text-slate-700 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Promo codes</p>
              <h4 className="mt-2 text-xl font-bold text-slate-900">Use at checkout</h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">Apply a code on checkout to unlock discounts or special treats.</p>

              <ul className="mt-4 space-y-3">
                {promoCodes.map((promo) => (
                  <li key={promo.code} className="rounded-2xl border border-emerald-100 bg-white p-3.5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{promo.code}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{promo.title}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">{promo.description}</span>
                        <button
                          type="button"
                          onClick={() => copyPromoCode(promo.code)}
                          className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold text-white transition hover:bg-[#ce1212]"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {copiedCode && <p className="mt-3 text-xs text-emerald-700 font-semibold">Copied {copiedCode}. Paste it in checkout.</p>}

              <div className="mt-4 rounded-2xl bg-emerald-100/60 p-3.5 text-xs leading-relaxed text-slate-700">
                <p className="font-semibold text-emerald-900">Birthday &amp; anniversary perks</p>
                <p className="mt-1 text-slate-600">Enter <span className="font-semibold">BIRTHDAY</span> or <span className="font-semibold">ANNIVERSARY</span> at checkout to get free add-ons.</p>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-orange-600 p-3 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-orange-700 active:scale-95 sm:bottom-6 sm:right-6"
          title="Back to Top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  );
}
