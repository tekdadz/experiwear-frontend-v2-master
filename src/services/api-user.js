import axios from 'services/axios';

const getUsers = async () => {
  return await axios.get('/api/users');
};

const getUser = async (_id) => {
  return await axios.get(`/api/users/${_id}`);
};

const addUser = async (params) => {
  return await axios.post('/api/users', params);
};

const editUser = async (params) => {
  return await axios.put('/api/users', params);
};

const removeUser = async (_id) => {
  return await axios.delete('/api/users', { params: { _id } });
};

export { getUsers, getUser, addUser, editUser, removeUser };
