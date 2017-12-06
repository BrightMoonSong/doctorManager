<template>
<el-dialog title="确认订单" top="5vh" :visible.sync="downifShowThis">
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
  },
  methods: {
    async okDownOrder() {
      console.log('最终的确认下单！');
      let res = await cartsubmit({
        'doctorId': 0,
        'orderAddressVo': {
          'detailAddress': '详细地址',
          'receiveName': '收货人姓名',
          'receivePhone': '收货人电话',
          'userId': '用户ID'
        },
        'orderGoodsVo': [{
          'cartId': '购物车ID，如果是直接购买则为0',
          'count': 0, // 数量
          'goodsId': 0, // 商品ID
          'goodsImg': 'string', // 商品图片
          'goodsName': 'string', // 商品名称
          'goodsStatus': 0, // 商品状态
          'price': 0, // 单价
          'specification': 'string' // 单品规格信息
        }],
        'prescriptionUrl': 'string', // 处方单
        'remark': 'string', // 买家留言
        'storeId': 0, // 药店ID
        'symptoms': 'string', // 患者症状
        'userId': 0 // 用户ID
      });
      console.log(res);
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
