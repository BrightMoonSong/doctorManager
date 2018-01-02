<template>
<el-dialog title="审核中资料" top="5vh" :visible.sync="dialogShowOrHideThis">
  <el-form :model="selectTable">
    <el-form-item label="姓名：" label-width="155px">
      <span v-text="selectTable.doctorName"></span>
    </el-form-item>
    <el-form-item label="类型：" label-width="155px">
      <span v-text="selectTableType"></span>
    </el-form-item>
    <el-form-item label="性别：" label-width="155px">
      <span v-text="selectTable.gender===1?'男':'女'"></span>
    </el-form-item>
    <el-form-item label="手机：" label-width="155px">
      <span v-text="selectTable.phone"></span>
    </el-form-item>
    <el-form-item label="座机：" label-width="155px">
      <span v-text="selectTable.telPhone"></span>
    </el-form-item>
    <el-form-item label="出生日期：" label-width="155px">
      <span v-text="birthday"></span>
    </el-form-item>
    <el-form-item label="所在地区：" label-width="155px">
      <span v-text="address"></span>
    </el-form-item>
    <el-form-item label="详细地址：" label-width="155px">
      <span v-text="selectTable.addressDetail"></span>
    </el-form-item>
    <el-form-item label="所属服务机构：" label-width="155px">
      <span v-text="selectTable.serviceAgencies"></span>
    </el-form-item>
    <el-form-item v-for="item in selectTable.cardList" :label="cardListlabel(item).label" label-width="155px">
      <img v-bigimg="cardListlabel(item).imgUrl" :src="cardListlabel(item).imgUrl" alt="..." width="90">
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogShowOrHideThis = false">关 闭</el-button>
  </div>
  <big-img v-if="showImg" @clickit="viewImg" :imgSrc="bigImgSrc"></big-img>
  <div class="clearfix"></div>
</el-dialog>
</template>

<script>
import BigImg from '@/common/BigImg';
import {
  findtypenames,
  findareabypid
} from '@/api/getData';

export default {
  // 由于vue2.0 props 无法让子组件与父组件实现双向绑定，容易报错，所以要自定义方法去实现双向绑定，步骤分别是1234，其中第四步在父组件
  props: ['selectTable', 'dialogShowOrHide'],
  data() {
    return { // 1
      dialogShowOrHideThis: this.dialogShowOrHide,
      showImg: false,
      address: '',
      birthday: '',
      selectTableType: '',
      dataInfo: this.selectTable,
      bigImgSrc: ''
    };
  },
  mounted() {
    // console.log(this.dataInfo);
  },
  watch: {
    dialogShowOrHide: function(val, oldVal) { // 2
      this.dialogShowOrHideThis = val;
    },
    dialogShowOrHideThis(val) { // 3
      this.$emit('dialog', val);
      if (val) {
        this.initType();
      }
    }
  },
  methods: {
    async initType() {
      let res = await findtypenames();
      res.data.forEach(val => {
        if (val.typeId === this.selectTable.type) {
          this.selectTableType = val.typeName;
        }
      });
      let res1 = await this.initAddress(0, this.selectTable.province);
      let res2 = await this.initAddress(this.selectTable.province, this.selectTable.city);
      let res3 = await this.initAddress(this.selectTable.city, this.selectTable.district);
      this.address = res1 + '/' + res2 + '/' + res3;
      this.birthday = this.dateFtt('yyyy-MM-dd', new Date(this.selectTable.birthday));
    },
    async initAddress(m, n) {
      let pro = await findareabypid(m);
      let address = '';
      pro.data.forEach(val => {
        if (val.areaId === n) {
          address = val.name;
        }
      });
      return address;
    },
    dateFtt(fmt, date) {
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return fmt;
    },
    viewImg() {
      this.showImg = false;
    },
    cardListlabel(val) {
      let obj = {};
      switch (val.cardType) {
        case 1:
          obj = {
            'label': '医疗机构执业许可证：',
            'imgUrl': val.imgUrl
          };
          break;
        case 2:
          obj = {
            'label': '医师证：',
            'imgUrl': val.imgUrl
          };
          break;
        default:
          obj = {
            'label': '健康证：',
            'imgUrl': val.imgUrl
          };
      }
      return obj;
    }
  },
  components: {
    'big-img': BigImg
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
}
</style>
