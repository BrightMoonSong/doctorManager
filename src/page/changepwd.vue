<template lang="html">
  <div class="box">
    <h3 class="centerTitle">修改密码</h3>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldpass">
        <el-input type="password" :maxlength="12" v-model="ruleForm2.oldpass"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" :maxlength="12" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" :maxlength="12" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="margin">
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  changepwd
} from '@/api/getData';

export default {
  data() {
    let checkPassValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入旧密码'));
      }
      setTimeout(() => {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('必须大于6位小于12位'));
        } else {
          callback();
        }
      }, 200);
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('必须大于6位小于12位'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('必须大于6位小于12位'));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        oldpass: ''
      },
      rules2: {
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],
        oldpass: [{
          validator: checkPassValidate,
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await changepwd({
            'oldPassword': this.ruleForm2.oldpass,
            'newPassword': this.ruleForm2.pass
          });
          if (res.code === -1005) {
            this.$notify({
              type: 'error',
              title: '旧密码输入有误',
              message: ''
            });
          } else if (res.code === 1) {
            this.$router.push('login');
          }
          // console.log(res);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 600px;
    margin: 0 auto;
    padding-top: 8%;
    .demo-ruleForm {
        padding: 30px;
        .margin {
            display: table;
            text-align: center;
            margin: 0 auto;
        }
    }
    .centerTitle{
      text-align: center;
    }
}
</style>
