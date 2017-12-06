<template>
<div>
  <el-dialog title="请填写病人手机收到的验证码" top="5vh" :visible.sync="dialogShowOrHideThis">
    <el-form :model="smsCode">
      <el-form-item>
        <el-input placeholder="验证码" v-model="smsCode" class="input-with-select">
          <el-button @click="sendSmsCode" :disable="disableThis" slot="append" v-text="countDown"></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="medium" @click="okSmsCode">确 认</el-button>
      <el-button type="warning" size="medium" @click="dialogShowOrHideThis = false">取 消</el-button>
    </div>
    <div class="clearfix"></div>
  </el-dialog>
  <downorder :downifShow="downifShow" :sizeForm="sizeForm" :selectedGoods="selectedGoods" :imageUrl="imageUrl"></downorder>
</div>
</template>

<script>
import {
  send,
  reg
} from '@/api/getData';
import downorder from '@/page/popup/downOrder';

export default {
  // 由于vue2.0 props 无法让子组件与父组件实现双向绑定，容易报错，所以要自定义方法去实现双向绑定，步骤分别是1234，其中第四步在父组件
  props: ['phone', 'dialogShowOrHide', 'sizeForm', 'selectedGoods', 'imageUrl'],
  data() {
    return { // 1
      dialogShowOrHideThis: this.dialogShowOrHide,
      countDown: '60秒',
      countNum: 60,
      disableThis: true,
      downifShow: false,
      smsCode: '',
      setIntervalThis: ''
    };
  },
  watch: {
    dialogShowOrHide: function(val, oldVal) { // 2
      this.dialogShowOrHideThis = val;
      if (val) {
        this.countNum = 60;
        this.setIntervalThis = setInterval(() => {
          this.countDownFun();
        }, 1000);
      }
    },
    dialogShowOrHideThis(val) { // 3
      this.$emit('dialog', val);
    }
  },
  mounted() {
    if (this.dialogShowOrHideThis) {
      this.setIntervalThis = setInterval(() => {
        this.countDownFun();
      }, 1000);
    }
  },
  components: {
    downorder
  },
  methods: {
    async okSmsCode() {
      let res = await reg({
        'phone': this.phone,
        'smsCode': this.smsCode
      });
      switch (res.code) {
        case 1:
          this.$notify.success({
            title: '注册成功',
            message: ''
          });
          break;
        case -1:
          this.$notify.error({
            title: '系统错误',
            message: ''
          });
          break;
        case -1001:
          this.$notify.error({
            title: '手机号格式错误',
            message: ''
          });
          break;
        case -1002:
          this.$notify.error({
            title: '手机号已被注册',
            message: ''
          });
          break;
        case -1003:
          this.$notify.error({
            title: '验证码错误',
            message: ''
          });
          break;
        default:
          this.$notify.error({
            title: '服务器忙',
            message: ''
          });
      }
    },
    sendSmsCode() {
      if (this.countDown === '重新发送') {
        this.countNum = 60;
        this.onRegSend();
        this.setIntervalThis = setInterval(() => {
          this.countDownFun();
        }, 1000);
      }
    },
    async onRegSend() {
      let res = await send({
        'phone': this.phone,
        'type': 1
      });
      if (res.code === 0) {
        this.$notify.success({
          title: '验证码已发送请注意查收！',
          message: ''
        });
      } else {
        this.$notify.error({
          title: '服务器忙！',
          message: '请稍后重试'
        });
      }
    },
    countDownFun() {
      this.countNum--;
      if (this.countNum === 0) {
        this.countDown = '重新发送';
        this.disableThis = false;
        console.log('clearInterval');
        clearInterval(this.setIntervalThis);
      } else {
        console.log(this.countDown);
        this.countDown = this.countNum + '秒';
        this.disableThis = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
}
</style>
