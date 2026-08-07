import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const faqs = [
  { q: 'Do you offer vegetarian and vegan options?', a: 'Absolutely! Over 40% of our menu is plant-based. Look for the green dot on each dish for vegetarian options. Ask your server about vegan adaptations — our kitchen is happy to accommodate.' },
  { q: 'Can I book a private event or party?', a: 'Yes! We cater private events for 10–80 guests with custom menus, dedicated staff, and themed decor. Contact us at least 2 weeks in advance for bookings.' },
  { q: 'Do you deliver? What\'s the delivery radius?', a: 'We deliver within a 10-mile radius via our own drivers and partner apps. Orders above ₹30 get free delivery. Average delivery time is 25–35 minutes.' },
  { q: 'What are your COVID-19 safety measures?', a: 'All staff are vaccinated, surfaces are sanitised every 30 minutes, and we maintain proper ventilation. We also offer contactless pickup and delivery.' },
  { q: 'Can I modify or cancel my order after placing it?', a: 'You can modify or cancel within 5 minutes of placing your order through the app. After that, contact us immediately and we\'ll do our best to help.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    toast.success('✉️ Message sent! We\'ll get back to you within 24 hours.', { duration: 5000 });
  };

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-20">

      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Get In Touch</p>
        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
          Contact <span className="text-orange-600">Us</span>
        </h1>
        <p className="mt-3 text-slate-500 max-w-lg mx-auto leading-relaxed">
          Questions, feedback, or just want to say hello? We'd love to hear from you. Our team responds within 24 hours.
        </p>
      </motion.div>

      {/* ── INFO CARDS ──────────────────────────────────────────────────── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <FaMapMarkerAlt />, title: 'Visit Us', line1: 'Whitefield, Bangalore,', line2: 'Karnataka 560066', color: 'bg-orange-50 text-orange-600' },
            { icon: <FaPhoneAlt />, title: 'Call Us', line1: '+1 (555) 123-4567', line2: 'Mon–Sun, 10am–10pm', color: 'bg-sky-50 text-sky-600' },
            { icon: <FaEnvelope />, title: 'Email Us', line1: 'hello@eatrest.com', line2: 'We reply within 24 hours', color: 'bg-emerald-50 text-emerald-600' },
            { icon: <FaClock />, title: 'Opening Hours', line1: 'Mon–Fri: 11am – 10pm', line2: 'Sat–Sun: 10am – 11pm', color: 'bg-purple-50 text-purple-600' },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm text-center transition-shadow hover:shadow-md"
            >
              <div className={`w-12 h-12 mx-auto rounded-2xl ${card.color} flex items-center justify-center text-lg mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-slate-800">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600 font-medium">{card.line1}</p>
              <p className="text-xs text-slate-400">{card.line2}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── FORM + MAP ──────────────────────────────────────────────────── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">

          {/* Contact form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Send Us a Message</h2>
            <p className="text-sm text-slate-500 mb-6">Fill in the form and we'll get back to you.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone <span className="text-slate-400">(optional)</span></label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+1 555 000 0000"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Enquiry</option>
                    <option value="reservation">Reservation</option>
                    <option value="feedback">Feedback</option>
                    <option value="catering">Catering & Events</option>
                    <option value="complaint">Complaint</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell us what's on your mind…"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-orange-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-orange-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaPaperPlane className="text-xs" />
                {submitting ? 'Sending…' : 'Send Message'}
              </button>

              <p className="text-center text-xs text-slate-400">We never share your information with third parties.</p>
            </form>
          </div>

          {/* Map + social */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-50 h-[320px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-3xl mb-3">📍</div>
                  <p className="text-lg font-bold text-slate-800">Whitefield, Bangalore</p>
                  <p className="text-sm text-slate-500">Karnataka 560066</p>
                  <a
                    href="https://maps.app.goo.gl/DZRAUq3HSou6fweN6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block rounded-full bg-orange-600 px-5 py-2 text-xs font-bold text-white hover:bg-orange-700 transition"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Decorative dots grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: <FaInstagram />, label: 'Instagram', color: 'bg-pink-50 text-pink-600 hover:bg-pink-100', handle: '@eatrest' },
                  { icon: <FaFacebookF />, label: 'Facebook', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100', handle: '/eatrest' },
                  { icon: <FaTwitter />, label: 'Twitter', color: 'bg-sky-50 text-sky-500 hover:bg-sky-100', handle: '@eatrest' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    className={`flex-1 rounded-2xl ${s.color} p-4 text-center transition`}
                  >
                    <div className="text-xl mb-1 flex justify-center">{s.icon}</div>
                    <p className="text-xs font-bold">{s.label}</p>
                    <p className="text-[10px] opacity-70">{s.handle}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick contact CTA */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
              <h3 className="text-lg font-bold">Need Immediate Help?</h3>
              <p className="mt-1 text-sm text-slate-300">Call us directly for urgent enquiries or last-minute reservations.</p>
              <a
                href="tel:+15551234567"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-500 transition"
              >
                <FaPhoneAlt className="text-xs" />
                +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Help Center</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
            Frequently Asked <span className="text-orange-600">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => {
            const open = expandedFaq === i;
            return (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(open ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <h3 className="text-sm font-bold text-slate-800 pr-4">{faq.q}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.section>

    </div>
  );
}

