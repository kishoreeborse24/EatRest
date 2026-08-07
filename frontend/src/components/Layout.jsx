import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaInstagram, FaFacebookF, FaTwitter, FaPhoneAlt, FaShoppingBag, FaMoon, FaSun, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaHeart, FaTimes, FaYoutube } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatCurrency';
import { useEffect, useState } from 'react';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/orders', label: 'Orders' },
  { to: '/contact', label: 'Contact' }
];

export default function Layout() {
  const { user, logout } = useAuth();
  const { items, itemCount, subtotal, deliveryFees, tax, total, updateItemQuantity, removeItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    setCartOpen(false);
  }, [location.pathname]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.elements.footerEmail?.value?.trim();
    if (!email) {
      toast.error('Please enter an email address.');
      return;
    }
    e.target.reset();
    toast.success(`Thanks! ${email} has been subscribed.`);
  };

  return (
    <div className="min-h-screen bg-[#fcf8f1] text-orange-600 transition-colors duration-300 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-[#efe4d5] bg-[#fffcf7]/90 shadow-[0_10px_30px_rgba(45,63,53,0.04)] backdrop-blur-xl dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl sm:h-14 sm:w-14 sm:text-2xl">🍽</span>
              <span className="text-2xl font-semibold text-orange-600 sm:text-3xl md:text-3xl">Eat<span className="text-slate-600">Rest</span></span>
            </NavLink>
          </div>

          {/* Middle: desktop nav (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-semibold transition-colors duration-300
      after:absolute after:left-0 after:-bottom-1 after:h-px
      after:w-full after:origin-left after:scale-x-0
      after:bg-orange-600 after:transition-transform after:duration-300
      ${isActive ? 'text-orange-600 after:scale-x-100' : 'text-gray-700 hover:text-orange-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right: actions — shows mobile buttons (hamburger+cart) on small, desktop actions on md+ */}
          <div className="flex items-center gap-3">
            {/* Mobile actions */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setCartOpen((prev) => !prev)}
                className="relative inline-flex items-center justify-center rounded-full border border-[#e9dfcf] bg-[#fffdf9] p-2 text-orange-600 mr-2"
                aria-label="Toggle cart"
                title="Toggle cart"
              >
                <FaShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-semibold text-white leading-5">{itemCount}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="inline-flex items-center justify-center rounded-full border border-[#e9dfcf] bg-[#fffdf9] p-3 text-orange-600"
                aria-label="Toggle navigation"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {/* <button onClick={() => setDark((value) => !value)} className="rounded-full border border-[#e9dfcf] bg-[#fffdf9] p-3 text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {dark ? <FaSun /> : <FaMoon />}
              </button> */}
              <button onClick={() => setCartOpen((prev) => !prev)} className="relative rounded-full border border-[#e9dfcf] bg-[#fffdf9] p-3 text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <FaShoppingBag />
                {itemCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-orange-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">{itemCount}</span>}
              </button>
              {user ? (
                <>
                  <NavLink to="/profile" className="rounded-full border border-[#e9dfcf] bg-[#fffdf9] px-4 py-2 text-sm font-medium text-orange-600">{user.name}</NavLink>
                  <button onClick={logout} className="rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white">Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/login" state={{ from: location }} className="rounded-full border border-[#e9dfcf] bg-[#fffdf9] px-4 py-2 text-sm font-medium text-orange-600">Login</NavLink>
                  <NavLink to="/register" state={{ from: location }} className="rounded-full bg-orange-600 px-4 py-2 text-sm font-medium text-white">Register</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
        <nav id="mobile-menu" aria-hidden={!menuOpen} className={`absolute inset-x-4 top-full z-50 mt-2 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `relative block py-2 text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>



          {!user && (
            <div className="mt-4 overflow-hidden rounded-3xl bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ring-1 ring-orange-100/70">
              <div className="mb-4 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />
              <div className="flex items-center justify-between gap-3">
                <div className="grid flex-1 grid-cols-2 gap-3">
                  <NavLink
                    to="/login"
                    state={{ from: location }}
                    onClick={() => setMenuOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-full bg-[#fffdf9] px-4 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    state={{ from: location }}
                    onClick={() => setMenuOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-full bg-[#fffdf9] px-4 text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
                  >
                    Register
                  </NavLink>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Outlet />
      </motion.main>

      <AnimatePresence>
        {cartOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/40">
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="ml-auto flex h-full w-full max-w-md flex-col border-l border-[#efe4d5] bg-[#fffaf2] p-6 shadow-[0_30px_70px_rgba(45,63,53,0.12)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Cart</p>
                  <h2 className="text-2xl font-semibold text-slate-900">Your order</h2>
                </div>
                <button onClick={() => setCartOpen(false)} className="rounded-full bg-slate-100 px-3 py-2 text-sm">Close</button>
              </div>
              <div className="mt-6 flex-1 space-y-3 overflow-y-auto">
                {items.length === 0 ? <p className="text-sm text-orange-600">Your cart is empty.</p> : items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-orange-600">{formatINR(item.price)}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-sm text-rose-600">Remove</button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="rounded-full bg-slate-100 px-2">−</button>
                        <span className="text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="rounded-full bg-slate-100 px-2">+</button>
                      </div>
                      <p className="font-semibold">{formatINR(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl  bg-[#fff8f3] border border-orange-600 p-4 text-slate-800 shadow-[0_20px_40px_rgba(45,63,53,0.14)]">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                <div className="mt-2 flex justify-between text-sm"><span>Delivery</span><span>{formatINR(deliveryFees)}</span></div>
                <div className="mt-2 flex justify-between text-sm"><span>Tax</span><span>{formatINR(tax)}</span></div>
                <div className="mt-3 flex justify-between border-t border-orange-600 pt-3 text-base font-semibold"><span>Total</span><span>{formatINR(total)}</span></div>
                <NavLink to="/checkout" onClick={() => setCartOpen(false)} className="mt-4 block rounded-full bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white">Continue to checkout</NavLink>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-slate-700 bg-slate-900 text-slate-300 dark:border-slate-800">
        {/* Newsletter strip */}
        <div className="border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold text-white">Stay in the loop</h4>
                <p className="mt-1 text-sm text-slate-400">Subscribe for exclusive offers, new menu drops, and event invites.</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
                <input name="footerEmail" type="email" placeholder="your@email.com" className="flex-1 rounded-full border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition" />
                <button type="submit" className="rounded-full bg-orange-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 hover:-translate-y-0.5 active:translate-y-0 shrink-0">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-full bg-orange-100 text-orange-600 px-2.5 py-1.5 text-xl">🍽</span>
                <span className="text-2xl font-bold text-white">Eat<span className="text-orange-500">Rest</span></span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">Modern comfort food crafted with fresh, locally-sourced ingredients. Every bite is a celebration of flavour.</p>
              <div className="mt-5 flex gap-2">
                {[
                  { icon: <FaInstagram />, href: 'https://instagram.com/eatrest', color: 'hover:bg-pink-600' },
                  { icon: <FaFacebookF />, href: 'https://facebook.com/eatrest', color: 'hover:bg-blue-600' },
                  { icon: <FaTwitter />, href: 'https://twitter.com/eatrest', color: 'hover:bg-sky-500' },
                  { icon: <FaYoutube />, href: 'https://youtube.com', color: 'hover:bg-red-600' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 transition hover:text-white ${s.color} hover:border-transparent hover:-translate-y-0.5`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/menu', label: 'Menu' },
                  { to: '/about', label: 'About Us' },
                  { to: '/orders', label: 'Order History' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/checkout', label: 'Checkout' },
                ].map((link) => (
                  <li key={link.to}>
                    <NavLink to={link.to} className="text-sm text-slate-400 transition hover:text-orange-400 hover:pl-1">
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <FaMapMarkerAlt className="text-orange-500 mt-0.5 shrink-0" />
                  <span>Whitefield, Bangalore, <br /> Karnataka 560066</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FaPhoneAlt className="text-orange-500 shrink-0" />
                  <a href="tel:+15551234567" className="hover:text-orange-400 transition">+1 (555) 123-4567</a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <FaEnvelope className="text-orange-500 shrink-0" />
                  <a href="mailto:hello@eatrest.com" className="hover:text-orange-400 transition">hello@eatrest.com</a>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Opening Hours</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-slate-400">Monday – Friday</span><span className="text-white font-medium">11am – 10pm</span></li>
                <li className="flex justify-between"><span className="text-slate-400">Saturday</span><span className="text-white font-medium">10am – 11pm</span></li>
                <li className="flex justify-between"><span className="text-slate-400">Sunday</span><span className="text-white font-medium">10am – 11pm</span></li>
              </ul>
              <div className="mt-4 rounded-xl bg-slate-800 border border-slate-700 p-3 text-center">
                <p className="text-xs text-slate-400">Accepting reservations</p>
                <NavLink to="/?book=table" className="mt-1 inline-block text-sm font-semibold text-orange-400 hover:text-orange-300 transition">Book a Table →</NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} EatRest. All rights reserved. </p>
            <div className="flex items-center gap-5">
              <NavLink to="/privacy" className="text-xs text-slate-500 hover:text-slate-300 transition">Privacy Policy</NavLink>
              <NavLink to="/terms" className="text-xs text-slate-500 hover:text-slate-300 transition">Terms of Service</NavLink>
              <NavLink to="/cookies" className="text-xs text-slate-500 hover:text-slate-300 transition">Cookies</NavLink>
              {/* <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 transition"
                title="Back to top"
              >
                <FaArrowUp className="text-xs" />
              </button> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
