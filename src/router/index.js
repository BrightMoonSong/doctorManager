import Vue from 'vue';
import Router from 'vue-router';
// 后面的‘login’，相同 chunk名字的模块将会打包到一起，http://www.jb51.net/article/116100.htm
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const dataManagement = r => require.ensure([], () => r(require('@/page/dataManagement')), 'dataManagement');
const drugInquiry = r => require.ensure([], () => r(require('@/page/drugInquiry')), 'drugInquiry');
const online = r => require.ensure([], () => r(require('@/page/online')), 'online');
const myOrder = r => require.ensure([], () => r(require('@/page/myOrder')), 'myOrder');
const onlineSingleOrder = r => require.ensure([], () => r(require('@/page/onlineSingleOrder')), 'onlineSingleOrder');
const myIncome = r => require.ensure([], () => r(require('@/page/myIncome')), 'myIncome');
const changepwd = r => require.ensure([], () => r(require('@/page/changepwd')), 'changepwd');
const credit = r => require.ensure([], () => r(require('@/page/doctor/credit')), 'credit');
const purchase = r => require.ensure([], () => r(require('@/page/doctor/purchase')), 'purchase');
const stockorder = r => require.ensure([], () => r(require('@/page/doctor/stockorder')), 'stockorder');
const qrcode = r => require.ensure([], () => r(require('@/page/paycode/qrcode')), 'qrcode');
const centerpay = r => require.ensure([], () => r(require('@/page/doctor/centerpay')), 'centerpay');

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    component: login
  }, {
    path: '*',
    redirect: '/'
  }, {
    path: '/manage',
    component: manage,
    name: '',
    children: [{
        path: '',
        component: home,
        meta: []
      },
      {
        path: '/dataManagement',
        component: dataManagement,
        meta: ['资料管理']
      },
      {
        path: '/drugInquiry',
        component: drugInquiry,
        meta: ['药品查询']
      },
      {
        path: '/online',
        component: online,
        meta: ['在线咨询']
      },
      {
        path: '/myOrder',
        component: myOrder,
        meta: ['我的订单']
      },
      {
        path: '/onlineSingleOrder',
        component: onlineSingleOrder,
        meta: ['在线下单']
      },
      {
        path: '/myIncome',
        component: myIncome,
        meta: ['我的收益']
      },
      {
        path: '/changepwd',
        component: changepwd,
        meta: ['修改密码']
      },
      {
        path: '/purchase',
        component: purchase,
        meta: ['下单采购']
      },
      {
        path: '/credit',
        component: credit,
        meta: ['信用库存']
      },
      {
        path: '/stockorder',
        component: stockorder,
        meta: ['备货订单']
      },
      {
        path: '/qrcode',
        component: qrcode,
        meta: ['支付']
      },
      {
        path: '/centerpay',
        component: centerpay,
        meta: ['审核中']
      }
    ]
  }]
});
