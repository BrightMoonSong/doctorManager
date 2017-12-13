<template>
<el-dialog title="确认订单" top="5vh" :visible.sync="downifShowThis">
  <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
    <el-form-item label="姓名：">
      <span v-text="sizeForm.name" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="年龄：">
      <span v-text="sizeForm.age" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="性别：">
      <el-radio v-model="sizeForm.sex" :disabled="true" :label="1">男</el-radio>
      <el-radio v-model="sizeForm.sex" :disabled="true" :label="2">女</el-radio>
    </el-form-item>
    <el-form-item label="手机号：">
      <span v-text="sizeForm.phone" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="详细地址：">
      <span v-text="sizeForm.address" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="症状：">
      <span v-text="sizeForm.symptoms" style="width: 75%;"></span>
    </el-form-item>
  </el-form>
  <h4>已选药品：</h4>
  <el-table :data="selectedGoods" stripe border style="width: 100%;">
    <el-table-column prop="src" label="商品图片" show-overflow-tooltip align="center">
      <template slot-scope="scope">
        <img v-bigimg="scope.row.masterImg" :src="scope.row.masterImg" alt="..." width="50">
      </template>
    </el-table-column>
    <el-table-column prop="name1" show-overflow-tooltip label="商品名称" align="center">
    </el-table-column>
    <el-table-column prop="name2" align="center" show-overflow-tooltip label="商品简介">
    </el-table-column>
    <el-table-column prop="salesPrice" align="center" show-overflow-tooltip label="商品售价">
    </el-table-column>
    <el-table-column prop="stock" align="center" show-overflow-tooltip label="商品库存">
    </el-table-column>
    <el-table-column prop="specification" align="center" show-overflow-tooltip label="商品规格">
    </el-table-column>
    <el-table-column label="商品个数" prop="count" align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center" width="100">
      <template slot-scope="scope">
        <el-button @click="deleteRow(scope)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="chufang" v-if="imageUrl">
    <span>手写处方：</span>
    <img v-bigimg="imageUrl" :src="imageUrl" width="50" class="thisimg">
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button type="success" size="medium" @click="okDownOrder">确 认</el-button>
    <el-button type="warning" size="medium" @click="downifShowThis = false">取 消</el-button>
  </div>
  <div class="clearfix"></div>
</el-dialog>
</template>

<script>
import {
  cartsubmit
} from '@/api/getData';
import {
  removeForIndex,
  getStore
} from '@/config/mUtils';

export default {
  // 由于vue2.0 props 无法让子组件与父组件实现双向绑定，容易报错，所以要自定义方法去实现双向绑定，步骤分别是1234，其中第四步在父组件
  // props: ['downifShow', 'sizeForm', 'selectedGoods', 'imageUrl'],
  props: {
    selectedGoods: { // 必须提供字段
      required: true
    },
    downifShow: { // 可选字段，有默认值
      default: false
    },
    sizeForm: {
      default: {
        'name': '',
        'age': '',
        'sex': 1,
        'phone': ''
      }
    },
    imageUrl: {
      default: ''
    }
  },
  data() {
    return { // 1
      downifShowThis: this.downifShow,
      showImg: false,
      dataInfo: this.selectTable,
      bigImgSrc: ''
    };
  },
  mounted() {
    console.log(this.selectTable, this.downifShow);
  },
  watch: {
    downifShow: function(val, oldVal) { // 2
      this.downifShowThis = val;
    },
    downifShowThis(val) { // 3
      this.$emit('dialog', val);
    }
  },
  methods: {
    async okDownOrder() {
      console.log('最终的确认下单！');
      let obj = {
        'doctorId': getStore('userId'),
        'orderAddressVo': {
          'detailAddress': this.sizeForm.address,
          'receiveName': this.sizeForm.name,
          'receivePhone': this.sizeForm.phone
        },
        'orderGoodsVo': [],
        'prescriptionUrl': this.imageUrl, // 处方单
        'remark': '无', // 买家留言
        'storeId': 0, // 药店ID
        'symptoms': this.sizeForm.symptoms, // 患者症状
        'userRegVo': {
          'age': this.sizeForm.age,
          'phone': this.sizeForm.phone,
          'realName': this.sizeForm.name,
          'sex': this.sizeForm.sex
        }
      };
      obj.orderGoodsVo = this.selectedGoods;
      obj.orderGoodsVo.forEach(val => {
        val.cartId = 0;
        val.goodsImg = val.masterImg;
        val.goodsName = val.name1;
        val.price = val.salesPrice;
      });
      console.log(obj);
      let res = await cartsubmit(obj);
      console.log(res);
      if (res.code === 1) {
        this.downifShowThis = false;
      }
    },
    deleteRow(scope) {
      this.selectedGoods = removeForIndex(this.selectedGoods, scope.$index);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
}
</style>
