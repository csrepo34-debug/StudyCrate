import api from './api';

export async function login(email, password) {
  const { data } = await api.post('/api/auth/login', { email, password });
  if (typeof window !== 'undefined' && data?.token) {
    localStorage.setItem('token', data.token);
  }
  return data?.user;
}

export async function register(name, email, password) {
  const { data } = await api.post('/api/auth/register', { name, email, password });
  if (typeof window !== 'undefined' && data?.token) {
    localStorage.setItem('token', data.token);
  }
  return data?.user;
}

export async function me() {
  const { data } = await api.get('/api/auth/me');
  return data?.user;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}
