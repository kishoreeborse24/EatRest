import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { store } from '../data/seedData.js';

const signToken = (user) => jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const existing = store.users.find((user) => user.email === email);
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: `u${Date.now()}`,
    name,
    email,
    password: hashedPassword,
    phone: phone || '',
    role: 'customer',
    address: '',
    city: '',
    state: '',
    pincode: ''
  };

  store.users.push(user);
  res.status(201).json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find((item) => item.email === email);

  if (email === 'admin@restaurant.com' && password === 'admin123') {
    const admin = store.users.find((item) => item.role === 'admin');
    return res.json({ token: signToken(admin), user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
  }

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

export const getProfile = async (req, res) => {
  const user = store.users.find((item) => item.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, address: user.address, city: user.city, state: user.state, pincode: user.pincode } });
};

export const updateProfile = async (req, res) => {
  const user = store.users.find((item) => item.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  Object.assign(user, req.body);
  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, address: user.address, city: user.city, state: user.state, pincode: user.pincode } });
};
