<template lang="html">
  <el-dialog title="忘记密码" align="center" top="20vh" width="450px" :visible.sync="forgetpShowThis">
    <el-form :model="forgetForm" :rules="rules2" ref="forgetForm">
      <el-form-item prop="phone">
        <el-input v-model="forgetForm.phone" placeholder="手机号" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item prop="smsCode">
        <el-input placeholder="验证码" v-model="forgetForm.smsCode" :maxlength="6" class="input-with-select">
          <el-button slot="append" v-text="sendText" @click="sendsms"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="新密码" :maxlength="12" v-model="forgetForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" placeholder="再次输入密码" :maxlength="12" v-model="forgetForm.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('forgetForm')" class="submit_btn">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  send,
  shiroforgetpwd
} from '@/api/getData';

export default {
  props: ['forgetpShow'],
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('必须大于6位小于12位'));
        } else {
          if (this.forgetForm.password2 !== '') {
            this.$refs.forgetForm.validateField('password2');
          }
          callback();
        }
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.forgetForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('必须大于6位小于12位'));
        } else {
          callback();
        }
      }
    };
    return { // 1
      forgetpShowThis: this.forgetpShow,
      sendText: '发送验证码',
      setIntervalThis: '',
      forgetForm: {
        'phone': '',
        'smsCode': '',
        'password': '',
        'password2': ''
      },
      rules2: {
        password: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        password2: [{
          validator: validatePass2,
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.forgetForm.phone === '' || this.forgetForm.smsCode === '') {
            this.$notify.error({
              title: '手机号验证码不能为空',
              message: ''
            });
            return;
          }
          let res = await shiroforgetpwd({
            'phone': this.forgetForm.phone,
            'smsCode': this.forgetForm.smsCode,
            'password': this.forgetForm.password2
          });
          if (res.code === 1) {
            this.forgetpShowThis = false;
          }
        } else {
          return false;
        }
      });
    },
    async sendsms() {
      if (this.sendText === '重新发送' || this.sendText === '发送验证码') {
        if (this.forgetForm.phone !== '') {
          if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(this.forgetForm.phone))) {
            this.$notify.error({
              title: '手机号格式不正确',
              message: ''
            });
          } else {
            let res = await send({
              'phone': this.forgetForm.phone,
              'type': 3
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
  beforeDestroy() {
    clearInterval(this.setIntervalThis);
  },
  watch: {
    forgetpShow: function(val, oldVal) { // 2
      this.forgetpShowThis = val;
      if (val) {
        this.sendText = '发送验证码';
        this.setIntervalThis = '';
        this.forgetForm.phone = '';
        this.forgetForm.smsCode = '';
        this.forgetForm.password = '';
        this.forgetForm.password2 = '';
      } else {
        clearInterval(this.setIntervalThis);
      }
    },
    forgetpShowThis(val) { // 3
      this.$emit('myevent', val);
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
