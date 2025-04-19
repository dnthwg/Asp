async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/Admin/Login';
        return;
    }

    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, options);
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/Admin/Login';
    }
    return response;
}
