import http from '@/config/axios';

/**
 * OSS图片上传 签名接口
 */

export const getsign = () => http('/dapi/oss/getsign');

/**
 * 登陆
 */

export const login = data => http('/dapi/shiro/login?phone=' + data.phone + '&password=' + data.password, {}, 'POST');

/**
 * 退出
 */

export const signout = () => http('/dapi/shiro/logout', {}, 'DELETE');

/**
 * 根据userToken获取用户菜单权限
 */

export const userfunctions = () => http('/dapi/shiro/userfunctions');

/**
 * 发送短信验证码
 */

export const send = data => http('/dapi/sms/send?phone=' + data.phone + '&type=' + data.type, {}, 'POST');

/**
 * 获取最新的审核结果
 */

export const getcheckinfo = () => http('/dapi/doctor/getcheckinfo');

/**
 * 获取个人信息
 */

export const getinfo = () => http('/dapi/doctor/getinfo');

/**
 * 修改头像
 */

export const updateheadimg = data => http('/dapi/doctor/updateheadimg?headImg=' + data.headImg, {}, 'PUT');

/**
 * 提交认证信息
 */

export const uploadverifyinfo = data => http('/dapi/doctor/uploadverifyinfo', data, 'POST');

/**
 * 获取在售商品列表
 */

export const findinfos = data => http('/dapi/goodsonsale/findinfos?pageSize=' + data.pageSize + '&pageNo=' + data.pageNo + '&parmValue=' + data.parmValue + '&categoryId=' + data.categoryId + '&orderType=0');

/**
 * 根据ID获取商品详情
 */

export const getinfoforgoods = data => http('/dapi/goodsonsale/getinfo/' + data);

/**
 * 根据PID获取子分类列表
 */

export const findinfosbypid = data => http('/dapi/goodscate/findinfosbypid/' + data);

/**
 * 根据会员电话获取会员信息
 */

export const getuserinfo = data => http('/dapi/member/getuserinfo?phone=' + data);

/**
 * 获取用户地址列表
 */

export const findaddress = data => http('/dapi/member/findaddress?userId=' + data);

/**
 * 给病人注册
 */

export const reg = data => http('/dapi/member/reg?phone=' + data.phone + '&smsCode' + data.smsCode, '', 'POST');

/**
 * 给病人下单 提交结算  购物车结算
 */

export const cartsubmit = data => http('/dapi/orders/cartsubmit', data, 'POST');

/**
 * 获取用户订单列表
 */

export const ordersfindinfos = data => http('/dapi/orders/findinfos?parmValue=' + data.parmValue + '&pageSize=' + data.pageSize + '&pageNo=' + data.pageNo + '&userId=' + data.userId + '&orderStatus=' + data.orderStatus + '&datePicker=' + data.datePicker);

/**
 * 根据ID获取订单详情
 */

export const ordersdetailbyid = data => http('/dapi/orders/getinfo/' + data);

/**
 * 获取省市区三级联动
 */

export const prov = () => http('/api/prov');
