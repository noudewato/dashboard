import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Customers from './pages/customers/Customers';
import Orders from './pages/orders/Orders';
import Products from './pages/products/Products';

const LazyDashboard = React.lazy(() => import('./pages/Dashboard'));
const LazyUsers = React.lazy(() => import('./pages/Users'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users/>} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}
