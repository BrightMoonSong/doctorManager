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
                <!-- <el-input style="width:50%;" v-model="dataInfo.type" :disabled="editStart" placeholder="请输入类型"></el-input> -->
                <el-select style="width:50%;" v-model="dataInfo.type" :disabled="editStart" placeholder="请选择类型">
                  <el-option v-for="item in typeList" :key="item.typeId" :label="item.typeName" :value="item.typeId">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>性别：</span>
                <el-radio v-model="dataInfo.gender" :disabled="editStart" :label="1">男</el-radio>
                <el-radio v-model="dataInfo.gender" :disabled="editStart" :label="2">女</el-radio>
              </li>
              <li>
                <span>出生日期：</span>
                <el-date-picker v-model="dataInfo.birthday" :disabled="editStart" type="date" :picker-options="pickerOptions1" placeholder="选择出生日期">
                </el-date-picker>
              </li>
              <li>
                <span>所在地区：</span>
                <!-- <el-cascader :options="options2" :disabled="editStart" @change="adresscas" v-model="basicProCityDistrict"></el-cascader> -->
                <el-cascader :disabled="editStart" filterable placeholder="选择所在地区" @change="adresscas" :options="selectList" v-model="basicProCityDistrict" @active-item-change="handleItemChange" :props="props"></el-cascader>
              </li>
              <li class="headerImg">
                <span style="vertical-align: top;">头像：</span>
                <el-upload class="avatar-uploader" action="https://zhydl.oss-cn-beijing.aliyuncs.com" :show-file-list="false" :data="dataObject" name="file" :on-success="uploadImg" :before-upload="beforeImgUpload">
                  <img v-if="headerImg" :src="headerImg" class="avatar">
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
                <span>证件截止有效期：</span>
                <div class="block">
                  <el-date-picker :disabled="editStart" style="width: 170px;" v-model="validityDate1" type="date" placeholder="证件截止有效期">
                  </el-date-picker>
                </div>
              </li>
              <li class="el-col el-col-8">
                <span>执业医师证：</span>
                <el-upload :disabled="editStart" class="avatar-uploader" action="https://zhydl.oss-cn-beijing.aliyuncs.com" :show-file-list="false" :data="dataObject" name="file" :on-success="uploadImg2" :before-upload="beforeImgUpload">
                  <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>证件截止有效期：</span>
                <div class="block">
                  <el-date-picker :disabled="editStart" style="width: 170px;" v-model="validityDate2" type="date" placeholder="证件截止有效期">
                  </el-date-picker>
                </div>
              </li>
              <li class="el-col el-col-8">
                <span>健康证：</span>
                <el-upload :disabled="editStart" class="avatar-uploader" action="https://zhydl.oss-cn-beijing.aliyuncs.com" :show-file-list="false" :data="dataObject" name="file" :on-success="uploadImg3" :before-upload="beforeImgUpload">
                  <img v-if="imgUrl3" :src="imgUrl3" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span>证件截止有效期：</span>
                <div class="block">
                  <el-date-picker :disabled="editStart" style="width: 170px;" v-model="validityDate3" type="date" placeholder="证件截止有效期">
                  </el-date-picker>
                </div>
              </li>
              <li style="clear:both;padding: 0;"></li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-row :gutter="20" style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="4" :offset="9" style="min-width:350px;">
        <el-button type="primary" v-show="editStart" @click="editStates(1)" plain>修改信息</el-button>
        <el-button type="primary" v-show="!editStart" @click="editStates(2)" plain>提交</el-button>
        <el-button type="primary" v-show="!editStart" @click="editStates(3)" plain>取消</el-button>
        <el-button type="primary" v-show="dataInfoShow" @click="editStates(4)" plain>审核中信息</el-button>
        <el-button type="primary" v-show="dataInfoShow1" @click="editStates(4)" plain>审核未通过</el-button>
      </el-col>
    </el-row>
    <detailmodel :dialogShowOrHide="dialogShowOrHide" :selectTable="checkInfo" @myevent="onResultChange" @dialog="onDialogChange"></detailmodel>
  </div>
  <div>
    <div class="fillcontain">
      <header class="admin_title">结算信息</header>
      <div class="admin_set" v-show="bankLengthShow">
        <ul>
          <li>
            <span>开户银行：</span>
            <!-- <span v-text="bankList.bank"></span> -->
            <el-input style="width:55%;" v-model="bankList.bank" :disabled="editStart1" placeholder="请输入开户银行名称"></el-input>
          </li>
          <li>
            <span>开户地址：</span>
            <!-- <el-cascader :options="options2" :disabled="editStart1" v-model="bankList.registrationAddress"></el-cascader> -->
            <el-cascader :disabled="editStart1" filterable placeholder="选择开户地址" :options="selectList" v-model="bankList.registrationAddress" @active-item-change="handleItemChange" :props="props"></el-cascader>
          </li>
          <li>
            <span>支行名称：</span>
            <el-input style="width:55%;" v-model="bankList.registrationBank" :disabled="editStart1" placeholder="请输入支行名称"></el-input>
          </li>
          <li>
            <span>银行账号：</span>
            <el-input style="width:55%;" @blur="cardNoBlur" v-model="bankList.cardNo" :disabled="editStart1" placeholder="请输入银行账号"></el-input>
          </li>
        </ul>
      </div>
    </div>
    <el-row :gutter="20" style="margin-top: 10px;margin-bottom: 10px;">
      <el-col :span="4" :offset="9" style="min-width:350px;">
        <el-button type="primary" style="width:100%;" icon="el-icon-plus" v-show="!bankLengthShow" @click="bankLengthShow = true;editStart1=false" plain>添加</el-button>
        <el-button type="primary" v-show="editStart1 && bankLengthShow" @click="editStates1(1)" plain>删除信息</el-button>
        <el-button type="primary" v-show="!editStart1 && bankLengthShow" @click="editStates1(2)" plain>提交</el-button>
        <el-button type="primary" v-show="!editStart1 && bankLengthShow" @click="editStates1(3)" plain>取消</el-button>
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
  getStore,
  clone
} from '@/config/mUtils';
import {
  findareabypid,
  findtypenames,
  addbankcard,
  getbankname,
  getinfo,
  deletebankcard,
  uploadverifyinfo,
  getsign,
  updateheadimg,
  getcheckinfo
} from '@/api/getData';
import detailModel from '@/page/popup/infoModel';

export default {
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当钩子执行前，组件实例还没被创建
  //   // fromPath = from.path;
  //   console.log(to);
  //   console.log(from);
  //   console.log(next);
  //   next();
  // },
  data() {
    return {
      baseUrl,
      baseImgPath,
      restaurants: [],
      dialogShowOrHide: false,
      checkInfo: [],
      typeList: [],
      state1: '',
      registrationBank: '',
      cardNo: '',
      bankLengthShow: false,
      editStart: true,
      editStart1: true,
      dataInfoShow: false,
      dataInfoShow1: false,
      radio: '1',
      dataInfo: {
        'doctorName': '',
        'type': '',
        'gender': 1,
        'birthday': '',
        'province': this.basicProCityDistrict0,
        'city': this.basicProCityDistrict1,
        'district': this.basicProCityDistrict2,
        'phone': '',
        'telPhone': '',
        'addressDetail': '',
        'serviceAgencies': '',
        'cardList': [{
            'cardType': 1,
            'imgUrl': this.imgUrl1,
            'sort': 1,
            'validityDate': ''
          },
          {
            'cardType': 2,
            'imgUrl': this.imgUrl2,
            'sort': 1,
            'validityDate': ''
          },
          {
            'cardType': 3,
            'imgUrl': this.imgUrl3,
            'sort': 1,
            'validityDate': ''
          }
        ],
        'doctorId': getStore('userId')
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      bankList: {
        'doctorId': getStore('userId'),
        'bank': '',
        'registrationAddress': [],
        'registrationBank': '',
        'cardNo': ''
      },
      options2: [],
      selectList: [],
      props: {
        value: 'value',
        children: 'children'
      },
      basicProCityDistrict: ['北京市', '北京市', '朝阳区'],
      basicProCityDistrict0: '',
      basicProCityDistrict1: '',
      basicProCityDistrict2: '',
      validityDate1: '',
      validityDate2: '',
      validityDate3: '',
      dataObject: {},
      dataFileName: '',
      headerImg: '',
      imgUrl1: '',
      imgUrl2: '',
      imgUrl3: ''
    };
  },
  computed: {
    ...mapState(['adminInfo', 'navshow'])
  },
  components: {
    'detailmodel': detailModel
  },
  mounted() {
    this.initEnty();
    this.initType();
    this.provincialCity();
    // this.initGetSign();
    // setInterval(() => {
    //   this.initGetSign();
    // }, 4200);
  },
  methods: {
    async initType() {
      let res = await findtypenames();
      this.typeList = res.data;
    },
    async handleItemChange(val) {
      if (val.length === 3) {
        return;
      }
      if (isNaN(val[val.length - 1])) {
        return;
      }
      let res = await findareabypid(val[val.length - 1]);
      if (val.length === 1) {
        let index = 0;
        this.selectList.forEach((v, i) => {
          if (v.value === val[val.length - 1]) {
            index = i;
          }
        });
        this.selectList[index].children = [];
        res.data.forEach(m => {
          let obj = {
            value: m.areaId,
            label: m.name,
            children: []
          };
          this.selectList[index].children.push(obj);
        });
      } else if (val.length === 2) {
        let index = 0;
        let index1 = 0;
        this.selectList.forEach((v, i) => {
          if (v.value === val[0]) {
            index = i;
          }
        });
        this.selectList[index].children.forEach((m, n) => {
          if (m.value === val[1]) {
            index1 = n;
          }
        });
        this.selectList[index].children[index1].children = [];
        res.data.forEach(val => {
          let obj = {
            value: val.areaId,
            label: val.name
          };
          this.selectList[index].children[index1].children.push(obj);
        });
      }
    },
    adresscas() {
      let leng = this.basicProCityDistrict.length;
      if (leng === 3) {
        this.basicProCityDistrict0 = this.basicProCityDistrict[0];
        this.basicProCityDistrict1 = this.basicProCityDistrict[1];
        this.basicProCityDistrict2 = this.basicProCityDistrict[2];
      }
    },
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
      this.dataObject = { // 多个参数
        'key': this.dataFileName,
        'policy': res.data.policy,
        'OSSAccessKeyId': res.data.accessid,
        'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
        'signature': res.data.signature
      };
      if (res.code === 0) {
        return true;
      } else {
        return false;
      }
    },
    async uploadImg(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        this.headerImg = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
        console.info(this.headerImg);
        let respon = await updateheadimg({
          'headImg': this.headerImg
        });
        if (respon.code === 1) {
          this.adminInfo.avatar = this.headerImg;
        }
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    uploadImg1(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        this.imgUrl1 = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    uploadImg2(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        console.info('https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName);
        this.imgUrl2 = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    uploadImg3(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.$message.success('上传图片成功！');
        console.info('https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName);
        this.imgUrl3 = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    async beforeImgUpload(file) {
      let res = await this.initGetSign();
      if (res) {
        // "jpg,gif,png,bmp"
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        var oDate = new Date(); // 实例一个时间对象；
        var yearSec = '' + oDate.getFullYear() + (oDate.getMonth() + 1) + oDate.getDate() + oDate.getHours() + oDate.getMinutes() + oDate.getSeconds();
        var rand = '';
        for (let i = 0; i < 3; i++) {
          var r = Math.floor(Math.random() * 10);
          rand += r;
        }
        this.dataFileName = 'dev/carmodel/' + yearSec + rand + '.jpg';
        this.dataObject.key = this.dataFileName;
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
      } else {
        return false;
      }
    },
    async initEnty() {
      let res = await getinfo();
      if (res.code < 0) {
        this.$message.error('系统错误');
        return;
      }
      // 状态 0禁用；1待审核；2已通过(正常状态)；3未通过；4已注册未提交审核 ,
      switch (res.data.status) {
        case 0:
          this.dataInfoShow = true;
          this.$message.warning('账号被禁用!');
          break;
        case 1:
          this.dataInfoShow = true;
          this.$message.warning('审核中!');
          break;
        case 2:
          this.dataInfoShow1 = false;
          this.dataInfoShow = false;
          this.$message.success('个人信息审核已通过!');
          this.navshow.isshow = true;
          break;
        case 3:
          this.dataInfoShow1 = true;
          this.$message.error('审核未通过!');
          break;
        case 4:
          this.dataInfoShow1 = false;
          this.editStates(1);
          // this.$message.error('已注册未提交审核!');
          break;
      }
      let obj = res.data;
      this.headerImg = obj.headImg;
      this.dataInfo = obj;
      if (obj) {
        if (obj.bankCardList.length > 0) {
          let dataO = obj.bankCardList[obj.bankCardList.length - 1];
          let arrBank = dataO.registrationAddress.split('/');
          dataO.registrationAddress = [Number(arrBank[0]), Number(arrBank[1]), Number(arrBank[2])];
          await this.handleItemChange([dataO.registrationAddress[0]]);
          await this.handleItemChange([dataO.registrationAddress[0], dataO.registrationAddress[1]]);
          await this.handleItemChange([dataO.registrationAddress[0], dataO.registrationAddress[1], dataO.registrationAddress[2]]);
          this.bankList = dataO;
          this.bankLengthShow = true;
        } else {
          this.bankLengthShow = false;
        }
      }
      this.basicProCityDistrict0 = Number(this.dataInfo.province);
      this.basicProCityDistrict1 = Number(this.dataInfo.city);
      this.basicProCityDistrict2 = Number(this.dataInfo.district);
      await this.handleItemChange([this.basicProCityDistrict0]);
      await this.handleItemChange([this.basicProCityDistrict0, this.basicProCityDistrict1]);
      await this.handleItemChange([this.basicProCityDistrict0, this.basicProCityDistrict1, this.basicProCityDistrict2]);
      this.basicProCityDistrict = [this.basicProCityDistrict0, this.basicProCityDistrict1, this.basicProCityDistrict2];
      if (this.dataInfo.cardList.length > 0) {
        for (var i = 0; i < 3; i++) {
          switch (this.dataInfo.cardList[i].cardType) {
            case 1:
              this.imgUrl1 = this.dataInfo.cardList[i].imgUrl;
              this.validityDate1 = this.dataInfo.cardList[i].validityDate;
              break;
            case 2:
              this.imgUrl2 = this.dataInfo.cardList[i].imgUrl;
              this.validityDate2 = this.dataInfo.cardList[i].validityDate;
              break;
            default:
              this.imgUrl3 = this.dataInfo.cardList[i].imgUrl;
              this.validityDate3 = this.dataInfo.cardList[i].validityDate;
          }
        }
      } else {
        this.dataInfo.cardList = [{
            'cardType': 1,
            'imgUrl': this.imgUrl1,
            'sort': 1,
            'validityDate': this.validityDate1
          },
          {
            'cardType': 2,
            'imgUrl': this.imgUrl2,
            'sort': 1,
            'validityDate': this.validityDate2
          },
          {
            'cardType': 3,
            'imgUrl': this.imgUrl3,
            'sort': 1,
            'validityDate': this.validityDate3
          }
        ]
      }
    },
    async editStates(n) {
      switch (n) {
        case 1:
          if (this.dataInfoShow) {
            this.editStart = true;
            this.$message.warning('快马加鞭审核中,请您耐心等待!');
          } else {
            this.editStart = false;
          }
          break;
        case 2:
          this.dataInfo.province = this.basicProCityDistrict0;
          this.dataInfo.city = this.basicProCityDistrict1;
          this.dataInfo.district = this.basicProCityDistrict2;
          this.dataInfo.cardList = [{
              'cardType': 1,
              'imgUrl': this.imgUrl1,
              'sort': 1,
              'validityDate': this.validityDate1
            },
            {
              'cardType': 2,
              'imgUrl': this.imgUrl2,
              'sort': 1,
              'validityDate': this.validityDate2
            },
            {
              'cardType': 3,
              'imgUrl': this.imgUrl3,
              'sort': 1,
              'validityDate': this.validityDate3
            }
          ];
          const res = await uploadverifyinfo(this.dataInfo);
          if (res.code === 1) {
            this.editStart = true;
            this.navshow.isshow = false;
            this.initEnty();
          }
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
    async editStates1(n) { // 添加银行卡信息
      switch (n) {
        case 1:
          this.editStart1 = false;
          let resp = await deletebankcard(this.bankList.id);
          console.log(resp);
          // this.initEnty(); // 重新初始化
          this.bankLengthShow = true; // 重新填银行卡信息
          this.bankList = {
            'doctorId': getStore('userId'),
            'bank': '',
            'registrationAddress': [],
            'registrationBank': '',
            'cardNo': ''
          };
          break;
        case 2:
          // var dataObj = clone(this.bankList);
          let dataObj = {
            'doctorId': this.bankList.doctorId,
            'bank': this.bankList.bank,
            'registrationAddress': this.bankList.registrationAddress[0] + '/' + this.bankList.registrationAddress[1] + '/' + this.bankList.registrationAddress[2],
            'registrationBank': this.bankList.registrationBank,
            'cardNo': this.bankList.cardNo
          };
          let res = await addbankcard(dataObj);
          if (res.code === 1) {
            this.editStart1 = true;
          }
          this.initEnty();
          break;
        case 3:
          this.editStart1 = true;
          this.initEnty();
          if (this.bankLengthShow) {
            this.bankList = {
              'doctorId': getStore('userId'),
              'bank': '',
              'registrationAddress': [],
              'registrationBank': '',
              'cardNo': ''
            };
          }
          break;
        default:
          this.editStart1 = true;
      }
    },
    async cardNoBlur() {
      if (this.bankList.cardNo !== '') {
        let res = await getbankname(this.bankList.cardNo);
        if (res.code !== 0) {
          this.$message.error('根据银行卡号获取开户银行失败');
        } else {
          if (res.data === null) {
            // this.bankList.bank = '根据卡号自动得出开户行名称';
            this.$message.error('根据银行卡号获取开户银行失败');
          } else {
            this.bankList.bank = res.data;
          }
        }
        console.log('根据银行卡号获取银行名称');
        console.log(res);
      }
    },
    async provincialCity() {
      let res = await findareabypid(0);
      this.selectList = [];
      res.data.forEach(val => {
        let obj = {
          value: val.areaId,
          label: val.name,
          children: []
        };
        this.selectList.push(obj);
      });
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
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
