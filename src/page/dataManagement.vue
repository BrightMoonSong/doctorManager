<template>
<div>
  <div>
    <div class="fillcontain">
      <header class="admin_title">个人信息</header>
      <div class="admin_set">
        <el-tabs tab-position="top">
          <el-tab-pane label="基本信息">
            <ul>
              <li>
                <span>姓名：</span>
                <el-input style="width:50%;" v-model="dataInfo.doctorName" :disabled="editStart" placeholder="请输入姓名"></el-input>
              </li>
              <li>
                <span>类型：</span>
                <el-input style="width:50%;" v-model="dataInfo.type" :disabled="editStart" placeholder="请输入类型"></el-input>
              </li>
              <li>
                <span>性别：</span>
                <el-radio v-model="dataInfo.gender" :disabled="editStart" label="1">男</el-radio>
                <el-radio v-model="dataInfo.gender" :disabled="editStart" label="2">女</el-radio>
              </li>
              <li>
                <span>出生日期：</span>
                <el-date-picker v-model="dataInfo.birthday" :disabled="editStart" type="date" :picker-options="pickerOptions1" placeholder="选择出生日期">
                </el-date-picker>
              </li>
              <li>
                <span>所在地区：</span>
                <el-cascader :options="options2" :disabled="editStart" v-model="basicProCityDistrict"></el-cascader>
              </li>
              <li class="headerImg">
                <span style="vertical-align: top;">头像：</span>
                <el-upload :disabled="editStart" class="avatar-uploader" action="https://zhydl.oss-cn-beijing.aliyuncs.com" :show-file-list="false" :data="dataObject" name="file" :on-success="uploadImg" :before-upload="beforeImgUpload">
                  <img v-if="dataInfo.headImg" :src="dataInfo.headImg" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="联系方式">
            <ul>
              <li>
                <span>手机：</span>
                <el-input style="width:50%;" v-model="dataInfo.phone" :disabled="editStart" placeholder="请输入手机号码"></el-input>
              </li>
              <li>
                <span>座机：</span>
                <el-input style="width:50%;" v-model="dataInfo.telPhone" :disabled="editStart" placeholder="请输入座机号码"></el-input>
              </li>
              <li>
                <span>详细地址：</span>
                <el-input style="width:50%;" v-model="dataInfo.addressDetail" :disabled="editStart" placeholder="请输入详细地址"></el-input>
              </li>
              <li>
                <span>所属服务机构：</span>
                <el-input style="width:50%;" v-model="dataInfo.serviceAgencies" :disabled="editStart" placeholder="请输入所属服务机构"></el-input>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="证件信息">
            <ul>
              <li class="el-col el-col-8">
                <span>医师资格证：</span>
                <el-upload :disabled="editStart" class="avatar-uploader" action="https://zhydl.oss-cn-beijing.aliyuncs.com" :show-file-list="false" :data="dataObject" name="file" :on-success="uploadImg1" :before-upload="beforeImgUpload">
                  <img v-if="imgUrl1" :src="imgUrl1" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </li>
              <li class="el-col el-col-8">
                <span>执业医师证：</span>
                <el-upload :disabled="editStart" class="avatar-uploader" action="https://zhydl.oss-cn-beijing.aliyuncs.com" :show-file-list="false" :data="dataObject" name="file" :on-success="uploadImg2" :before-upload="beforeImgUpload">
                  <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </li>
              <li class="el-col el-col-8">
                <span>健康证：</span>
                <el-upload :disabled="editStart" class="avatar-uploader" action="https://zhydl.oss-cn-beijing.aliyuncs.com" :show-file-list="false" :data="dataObject" name="file" :on-success="uploadImg3" :before-upload="beforeImgUpload">
                  <img v-if="imgUrl3" :src="imgUrl3" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </li>
              <li style="clear:both;padding: 0;"></li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-row :gutter="20" style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="4" :offset="10" style="min-width:270px;">
        <el-button type="primary" v-show="editStart" @click="editStates(1)" plain>修改信息</el-button>
        <el-button type="primary" v-show="dataInfoShow" @click="editStates(4)" plain>审核中信息</el-button>
        <el-button type="primary" v-show="dataInfoShow1" @click="editStates(4)" plain>审核未通过</el-button>
        <el-button type="primary" v-show="!editStart" @click="editStates(2)" plain>提交</el-button>
        <el-button type="primary" v-show="!editStart" @click="editStates(3)" plain>取消</el-button>
      </el-col>
    </el-row>
    <detailmodel :dialogShowOrHide="dialogShowOrHide" :selectTable="checkInfo" @myevent="onResultChange" @dialog="onDialogChange"></detailmodel>
  </div>
  <div>
    <div class="fillcontain">
      <header class="admin_title">结算信息</header>
      <div class="admin_set">
        <ul>
          <li>
            <span>开户银行：</span>
            <el-select v-model="value8" :disabled="editStart1" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>开户地址：</span>
            <el-cascader :options="options2" :disabled="editStart1" v-model="selectedOptions3"></el-cascader>
          </li>
          <li>
            <span>支行名称：</span>
            <el-autocomplete class="inline-input" :disabled="editStart1" v-model="state2" :fetch-suggestions="querySearch" placeholder="请输入支行名称" :trigger-on-focus="false" @select="handleSelect" style="min-width: 204px;"></el-autocomplete>
          </li>
          <li>
            <span>银行账号：</span>
            <el-input style="width:55%;" v-model="input" :disabled="editStart1" placeholder="请输入银行账号"></el-input>
          </li>
        </ul>
      </div>
    </div>
    <el-row :gutter="20" style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="4" :offset="10" style="min-width:270px;">
        <el-button type="primary" v-show="editStart1" @click="editStates1(1)" plain>修改信息</el-button>
        <el-button type="primary" v-show="!editStart1" @click="editStates1(2)" plain>提交</el-button>
        <el-button type="primary" v-show="!editStart1" @click="editStates1(3)" plain>取消</el-button>
      </el-col>
    </el-row>
  </div>
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
  prov,
  getinfo,
  uploadverifyinfo,
  getsign,
  updateheadimg,
  getcheckinfo
} from '@/api/getData';
import axios from 'axios';
import detailModel from '@/page/popup/infoModel';

export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurants: [],
      dialogShowOrHide: false,
      checkInfo: [],
      state1: '',
      state2: '',
      input: '',
      editStart: true,
      editStart1: true,
      dataInfoShow: false,
      dataInfoShow1: false,
      radio: '1',
      dataInfo: {},
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
      basicProCityDistrict: ['北京市', '北京市', '朝阳区'],
      selectedOptions3: ['北京市', '北京市', '朝阳区'],
      dataObject: {},
      dataFileName: '',
      imgUrl1: '',
      imgUrl2: '',
      imgUrl3: ''
    };
  },
  computed: {
    ...mapState(['adminInfo']),
  },
  components: {
    'detailmodel': detailModel
  },
  mounted() {
    this.initEnty();
    this.provincialCity();
    this.initGetSign();
    setInterval(() => {
      this.initGetSign();
    }, 10000);
  },
  methods: {
    onResultChange(val) {
      this.dialogShowOrHide = val; // 4
    },
    async onDialogChange(val) {
      let checkinfo = await getcheckinfo();
      this.checkInfo = checkinfo.data;
      this.dialogShowOrHide = val; // 4
    },
    async initGetSign() {
      const res = await getsign();

      var oDate = new Date(); // 实例一个时间对象；
      var yearSec = '' + oDate.getFullYear() + (oDate.getMonth() + 1) + oDate.getDate() + oDate.getHours() + oDate.getMinutes() + oDate.getSeconds();
      var rand = '';
      for (let i = 0; i < 3; i++) {
        var r = Math.floor(Math.random() * 10);
        rand += r;
      }
      this.dataFileName = 'dev/carmodel/' + yearSec + rand + '.jpg';
      this.dataObject = { // 多个参数
        'key': this.dataFileName,
        'policy': res.data.policy,
        'OSSAccessKeyId': res.data.accessid,
        'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
        'signature': res.data.signature
      };
    },
    async uploadImg(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        this.dataInfo.headImg = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
        console.info(this.dataInfo.headImg);
        await updateheadimg({
          'headImg': this.dataInfo.headImg
        });
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    uploadImg1(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        this.imgUrl1 = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
        // this.dataInfo.cardList[0] = {
        //   'cardType': 1,
        //   'imgUrl': 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName,
        //   'sort': 1
        // };
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    uploadImg2(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        console.info('https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName);
        this.imgUrl2 = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
        // this.dataInfo.cardList[1] = {
        //   'cardType': 1,
        //   'imgUrl': 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName,
        //   'sort': 1
        // };
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    uploadImg3(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        console.info('https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName);
        this.imgUrl3 = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
        // this.dataInfo.cardList[2] = {
        //   'cardType': 1,
        //   'imgUrl': 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName,
        //   'sort': 1
        // };
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    beforeImgUpload(file) {
      // "jpg,gif,png,bmp"
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (isJPG) {
        let arr = this.dataFileName.split('.');
        this.dataFileName = arr[0] + '.jpg';
      }
      if (isPNG) {
        let arr = this.dataFileName.split('.');
        this.dataFileName = arr[0] + '.png';
      }
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    async initEnty() {
      let res = await getinfo();
      let obj = res.data;
      this.dataInfo = obj;
      // 返回(-2数据校验异常，401登录失效，403权限不足，-101账户不存在，-110尚未审核，-111审核未通过
      let checkinfo = await getcheckinfo();
      switch (checkinfo.data.status) {
        case 1:
          this.dataInfoShow = true;
          this.$message.error('审核中!');
          break;
        case 2:
          this.dataInfoShow1 = true;
          this.$message.error('审核未通过!');
          break;
        case 3:
          this.dataInfoShow1 = false;
          this.dataInfoShow = false;
          this.$message.error('审核已通过!');
          break;
      }
    },
    async editStates(n) {
      switch (n) {
        case 1:
          if (this.dataInfoShow) {
            this.editStart = true;
            this.$message.error('快马加鞭审核中,请您耐心等待!');
          } else {
            this.editStart = false;
          }
          break;
        case 2:
          // this.dataInfo.cardList.push({
          //   "cardType": 1,
          //   "imgUrl": this.imgUrl1,
          //   "sort": 0
          // });
          const res = await uploadverifyinfo(this.dataInfo);
          console.log(res);
          console.log(this.dataInfo);
          console.log('保存');
          break;
        case 3:
          this.editStart = true;
          break;
        case 4:
          this.onDialogChange(true);
          break;
        default:
          this.editStart = true;
      }
    },
    async editStates1(n) {
      switch (n) {
        case 1:
          this.editStart1 = false;
          break;
        case 2:
          const res = await uploadverifyinfo(this.dataInfo);
          console.log(res);
          console.log(this.dataInfo);
          console.log('保存');
          break;
        case 3:
          this.editStart1 = true;
          break;
        default:
          this.editStart1 = true;
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
    handleSelect(item) {
      console.log(item);
    }
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
