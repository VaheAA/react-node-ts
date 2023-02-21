import axios, { InternalAxiosRequestConfig } from 'axios';

const $userHost = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`
});



export default $userHost;