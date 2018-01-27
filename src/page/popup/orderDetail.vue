<template>
<el-dialog title="订单详情" top="5vh" :visible.sync="downifShowThis">
  <el-table :data="toptable" stripe border style="width: 100%;">
    <el-table-column prop="orderNo" show-overflow-tooltip label="订单号" align="center">
    </el-table-column>
    <el-table-column prop="createTimeStr" align="center" show-overflow-tooltip label="下单时间">
    </el-table-column>
    <el-table-column prop="orderMoney" align="center" show-overflow-tooltip label="订单金额">
    </el-table-column>
    <el-table-column align="center" show-overflow-tooltip label="订单状态">
      <template slot-scope="scope">
        <span v-text="funStatus(scope.row.orderStatus)"></span>
      </template>
    </el-table-column>
    <el-table-column prop="remark" align="center" show-overflow-tooltip label="订单备注">
    </el-table-column>
    <el-table-column prop="cancelReamrk" v-if="orderStatus0" align="center" show-overflow-tooltip label="取消原因">
    </el-table-column>
  </el-table>
  <div class="topline"></div>
  <el-form ref="form" label-width="100px" size="mini">
    <el-form-item label="姓名：">
      <span v-text="dataList.userName" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="年龄：">
      <span v-text="dataList.userAge" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="性别：">
      <el-radio v-model="dataList.userGender" :disabled="true" :label="1">男</el-radio>
      <el-radio v-model="dataList.userGender" :disabled="true" :label="2">女</el-radio>
    </el-form-item>
    <el-form-item label="手机号：">
      <span v-text="dataList.userPhone" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="详细地址：">
      <span v-text="dataList.orderAddressVo.detailAddress" style="width: 75%;"></span>
    </el-form-item>
    <el-form-item label="症状：">
      <span v-text="dataList.sympToms" style="width: 75%;"></span>
    </el-form-item>
  </el-form>
  <div class="topline"></div>
  <h4>已选药品：</h4>
  <el-table :data="dataList.orderGoodsVoList" stripe border style="width: 100%;">
    <el-table-column prop="src" label="商品图片" show-overflow-tooltip align="center">
      <template slot-scope="scope">
        <img v-bigimg="scope.row.goodsImg" :src="scope.row.goodsImg" alt="..." width="50">
      </template>
    </el-table-column>
    <el-table-column prop="goodsName" show-overflow-tooltip label="商品名称" align="center">
    </el-table-column>
    <el-table-column prop="price" align="center" show-overflow-tooltip label="商品售价">
    </el-table-column>
    <el-table-column prop="specification" align="center" show-overflow-tooltip label="商品规格">
    </el-table-column>
    <el-table-column label="商品个数" prop="count" align="center" show-overflow-tooltip>
    </el-table-column>
    <!-- <el-table-column label="总价" align="center" show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-text="scope.row.price*scope.row.count + '元'"></span>
      </template>
    </el-table-column> -->
  </el-table>
  <h4>合计金额：{{totalPrice | money('元')}}</h4>
  <div class="topline" v-if="dataList.prescriptionUrl"></div>
  <div class="chufang" v-if="dataList.prescriptionUrl">
    <span>手写处方：</span>
    <img v-bigimg="dataList.prescriptionUrl" :src="dataList.prescriptionUrl" width="50" class="thisimg">
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button type="warning" size="medium" @click="downifShowThis = false">关 闭</el-button>
  </div>
  <div class="clearfix"></div>
</el-dialog>
</template>

<script>
import {
  ordersdetailbyid
} from '@/api/getData';

export default {
  props: {
    orderId: { // 必须提供字段
      required: true
    },
    downifShow: { // 可选字段，有默认值
      default: false
    }
  },
  data() {
    return { // 1
      downifShowThis: this.downifShow,
      imageUrl: '',
      orderStatus0: false,
      totalPrice: 0,
      toptable: [],
      dataList: {
        'orderAddressVo': {}
      }
    };
  },
  methods: {
    funStatus(val) {
      let str = '';
      switch (val) {
        case 1:
          str = '待审核';
          break;
        case 2:
          str = '待付款';
          break;
        case 3:
          str = '待完成';
          break;
        case 4:
          str = '待完成';
          break;
        case 5:
          str = '已完成';
          break;
        case 6:
          str = '已完成';
          break;
        default: // 0
          str = '无效';
      }
      return str;
    },
    async init() {
      let res = await ordersdetailbyid(this.orderId);
      if (res.code === 0) {
        if (res.data) {
          this.dataList = res.data;
          let arr = [];
          arr.push(res.data);
          this.toptable = arr;
          if (res.data.orderStatus === 0) {
            this.orderStatus0 = true;
          } else {
            this.orderStatus0 = false;
          }
          if (res.data.orderGoodsVoList.length > 0) {
            let total = 0;
            res.data.orderGoodsVoList.forEach(val => {
              total += val.price * val.count;
            });
            this.totalPrice = total;
          }
        }
      }
    }
  },
  watch: {
    downifShow: function(val, oldVal) { // 2
      this.downifShowThis = val;
      if (val) {
        this.init();
      }
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
.topline {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    border-top: 1px solid #9f9f9f;
}
</style>
