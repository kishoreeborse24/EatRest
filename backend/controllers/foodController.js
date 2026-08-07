import { store } from '../data/seedData.js';

export const listFoods = (req, res) => {
  const { search = '', category, veg, sort } = req.query;
  let foods = [...store.foods];

  if (search) {
    foods = foods.filter((food) => food.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (category) {
    foods = foods.filter((food) => food.category === category);
  }

  if (veg === 'true') {
    foods = foods.filter((food) => food.veg);
  }

  if (sort === 'price-asc') foods.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') foods.sort((a, b) => b.price - a.price);
  if (sort === 'popularity') foods.sort((a, b) => b.rating - a.rating);

  res.json({ foods, currency: 'INR' });
};

export const getFood = (req, res) => {
  const food = store.foods.find((item) => item.id === req.params.id);
  if (!food) return res.status(404).json({ message: 'Food not found' });
  res.json({ food, currency: 'INR' });
};

export const createFood = (req, res) => {
  const food = { id: `f${Date.now()}`, ...req.body, image: req.body.image || '' };
  store.foods.push(food);
  res.status(201).json({ food, currency: 'INR' });
};

export const updateFood = (req, res) => {
  const index = store.foods.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Food not found' });
  store.foods[index] = { ...store.foods[index], ...req.body };
  res.json({ food: store.foods[index], currency: 'INR' });
};

export const deleteFood = (req, res) => {
  store.foods = store.foods.filter((item) => item.id !== req.params.id);
  res.json({ message: 'Food removed' });
};
