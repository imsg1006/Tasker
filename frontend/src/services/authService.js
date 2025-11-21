import apiClient from './apiClient';

export const authService = {
  signup: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', null, {
      params: { email, password }
    });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },

  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await apiClient.put('/users/profile', userData);
    return response.data;
  },
};