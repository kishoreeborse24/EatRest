import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/auth/profile');
      setProfile(data.user);
      reset(data.user);
    };
    load();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      await api.put('/auth/profile', data);
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Unable to update profile');
    }
  };

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">My profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input {...register('name')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input {...register('email')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <input {...register('phone')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Address</label>
            <input {...register('address')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">City</label>
            <input {...register('city')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">State</label>
            <input {...register('state')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Pincode</label>
            <input {...register('pincode')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="rounded-full bg-emerald-700 px-6 py-3 font-medium text-white">Save profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
