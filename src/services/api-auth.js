import axios from 'services/axios';

export const login = async (params) => {
  return await axios.post('/auth/signin', params);
};

export const logout = async () => {
  return await axios.delete('/auth/logout');
};

export const isAuthenticated = async () => {
  return await axios.get('/auth/is-authenticated');
};

export const forgotPassword = async (params) => {
  return await axios.post('/auth/restore-password', params);
};

export const resetPassword = async (params) => {
  return await axios.patch('/auth/restore-password', params);
};
