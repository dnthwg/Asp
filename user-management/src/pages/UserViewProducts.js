import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

const UserViewProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="user-view-products">
            <h2>Product Catalog</h2>
            <div className="content">
                <CategoryList onCategorySelect={setSelectedCategory} />
                <ProductList categoryId={selectedCategory} />
            </div>
        </div>
    );
};

export default UserViewProducts;
