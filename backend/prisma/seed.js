import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  // categories
  const categories = [
    { name: 'Burgers', slug: 'burgers' },
    { name: 'Pizza', slug: 'pizza' },
    { name: 'Salads', slug: 'salads' },
    { name: 'Desserts', slug: 'desserts' },
    { name: 'Drinks', slug: 'drinks' }
  ];

  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
  }

  const catMap = {};
  const allCats = await prisma.category.findMany();
  allCats.forEach((c) => (catMap[c.slug] = c.id));

  const foods = [
    {
      name: 'Smoky BBQ Burger',
      description: 'Char-grilled patty with smoked cheddar, caramelized onions, and house sauce.',
      price: 1221.8,
      categorySlug: 'burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
      rating: 4.8,
      offer: '20% off',
      veg: false
    },
    {
      name: 'Truffle Mushroom Pizza',
      description: 'Wood-fired pizza with wild mushrooms, mozzarella, and truffle cream.',
      price: 1353.0,
      categorySlug: 'pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
      rating: 4.7,
      offer: 'Chef special',
      veg: true
    },
    {
      name: 'Harvest Garden Salad',
      description: 'Fresh greens, roasted vegetables, quinoa, and citrus vinaigrette.',
      price: 918.4,
      categorySlug: 'salads',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      rating: 4.6,
      offer: '',
      veg: true
    }
  ];

  for (const f of foods) {
    await prisma.food.upsert({
      where: { name: f.name },
      update: {
        description: f.description,
        price: f.price,
        image: f.image,
        rating: f.rating,
        offer: f.offer,
        veg: f.veg,
        categoryId: catMap[f.categorySlug]
      },
      create: {
        name: f.name,
        description: f.description,
        price: f.price,
        image: f.image,
        rating: f.rating,
        offer: f.offer,
        veg: f.veg,
        category: { connect: { id: catMap[f.categorySlug] } }
      }
    });
  }

  // coupons
  const coupons = [
    { code: 'SAVE10', type: 'percent', value: 10, minAmount: 0, giftName: null, giftDesc: null },
    { code: 'EATREST20', type: 'percent', value: 20, minAmount: 4100 },
    { code: 'BIRTHDAY', type: 'gift', value: 15, minAmount: 0, giftName: 'Complimentary dessert', giftDesc: 'Birthday treat' },
    { code: 'ANNIVERSARY', type: 'gift', value: 20, minAmount: 0, giftName: 'Complimentary appetizer', giftDesc: 'Anniversary treat' }
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({ where: { code: c.code }, update: {}, create: c });
  }

  // admin user
  const adminEmail = 'admin@restaurant.com';
  const pw = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({ where: { email: adminEmail }, update: {}, create: { name: 'Admin', email: adminEmail, passwordHash: pw, role: 'admin' } });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
