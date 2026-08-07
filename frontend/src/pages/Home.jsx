import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FaArrowRight,
  FaCheck,
  FaPlay,
  FaStar,
  FaMotorcycle,
} from "react-icons/fa";

// Import Images
import mainDish from "../assets/main-dish.png";
import img1 from "../assets/Rainbow Veggie Bowl.png";
import img2 from "../assets/Creamy Mushroom Soup.png";
import img3 from "../assets/Golden Pumpkin Soup.png";
import img4 from "../assets/Creamy Harvest Bowl.png";
import img5 from "../assets/Harvest Garden Bowl.png";
// slider images removed (floating items currently disabled)

// Floating dishes metadata for decorative visuals, named by image content and sorted with veg dishes first.
const dishes = [
  { id: 2, name: 'Garlic Mushroom Soup', image: img2, angle: 35, veg: true },
  { id: 3, name: 'Butternut Squash Soup', image: img3, angle: 120, veg: true },
  { id: 4, name: 'Pumpkin Spice Soup', image: img4, angle: -120, veg: true },
  { id: 5, name: 'Creamy Harvest Bowl', image: img5, angle: 180, veg: true },
  { id: 1, name: 'Harvest Garden Bowl', image: img1, angle: -40, veg: false },
];

const TIMES = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];

export default function Hero() {
  const [copiedCode, setCopiedCode] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState({ name: '', phone: '', date: '', time: '', guests: '2', note: '' });
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const copyPromoCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`${code} copied! Paste it at checkout.`);
      window.setTimeout(() => setCopiedCode(''), 2000);
    } catch {
      toast.error('Unable to copy code');
    }
  }

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!booking.name.trim() || !booking.phone.trim() || !booking.date || !booking.time) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setShowBooking(false);
    setBooking({ name: '', phone: '', date: '', time: '', guests: '2', note: '' });
    toast.success(`🎉 Table booked for ${booking.guests} on ${booking.date} at ${booking.time}! We'll call ${booking.phone} to confirm.`, { duration: 5000 });
  };

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('book') === 'table') {
      setShowBooking(true);
    }
  }, [location.search]);

  return (
    // <section className="relative min-h-screen bg-[#fff8f3]">
    <section className="relative min-h-[55vh] lg:min-h-screen bg-[#fff8f3]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 -top-40 h-[550px] w-[550px] rounded-full bg-orange-200/40 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-yellow-100 blur-[120px]" />
      </div>

      {/* <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:gap-16 lg:pt-3"> */}
<div className="relative mx-auto grid max-w-7xl items-center gap-2 px-6 pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:gap-16 lg:pt-0">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          {/* <span className="rounded-full bg-orange-100 px-5 py-1 font-semibold text-orange-600">
            🍽 Fresh Food Everyday
          </span> */}

          <h1 className="hero-heading mt-5 text-3xl font-black leading-tight text-slate-700 sm:text-4xl md:text-5xl lg:text-7xl">
            Every <span className="text-orange-600">Bite </span> 
            <br className="block sm:hidden" />
            is a Celebration of <span className="text-orange-600">Flavour</span>
          </h1>

          <p className="mt-5 max-w-full text-base leading-7 text-slate-600 sm:max-w-xl sm:text-lg sm:leading-8">
            Discover handcrafted dishes prepared using premium ingredients.
            Fresh flavours, fast delivery and unforgettable dining experiences.
          </p>

          {/* <div className="mt-8 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"> */}
          <div className="mt-8 w-full">
            {/* <Link to="/menu" className="block w-screen max-w-none rounded-3xl border border-orange-100 bg-orange-50 p-5 text-slate-700 shadow-sm transition hover:-translate-y-0.5 lg:w-full"> */}
            <Link
              to="/menu"
            // className="w-full rounded-3xl border border-orange-100 bg-orange-900 p-5 text-slate-700 shadow-sm transition hover:-translate-y-0.5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Special Offers</p>
              {/* <div className="mt-3 grid gap-3 lg:grid-cols-2"> */}
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm flex h-full min-h-[100px] flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold">Use code SAVE10</p>
                    <p className="mt-1 text-sm text-slate-600">Get 10% off any order.</p>
                  </div>
                  <div className="mt-4 flex justify-start">
                    <button type="button" onClick={(e) => { e.stopPropagation(); copyPromoCode('SAVE10'); }} className={`rounded-full px-3 py-2 text-[11px] font-semibold text-white transition ${copiedCode === 'SAVE10' ? 'bg-orange-600 hover:bg-orange-600' : 'bg-slate-700 hover:bg-orange-600'}`}>
                      {copiedCode === 'SAVE10' ? (<><FaCheck className="mr-1 inline" /> Copied</>) : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <div className="grid gap-3">
                    <div>
                      <p className="text-sm font-semibold">Birthday or Anniversary?</p>
                      <p className="mt-2 text-sm text-slate-600">Get a free treat on your special day.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={(e) => { e.stopPropagation(); copyPromoCode('BIRTHDAY'); }} className={`rounded-full px-3 py-2 text-[11px] font-semibold text-white transition ${copiedCode === 'BIRTHDAY' ? 'bg-orange-600 hover:bg-emerald-600' : 'bg-slate-700 hover:bg-orange-600'}`}>{copiedCode === 'BIRTHDAY' ? 'Copied' : 'Copy BIRTHDAY'}</button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); copyPromoCode('ANNIVERSARY'); }} className={`rounded-full px-3 py-2 text-[11px] font-semibold text-white transition ${copiedCode === 'ANNIVERSARY' ? 'bg-orange-600 hover:bg-emerald-600' : 'bg-slate-700 hover:bg-orange-600'}`}>{copiedCode === 'ANNIVERSARY' ? 'Copied' : 'Copy ANNIVERSARY'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* <p className="mt-3 max-w-xl text-sm text-slate-500">Tip: click the offer card to go to the menu, then paste the promo code at checkout.</p> */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/menu" className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-orange-200 bg-white/20 px-6 py-4 text-center font-semibold text-slate-800 shadow-[0_25px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:bg-white/30 sm:w-auto">
              Order Now
              <FaArrowRight className="text-orange-600"/>
            </Link>

            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-orange-200 bg-white/20 px-6 py-4 text-center font-semibold text-slate-800 shadow-[0_25px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:bg-white/30 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
            >
              <FaPlay className="text-orange-600" />
              Book a Table
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}

        <div className="relative flex min-h-[150px] mt-25 items-start justify-center self-start lg:mt-0 lg:order-2 lg:justify-end lg:min-h-[520px]">
          {/* Main Dish */}

          <motion.img
            src={mainDish}
            alt="Main Dish"
            className="absolute left-1/2 top-[32%] sm:top-[25%] md:top-[40%] lg:top-[55%] -translate-x-1/2 -translate-y-1/2 z-10 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[420px] drop-shadow-[0_40px_60px_rgba(0,0,0,.25)]"
            // className="absolute left-1/2 top-5/12 max-w-[100%] -translate-x-1/2 -translate-y-1/2 z-10 w-[220px] sm:w-[280px] md:w-[340px] lg:w-[420px] drop-shadow-[0_40px_60px_rgba(0,0,0,.25)]"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* <div className="mt-[320px] w-full px-4 pb-1 sm:mt-[360px] md:mt-[380px] lg:mt-[400px] lg:px-0"> */}
          {/* <div className="mt-[180px] w-full px-4 pb-1 sm:mt-[240px] md:mt-[300px] lg:mt-[400px] lg:px-0">
            <div className="grid gap-5 md:grid-cols-2 md:justify-items-center xl:gap-7">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="flex flex-col items-center gap-2 rounded-3xl bg-white py-4 px-5 shadow-2xl w-full max-w-[320px] mx-auto md:mx-0"
              >
                <div className="flex gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-semibold md:text-lg">4.9 Customer Rating</h3>
                  <p className="text-[11px] md:text-sm text-gray-500">Loved by thousands</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="flex items-center gap-4 rounded-3xl mt-3 bg-white py-5 px-5 shadow-2xl w-full max-w-[320px] mx-auto md:mx-0"
              >
                <div className="rounded-full bg-green-100 p-2 w-12 h-12 flex items-center justify-center">
                  <FaMotorcycle className="text-green-700 text-lg md:text-xl" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-gray-500 md:text-sm">Delivery Time</p>
                  <h3 className="text-base font-semibold md:text-lg">25 Minutes</h3>
                </div>
              </motion.div>
            </div>
          </div>       */}
        </div>
      </div>

      {/* ── BOOK A TABLE MODAL ──────────────────────────── */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowBooking(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="relative w-full max-w-lg rounded-[2rem] bg-white shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#ce1212] to-[#8b0000] px-8 py-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-200">Reserve Your Spot</p>
                    <h2 className="mt-1 text-2xl font-extrabold" style={{ fontFamily: 'Georgia, serif' }}>Book a Table</h2>
                    <p className="mt-1 text-sm text-rose-100">We'll call to confirm within 15 minutes.</p>
                  </div>
                  <button
                    onClick={() => setShowBooking(false)}
                    className="ml-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleBooking} className="px-8 py-6 space-y-4">

                {/* Name + Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name <span className="text-rose-500">*</span></label>
                    <input
                      required
                      value={booking.name}
                      onChange={(e) => setBooking((b) => ({ ...b, name: e.target.value }))}
                      placeholder="Jane Smith"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#ce1212] focus:ring-2 focus:ring-rose-100 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Phone <span className="text-rose-500">*</span></label>
                    <input
                      required
                      type="tel"
                      value={booking.phone}
                      onChange={(e) => setBooking((b) => ({ ...b, phone: e.target.value }))}
                      placeholder="+1 555 000 0000"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#ce1212] focus:ring-2 focus:ring-rose-100 transition"
                    />
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Date <span className="text-rose-500">*</span></label>
                    <input
                      required
                      type="date"
                      min={today}
                      value={booking.date}
                      onChange={(e) => setBooking((b) => ({ ...b, date: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#ce1212] focus:ring-2 focus:ring-rose-100 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Time <span className="text-rose-500">*</span></label>
                    <select
                      required
                      value={booking.time}
                      onChange={(e) => setBooking((b) => ({ ...b, time: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#ce1212] focus:ring-2 focus:ring-rose-100 transition bg-white"
                    >
                      <option value="">Select time</option>
                      {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">Party Size</label>
                  <div className="flex flex-wrap gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setBooking((b) => ({ ...b, guests: n }))}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition ${booking.guests === n
                          ? 'bg-[#ce1212] border-[#ce1212] text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400'
                          }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special requests */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Special Requests <span className="text-slate-400">(optional)</span></label>
                  <textarea
                    rows={2}
                    value={booking.note}
                    onChange={(e) => setBooking((b) => ({ ...b, note: e.target.value }))}
                    placeholder="Allergies, birthday setup, high chair needed…"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-[#ce1212] focus:ring-2 focus:ring-rose-100 transition resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-[#ce1212] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#a00e0e] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Booking your table…' : 'Confirm Reservation'}
                </button>

                <p className="text-center text-xs text-slate-400">No payment required · Free cancellation up to 1 hour before</p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}