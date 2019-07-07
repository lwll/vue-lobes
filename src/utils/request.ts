import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 50000
});

service.interceptors.request.use((config: AxiosRequestConfig) => config);

service.interceptors.response.use((response: AxiosResponse) => {
  return  response;
}, (error: any) => {
  return Promise.reject(error);
});

export default service;
