<template>
<div>
  <div class="fillcontain">
    <header class="admin_title">个人信息</header>
    <div class="admin_set">
      <el-tabs tab-position="top">
        <el-tab-pane label="基本信息">
          <ul>
            <li>
              <span>姓名：</span>
              <el-input style="width:50%;" v-model="adminInfo.userName" :disabled="editStart" placeholder="请输入姓名"></el-input>
            </li>
            <li>
              <span>类型：</span>
              <el-input style="width:50%;" v-model="adminInfo.type" :disabled="editStart" placeholder="请输入类型"></el-input>
            </li>
            <li>
              <span>性别：</span>
              <el-radio v-model="adminInfo.sex" :disabled="editStart" label="1">男</el-radio>
              <el-radio v-model="adminInfo.sex" :disabled="editStart" label="2">女</el-radio>
            </li>
            <li>
              <span>出生日期：</span>
              <el-date-picker v-model="adminInfo.birthday" :disabled="editStart" type="date" :picker-options="pickerOptions1" placeholder="选择出生日期">
              </el-date-picker>
            </li>
            <li class="headerImg">
              <span style="vertical-align: top;">头像：</span>
              <el-upload class="avatar-uploader inline-this" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :disabled="editStart" :on-success="uploadImg" :limit="1" :before-upload="beforeImgUpload">
                <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="联系方式">
          <ul>
            <li>
              <span>手机：</span>
              <el-input style="width:50%;" v-model="adminInfo.phone1" :disabled="editStart" placeholder="请输入手机号码"></el-input>
            </li>
            <li>
              <span>座机：</span>
              <el-input style="width:50%;" v-model="adminInfo.phone2" :disabled="editStart" placeholder="请输入座机号码"></el-input>
            </li>
            <li>
              <span>详细地址：</span>
              <el-input style="width:50%;" v-model="adminInfo.adress" :disabled="editStart" placeholder="请输入详细地址"></el-input>
            </li>
            <li>
              <span>所属服务机构：</span>
              <el-input style="width:50%;" v-model="adminInfo.serviceMechanism" :disabled="editStart" placeholder="请输入所属服务机构"></el-input>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="证件信息">
          <ul>
            <li class="el-col el-col-8">
              <span>乡村医生证：</span>
              <el-upload class="avatar-uploader" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :disabled="editStart" :on-success="uploadImg" :limit="1" :before-upload="beforeImgUpload">
                <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
            <li class="el-col el-col-8">
              <span>健康证：</span>
              <el-upload class="avatar-uploader" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :disabled="editStart" :on-success="uploadImg" :limit="1" :before-upload="beforeImgUpload">
                <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
            <li class="el-col el-col-8">
              <span>健康证：</span>
              <el-upload class="avatar-uploader" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :disabled="editStart" :on-success="uploadImg" :limit="1" :before-upload="beforeImgUpload">
                <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
            <li style="clear:both;padding: 0;"></li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="结算信息">
          <ul>
            <li>
              <span>开户银行：</span>
              <el-select v-model="value8" :disabled="editStart" filterable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>开户地址：</span>
              <el-cascader :options="options2" :disabled="editStart" v-model="selectedOptions3"></el-cascader>
            </li>
            <li>
              <span>支行名称：</span>
              <el-autocomplete class="inline-input" :disabled="editStart" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入支行名称" :trigger-on-focus="false" @select="handleSelect" style="min-width: 204px;"></el-autocomplete>
            </li>
            <li>
              <span>银行账号：</span>
              <el-input style="width:55%;" v-model="input" :disabled="editStart" placeholder="请输入银行账号"></el-input>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
      <!-- <h4>基本信息：</h4>
      <ul>
        <li>
          <span>姓名：</span><span>{{adminInfo.user_name}}</span>
        </li>
        <li>
          <span>类型：</span><span>{{adminInfo.create_time}}</span>
        </li>
        <li>
          <span>性别：</span><span>{{adminInfo.admin}}</span>
        </li>
        <li>
          <span>出生日期：</span><span>{{adminInfo.id}}</span>
        </li>
        <li class="headerImg">
          <span style="vertical-align: top;">头像：</span>
          <el-upload class="avatar-uploader inline-this" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :on-success="uploadImg" :before-upload="beforeImgUpload">
            <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
      <h4>联系方式：</h4>
      <ul>
        <li>
          <span>手机：</span><span>{{adminInfo.user_name}}</span>
        </li>
        <li>
          <span>座机：</span><span>{{adminInfo.create_time}}</span>
        </li>
        <li>
          <span>详细地址：</span><span>{{adminInfo.admin}}</span>
        </li>
        <li>
          <span>所属服务机构：</span><span>{{adminInfo.id}}</span>
        </li>
      </ul>
      <h4>证件信息：</h4>
      <ul>
        <li class="el-col el-col-8">
          <span>乡村医生证：</span>
          <el-upload class="avatar-uploader" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :on-success="uploadImg" :before-upload="beforeImgUpload">
            <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <li class="el-col el-col-8">
          <span>健康证：</span>
          <el-upload class="avatar-uploader" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :on-success="uploadImg" :before-upload="beforeImgUpload">
            <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <li class="el-col el-col-8">
          <span>健康证：</span>
          <el-upload class="avatar-uploader" :action="baseUrl + '/admin/update/avatar/' + adminInfo.id" :show-file-list="false" :on-success="uploadImg" :before-upload="beforeImgUpload">
            <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <li style="clear:both;padding: 0;"></li>
      </ul> -->
    </div>
  </div>
  <!-- <div class="fillcontain">
    <header class="admin_title">结算信息</header>
    <div class="admin_set">
      <ul>
        <li>
          <span>开户银行：</span>
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>开户地址：</span>
          <el-cascader :options="options2" v-model="selectedOptions3"></el-cascader>
        </li>
        <li>
          <span>支行名称：</span>
          <el-autocomplete class="inline-input" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入支行名称" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </li>
        <li>
          <span>银行账号：</span>
          <el-input style="width:55%;" v-model="input" placeholder="请输入银行账号"></el-input>
        </li>
      </ul>
    </div>
  </div> -->
  <el-row :gutter="20" style="margin-top: 10px;margin-bottom: 10px;">
    <el-col :span="4" :offset="10" style="min-width:200px;">
      <el-button type="primary" v-show="editStart" @click="editStates(1)" plain>修改信息</el-button>
      <el-button type="primary" v-show="!editStart" @click="editStates(2)" plain>提交</el-button>
      <el-button type="primary" v-show="!editStart" @click="editStates(3)" plain>取消</el-button>
    </el-col>
  </el-row>

</div>
</template>

<script>
/* eslint-disable */
import {
  mapState
} from 'vuex';
import {
  baseUrl,
  baseImgPath
} from '@/config/env';
import {
  prov
} from '@/api/getData';

export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurants: [],
      state1: '',
      state2: '',
      input: '',
      editStart: true,
      radio: '1',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options: [{
        value: '1',
        label: '交通银行'
      }, {
        value: '2',
        label: '工商银行'
      }, {
        value: '3',
        label: '建设银行'
      }, {
        value: '4',
        label: '中国银行'
      }, {
        value: '5',
        label: '北京银行'
      }],
      value8: '5',
      options2: [],
      selectedOptions3: ['北京市', '北京市', '朝阳区']
    };
  },
  computed: {
    ...mapState(['adminInfo']),
  },
  methods: {
    editStates(n) {
      switch (n) {
        case 1:
          this.editStart = false;
          break;
        case 2:
          console.log('保存');
          break;
        default:
          this.editStart = true;
      }
    },
    async provincialCity() {
      const res = await prov();
      console.log(res);
      let arr = [];
      res.data.forEach(function(item, index) {
        let value = {
          value: item.name,
          label: item.name,
          children: []
        };
        item.city.forEach(function(val, i) {
          let obj = {
            value: val.name,
            label: val.name,
            children: []
          };
          val.area.forEach(function(v, m) {
            let o = {
              value: v,
              label: v
            };
            obj.children.push(o);
          });
          value.children.push(obj);
        });
        arr.push(value);
      });
      this.options2 = arr;
    },
    uploadImg(res, file) {
      if (res.status == 1) {
        this.adminInfo.avatar = res.image_path;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    beforeImgUpload(file) {
      console.log(file);
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return [{
          "value": "三全鲜食（北新泾店）",
          "address": "长宁区新渔路144号"
        },
        {
          "value": "Hot honey 首尔炸鸡（仙霞路）",
          "address": "上海市长宁区淞虹路661号"
        },
        {
          "value": "新旺角茶餐厅",
          "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.provincialCity();
  }
};
</script>

<style lang="less">
@import '../style/mixin';
.explain_text {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: #333;
}
.admin_set ul {
    position: relative;
    .headerImg {
        position: absolute;
        top: 0;
        right: 0;
    }
    li > span:first-child {
        display: inline-block;
        width: 115px;
        text-align: right;
    }
}
.admin_set {
    width: 75%;
    background-color: #F9FAFC;
    min-height: 310px;
    margin: 20px auto 0;
    border-radius: 10px;
    ul > li {
        padding: 20px;
        span {
            color: #666;
        }
    }
}
.admin_title {
    margin-top: 20px;
    .sc(24px, #666);
    text-align: center;
}
.inline-this {
    display: inline-block;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    margin-top: 10px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.el-tabs__nav-wrap {
    padding-left: 15px;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
</style>
