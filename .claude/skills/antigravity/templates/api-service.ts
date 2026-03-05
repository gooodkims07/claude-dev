import axios from 'axios';
import { {{EntityName}} } from '@/types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export const {{ServiceName}} = {
  fetchData: async (): Promise<{{EntityName}}[]> => {
    return api.get('/{{entityName}}s');
  },

  getById: async (id: string): Promise<{{EntityName}}> => {
    return api.get(`/{{entityName}}s/${id}`);
  },

  saveData: async (data: Partial<{{EntityName}}>): Promise<{{EntityName}}> => {
    if (data.id) {
      return api.put(`/{{entityName}}s/${data.id}`, data);
    }
    return api.post('/{{entityName}}s', data);
  },

  deleteData: async (id: string): Promise<void> => {
    return api.delete(`/{{entityName}}s/${id}`);
  },
};
