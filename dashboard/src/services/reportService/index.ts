import axios, { InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../../utils/getToken';

interface MyAxiosRequestConfig extends InternalAxiosRequestConfig {
  __isIntercepted?: boolean;
}


const $reportHost = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/message`
});


$reportHost.interceptors.request.use(async (config: MyAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  if (!config?.headers) {
    throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
  }
  let userData = getToken();

  if (userData && !config.__isIntercepted) {
    if (config.headers['If-Modified-Since']) {
      return config;
    }
    config.headers.authorization = `Bearer ${userData?.token}`;
    config.__isIntercepted = true;
  }
  return config;
});

export default $reportHost;