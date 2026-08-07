import { store } from '../data/seedData.js';

export const getCart = (_req, res) => res.json({ cart: store.cart });

export const addToCart = (req, res) => {
  const { foodId, quantity = 1 } = req.body;
  const existing = store.cart.find((item) => item.foodId === foodId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    store.cart.push({ id: `cart${Date.now()}`, foodId, quantity });
  }
  res.json({ cart: store.cart });
};

export const updateCart = (req, res) => {
  const { quantity } = req.body;
  const item = store.cart.find((entry) => entry.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Cart item not found' });
  item.quantity = quantity;
  res.json({ cart: store.cart });
};

export const removeCartItem = (req, res) => {
  store.cart = store.cart.filter((item) => item.id !== req.params.id);
  res.json({ cart: store.cart });
};
