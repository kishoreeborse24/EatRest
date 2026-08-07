import { store } from '../data/seedData.js';

export const listCoupons = (_req, res) => res.json({ coupons: store.coupons });

export const createCoupon = (req, res) => {
  const coupon = { ...req.body };
  store.coupons.push(coupon);
  res.status(201).json({ coupon });
};

export const updateCoupon = (req, res) => {
  const index = store.coupons.findIndex((item) => item.code === req.params.code);
  if (index === -1) return res.status(404).json({ message: 'Coupon not found' });
  store.coupons[index] = { ...store.coupons[index], ...req.body };
  res.json({ coupon: store.coupons[index] });
};

export const deleteCoupon = (req, res) => {
  store.coupons = store.coupons.filter((item) => item.code !== req.params.code);
  res.json({ message: 'Coupon removed' });
};
