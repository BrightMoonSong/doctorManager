<template>
<el-dialog title="审核中资料" top="5vh" :visible.sync="dialogShowOrHideThis">
  <el-form :model="selectTable">
    <el-form-item label="姓名：" label-width="115px">
      <span v-text="selectTable.doctorName"></span>
    </el-form-item>
    <el-form-item label="类型：" label-width="115px">
      <span v-text="selectTable.type"></span>
    </el-form-item>
    <el-form-item label="性别：" label-width="115px">
      <span v-text="selectTable.gender"></span>
    </el-form-item>
    <el-form-item label="出生日期：" label-width="115px">
      <span v-text="selectTable.birthday"></span>
    </el-form-item>
    <el-form-item label="所在地区：" label-width="115px">
      <span v-text="selectTable.province+'/'+selectTable.city+'/'+selectTable.district"></span>
    </el-form-item>
    <el-form-item label="头像：" label-width="115px">
      <img :src="selectTable.headImg" alt="..." width="90">
    </el-form-item>
    <el-form-item label="手机：" label-width="115px">
      <span v-text="selectTable.phone"></span>
    </el-form-item>
    <el-form-item label="座机：" label-width="115px">
      <span v-text="selectTable.telPhone"></span>
    </el-form-item>
    <el-form-item label="详细地址：" label-width="115px">
      <span v-text="selectTable.addressDetail"></span>
    </el-form-item>
    <el-form-item label="所属服务机构：" label-width="115px">
      <span v-text="selectTable.serviceAgencies"></span>
    </el-form-item>
    <el-form-item v-for="item in selectTable.cardList" :label="cardListlabel(item).label" label-width="115px">
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

export default {
  // 由于vue2.0 props 无法让子组件与父组件实现双向绑定，容易报错，所以要自定义方法去实现双向绑定，步骤分别是1234，其中第四步在父组件
  props: ['selectTable', 'dialogShowOrHide'],
  data() {
    return { // 1
      dialogShowOrHideThis: this.dialogShowOrHide,
      showImg: false,
      dataInfo: this.selectTable,
      bigImgSrc: ''
    };
  },
  mounted() {
    console.log(this.selectTable, this.dialogShowOrHide);
  },
  watch: {
    dialogShowOrHide: function(val, oldVal) { // 2
      this.dialogShowOrHideThis = val;
    },
    dialogShowOrHideThis(val) { // 3
      this.$emit('dialog', val);
    }
  },
  methods: {
    viewImg() {
      this.showImg = false;
    },
    cardListlabel(val) {
      let obj = {};
      switch (val.cardType) {
        case 1:
          obj = {
            'label': '医师资格证：',
            'imgUrl': val.imgUrl
          };
          break;
        case 2:
          obj = {
            'label': '执业医师证：',
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
