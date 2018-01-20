<template>
<div class="manage_page fillcontain">
  <el-row style="height: 100%;">
    <el-col :span="4" style="min-height: 100%; background-color: #324057;">
      <el-menu style="min-height: 100%;" theme="dark" :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#324057" text-color="#fff" active-text-color="#ffd04b" router>
        <el-menu-item index="manage" style="border:1px;"><i class="el-icon-menu"></i>首页</el-menu-item>
        <el-menu-item index="dataManagement" style="border:1px;"><i class="el-icon-document"></i>资料管理</el-menu-item>
        <!-- <el-menu-item index="drugInquiry" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-setting"></i>药品查询</el-menu-item> -->
        <!-- <el-menu-item index="online" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-star-on"></i>在线咨询</el-menu-item> -->
        <el-menu-item index="purchase" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-sold-out"></i>下单采购</el-menu-item>
        <el-menu-item index="credit" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-message"></i>信用库存</el-menu-item>
        <el-menu-item index="stockorder" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-goods"></i>备货订单</el-menu-item>
        <el-menu-item index="onlineSingleOrder" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-plus"></i>在线下单</el-menu-item>
        <el-menu-item index="myOrder" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-edit"></i>我的订单</el-menu-item>
        <el-menu-item index="myIncome" style="border:1px;" v-show="navshow.isshow"><i class="el-icon-warning"></i>我的收益</el-menu-item>

        <!-- <el-submenu index="2">
          <template slot="title"><i class="el-icon-document"></i>数据管理</template>
          <el-menu-item index="userList">用户列表</el-menu-item>
          <el-menu-item index="shopList">商家列表</el-menu-item>
          <el-menu-item index="foodList">食品列表</el-menu-item>
          <el-menu-item index="orderList">订单列表</el-menu-item>
          <el-menu-item index="adminList">管理员列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
          <el-menu-item index="addShop">添加商铺</el-menu-item>
          <el-menu-item index="addGoods">添加商品</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-star-on"></i>图表</template>
          <el-menu-item index="visitor">用户分布</el-menu-item>
          <el-menu-item index="newMember">用户数据</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-edit"></i>编辑</template>
          <el-menu-item index="uploadImg">上传图片</el-menu-item>
          <el-menu-item index="vueEdit">文本编辑</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-setting"></i>设置</template>
          <el-menu-item index="adminSet">管理员设置</el-menu-item>
          <el-menu-item index="sendMessage">发送通知</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title"><i class="el-icon-warning"></i>说明</template>
          <el-menu-item index="explain">说明</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-col>
    <el-col :span="20" style="height: 100%;overflow: auto;">
      <head-top></head-top>
      <!-- <keep-alive> -->
      <router-view></router-view>
      <!-- </keep-alive> -->
    </el-col>
  </el-row>
</div>
</template>

<script>
import headTop from '../common/headTop';
import img from '@/assets/4.jpg';
import {
  // userfunctions,
  getinfo
} from '@/api/getData';
import {
  mapState
} from 'vuex';

export default {
  computed: {
    ...mapState(['navshow', 'adminInfo']),
    defaultActive: function() {
      if (!this.navshow.isshow) {
        let arrPath = ['/drugInquiry', '/online', '/myOrder', '/onlineSingleOrder', '/myIncome', '/purchase', '/credit', '/stockorder', '/qrcode', '/centerpay'];
        arrPath.forEach(val => {
          if (val === this.$route.path) {
            this.$router.push('manage');
            return false;
          }
        });
      }
      return this.$route.path.replace('/', '');
    }
  },
  mounted() {
    this.userfunctions();
    this.getinfo();
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    async userfunctions() {
      // let res = await userfunctions();
      // console.log(res);
    },
    async getinfo() {
      let res = await getinfo();
      if (res.code === 0) {
        if (res.data) {
          if (res.data.headImg) {
            this.adminInfo.avatar = res.data.headImg;
          } else {
            this.adminInfo.avatar = img;
          }
          if (res.data.status !== 2) {
            this.navshow.isshow = false;
          } else {
            this.navshow.isshow = true;
          }
        }
      }
    }
  },
  components: {
    headTop
  }
};
</script>


<style lang="less" scoped>
@import '../style/mixin';
.manage_page {}
</style>
