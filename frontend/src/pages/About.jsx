import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── Data ────────────────────────────────────────────────────────────────────

const team = [
  {
    name: 'Ava Chen',
    role: 'Head Chef',
    bio: '15 years crafting Michelin-star quality meals with a soulful touch.',
    emoji: '👩‍🍳',
    color: 'from-rose-100 to-orange-50',
  },
  {
    name: 'Noah Patel',
    role: 'Operations Lead',
    bio: 'Ensures every visit runs like clockwork — seamless, warm, unforgettable.',
    emoji: '🧑‍💼',
    color: 'from-sky-100 to-indigo-50',
  },
  {
    name: 'Sophia Brooks',
    role: 'Guest Experience',
    bio: 'Dedicated to turning first-time guests into lifelong regulars.',
    emoji: '🌟',
    color: 'from-emerald-100 to-teal-50',
  },
  {
    name: 'Luca Romano',
    role: 'Pastry Chef',
    bio: 'European-trained maestro behind our award-winning dessert menu.',
    emoji: '🍰',
    color: 'from-purple-100 to-pink-50',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    city: 'New York',
    stars: 5,
    text: 'Hands down the best dining experience I\'ve had in years. The ambiance, the food, the service — every single detail was perfect. I brought my parents here for their anniversary and they haven\'t stopped talking about it!',
    dish: 'Margherita Pizza & Tiramisu',
    avatar: '👩',
  },
  {
    name: 'James K.',
    city: 'Chicago',
    stars: 5,
    text: 'The Grilled Salmon melted in my mouth. The chef clearly cares deeply about quality. We came on a Tuesday night expecting a quiet dinner, but the energy was absolutely electric. Will 100% be back.',
    dish: 'Grilled Salmon',
    avatar: '🧔',
  },
  {
    name: 'Priya R.',
    city: 'San Francisco',
    stars: 5,
    text: 'Cozy, stylish, and the food is to die for. The staff remembered my daughter\'s nut allergy from our last visit without me even mentioning it. That level of care is rare and incredibly appreciated.',
    dish: 'Caesar Salad & Lava Cake',
    avatar: '👩🏽',
  },
  {
    name: 'Marco D.',
    city: 'Miami',
    stars: 5,
    text: 'I am Italian and I am picky about pasta. EatRest\'s Arrabbiata is the real deal — al dente, perfectly spiced, and generous in portion. The wine list is impressive too. Bravo!',
    dish: 'Penne Arrabbiata',
    avatar: '🧑‍🦱',
  },
  {
    name: 'Amelia T.',
    city: 'Austin',
    stars: 5,
    text: 'We hosted a team dinner here for 12 people. Flawless coordination, beautiful private corner, and the food came out hot and on time for everyone. The BBQ Chicken Burger had our entire table buzzing.',
    dish: 'BBQ Chicken Burger',
    avatar: '👱‍♀️',
  },
];

const whyVisit = [
  {
    icon: '🌿',
    title: 'Farm-to-Table Freshness',
    desc: 'Every ingredient is sourced daily from local farms within 50 miles. No freezer burn, no shortcuts — just vibrant, seasonal flavour.',
  },
  {
    icon: '🏆',
    title: 'Award-Winning Kitchen',
    desc: 'Named "Best Neighbourhood Restaurant" three years running by City Food Awards. Our chefs have trained in Paris, Tokyo, and New York.',
  },
  {
    icon: '♻️',
    title: 'Sustainable & Ethical',
    desc: 'Zero single-use plastics, compostable packaging, and a commitment to reducing food waste by 80% through smart portion planning.',
  },
  {
    icon: '🎉',
    title: 'Perfect for Every Occasion',
    desc: 'From intimate date nights to large group celebrations — our flexible spaces and attentive team make every visit extraordinary.',
  },
  {
    icon: '🧑‍🍳',
    title: 'Chef\'s Table Experience',
    desc: 'Book our exclusive Chef\'s Table and watch Ava create a personalised 6-course tasting menu right in front of you.',
  },
  {
    icon: '📱',
    title: 'Easy Online Ordering',
    desc: 'Can\'t visit? Enjoy our full menu delivered to your door — same kitchen quality, same love, right to your table at home.',
  },
];

const timeline = [
  { year: '2015', title: 'Born from a Dream', desc: 'Ava Chen quit her corporate career to open a 20-seat bistro with a borrowed oven and a heart full of passion.' },
  { year: '2017', title: 'First Award', desc: 'Recognised as "Best New Restaurant" — the validation that pushed us to expand our kitchen and team.' },
  { year: '2019', title: 'The Big Move', desc: 'Moved to our current space with a full bar, open kitchen, and a dining room that seats 80 in style.' },
  { year: '2022', title: 'Going Digital', desc: 'Launched online ordering and delivery, bringing the EatRest experience straight to your home.' },
  { year: '2024', title: 'Community Kitchen', desc: 'Started our weekly community meal programme — every Friday, 50 free meals for neighbours in need.' },
];

const stats = [
  { label: 'Happy Guests', value: 12000, suffix: '+' },
  { label: 'Menu Items', value: 35, suffix: '+' },
  { label: 'Years of Excellence', value: 3, suffix: '' },
  { label: 'Awards Won', value: 5, suffix: '' },
];

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, value);
      setCount(Math.floor(current));
      if (current >= value) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Star rating ─────────────────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'text-amber-400' : 'text-slate-200'}>★</span>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function About() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [autoplay]);

  const goTo = (i) => { setActiveTestimonial(i); setAutoplay(false); };

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24 ">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden" animate="visible" variants={fadeUp}
        className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 sm:px-16 text-orange-600 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800"
      >
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-12 w-64 h-64 rounded-full bg-white/5" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Our Story</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Where Every Meal<br />Becomes a Memory
            </h1>
            <p className="mt-5 text-lg text-white leading-relaxed max-w-lg">
              EatRest was born from a simple belief — that great food shared with great company is one of life's greatest joys. We've spent nearly a decade perfecting that experience for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/menu" className="inline-block rounded-full bg-orange-600 text-white px-6 py-2.5 text-sm font-semibold transition hover:bg-rose-50 hover:text-slate-600 hover:-translate-y-0.5 shadow">
                Explore Our Menu →
              </Link>
              <a href="#visit" className="inline-block rounded-full border border-white px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-orange-600">
                Find Us
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 backdrop-blur p-5 text-center border border-white/20">
                <p className="text-2xl font-semibold">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── WHY VISIT ────────────────────────────────────────────────────── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Reasons to Visit</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            Why Guests <span className="text-orange-600">Love</span> EatRest
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto leading-relaxed">
            Six things that make us the restaurant worth the drive, the wait, and the return trip.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyVisit.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(206,18,18,0.08)' }}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-2xl mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── OUR STORY TIMELINE ───────────────────────────────────────────── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Our Journey</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            A Decade in the <span className="text-orange-600">Making</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-600 hidden sm:block" />

          <div className="space-y-8">
            {timeline.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start sm:pl-16 relative"
              >
                {/* Dot */}
                <div className="hidden sm:flex absolute left-0 w-12 h-12 rounded-full bg-slate-900 text-white text-xs font-extrabold items-center justify-center shadow-lg flex-shrink-0">
                  {event.year.slice(2)}
                </div>
                <div className="flex-1 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="rounded-full bg-[#fff8f3] text-orange-600 text-xs font-bold px-3 py-1">{event.year}</span>
                    <h3 className="text-lg font-bold text-slate-800">{event.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Guest Reviews</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            What Our Guests <span className="text-orange-600">Say</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-md mx-auto">Don't take our word for it — here's what real guests say after their visit.</p>
        </div>

        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 relative overflow-hidden">
          {/* Decorative quote mark */}
          <div className="absolute top-6 left-8 text-8xl text-white/5 font-serif select-none leading-none">"</div>

          {/* Testimonial card */}
          <div className="relative min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="flex justify-center mb-4">
                  <Stars count={testimonials[activeTestimonial].stars} />
                </div>
                <p className="text-lg sm:text-xl text-white leading-relaxed italic font-light">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-xl">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-sm">{testimonials[activeTestimonial].name}</p>
                    <p className="text-slate-400 text-xs">{testimonials[activeTestimonial].city} · Ordered: {testimonials[activeTestimonial].dish}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-300 rounded-full ${i === activeTestimonial ? 'w-6 h-2 bg-[#ce1212]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <button
              onClick={() => goTo((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
              className="pointer-events-auto w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition text-sm"
            >
              ‹
            </button>
            <button
              onClick={() => goTo((activeTestimonial + 1) % testimonials.length)}
              className="pointer-events-auto w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition text-sm"
            >
              ›
            </button>
          </div>
        </div>

        {/* Mini testimonial grid below */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-2xl border text-left p-4 transition-all ${i === activeTestimonial
                ? 'border-[#ce1212] bg-rose-50 shadow-md'
                : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
            >
              <Stars count={t.stars} />
              <p className="mt-2 text-xs text-slate-600 line-clamp-2 italic">"{t.text}"</p>
              <p className="mt-2 text-xs font-bold text-slate-700">{t.name} · {t.city}</p>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ── TEAM ─────────────────────────────────────────────────────────── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">The People Behind the Food</p>
          <h2 className="mt-2 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            Meet Our <span className="text-orange-600">Team</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`rounded-3xl bg-gradient-to-br ${person.color} border border-slate-100 p-6 text-center shadow-sm transition-shadow hover:shadow-md`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-white shadow-md flex items-center justify-center text-3xl mb-4">
                {person.emoji}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{person.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 mt-1">{person.role}</p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{person.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── AWARDS ───────────────────────────────────────────────────────── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="rounded-[2rem] border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-8 sm:p-12">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-600 font-bold">Recognition</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              Award-Winning Dining
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { award: '🏆 Best Neighbourhood Restaurant', year: '2022 · City Food Awards' },
              { award: '🌿 Green Kitchen Certified', year: '2023 · Sustainable Eats' },
              { award: '⭐ Top-Rated on TripAdvisor', year: '4.9 / 5 · 2,400 reviews' },
              { award: '👨‍🍳 Chef of the Year Finalist', year: '2024 · National Gastronomy Guild' },
            ].map((a) => (
              <div key={a.award} className="rounded-2xl bg-white border border-amber-100 p-5 shadow-sm text-center">
                <p className="text-base font-bold text-slate-800">{a.award}</p>
                <p className="mt-1.5 text-xs text-amber-600 font-semibold">{a.year}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── VISIT US CTA ─────────────────────────────────────────────────── */}
      <motion.section
        id="visit"
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        // className="rounded-[2.5rem] border border-slate-200 bg-slate-100 px-8 py-14 sm:px-14 text-orange-600 text-center shadow-2xl relative overflow-hidden"
        className="text-center rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -left-8 w-44 h-44 rounded-full bg-white/5" />

        <div className="relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-orange-600 font-bold">Come Find Us</p>
          <h2 className="mt-3 text-4xl font-extrabold" style={{ fontFamily: 'Georgia, serif' }}>
            Reserve Your Table Today
          </h2>
          <p className="mt-4 text-white max-w-xl mx-auto leading-relaxed">
            Walk-ins welcome, but reservations guarantee you the best seat in the house. We'd love to welcome you.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto text-sm">
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/20">
              <p className="text-lg">📍</p>
              <p className="font-bold mt-1">Find Us</p>
              <p className="text-white text-xs mt-1">42 Flavour Street,<br />Downtown District</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/20">
              <p className="text-lg">🕐</p>
              <p className="font-bold mt-1">Opening Hours</p>
              <p className="text-white text-xs mt-1">Mon–Fri: 11am – 10pm<br />Sat–Sun: 10am – 11pm</p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/20">
              <p className="text-lg text-black">📞</p>
              <p className="font-bold mt-1">Reservations</p>
              <p className="text-white text-xs mt-1">+1 (555) 123-4567<br />or book online</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/menu"
              className="rounded-full bg-white text-sm font-semibold text-slate-600 px-8 py-3 transition hover:bg-orange-50 hover:text-orange-600 hover:-translate-y-0.5 shadow-lg"
            >
              Order Online Now
            </Link>
            <a
              href="tel:+15551234567"
              className="rounded-full bg-orange-600 px-8 py-3 text-sm font-semibold  text-white transition hover:bg-orange-50  hover:text-orange-600 hover:-translate-y-0.5 shadow-lg"
            >
              Call to Reserve
            </a>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
