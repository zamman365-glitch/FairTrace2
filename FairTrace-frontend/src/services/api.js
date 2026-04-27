import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const uploadFiles = async (formData) => {
  const { data } = await API.post('/upload', formData);
  return data;
};

export const startAudit = (sessionId) => API.post('/audit/start', { sessionId });
export const getAuditDetails = (sessionId) => API.get(`/audit/${sessionId}`);
export const getHistory = () => API.get('/audit/history');