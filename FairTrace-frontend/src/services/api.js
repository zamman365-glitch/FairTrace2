import axios from 'axios';

const API = axios.create({
  baseURL: 'https://fairtrace2-3.onrender.com',
});

export const uploadFiles = async (formData) => {
  const { data } = await API.post('/upload', formData);
  return data;
};

export const startAudit = (sessionId) => API.post('/audit/start', { sessionId });
export const getAuditDetails = (sessionId) => API.get(`/audit/${sessionId}`);
export const getHistory = () => API.get('/audit/history');
