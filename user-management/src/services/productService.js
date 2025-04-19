import api from './api';

export const getProducts = async (categoryId = null) => {
  const url = categoryId ? `/Product/by-category/${categoryId}` : '/Product';
  console.log("Gọi API sản phẩm:", url); // Gỡ lỗi
  try {
    const response = await api.get(url);
    const data = response.data || [];
    console.log("Phản hồi sản phẩm:", data); // Gỡ lỗi
    return data;
  } catch (err) {
    console.error("Lỗi API sản phẩm:", err.response || err.message);
    throw err;
  }
};

export const getProductById = async (id) => {
  console.log("Gọi API chi tiết sản phẩm:", `/Product/${id}`);
  try {
    const response = await api.get(`/Product/${id}`);
    const data = response.data || {};
    console.log("Phản hồi chi tiết sản phẩm:", data);
    return data;
  } catch (err) {
    console.error("Lỗi API chi tiết sản phẩm:", err.response || err.message);
    throw err;
  }
};
export const createProduct = async (productData) => {
  const response = await api.post('/Product', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/Product/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/Product/${id}`);
  return response.data;
};