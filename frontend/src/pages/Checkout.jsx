import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { formatINR } from '../utils/formatCurrency';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { FaCreditCard } from 'react-icons/fa';

const promoRules = {
  SAVE10: { code: 'SAVE10', title: '10% off', value: 0.10, min: 0 },
  EATREST20: { code: 'EATREST20', title: '20% off', value: 0.20, min: 4100 },
  BIRTHDAY: { code: 'BIRTHDAY', title: 'Birthday gift', value: 0.15, min: 0, gift: { name: 'Complimentary dessert', description: 'Birthday treat' } },
  ANNIVERSARY: { code: 'ANNIVERSARY', title: 'Anniversary gift', value: 0.20, min: 0, gift: { name: 'Complimentary appetizer', description: 'Anniversary treat' } }
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFees, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' });
  const [couponCode, setCouponCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');

  const appliedDiscount = useMemo(() => {
    if (!appliedPromo) return 0;
    return subtotal * appliedPromo.value;
  }, [subtotal, appliedPromo]);

  const discountedSubtotal = subtotal - appliedDiscount;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + deliveryFees + tax;
  const giftItem = appliedPromo?.gift ? { ...appliedPromo.gift, quantity: 1, price: 0 } : null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    const promo = promoRules[code];

    if (!promo) {
      setCouponMessage('Invalid coupon. Try SAVE10, EATREST20, BIRTHDAY, or ANNIVERSARY.');
      setAppliedPromo(null);
      return;
    }

    if (promo.min && subtotal < promo.min) {
      setCouponMessage(`Minimum order is ${formatINR(promo.min)} for ${promo.code}. Add more items to use this coupon.`);
      setAppliedPromo(null);
      return;
    }

    setAppliedPromo(promo);
    setCouponMessage(`${promo.code} applied. ${promo.title}.`);
  };

  const handleClearCoupon = () => {
    setAppliedPromo(null);
    setCouponCode('');
    setCouponMessage('Coupon removed.');
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const orderPayload = {
        items,
        customer: form,
        coupon: appliedPromo?.code || null,
        discount: appliedDiscount.toFixed(2),
        gift: giftItem ? { ...giftItem, quantity: 1 } : null,
        total: total.toFixed(2),
        status: 'Pending'
      };

      await api.post('/orders', orderPayload);
      clearCart();
      toast.success('Order placed');
      navigate('/orders');
    } catch (error) {
      toast.error('Checkout failed');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-4xl border border-slate-200 bg-white/90 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.06)] backdrop-blur">
        <h1 className="text-3xl font-semibold text-slate-700">Checkout</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            {Object.entries(form).map(([key, value]) => (
              <div key={key}>
                <label className="mb-2 block text-sm font-medium capitalize">{key}</label>
                <input value={value} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full rounded-full text-slate-600 border border-slate-300 px-4 py-3 outline-none" />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Coupon code</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code" className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
                <button type="button" onClick={handleApplyCoupon} className="rounded-full bg-orange-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-700/20">Apply</button>
              </div>
              {couponMessage && <p className="mt-3 text-sm text-slate-600">{couponMessage}</p>}
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="rounded-full text-center bg-orange-600 px-6 py-3 font-medium text-white shadow-lg ">Place order</button>
            </div>
          </form>
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-[0_25px_60px_rgba(15,23,42,0.22)] dark:bg-slate-800">
            <h2 className="text-xl font-semibold">Order summary</h2>
            {appliedPromo && (
              <div className="mt-4 rounded-3xl border border-emerald-500 bg-emerald-950/10 p-4 text-sm text-emerald-200">
                <p className="font-semibold">Applied coupon</p>
                <div className="mt-2 flex items-center justify-between gap-3 text-sm text-white">
                  <span>{appliedPromo.code}</span>
                  <span>{appliedPromo.title}</span>
                </div>
              </div>
            )}
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatINR(item.price * item.quantity)}</span>
                </div>
              ))}
              {giftItem && (
                <div className="rounded-3xl border border-emerald-500 bg-emerald-950/10 p-4 text-sm text-emerald-200">
                  <div className="flex items-center justify-between">
                    <span>{giftItem.name}</span>
                    <span>Free</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{giftItem.description}</p>
                </div>
              )}
            </div>
              <div className="mt-4 space-y-2 border-t border-slate-700 pt-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-{formatINR(appliedDiscount)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{formatINR(deliveryFees)}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>{formatINR(tax)}</span></div>
              <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatINR(total)}</span></div>
            </div>
            {appliedPromo && (
              <button type="button" onClick={handleClearCoupon} className="mt-4 w-full rounded-full bg-rose-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-rose-600/20">Clear coupon</button>
            )}
            <div className="mt-5 rounded-[1.25rem] border border-slate-700 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold"><FaCreditCard /> Stripe test payment</div>
              <p className="mt-2 text-sm text-slate-400">Secure checkout placeholder for card payments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
