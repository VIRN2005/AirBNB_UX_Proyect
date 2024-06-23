import axios from 'axios';

const api = axios.create({
  baseURL: 'https://25fe-190-242-26-188.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
