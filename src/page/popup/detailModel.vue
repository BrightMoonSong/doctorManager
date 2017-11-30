<template>
<el-dialog title="药品详情" :visible.sync="dialogShowOrHideThis">
  <el-form :model="selectTable">
    <el-form-item label="药品名称" label-width="100px">
      <el-input v-model="selectTable.name"></el-input>
    </el-form-item>
    <el-form-item label="主要成分" label-width="100px">
      <el-input v-model="selectTable.data" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="性状" label-width="100px">
      <img :src="selectTable.src" @click="clickImg(selectTable.src)" class="image" width="100px">
    </el-form-item>
    <el-form-item label="规格型号" label-width="100px">
      <el-input v-model="selectTable.address"></el-input>
    </el-form-item>
    <el-form-item label="用法用量" label-width="100px">
      <el-input v-model="selectTable.address"></el-input>
    </el-form-item>
    <el-form-item label="不良反应" label-width="100px">
      <el-input v-model="selectTable.address"></el-input>
    </el-form-item>
    <el-form-item label="禁忌" label-width="100px">
      <el-input v-model="selectTable.address"></el-input>
    </el-form-item>
    <el-form-item label="注意事项" label-width="100px">
      <el-input v-model="selectTable.address"></el-input>
    </el-form-item>
    <el-form-item label-width="100px">
        <img :src="selectTable.src" @click="clickImg(selectTable.src)" alt="..." width="90">
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogShowOrHideThis = false">取 消</el-button>
    <el-button type="primary" @click="okModel(false)">确 定</el-button>
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
    okModel(val) {
      this.$emit('myevent', val);
    },
    clickImg(src) {
      this.showImg = true;
      // 获取当前图片地址
      this.bigImgSrc = src;
    },
    viewImg() {
      this.showImg = false;
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
