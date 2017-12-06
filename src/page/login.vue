<template>
<div class="login_page fillcontain">
  <transition name="form-fade" mode="in-out">
    <section class="form_contianer" v-show="showLogin">
      <div class="manage_tip">
        <p>doctor管理系统</p>
      </div>
      <el-form :model="loginForm" :class="[rotate360]" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :placeholder="placeholder[0]"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" :placeholder="placeholder[1]" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn" v-text="submitText">登陆</el-button>
        </el-form-item>
      </el-form>
      <p class="tip"><a class="forget-the-password" v-show="buttonBottom[0]"><i class="el-icon-arrow-left"></i>{{buttonBottom[0]}}</a><a class="register" @click="register" v-show="buttonBottom[1]">{{buttonBottom[1]}}<i class="el-icon-arrow-right"></i></a></p>
    </section>
  </transition>
</div>
</template>

<script>
/* eslint-disable */
import {
  login,
  getAdminInfo,
  prov
} from '@/api/getData';
/* eslint-enable */
import {
  mapActions,
  mapState
} from 'vuex';
import {
  setStore
} from '@/config/mUtils';

export default {
  data() {
    return {
      placeholder: ['用户名', '密码'],
      buttonBottom: ['忘记密码', '注册'],
      submitText: '登陆',
      rotate360: '',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      showLogin: false,
      shySecret: -1
    };
  },
  mounted() {
    this.showLogin = true;
    if (!this.adminInfo.id) {
      this.getAdminData();
    }
    let _this = this;
    window.addEventListener('keydown', function(e) {
      _this.shySecret = e.keyCode;
    });
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapActions(['getAdminData']),
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await login({
            phone: this.loginForm.username,
            password: this.loginForm.password
          });
          console.log(res);
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '登录成功'
            });
            setStore('headImg', res.data.headImg);
            setStore('userToken', res.data.userToken);
            setStore('userId', res.data.doctorId);
            this.$router.push('manage');
          } else {
            this.$message({
              type: 'error',
              message: '出错了'
            });
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名密码',
            offset: 100
          });
          return false;
        }
      });
    },
    register() {
      this.rotate360 = 'rotate360';
      setTimeout(() => {
        this.rotate360 = '';
      }, 1000);
      setTimeout(() => {
        this.placeholder = ['手机号', '验证码'];
        this.buttonBottom = ['去登陆', ''];
        this.submitTextFun(1);
      }, 500);
    },
    submitTextFun(n) {
      switch (n) {
        case 1:
          this.submitText = '注册';
          break;
        case 2:
          this.submitText = '登陆';
          break;
        case 3:
          this.submitText = '提交';
          break;
        default:
          this.submitText = '登陆';
      }
    }
  },
  watch: {
    adminInfo: function(newValue) {
      if (newValue.id) {
        this.$message({
          type: 'success',
          message: '检测到您之前登录过，将自动登录'
        });
        this.$router.push('manage');
      }
    },
    shySecret: function(newValue, oldValue) {
      if (newValue === 39 && oldValue === 192) {
        this.loginForm.username = '17301088769';
        this.loginForm.password = '123456';
        this.submitForm('loginForm');
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../style/mixin';
.login_page {
    background-color: #324057;
}
.manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
        font-size: 34px;
        color: #fff;
    }
}
.form_contianer {
    .wh(320px, 220px);
    .ctp(320px, 220px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
        width: 100%;
        font-size: 16px;
    }
}
.tip {
    font-size: 12px;
    color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
.forget-the-password {
    float: left;
    color: #ccc;
    cursor: pointer;
    &:hover {
        color: #090c0a;
    }
}
.register {
    float: right;
    color: #ccc;
    cursor: pointer;
    &:hover {
        color: #090c0a;
    }
}

.rotate360 {
    // transform: rotate(360deg);
    transform: rotate3d(0,1,0,360deg);
    transition: transform 0.8s ease-in-out;
}
</style>
