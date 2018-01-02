import axios from 'axios';
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
  switch (response.data.code) {
    case 401:
      // 1.5秒内不让他弹出‘重新登录’两次
      let pan = false;
      if (window.login401) {
        if (window.login401 === 2) {
          pan = true;
        }
      } else {
        pan = true;
      }
      if (pan) {
        window.login401 = 1;
        window.vm.$notify.error({
          title: '请重新登录',
          message: ''
        });
        setTimeout(() => {
          window.vm.$router.push('/');
          window.login401 = 2;
        }, 1500);
      }
      break;
    case 0:
      // console.log(0);
      break;
    case 1:
      window.vm.$notify.success({
        title: '操作成功',
        message: ''
      });
      break;
    case -1:
      window.vm.$notify.error({
        title: '系统错误',
        message: ''
      });
      break;
    case -115:
      window.vm.$notify.error({
        title: '审核中',
        message: ''
      });
      break;
    case -102:
      window.vm.$notify.error({
        title: '密码错误',
        message: ''
      });
      break;
    case -300:
      window.vm.$notify.error({
        title: '商品已下架',
        message: ''
      });
      break;
    case -301:
      window.vm.$notify.error({
        title: '库存不足',
        message: ''
      });
      break;
    case -302:
      window.vm.$notify.error({
        title: '可用额度不足',
        message: ''
      });
      break;
    case -303:
      window.vm.$notify.error({
        title: '总金额没有达到发货标准',
        message: ''
      });
      break;
    case -1001:
      window.vm.$notify.error({
        title: '手机号格式不正确',
        message: ''
      });
      break;
    case -1002:
      window.vm.$notify.error({
        title: '手机号已注册',
        message: ''
      });
      break;
    case -1007:
      window.vm.$notify.error({
        title: '请稍后重试',
        message: ''
      });
      break;
    default:
      console.log(response.data.code);
  }
  return response.data;
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
