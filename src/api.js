import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ed90-190-242-25-171.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
