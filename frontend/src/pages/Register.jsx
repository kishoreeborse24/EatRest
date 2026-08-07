import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      const returnTo = location.state?.from?.pathname || '/menu';
      navigate(returnTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Create account</h1>
            <p className="mt-2 text-sm text-slate-600">Join EatRest and order in minutes.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Close"
            className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 text-slate-600">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input {...register('name', { required: 'Name is required' })} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none focus:border-orange-100 focus:ring-1 focus:ring-orange-100" placeholder="Your name" />
            {errors.name && <p className="mt-1 text-sm text-slate-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input {...register('email', { required: 'Email is required' })} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none focus:border-orange-100 focus:ring-1 focus:ring-orange-100" placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-sm text-slate-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Phone</label>
            <input {...register('phone')} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none focus:border-orange-100 focus:ring-1 focus:ring-orange-100" placeholder="Phone" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input type="password" {...register('password', { required: 'Password is required', minLength: 6 })} className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none focus:border-orange-100 focus:ring-1 focus:ring-orange-100" placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-sm text-slate-600">{errors.password.message || 'Password should be at least 6 characters'}</p>}
          </div>
          <button type="submit" className="w-full rounded-full bg-orange-600 px-4 py-3 font-medium text-white">Register</button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">Already have an account? <Link to="/login" state={location.state} className="font-semibold text-orange-600">Login</Link></p>
      </div>
    </div>
  );
}
