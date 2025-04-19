// src/frontend/ClientHome.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { getCategories } from '../services/categoryService';
import Header from '../components/Header.js';
import Footer from './Footer';
import './ClientHome.css';

const ClientHome = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoryResponse = await getCategories();
        const categoryData = Array.isArray(categoryResponse)
          ? categoryResponse
          : categoryResponse.data || [];
        setCategories(categoryData);
      } catch (err) {
        console.error("Lỗi lấy danh mục:", err);
        setCategories([]);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let productResponse;
        if (selectedCategory === 'all') {
          productResponse = await getProducts();
        } else {
          productResponse = await getProducts(selectedCategory);
        }

        const productData = Array.isArray(productResponse)
          ? productResponse
          : productResponse.data || [];
        setProducts(productData);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
        setError(err.message || 'Không thể tải sản phẩm.');
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      navigate('/');
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="client-home">
      <Header />

      <div className="category-filter">
        <label htmlFor="category">Chọn danh mục: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="all">Tất cả</option>
          {categories.map((category) => (
            <option key={category.id || category.Id} value={category.id || category.Id}>
              {category.name || category.Name}
            </option>
          ))}
        </select>
      </div>

      <h1>Chào mừng đến với cửa hàng của chúng tôi</h1>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id || product.Id}
              className="product-card"
              onClick={() => handleProductClick(product.id || product.Id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={product.Image || 'https://via.placeholder.com/150'}
                alt={product.Name}
                className="product-image"
              />
              <h3>{product.name || product.Name}</h3>
              <p>{product.description || product.Description}</p>
              <p className="price">
                {(product.price || product.Price)?.toLocaleString('vi-VN')} VNĐ
              </p>
            </div>
          ))
        ) : (
          <div>Không tìm thấy sản phẩm nào!</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ClientHome;
