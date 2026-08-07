import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

// ─── Demo orders (shown when API is offline) ────────────────────────────────
const DEMO_ORDERS = [
  {
    id: 'ORD-2847',
    date: '2026-07-28 · 7:30 PM',
    status: 'Delivered',
    total: 34.97,
    items: [
      { name: 'Margherita Pizza', qty: 1, price: 12.99 },
      { name: 'Caesar Salad', qty: 1, price: 8.49 },
      { name: 'Chocolate Lava Cake', qty: 2, price: 6.99 },
    ],
    address: '42 Elm Street, Apt 3B',
    payment: 'Visa •••• 4291',
    steps: ['Order placed', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered'],
    currentStep: 4,
  },
  {
    id: 'ORD-2903',
    date: '2026-07-30 · 12:15 PM',
    status: 'Preparing',
    total: 19.48,
    items: [
      { name: 'BBQ Chicken Burger', qty: 2, price: 9.49 },
      { name: 'Iced Lemonade', qty: 1, price: 0.00 },
    ],
    address: '18 Oak Avenue',
    payment: 'Apple Pay',
    steps: ['Order placed', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered'],
    currentStep: 2,
  },
  {
    id: 'ORD-2910',
    date: '2026-07-30 · 3:45 PM',
    status: 'Confirmed',
    total: 28.98,
    items: [
      { name: 'Grilled Salmon', qty: 1, price: 17.99 },
      { name: 'Penne Arrabbiata', qty: 1, price: 10.99 },
    ],
    address: '7 Maple Lane',
    payment: 'Cash on delivery',
    steps: ['Order placed', 'Confirmed', 'Preparing', 'Out for delivery', 'Delivered'],
    currentStep: 1,
  },
];

const statusColors = {
  'Delivered': 'bg-emerald-100 text-emerald-700',
  'Preparing': 'bg-amber-100 text-amber-700',
  'Confirmed': 'bg-sky-100 text-sky-700',
  'Out for delivery': 'bg-purple-100 text-purple-700',
  'Cancelled': 'bg-rose-100 text-rose-700',
};

export default function Orders() {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [currency, setCurrency] = useState('INR');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatPrice = (value) => formatCurrency(value, currency);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/orders');
        const list = Array.isArray(data?.orders) ? data.orders : [];
        if (list.length > 0) setOrders(list);
        setCurrency(data.currency || 'INR');
      } catch {
        // Keep demo orders
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const reorder = (order) => {
    toast.success(`🛒 ${order.items.length} item(s) from ${order.id} added to cart!`, { duration: 3000 });
  };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-slate-400 font-bold">My Account</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900" style={{ fontFamily: 'Georgia, serif' }}>
              Order <span className="text-orange-600">History</span>
            </h1>
            <p className="mt-2 text-slate-500">Track your recent and past orders.</p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 hover:-translate-y-0.5 shadow"
          >
            + New Order
          </Link>
        </div>

        {/* Orders list */}
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Loading your orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center">
            <p className="text-5xl mb-4">🍽</p>
            <h3 className="text-xl font-bold text-slate-800">No orders yet</h3>
            <p className="mt-2 text-slate-500">Ready to try something delicious?</p>
            <Link
              to="/menu"
              className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const expanded = expandedOrder === order.id;
              const color = statusColors[order.status] || 'bg-slate-100 text-slate-700';

              return (
                <motion.div
                  key={order.id}
                  layout
                  className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Summary row */}
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="w-full px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center text-xl flex-shrink-0">
                        {order.status === 'Delivered' ? '✅' : order.status === 'Preparing' ? '🍳' : order.status === 'Confirmed' ? '📋' : '🚗'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-slate-800">{order.id}</h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${color}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{order.date} · {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-lg font-extrabold text-slate-900">{formatPrice(order.total)}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-slate-100 pt-4">

                          {/* Progress tracker */}
                          {order.steps && (
                            <div className="mb-6">
                              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Order Progress</p>
                              <div className="flex items-center gap-1">
                                {order.steps.map((step, i) => (
                                  <div key={step} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center">
                                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                                        i <= order.currentStep
                                          ? 'bg-orange-600 text-white'
                                          : 'bg-slate-100 text-slate-400'
                                      }`}>
                                        {i <= order.currentStep ? '✓' : i + 1}
                                      </div>
                                      <p className={`mt-1.5 text-[10px] font-semibold text-center leading-tight max-w-[70px] ${
                                        i <= order.currentStep ? 'text-slate-700' : 'text-slate-400'
                                      }`}>
                                        {step}
                                      </p>
                                    </div>
                                    {i < order.steps.length - 1 && (
                                      <div className={`flex-1 h-0.5 mx-1 mt-[-18px] rounded ${
                                        i < order.currentStep ? 'bg-orange-600' : 'bg-slate-200'
                                      }`} />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Items table */}
                          <div className="rounded-2xl border border-slate-100 overflow-hidden">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <tr>
                                  <th className="px-4 py-2.5 text-left font-semibold">Item</th>
                                  <th className="px-4 py-2.5 text-center font-semibold">Qty</th>
                                  <th className="px-4 py-2.5 text-right font-semibold">Price</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {(order.items || []).map((item, i) => (
                                  <tr key={i} className="text-slate-700">
                                    <td className="px-4 py-3 font-medium">{item.name}</td>
                                    <td className="px-4 py-3 text-center text-slate-500">×{item.qty}</td>
                                    <td className="px-4 py-3 text-right font-semibold">{item.price > 0 ? formatPrice(item.price * item.qty) : 'Free'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Meta row */}
                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                            {order.address && (
                              <div className="rounded-xl bg-slate-50 p-3">
                                <p className="font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Address</p>
                                <p className="text-slate-700 font-medium">{order.address}</p>
                              </div>
                            )}
                            {order.payment && (
                              <div className="rounded-xl bg-slate-50 p-3">
                                <p className="font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Payment</p>
                                <p className="text-slate-700 font-medium">{order.payment}</p>
                              </div>
                            )}
                            <div className="rounded-xl bg-slate-50 p-3">
                              <p className="font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Total</p>
                              <p className="text-slate-900 font-extrabold text-base">{formatPrice(order.total)}</p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-5 flex flex-wrap gap-3">
                            <button
                              onClick={() => reorder(order)}
                              className="rounded-full bg-orange-600 px-5 py-2 text-xs font-bold text-white transition hover:bg-orange-700 hover:-translate-y-0.5"
                            >
                              🔄 Reorder
                            </button>
                            {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                              <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-400">
                                📞 Contact Support
                              </button>
                            )}
                            <button className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-400">
                              🧾 Receipt
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
