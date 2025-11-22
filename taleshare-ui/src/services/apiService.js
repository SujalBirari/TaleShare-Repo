import axios from 'axios';

const api = axios.create({
    // URL of your Express Backend
    baseURL: 'http://localhost:3000/api',
    // REMOVED withCredentials: true to simplify CORS for token-based auth
    headers: {
        'Content-Type': 'application/json',
    },
});

// INTERCEPTOR: Automatically add the token to every request if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR: Handle 401s Globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If the token is invalid (401), clear it and force login
        if (error.response && error.response.status === 401) {
            console.warn("Session expired or invalid token. Logging out...");
            localStorage.removeItem('token');
            // Optional: Redirect to login if not already there
            if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;