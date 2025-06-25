import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const login = (email: string, password: string) =>
  axios.post(`${API}/auth/login`, { email, password });

export const register = (email: string, password: string) =>
  axios.post(`${API}/auth/register`, { email, password });
