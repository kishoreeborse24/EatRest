import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Legal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          Welcome to EatRest. By using this site and placing orders, you agree to our terms and conditions. Our goal is to provide a smooth dining experience online and in person.
        </p>
        <div className="mt-10 space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Ordering</h2>
            <p className="mt-3 text-sm leading-relaxed">When you place an order through our website, you agree to provide accurate information and accept the applicable menu prices, taxes, and delivery fees.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Cancellations</h2>
            <p className="mt-3 text-sm leading-relaxed">Orders can be cancelled before preparation begins. If your order is already in progress, we may not be able to cancel it immediately.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Liability</h2>
            <p className="mt-3 text-sm leading-relaxed">EatRest is not responsible for third-party delivery service delays or issues outside our control. We will work with you to resolve any problems promptly.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
