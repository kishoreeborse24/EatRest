export const categories = [
  { id: 'c1', name: 'Burgers', slug: 'burgers' },
  { id: 'c2', name: 'Pizza', slug: 'pizza' },
  { id: 'c3', name: 'Salads', slug: 'salads' },
  { id: 'c4', name: 'Desserts', slug: 'desserts' },
  { id: 'c5', name: 'Drinks', slug: 'drinks' }
];

export const foods = [
  {
    id: 'f1',
    name: 'Smoky BBQ Burger',
    description: 'Char-grilled patty with smoked cheddar, caramelized onions, and house sauce.',
    price: 1221.8,
    category: 'c1',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    popular: true,
    offer: '20% off',
    veg: false,
    ingredients: ['Beef patty', 'Smoked cheddar', 'Onions', 'Brioche bun'],
    nutrition: { calories: 710, protein: '32g', fat: '41g', carbs: '48g' }
  },
  {
    id: 'f2',
    name: 'Truffle Mushroom Pizza',
    description: 'Wood-fired pizza with wild mushrooms, mozzarella, and truffle cream.',
    price: 1353.0,
    category: 'c2',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    popular: true,
    offer: 'Chef special',
    veg: true,
    ingredients: ['Mozzarella', 'Mushrooms', 'Truffle cream', 'Basil'],
    nutrition: { calories: 640, protein: '24g', fat: '27g', carbs: '74g' }
  },
  {
    id: 'f3',
    name: 'Harvest Garden Salad',
    description: 'Fresh greens, roasted vegetables, quinoa, and citrus vinaigrette.',
    price: 918.4,
    category: 'c3',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
    popular: false,
    offer: '',
    veg: true,
    ingredients: ['Arugula', 'Quinoa', 'Roasted veggies', 'Vinaigrette'],
    nutrition: { calories: 390, protein: '13g', fat: '20g', carbs: '35g' }
  },
  {
    id: 'f4',
    name: 'Velvet Chocolate Cake',
    description: 'Warm chocolate cake with ganache and berry compote.',
    price: 803.6,
    category: 'c4',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    popular: true,
    offer: 'Limited',
    veg: true,
    ingredients: ['Dark chocolate', 'Ganache', 'Berries'],
    nutrition: { calories: 520, protein: '7g', fat: '29g', carbs: '58g' }
  },
  {
    id: 'f5',
    name: 'Citrus Sparkler',
    description: 'Fresh orange, lemon, and rosemary infused sparkling soda.',
    price: 451.0,
    category: 'c5',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80',
    rating: 4.5,
    popular: false,
    offer: 'Fresh',
    veg: true,
    ingredients: ['Orange', 'Lemon', 'Rosemary'],
    nutrition: { calories: 120, protein: '0g', fat: '0g', carbs: '30g' }
  }
];

export const coupons = [
  { code: 'WELCOME10', discount: 10, description: '10% off your first order' },
  { code: 'LUNCH15', discount: 15, description: '15% off lunch orders' }
];

export const reviews = [
  { id: 'r1', name: 'Mia', rating: 5, text: 'Exceptional food and polished service.' },
  { id: 'r2', name: 'Jules', rating: 4, text: 'Beautiful presentation and lightning-fast delivery.' }
];

export const store = {
  users: [
    { id: 'u1', name: 'Admin', email: 'admin@restaurant.com', password: '$2a$10$u9z2lyIYm9B3aJm7Sk2P8e9zf8J8UVHy2yrG0Q7xjIwtSjm8k5wGW', role: 'admin', phone: '+1 234 567 890', address: '', city: '', state: '', pincode: '' }
  ],
  foods: [...foods],
  categories: [...categories],
  cart: [],
  orders: [],
  reviews: [...reviews],
  coupons: [...coupons]
};
