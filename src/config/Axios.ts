import axios from 'axios';

export const AxiosApp = axios.create({
  baseURL: 'http://localhost:4000/taller/',
});
