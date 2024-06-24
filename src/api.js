import axios from 'axios';

const api = axios.create({
  baseURL: 'https://1b3b-2803-4600-1113-2a7-e0d7-8c90-ab14-7b98.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
