import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import mainDish from '../assets/main-dish.png';
import img1 from '../assets/Rainbow Veggie Bowl.png';
import img2 from '../assets/Creamy Mushroom Soup.png';
import img3 from '../assets/Golden Pumpkin Soup.png';
import img4 from '../assets/Creamy Harvest Bowl.png';
import img5 from '../assets/Harvest Garden Bowl.png';
import img6 from '../assets/Creamy Palak Paneer.png';
import img7 from '../assets/Paneer Butter Masala.png';
import img8 from '../assets/Classic Bhindi Masala.png';
import img9 from '../assets/Classic Chicken Curry.png';
import img10 from '../assets/Ruby Paneer Curry.png';
import img11 from '../assets/Hyd Chicken Biryani.png';
import img12 from '../assets/Crispy Fish Fry.png';
import { formatCurrency } from '../utils/formatCurrency';

const foodImages = {
  pizza: [img2, img3],
  burger: [img1, img5],
  pasta: [img4, mainDish],
  salad: [img4, img5],
  dessert: [img3, mainDish],
  drinks: [img5, mainDish],
  panner: [img6, img3], 
  chocken: [img7, img5],
  noodles: [img8, mainDish],
  soup: [img9, img5],
  chinese: [img10, mainDish],
  fish: [img11, img3],
  rice: [img12, img3],
  default: [mainDish]
};

const pickImage = (key, images) => {
  if (!images?.length) return '';
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return images[Math.abs(hash) % images.length];
};

const getFoodImage = (food) => {
  if (!food) return mainDish;
  
  if (food.image && food.image.startsWith('/uploads')) {
    const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const baseURL = apiURL.replace(/\/api\/?$/, '');
    const imagePath = food.image.startsWith('/') ? food.image : `/${food.image}`;
    return `${baseURL}${imagePath}`;
  }

  const name = (food.name || '').toLowerCase();
  if (name.includes('pizza')) return pickImage(name, foodImages.pizza);
  if (name.includes('burger')) return pickImage(name, foodImages.burger);
  if (name.includes('pasta')) return pickImage(name, foodImages.pasta);
  if (name.includes('salad') || name.includes('garden')) return pickImage(name, foodImages.salad);
  if (name.includes('dessert') || name.includes('cake') || name.includes('ice') || name.includes('chocolate')) return pickImage(name, foodImages.dessert);
  if (name.includes('sandwich')) return pickImage(name, foodImages.default);
  if (name.includes('sushi')) return pickImage(name, foodImages.default);
  if (name.includes('biryani')) return pickImage(name, foodImages.default);
  if (name.includes('chicken') || name.includes('steak')) return pickImage(name, foodImages.default);
  if (
    name.includes('juice') ||
    name.includes('drink') ||
    name.includes('coffee') ||
    name.includes('tea') ||
    name.includes('sparkler')
  ) return pickImage(name, foodImages.drinks);

  if (food.image && (food.image.startsWith('http://') || food.image.startsWith('https://') || food.image.startsWith('data:image'))) {
    return food.image;
  }

  return pickImage(name, foodImages.default);
};

export default function FoodDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { toggleItem, isInCart } = useCart();

  const formatPrice = (value) => formatCurrency(value, currency);

  useEffect(() => {
    const loadFood = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/foods/${id}`);
        setFood(res.data.food);
        setCurrency(res.data.currency || 'INR');
      } catch (err) {
        console.error('Failed to load food item', err);
        setError(err.response?.data?.message || err.message || 'Unable to load food item');
      } finally {
        setLoading(false);
      }
    };

    loadFood();
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-700">Loading food item...</div>;
  }

  if (error) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-rose-700">{error}</div>;
  }

  if (!food) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-700">Food item not found.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4b6654] hover:text-[#33493d]"><FaArrowLeft /> Back to menu</Link> */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="overflow-hidden rounded-[2rem] bg-[#fcfbf7] shadow-[0_30px_80px_rgba(15,23,42,0.09)]">
          <img
            src={getFoodImage(food)}
            alt={food.name}
            className="h-[520px] w-full object-cover"
          />
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{food.veg ? 'Vegetarian' : 'Non-vegetarian'}</p>
            <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Rating {food.rating}</p>
          </div>
          <h1 className="mt-6 text-4xl font-semibold text-[#33493d]">{food.name}</h1>
          <p className="mt-4 text-lg leading-8 text-[#6f7f74]">{food.description}</p>
          <div className="mt-8 flex items-center justify-between gap-4 rounded-[1.5rem] bg-[#f7f3ea] px-6 py-5 text-[#33493d] shadow-[0_20px_40px_rgba(75,102,84,0.12)]">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#5f7a63]">Price</p>
              <p className="mt-2 text-3xl font-semibold">{formatPrice(food.price)}</p>
            </div>
            <button
              onClick={() => toggleItem(food)}
              className={`rounded-full px-6 py-3 text-sm font-semibold text-white transition ${isInCart(food.id) ? 'bg-rose-600 hover:bg-rose-500' : 'bg-[#4b6654] hover:bg-[#3e533f]'}`}
            >
              {isInCart(food.id) ? 'Remove from cart' : 'Add to cart'}
            </button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-[#fffdfa] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f7a63]">Ingredients</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#6f7f74]">
                {food.ingredients?.map((ingredient) => (<li key={ingredient}>• {ingredient}</li>))}
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-[#fffdfa] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#5f7a63]">Nutrition</h3>
              <div className="mt-4 space-y-2 text-sm text-[#6f7f74]">
                <p>Calories: {food.nutrition?.calories}</p>
                <p>Protein: {food.nutrition?.protein}</p>
                <p>Fat: {food.nutrition?.fat}</p>
                <p>Carbs: {food.nutrition?.carbs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
