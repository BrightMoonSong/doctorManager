import http from '@/config/axios';

/**
 * OSS图片上传 签名接口
 */

export const getsign = () => http('/dapi/oss/getsign');

/**
 * 根据PID获取子区域列表
 */

export const findareabypid = data => http('/dapi/area/findinfosbypid/' + data);

/**
 * 登陆
 */

export const login = data => http('/dapi/shiro/login?phone=' + data.phone + '&password=' + data.password, {}, 'POST');

/**
 * 退出
 */

export const signout = () => http('/dapi/shiro/logout', {}, 'DELETE');

/**
 * 医生注册
 */

export const shiroreg = data => http('/dapi/shiro/reg?phone=' + data.phone + '&smsCode=' + data.smsCode + '&password=' + data.password, {}, 'POST');

/**
 * 医生修改密码
 */

export const changepwd = data => http('/dapi/shiro/changepwd?&oldPassword=' + data.oldPassword + '&newPassword=' + data.newPassword, {}, 'POST');

/**
 * 医生忘记密码
 */

export const shiroforgetpwd = data => http('/dapi/shiro/forgetpwd?phone=' + data.phone + '&smsCode=' + data.smsCode + '&newPassword=' + data.password, {}, 'POST');

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
 * 获取医生类型id和名称列表
 */

export const findtypenames = () => http('/dapi/doctor/findtypenames');

/**
 * 修改头像
 */

export const updateheadimg = data => http('/dapi/doctor/updateheadimg?headImg=' + data.headImg, {}, 'PUT');

/**
 * 提交认证信息
 */

export const uploadverifyinfo = data => http('/dapi/doctor/uploadverifyinfo', data, 'POST');

/**
 * 添加银行卡信息
 */

export const addbankcard = data => http('/dapi/doctor/addbankcard', data, 'POST');

/**
 * 删除银行卡信息
 */

export const deletebankcard = data => http('/dapi/doctor/deletebankcard?bankCardId=' + data, '', 'PUT');

/**
 * 根据银行卡号获取银行名称
 */

export const getbankname = data => http('/dapi/doctor/getbankname?cardNo=' + data);

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

export const ordersfindinfos = data => http('/dapi/orders/findinfos?parmValue=' + data.parmValue + '&minTime=' + data.minTime + '&maxTime=' + data.maxTime + '&pageSize=' + data.pageSize + '&pageNo=' + data.pageNo + '&userId=' + data.userId + '&orderStatus=' + data.orderStatus);

/**
 * 根据ID获取订单详情
 */

export const ordersdetailbyid = data => http('/dapi/orders/getinfo?orderId=' + data);

/**
 * 获取医生自己的商品列表
 */

export const findinfoself = data => http('/dapi/goods/findinfos?pageSize=' + data.pageSize + '&pageNo=' + data.pageNo + '&parmValue=' + data.parmValue + '&categoryId=' + data.categoryId + '&orderType=0');

/**
 * doctor-goods-controller : 医生信用库存商品管理
 * 根据ID获取商品详情
 */

export const getinfoself = data => http('/dapi/goods/getinfo?goodsid=' + data);

/**
 * 医生备货订单
 * 提交备货订单
 */

export const cartsubmitself = data => http('/dapi/doctororders/cartsubmit', data, 'POST');

/**
 * 医生备货订单
 * 获取用户订单列表
 */

export const findinfoordersself = data => http('/dapi/doctororders/findinfos?pageSize=' + data.pageSize + '&pageNo=' + data.pageNo + '&maxTime=' + data.maxTime + '&minTime=' + data.minTime + '&orderStatus=' + data.orderStatus);

/**
 * 医生备货订单
 * 根据ID获取订单详情
 */

export const getinfodoctororder = data => http('/dapi/doctororders/getinfo?orderId=' + data);

/**
 * 医生备货订单
 * 获取物流信息
 */

export const getlogisticsdoctororder = data => http('/dapi/doctororders/getlogistics?orderId=' + data);

/**
 * 医生备货订单
 * 确认收货
 */

export const receive = data => http('/dapi/doctororders/receive?orderId=' + data, {}, 'PUT');

/**
 * 模拟微信扫码支付获取二维码链接接口
 */

export const getpaycode = data => http('/dapi/orders/getpaycode?orderId=' + data);

/**
 * 模拟微信扫码支付心跳接口
 */

export const getpaystatus = data => http('/dapi/orders/getpaystatus?orderId=' + data);
