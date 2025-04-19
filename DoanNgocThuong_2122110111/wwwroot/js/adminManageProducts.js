// Tải danh sách sản phẩm
async function loadProducts() {
    try {
        const response = await fetch('/Product');
        if (!response.ok) throw new Error('Failed to fetch products');

        const products = await response.json();
        const tbody = document.querySelector('#productTable tbody');
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.Id}</td>
                <td>${product.Name}</td>
                <td>${product.Price}</td>
                <td>${product.CategoryName || 'No Category'}</td>
                <td>
                    <img src="${product.Image}" alt="${product.Name}" style="width: 50px; height: 50px; object-fit: cover;" />
                </td>
                <td>
                    <button onclick="editProduct(${product.Id})">Edit</button>
                    <button onclick="deleteProduct(${product.Id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Hiển thị form thêm sản phẩm
function showAddProductForm() {
    const addContainer = document.getElementById('addProductContainer');
    addContainer.innerHTML = `
        <div class="card">
            <h3>Add Product</h3>
            <div class="form-group">
                <label for="addProductName">Name:</label>
                <input type="text" id="addProductName" class="form-control" />
            </div>
            <div class="form-group">
                <label for="addProductPrice">Price:</label>
                <input type="number" id="addProductPrice" class="form-control" />
            </div>
            <div class="form-group">
                <label for="addProductCategory">Category:</label>
                <input type="text" id="addProductCategory" class="form-control" />
            </div>
            <div class="form-group">
                <label for="addProductImage">Image:</label>
                <input type="file" id="addProductImage" class="form-control" />
            </div>
            <button class="btn btn-primary" onclick="addProduct()">Add</button>
            <button class="btn btn-secondary" onclick="cancelAdd()">Cancel</button>
        </div>
    `;
}


// Thêm sản phẩm
async function addProduct() {
    const name = document.getElementById('addProductName').value;
    const price = document.getElementById('addProductPrice').value;
    const categoryId = document.getElementById('addProductCategory').value;
    const imageFile = document.getElementById('addProductImage').files[0];

    if (!imageFile) {
        alert('Please select an image.');
        return;
    }

    // Convert image to Base64 and display it immediately
    const reader = new FileReader();
    reader.onload = async function (event) {
        const base64Image = event.target.result;

        // Create FormData to send to the server
        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Price', price);
        formData.append('CategoryId', categoryId);
        formData.append('Image', imageFile);

        try {
            const response = await fetch('/Product', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const newProduct = await response.json(); // Lấy sản phẩm mới từ API
                alert('Product added successfully.');

                // Append the new product to the table
                appendProductToTable({
                    ...newProduct,
                    Image: base64Image // Hiển thị ảnh ngay lập tức
                });
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    reader.readAsDataURL(imageFile); // Đọc file ảnh dưới dạng Base64
}

function appendProductToTable(product) {
    const tbody = document.querySelector('#productTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.Id}</td>
        <td>${product.Name}</td>
        <td>${product.Price}</td>
        <td>${product.CategoryName || 'No Category'}</td>
        <td>
            <img src="${product.Image}" alt="${product.Name}" style="width: 50px; height: 50px; object-fit: cover;" />
        </td>
        <td>
            <button onclick="editProduct(${product.Id})">Edit</button>
            <button onclick="deleteProduct(${product.Id})">Delete</button>
        </td>
    `;
    tbody.appendChild(row);
}



// Hủy form thêm
function cancelAdd() {
    document.getElementById('addProductContainer').innerHTML = '';
}

// Chỉnh sửa sản phẩm
async function editProduct(productId) {
    try {
        const response = await fetch(`/Product/${productId}`);
        if (!response.ok) throw new Error('Failed to fetch product details');

        const product = await response.json();
        const editContainer = document.getElementById('editProductContainer');
        editContainer.innerHTML = `
            <div class="card">
                <h3>Edit Product</h3>
                <input type="hidden" id="editProductId" value="${product.Id}" />
                <div class="form-group">
                    <label for="editProductName">Name:</label>
                    <input type="text" id="editProductName" class="form-control" value="${product.Name}" />
                </div>
                <div class="form-group">
                    <label for="editProductPrice">Price:</label>
                    <input type="number" id="editProductPrice" class="form-control" value="${product.Price}" />
                </div>
                <div class="form-group">
                    <label for="editProductCategory">Category:</label>
                    <input type="text" id="editProductCategory" class="form-control" value="${product.CategoryId}" />
                </div>
                <div class="form-group">
                    <label for="editProductImage">Image:</label>
                    <input type="file" id="editProductImage" class="form-control" />
                </div>
                <div class="form-group">
                    <img src="${product.Image}" alt="${product.Name}" style="width: 100px; height: 100px; object-fit: cover;" />
                </div>
                <button class="btn btn-primary" onclick="saveProduct()">Save</button>
                <button class="btn btn-secondary" onclick="cancelEdit()">Cancel</button>
            </div>
        `;
    } catch (error) {
        console.error('Error editing product:', error);
    }
}



// Lưu sản phẩm sau khi chỉnh sửa
async function saveProduct() {
    const id = document.getElementById('editProductId').value;
    const formData = new FormData();
    formData.append('Id', id);
    formData.append('Name', document.getElementById('editProductName').value);
    formData.append('Price', document.getElementById('editProductPrice').value);
    formData.append('CategoryId', document.getElementById('editProductCategory').value);
    formData.append('Image', document.getElementById('editProductImage').files[0]); // Lấy file ảnh

    try {
        const response = await fetch(`/Product/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            alert('Product updated successfully.');
            loadProducts();
        } else {
            alert('Failed to update product.');
        }
    } catch (error) {
        console.error('Error saving product:', error);
    }
}



// Xóa sản phẩm
async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            const response = await fetch(`/Product/${productId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Product deleted successfully.');
                loadProducts();
            } else {
                alert('Failed to delete product.');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
}

// Gọi loadProducts khi trang được tải
document.addEventListener('DOMContentLoaded', loadProducts);
