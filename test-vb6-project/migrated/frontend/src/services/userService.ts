import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  userId: string;
  userName: string;
  email: string;
  lastLogin?: string;
}

export interface UserListItem {
  userId: string;
  userName: string;
  email: string;
  deptName: string;
}

export const userService = {
  // ValidateUser → POST /api/users/validate
  validateUser: async (userId: string, password: string): Promise<boolean> => {
    const response = await api.post('/users/validate', { userId, password });
    return response.data.isValid;
  },

  // GetUserList → GET /api/users?deptCode=...
  getUserList: async (deptCode: string): Promise<UserListItem[]> => {
    const response = await api.get('/users', { params: { deptCode } });
    return response.data;
  },

  // GetUserCount → GET /api/users/count?deptCode=...
  getUserCount: async (deptCode: string, includeInactive?: boolean): Promise<number> => {
    const response = await api.get('/users/count', {
      params: { deptCode, includeInactive }
    });
    return response.data.count;
  },
};
