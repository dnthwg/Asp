// Tải danh sách người dùng
async function loadUsers() {
    try {
        const response = await fetch('/User', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch users');

        const users = await response.json();
        const tbody = document.querySelector('#userTable tbody');
        tbody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.Id}</td>
                <td>${user.Username}</td>
                <td>${user.Email}</td>
                <td>${user.Role}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editUser(${user.Id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.Id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Failed to load users.');
    }
}
// Hiển thị form thêm người dùng
function showAddUserForm() {
    const addContainer = document.getElementById('addUserContainer');
    addContainer.innerHTML = `
        <div class="card">
            <h3>Add User</h3>
            <div class="form-group">
                <label for="addUsername">Username:</label>
                <input type="text" id="addUsername" class="form-control" />
            </div>
            <div class="form-group">
                <label for="addEmail">Email:</label>
                <input type="email" id="addEmail" class="form-control" />
            </div>
            <div class="form-group">
                <label for="addRole">Role:</label>
                <select id="addRole" class="form-control">
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <button class="btn btn-primary" onclick="addUser()">Add</button>
            <button class="btn btn-secondary" onclick="cancelAdd()">Cancel</button>
        </div>
    `;
}

// Thêm người dùng
async function addUser() {
    const newUser = {
        Username: document.getElementById('addUsername').value,
        Email: document.getElementById('addEmail').value,
        Role: document.getElementById('addRole').value
    };

    try {
        const response = await fetch('/User/Register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            alert('User added successfully.');
            loadUsers();
        } else {
            alert('Failed to add user.');
        }
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Hủy form thêm
function cancelAdd() {
    document.getElementById('addUserContainer').innerHTML = '';
}

// Xử lý chỉnh sửa người dùng
async function editUser(userId) {
    try {
        const response = await fetch(`/User/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch user details');

        const user = await response.json();

        // Kiểm tra xem phần tử editContainer có tồn tại không
        const editContainer = document.getElementById('editContainer');
        if (!editContainer) {
            throw new Error('Element with id "editContainer" not found in DOM');
        }

        // Tạo form chỉnh sửa
        const formHtml = `
    <div id="editForm" class="card shadow-sm border p-4">
        <h5 class="mb-3 text-primary">Edit User: ${user.Username}</h5>
        <input type="hidden" id="editUserId" value="${user.Id}" />
        <div class="mb-3">
            <label class="form-label">Username</label>
            <input type="text" id="editUsername" class="form-control" value="${user.Username}" />
        </div>
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" id="editEmail" class="form-control" value="${user.Email}" />
        </div>
        <div class="mb-3">
            <label class="form-label">Role</label>
            <select id="editRole" class="form-select">
                <option value="User" ${user.Role === 'User' ? 'selected' : ''}>User</option>
                <option value="Admin" ${user.Role === 'Admin' ? 'selected' : ''}>Admin</option>
            </select>
        </div>
        <div class="d-flex gap-2">
            <button class="btn btn-success" onclick="saveUser()">💾 Save</button>
            <button class="btn btn-secondary" onclick="cancelEdit()">❌ Cancel</button>
        </div>
    </div>
`;


        editContainer.innerHTML = formHtml;

    } catch (error) {
        console.error('Error loading user for edit:', error);
        alert('Could not load user details');
    }
}


// Lưu thông tin người dùng sau khi chỉnh sửa
async function saveUser() {
    const id = document.getElementById('editUserId').value;
    const updatedUser = {
        Id: id,
        Username: document.getElementById('editUsername').value.trim(),
        Email: document.getElementById('editEmail').value.trim(),
        Role: document.getElementById('editRole').value
    };

    try {
        const response = await fetch(`/User/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            alert('User updated successfully.');
            cancelEdit(); // Đóng form chỉnh sửa
            loadUsers();  // Tải lại danh sách người dùng
        } else {
            const error = await response.json();
            alert(`Failed to update user: ${error.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        alert('An error occurred while updating the user.');
    }
}


// Hủy form chỉnh sửa
function cancelEdit() {
    document.getElementById('editContainer').innerHTML = '';
}

// Xóa người dùng
async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const response = await fetch(`/User/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('User deleted successfully.');
                loadUsers();
            } else {
                const error = await response.json();
                alert(`Failed to delete user: ${error.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    }
}

// Gọi loadUsers khi trang được tải
document.addEventListener('DOMContentLoaded', loadUsers);
