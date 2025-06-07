// This file exports helper functions for authentication, login, and token management. 
// It simplifies API interactions.

export const login = async (apiClient, username, password) => {
    const response = await apiClient.post('/auth/login', {
        username,
        password,
    });
    return response.data;
};

export const register = async (apiClient, userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
};

export const getAuthToken = (response) => {
    return response?.token || null;
};