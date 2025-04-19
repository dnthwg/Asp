// Tải danh sách danh mục
async function loadCategories() {
    try {
        const response = await fetch('/Category');
        if (!response.ok) throw new Error('Failed to fetch categories');

        const categories = await response.json();
        const tbody = document.querySelector('#categoryTable tbody');
        tbody.innerHTML = '';

        categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.Id}</td>
                <td>${category.Name}</td>
                <td>${category.Description}</td>
                <td>
                    <button onclick="editCategory(${category.Id})">Edit</button>
                    <button onclick="deleteCategory(${category.Id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Hiển thị form thêm danh mục
function showAddCategoryForm() {
    const addContainer = document.getElementById('addCategoryContainer');
    addContainer.innerHTML = `
        <div class="card">
            <h3>Add Category</h3>
            <div class="form-group">
                <label for="addCategoryName">Name:</label>
                <input type="text" id="addCategoryName" class="form-control" />
            </div>
            <button class="btn btn-primary" onclick="addCategory()">Add</button>
            <button class="btn btn-secondary" onclick="cancelAdd()">Cancel</button>
        </div>
    `;
}

// Thêm danh mục
async function addCategory() {
    const newCategory = {
        Name: document.getElementById('addCategoryName').value
    };

    try {
        const response = await fetch('/Category', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory)
        });

        if (response.ok) {
            alert('Category added successfully.');
            loadCategories();
        } else {
            alert('Failed to add category.');
        }
    } catch (error) {
        console.error('Error adding category:', error);
    }
}

// Hủy form thêm
function cancelAdd() {
    document.getElementById('addCategoryContainer').innerHTML = '';
}

// Gọi loadCategories khi trang được tải
document.addEventListener('DOMContentLoaded', loadCategories);


// Chỉnh sửa danh mục
async function editCategory(categoryId) {
    try {
        const response = await fetch(`/Category/${categoryId}`);
        if (!response.ok) throw new Error('Failed to fetch category details');

        const category = await response.json();
        const editContainer = document.getElementById('editCategoryContainer');
        editContainer.innerHTML = `
            <div>
                <h3>Edit Category</h3>
                <input type="hidden" id="editCategoryId" value="${category.Id}" />
                <label>Name:</label>
                <input type="text" id="editCategoryName" value="${category.Name}" />
                <button onclick="saveCategory()">Save</button>
                <button onclick="cancelEdit()">Cancel</button>
            </div>
        `;
    } catch (error) {
        console.error('Error editing category:', error);
    }
}

// Lưu danh mục sau khi chỉnh sửa
async function saveCategory() {
    const id = document.getElementById('editCategoryId').value;
    const updatedCategory = {
        Id: id,
        Name: document.getElementById('editCategoryName').value
    };

    try {
        const response = await fetch(`/Category/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCategory)
        });

        if (response.ok) {
            alert('Category updated successfully.');
            loadCategories();
        } else {
            alert('Failed to update category.');
        }
    } catch (error) {
        console.error('Error saving category:', error);
    }
}

// Xóa danh mục
async function deleteCategory(categoryId) {
    if (confirm('Are you sure you want to delete this category?')) {
        try {
            const response = await fetch(`/Category/${categoryId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Category deleted successfully.');
                loadCategories();
            } else {
                alert('Failed to delete category.');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }
}

// Gọi loadCategories khi trang được tải
document.addEventListener('DOMContentLoaded', loadCategories);
