import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, Navigate, RouterProvider, useRouteError } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetail from './pages/FoodDetail';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function RouteErrorBoundary() {
  const error = useRouteError();
  const status = error?.status || 500;
  const isNotFound = status === 404 || error?.message?.toLowerCase().includes('not found');

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_25px_70px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Oops</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-800">{isNotFound ? 'Page not found' : 'Something went wrong'}</h1>
        <p className="mt-4 text-slate-600">
          {isNotFound
            ? 'The page you are looking for does not exist or may have moved.'
            : 'An unexpected error occurred while loading this page.'}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.hash = '#/'}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Go home
          </button>
          <a href="#/" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500">
            Back to home
          </a>
        </div>
        {isNotFound && (
          <p className="mt-6 text-xs text-slate-500">Status: {status}</p>
        )}
      </div>
    </div>
  );
}

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <>
        <Home />
        <Menu />
        <About />
        <Orders />
        <Contact />
      </> },
      { path: 'menu', element: <Menu /> },
      { path: 'menu/:id', element: <FoodDetail /> },
      { path: 'about', element: <About /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <Profile /> },
      { path: 'orders', element: <Orders /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'admin', element: <Admin /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'cookies', element: <Cookies /> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
