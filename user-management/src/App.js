// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import ClientHome from './frontend/ClientHome';
import ProductDetail from './frontend/ProductDetail.js';
import ProductCategory from './frontend/ProductCategory';
import Cart from './frontend/Cart';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Bọc toàn bộ ứng dụng trong CartProvider */}
        <Router>
          <Routes>
            <Route path="/" element={<ClientHome />} />
            <Route path="/products" element={<ClientHome />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:id" element={<ProductCategory />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;