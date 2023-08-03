import axios from 'services/axios';

const getGames = async (params) => {
  return await axios.get('/games', { params });
};

export { getGames };
