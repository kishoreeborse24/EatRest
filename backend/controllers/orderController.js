import { store } from '../data/seedData.js';

export const listOrders = (_req, res) => res.json({ orders: store.orders, currency: 'INR' });

export const createOrder = (req, res) => {
  const order = { id: `ord${Date.now()}`, ...req.body, status: 'Pending' };
  store.orders.push(order);
  res.status(201).json({ order, currency: 'INR' });
};
export const updateOrder = (req, res) => {
  const index = store.orders.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Order not found' });
  store.orders[index] = { ...store.orders[index], ...req.body };
  res.json({ order: store.orders[index], currency: 'INR' });
};

export const deleteOrder = (req, res) => {
  store.orders = store.orders.filter((item) => item.id !== req.params.id);
  res.json({ message: 'Order removed' });
};
