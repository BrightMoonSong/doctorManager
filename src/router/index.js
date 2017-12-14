import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/page/HelloWorld';

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
// const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');

const dataManagement = r => require.ensure([], () => r(require('@/page/dataManagement')), 'dataManagement');
const drugInquiry = r => require.ensure([], () => r(require('@/page/drugInquiry')), 'drugInquiry');
const online = r => require.ensure([], () => r(require('@/page/online')), 'online');
const myOrder = r => require.ensure([], () => r(require('@/page/myOrder')), 'myOrder');
const onlineSingleOrder = r => require.ensure([], () => r(require('@/page/onlineSingleOrder')), 'onlineSingleOrder');
const myIncome = r => require.ensure([], () => r(require('@/page/myIncome')), 'myIncome');
const test = r => require.ensure([], () => r(require('@/page/test')), 'test');
const trans = r => require.ensure([], () => r(require('@/page/transitionTest')), 'trans');
const changepwd = r => require.ensure([], () => r(require('@/page/changepwd')), 'changepwd');

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
      //  {
      //   path: '/uploadImg',
      //   component: uploadImg,
      //   meta: ['文本编辑', 'MarkDown']
      // },
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
        path: '/test',
        component: test,
        meta: ['test']
      },
      {
        path: '/trans',
        component: trans,
        meta: ['trans']
      }
    ]
  }]
});
