const BASE_URL = 'http://localhost:5000';

async function apiRequest(path, method, data) {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(BASE_URL + path, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || 'Request failed');
    }
    return res.json();
}
