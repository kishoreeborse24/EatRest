import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">Legal</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
          At EatRest, we respect your privacy and are committed to protecting your personal information. We only collect the details we need to process orders, improve service, and deliver special offers.
        </p>
        <div className="mt-10 space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Information We Collect</h2>
            <p className="mt-3 text-sm leading-relaxed">We gather contact details, order history, and preferences when you place an order, create an account, or subscribe to our newsletter.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-900">How We Use Your Data</h2>
            <p className="mt-3 text-sm leading-relaxed">We use data to complete your orders, personalize recommendations, and send occasional updates about offers and events. We never sell your information to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-slate-900">Security</h2>
            <p className="mt-3 text-sm leading-relaxed">We keep your information secure using industry-standard measures and review our practices regularly.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
