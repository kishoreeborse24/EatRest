import { motion } from 'framer-motion';

export default function Cookies() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Legal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900">Cookie Policy</h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          We use cookies to improve your experience, remember your preferences, and analyze site traffic. Most cookies are safe and help us make the site faster and more relevant.
        </p>
        <div className="mt-10 space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">What Are Cookies?</h2>
            <p className="mt-3 text-sm leading-relaxed">Cookies are small files stored on your device that help the site remember preferences, keep you logged in, and track usage for analytics.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-900">How We Use Them</h2>
            <p className="mt-3 text-sm leading-relaxed">We use cookies for session management, performance tracking, and to deliver a more personalised browsing experience.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Manage Cookies</h2>
            <p className="mt-3 text-sm leading-relaxed">You can manage cookie settings through your browser. Disabling cookies may affect site functionality.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
