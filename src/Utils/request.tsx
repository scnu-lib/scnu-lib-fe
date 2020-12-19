import axios from 'axios';
import { getToken } from './auth';
import { serverUrl } from './config';

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 5000,
}); // 创建实例

// 全局请求拦截
// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers.authorization = 'Bearer ' + getToken(); // 请求添加authorization字段
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
// 请求返回后执行
// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export const get = (url: string, params: object) => {
  const config = { params };
  return instance.get(url, config);
};

export const post = (url: string, data: object) => {
  return instance.post(url, data);
};

export const put = (
  url: string,
  params: any = undefined,
  data: any = undefined,
) => {
  const config = {
    params,
  };
  return instance.put(url, config, data);
};

export const del = (url: string, params: any = undefined) => {
  const config = {
    params,
  };
  return instance.delete(url, config);
};
