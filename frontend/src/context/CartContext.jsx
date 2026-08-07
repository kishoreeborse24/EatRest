import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();
const STORAGE_KEY = 'eatrest-cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (food) => {
    setItems((current) => {
      const exists = current.find((item) => item.id === food.id);
      if (exists) {
        return current.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...food, quantity: 1 }];
    });
    toast.success(`${food.name} added to cart`);
  };

  const isInCart = (id) => items.some((item) => item.id === id);

  const toggleItem = (food) => {
    setItems((current) => {
      const exists = current.some((item) => item.id === food.id);
      if (exists) {
        toast.success(`${food.name} removed from cart`);
        return current.filter((item) => item.id !== food.id);
      }
      toast.success(`${food.name} added to cart`);
      return [...current, { ...food, quantity: 1 }];
    });
  };

  const updateItemQuantity = (id, quantity) => {
    const currentItem = items.find((item) => item.id === id);
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item).filter((item) => item.quantity > 0));
    if (currentItem && quantity <= 0) {
      toast.success(`${currentItem.name} removed from cart`);
    }
  };

  const removeItem = (id) => {
    const removedItem = items.find((item) => item.id === id);
    setItems((current) => current.filter((item) => item.id !== id));
    if (removedItem) {
      toast.success(`${removedItem.name} removed from cart`);
    }
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const deliveryFees = subtotal > 0 ? 4.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFees + tax;
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(() => ({ items, addItem, toggleItem, isInCart, updateItemQuantity, removeItem, clearCart, subtotal, deliveryFees, tax, total, itemCount }), [items, subtotal, deliveryFees, tax, total, itemCount]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
