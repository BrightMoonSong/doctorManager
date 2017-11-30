import ax from '@/config/axios';
/**
 * OSS图片上传 签名接口
 */

export const getsign = () => ax('/mapi/oss/getsign');

/**
 * 登陆
 */

export const login = data => ax('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => ax('/admin/singout');

/**
 * 测试
 */

// export const seller = () => ax('/api/seller');

/**
 * 获取省市区三级联动
 */

export const prov = () => ax('/api/prov');
