import { useEffect, useState } from 'react';
import api from '../services/api';
import { formatINR } from '../utils/formatCurrency';
import toast from 'react-hot-toast';

export default function Admin() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '', category: '' });

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const res = await api.get('/foods');
    setFoods(res.data.foods);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/foods', { ...form, price: Number(form.price), category: form.category || 'c1' });
      toast.success('Food added');
      setForm({ name: '', price: '', description: '', image: '', category: '' });
      loadFoods();
    } catch {
      toast.error('Unable to add food');
    }
  };

  const removeFood = async (id) => {
    try {
      await api.delete(`/foods/${id}`);
      toast.success('Food removed');
      loadFoods();
    } catch {
      toast.error('Unable to delete');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Admin dashboard</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] bg-slate-900 p-4 text-white">
            <p className="text-sm text-slate-400">Total orders</p>
            <p className="mt-2 text-2xl font-semibold">24</p>
          </div>
          <div className="rounded-[1.25rem] bg-emerald-700 p-4 text-white">
            <p className="text-sm text-emerald-100">Revenue</p>
            <p className="mt-2 text-2xl font-semibold">{formatINR(3480)}</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-2 text-2xl font-semibold">6</p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Food management</h2>
          <form onSubmit={submit} className="mt-4 grid gap-3 rounded-[1.5rem] border border-slate-200 p-4 md:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Food name" className="rounded-full border border-slate-300 px-4 py-3" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="rounded-full border border-slate-300 px-4 py-3" />
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL" className="rounded-full border border-slate-300 px-4 py-3" />
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category ID" className="rounded-full border border-slate-300 px-4 py-3" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="md:col-span-2 rounded-[1.25rem] border border-slate-300 px-4 py-3" />
            <button type="submit" className="md:col-span-2 rounded-full bg-emerald-700 px-4 py-3 font-semibold text-white">Add food</button>
          </form>
          <div className="mt-4 space-y-3">
            {foods.map((food) => (
              <div key={food.id} className="flex items-center justify-between rounded-[1rem] border border-slate-200 p-4">
                <div>
                  <p className="font-semibold">{food.name}</p>
                  <p className="text-sm text-slate-600">{formatINR(food.price)}</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">Edit</button>
                  <button onClick={() => removeFood(food.id)} className="rounded-full bg-rose-600 px-4 py-2 text-sm text-white">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
