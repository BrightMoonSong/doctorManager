import axios from 'axios';
import alertConfig from './alertConfig';
import {
  getStore
} from '@/config/mUtils';

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  let userToken = getStore('userToken');
  if (config.url.indexOf('?') < 0) {
    if (config.url.indexOf('userToken') < 0) {
      config.url += '?userToken=' + userToken;
    }
  } else {
    if (config.url.indexOf('userToken') < 0) {
      config.url += '&userToken=' + userToken;
    }
  }
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  alertConfig(response.data.code);
  return response.data;
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
