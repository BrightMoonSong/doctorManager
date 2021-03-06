// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '@/api/interceptors.js';

// import Kiko from 'kiko-rascalhao';
import QRCode from 'qrcode';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store/store';
import drag from '@/config/drag.js';
import lodimg from '@/config/lodimg.js';
import bigimg from '@/config/bigimg.js';
Vue.directive('drag', drag);
Vue.directive('lodimg', lodimg);
Vue.directive('bigimg', bigimg);
// Vue.use(Kiko);
Vue.use(QRCode);
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 过滤器--全局
Vue.filter('money', (value, type) => value === '' ? 0 : '￥' + value.toFixed(2) + type);
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store, // 使用store
  template: '<App/>',
  components: {
    App
  }
});
