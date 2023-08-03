import axios from 'services/axios';
import { getFormData } from 'utils/helpers';

export const getNotifications = async (params) => {
  return await axios.get('/notifications', { params });
};

export const getAlertsByDateRange = async (params) => {
  return await axios.get('/notifications/by-date', { params });
};

export const getLatestNotification = async (params) => {
  return await axios.get('/notifications/latest', { params });
};

export const createNotification = async (params) => {
  return await axios.post('/notifications/broadcast', getFormData(params), {
    header: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getScheduledNotifications = async (params) => {
  return await axios.get('/notifications/schedule/scheduled', { params });
};

export const getLatestScheduledNotifications = async () => {
  return await axios.get('/notifications/scheduled/latest');
};

export const createScheduledNotification = async (params) => {
  return await axios.post('/notifications/schedule', getFormData(params), {
    header: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateScheduledAlert = async (id, params) => {
  return await axios.put(`/notifications/schedule/${id}`, getFormData(params), {
    header: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteScheduledAlert = async (id) => {
  return await axios.delete(`/notifications/schedule/${id}`);
};

export const getAccelerometerData = async (params) => {
  return await axios.get('/accelerometer', { params });
};

export const createSavedAlert = async (params) => {
  return await axios.post('/notifications/saved', getFormData(params), {
    header: { 'Content-Type': 'multipart/form-data' },
  });
};

export const sendSavedAlert = async (id) => {
  return await axios.post(`/notifications/saved/${id}/send`);
};

export const updateSavedAlert = async (id, params) => {
  return await axios.put(`/notifications/saved/${id}`, getFormData(params), {
    header: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteSavedAlert = async (id) => {
  return await axios.delete(`/notifications/saved/${id}`);
};

export const readGamedayPresets = async () => {
  return await axios.get('/notifications/gameday-theme/admin-panel');
};

export const uploadGamedayPresets = async (files) => {
  return await axios.post(
    '/notifications/gameday-theme',
    getFormData({ files }),
    { header: { 'Content-Type': 'multipart/form-data' } }
  );
};
