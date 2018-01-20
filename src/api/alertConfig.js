/**
 * 提示语配置信息
 */
let configAlert = {
  '401': '请重新登录',
  '1': '操作成功',
  '-1': '系统错误',
  '-115': '审核中',
  '-102': '密码错误',
  '-101': '账号不存在',
  '-200': '订单状态错误',
  '-204': '订单已支付',
  '-300': '商品已下架',
  '-301': '库存不足',
  '-302': '可用额度不足',
  '-303': '总金额没有达到发货标准',
  '-1001': '手机号格式不正确',
  '-1002': '手机号已注册',
  '-1007': '请稍后重试',
  '-1008': '请稍后重试'
};
/**
 * 根据后台返回值的code值做提示语弹窗
 */
export default code => {
  if (code === 401) {
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
  } else if (code === 1) {
    window.vm.$notify.success({
      title: '操作成功',
      message: ''
    });
  } else {
    if (configAlert[code + '']) {
      window.vm.$notify.error({
        title: configAlert[code + ''],
        message: ''
      });
    }
  }
};
