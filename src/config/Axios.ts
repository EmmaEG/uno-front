import axios from 'axios';

export const AxiosApp = axios.create({
  baseURL: 'https://uno-api-three.vercel.app',
});
