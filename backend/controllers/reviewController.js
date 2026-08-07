import { store } from '../data/seedData.js';

export const listReviews = (_req, res) => res.json({ reviews: store.reviews });

export const createReview = (req, res) => {
  const review = { id: `r${Date.now()}`, ...req.body };
  store.reviews.push(review);
  res.status(201).json({ review });
};

export const updateReview = (req, res) => {
  const index = store.reviews.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Review not found' });
  store.reviews[index] = { ...store.reviews[index], ...req.body };
  res.json({ review: store.reviews[index] });
};

export const deleteReview = (req, res) => {
  store.reviews = store.reviews.filter((item) => item.id !== req.params.id);
  res.json({ message: 'Review removed' });
};
