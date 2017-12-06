<template>
<el-dialog title="订单详情" top="5vh" :visible.sync="downifShowThis">
  <el-table :data="ordersList" stripe border style="width: 100%;">
    <el-table-column prop="orderNo" show-overflow-tooltip label="订单号" align="center">
    </el-table-column>
    <el-table-column prop="name2" align="center" show-overflow-tooltip label="下单时间">
    </el-table-column>
    <el-table-column prop="salesPrice" align="center" show-overflow-tooltip label="订单金额">
    </el-table-column>
    <el-table-column prop="orderStatus" align="center" show-overflow-tooltip label="订单状态">
    </el-table-column>
    <el-table-column prop="marker" align="center" show-overflow-tooltip label="订单备注">
    </el-table-column>
  </el-table>
  <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
    <el-form-item label="姓名">
      <span v-text="sizeForm.name" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="年龄">
      <span v-text="sizeForm.age" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio v-model="sizeForm.sex" disable :label="1">男</el-radio>
      <el-radio v-model="sizeForm.sex" disable :label="2">女</el-radio>
    </el-form-item>
    <el-form-item label="手机号">
      <span v-text="sizeForm.phone" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="详细地址">
      <span v-text="sizeForm.address" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="症状">
      <span v-text="sizeForm.address" style="width: 75%;"></span>
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
    <el-table-column label="商品个数" prop="thisNum" align="center" show-overflow-tooltip>
    </el-table-column>
    <el-table-column fixed="right" label="操作" align="center" width="100">
      <template slot-scope="scope">
        <el-button @click="deleteRow(scope)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="chufang">
    <span>手写处方：</span>
    <img v-bigimg="imageUrl" :src="imageUrl" width="50" class="thisimg">
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button type="warning" size="medium" @click="downifShowThis = false">关 闭</el-button>
  </div>
  <div class="clearfix"></div>
</el-dialog>
</template>

<script>
import {
  cartsubmit
} from '@/api/getData';
import {
  removeForIndex
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
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
}
</style>
