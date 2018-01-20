<template>
<el-dialog title="注册" align="center" top="20vh" width="450px" :visible.sync="myregShow">
  <el-form>
    <el-form-item>
      <el-input v-model="registerForm.recommendPhone" :maxlength="11" placeholder="推荐人手机号（没有的话可不填）"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="registerForm.phone" :maxlength="11" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="验证码" v-model="registerForm.smsCode" :maxlength="6" class="input-with-select">
        <el-button slot="append" v-text="sendText" @click="sendsms"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" placeholder="密码" :maxlength="12" v-model="registerForm.password" @keyup.enter.native="submitForm"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm" class="submit_btn">注册</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<script>
import {
  send,
  shiroreg
} from '@/api/getData';

export default {
  props: ['regShow'],
  data() {
    return {
      myregShow: this.regShow,
      sendText: '发送验证码',
      setIntervalThis: '',
      registerForm: {
        'phone': '',
        'recommendPhone': '',
        'smsCode': '',
        'password': ''
      }
    };
  },
  methods: {
    async submitForm() {
      // console.log(this.registerForm);
      if (this.registerForm.phone === '' || this.registerForm.smsCode === '' || this.registerForm.password === '') {
        this.$notify.error({
          title: '手机号、验证码、密码都必填!',
          message: ''
        });
        return;
      }
      if (this.registerForm.recommendPhone !== '') {
        if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(this.registerForm.recommendPhone))) {
          this.$notify.error({
            title: '推荐人手机号格式不正确',
            message: ''
          });
          return;
        }
      }
      let res = await shiroreg({
        'recommendPhone': this.registerForm.recommendPhone,
        'phone': this.registerForm.phone,
        'smsCode': this.registerForm.smsCode,
        'password': this.registerForm.password
      });
      // console.log('注册');
      // console.log(res);
      if (res.code === 1) {
        this.myregShow = false;
      }
    },
    async sendsms() {
      if (this.sendText === '重新发送' || this.sendText === '发送验证码') {
        if (this.registerForm.phone !== '') {
          if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.registerForm.phone))) {
            this.$notify.error({
              title: '手机号格式不正确',
              message: ''
            });
          } else {
            let res = await send({
              'phone': this.registerForm.phone,
              'type': 2
            });
            if (res.code === 0) {
              this.sendText = '60秒';
              let num = 60;
              this.setIntervalThis = setInterval(() => {
                num--;
                if (num === 0) {
                  this.sendText = '重新发送';
                  clearInterval(this.setIntervalThis);
                } else {
                  this.sendText = num + '秒';
                }
              }, 1000);
            }
          }
        } else {
          this.$notify.error({
            title: '手机号不能为空',
            message: ''
          });
        }
      }
    }
  },
  watch: {
    regShow: function(newVal, old) {
      this.myregShow = newVal;
    },
    myregShow(newVal, old) {
      this.$emit('myevent', newVal);
    }
  }
};
</script>

<style lang="css" scoped>
.submit_btn {
    width: 100%;
    font-size: 16px;
}
</style>
