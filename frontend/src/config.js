// Centralized API Configuration
// When deploying, VITE_API_URL should be set in environment variables
// If not set, it defaults to localhost for development
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getApiUrl = (endpoint) => {
    return `${API_URL}${endpoint}`;
};
