import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add interceptors for request/response logging or error handling
apiClient.interceptors.request.use(
    (config) => {
        // You can add authorization tokens or other headers here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default apiClient;