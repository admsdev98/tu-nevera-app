import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('supabase.auth.token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const menuAPI = {
  async generateByText(data) {
    const response = await api.post('/menu/generate-by-text', data);
    return response.data;
  },

  async generateByImage(formData) {
    const response = await api.post('/menu/generate-by-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async generateByAudio(formData) {
    const response = await api.post('/menu/generate-by-audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getHistory() {
    const response = await api.get('/menu/history');
    return response.data;
  },

  async getMenu(id) {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  async deleteMenu(id) {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },
};

export const userAPI = {
  async updatePreferences(data) {
    const response = await api.put('/user/preferences', data);
    return response.data;
  },

  async deleteAccount() {
    const response = await api.delete('/user/account');
    return response.data;
  },
};

export default api;
