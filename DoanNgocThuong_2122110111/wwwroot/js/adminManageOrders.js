// Tải danh sách đơn hàng
async function loadOrders() {
    try {
        const tbody = document.querySelector('#orderTable tbody');
        if (!tbody) {
            console.error('Table body not found in the DOM.');
            return;
        }

        const response = await fetch('/Order');
        if (!response.ok) throw new Error('Failed to fetch orders');

        const orders = await response.json();
        tbody.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.Id}</td>
                <td>${order.UserId}</td>
                <td>${order.OrderDate}</td>
                <td>${order.TotalAmount}</td>
                <td>${order.Status}</td>
                <td>
                    <button onclick="editOrder(${order.Id})">Edit</button>
                    <button onclick="deleteOrder(${order.Id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Chỉnh sửa đơn hàng
async function editOrder(orderId) {
    try {
        const response = await fetch(`/Order/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order details');

        const order = await response.json();
        const editContainer = document.getElementById('editOrderContainer');
        editContainer.innerHTML = `
            <div>
                <h3>Edit Order</h3>
                <input type="hidden" id="editOrderId" value="${order.Id}" />
                <label>Status:</label>
                <input type="text" id="editOrderStatus" value="${order.Status}" />
                <button onclick="saveOrder()">Save</button>
                <button onclick="cancelEdit()">Cancel</button>
            </div>
        `;
    } catch (error) {
        console.error('Error editing order:', error);
    }
}

// Lưu đơn hàng sau khi chỉnh sửa
async function saveOrder() {
    const id = document.getElementById('editOrderId').value;
    const updatedOrder = {
        Id: id,
        Status: document.getElementById('editOrderStatus').value
    };

    try {
        const response = await fetch(`/Order/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrder)
        });

        if (response.ok) {
            alert('Order updated successfully.');
            loadOrders();
        } else {
            alert('Failed to update order.');
        }
    } catch (error) {
        console.error('Error saving order:', error);
    }
}

// Xóa đơn hàng
async function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        try {
            const response = await fetch(`/Order/${orderId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Order deleted successfully.');
                loadOrders();
            } else {
                alert('Failed to delete order.');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    }
}

// Gọi loadOrders khi trang được tải
document.addEventListener('DOMContentLoaded', loadOrders);
