import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const googleLogin = async (credential) => {
    try {
        const response = await api.post('/google-login', { credential });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const signup = async (userData) => {

    try {
        const response = await api.post('/signup', userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const predictLoan = async (data) => {
    try {
        const response = await api.post('/predict', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getHistory = async (userId) => {
    try {
        const response = await api.get(`/history?user_id=${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const simulateCredit = async (data) => {
    try {
        const response = await api.post('/simulate', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export default api;
