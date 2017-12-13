import axios from 'axios';
import {
  getStore
} from '@/config/mUtils';

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  // console.log('interceptors request');
  // console.log(config);
  // console.log(config.url);
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
  // console.log('interceptors error');
  // console.log(error);
  // debugger;
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  // console.log('interceptors response');
  // console.log(response);
  // warning  success  info
  if (response.data.code === 401) {
    window.vm.$notify.error({
      title: '401',
      message: '请重新登录'
    });
    setTimeout(() => {
      window.vm.$router.push('/');
    }, 2000);
  }
  if (response.data.code === -1) {
    window.vm.$notify.error({
      title: '-1',
      message: '系统错误'
    });
  }
  if (response.data.code === -115) {
    window.vm.$notify.error({
      title: '-115',
      message: '审核中'
    });
  }
  if (response.data.code === 1) {
    window.vm.$notify.success({
      title: '1',
      message: '操作成功'
    });
  }
  return response.data;
}, function(error) {
  // 对响应错误做点什么
  // console.log('interceptors response error');
  // console.log(error);
  return Promise.reject(error);
});
