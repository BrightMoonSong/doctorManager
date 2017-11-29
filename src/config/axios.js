import axios from 'axios';
import {
  baseUrl
} from './env';

export default async (url = '', data = {}, type = 'GET') => {
  // type = type.toUpperCase();
  type = type.toLowerCase();
  // 用法：https://www.cnblogs.com/zhouyangla/p/6753673.html；；；https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/

  // 发送一个 type(POST) 请求
  return axios({
    method: type,
    baseURL: baseUrl,
    url: url,
    data: data,
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }).then((response) => {
    return response;
  }).then((res) => {
    return res;
  });
  /**
   * 请求方法别名
   * 为了方便起见，已经为所有支持的请求方法提供了别名。
   * 当使用别名方法时，不需要在config中指定url，method和data属性。
   * axios.request（config）
   * axios.get（url [，config]）
   * axios.delete（url [，config]）
   * axios.head（url [，config]）
   * axios.post（url [，data [，config]]）
   * axios.put（url [，data [，config]]）
   * axios.patch（url [，data [，config]]）
   *
   * 并发
   * 帮助函数处理并发请求。
   * axios.all（iterable）
   * axios.spread（callback）
   */
};
