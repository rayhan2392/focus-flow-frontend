import axios from 'axios';

// 1. Create the base instance
export const apiClient = axios.create({
    // It will look for your local Node server, or fallback to localhost:4000
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. The Interceptor: Automatically attach the JWT token
apiClient.interceptors.request.use(
    (config) => {
        // We only want this to run in the browser, not during Next.js server rendering
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);