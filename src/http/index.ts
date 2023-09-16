import axios from 'axios';

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const $api = axios.create({
  baseURL: SERVER_URL,
});
