import { store } from '../data/seedData.js';

export const listCategories = (_req, res) => res.json({ categories: store.categories });

export const createCategory = (req, res) => {
  const category = { id: `c${Date.now()}`, ...req.body };
  store.categories.push(category);
  res.status(201).json({ category });
};

export const updateCategory = (req, res) => {
  const index = store.categories.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Category not found' });
  store.categories[index] = { ...store.categories[index], ...req.body };
  res.json({ category: store.categories[index] });
};

export const deleteCategory = (req, res) => {
  store.categories = store.categories.filter((item) => item.id !== req.params.id);
  res.json({ message: 'Category removed' });
};
