import axios from 'services/axios';

export const readFanbandsStatistics = async () => {
  return await axios.get('/users/statistics');
};

export const readFanbands = async (params) => {
  return await axios.get('/users', { params });
};
