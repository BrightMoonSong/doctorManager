<template lang="html">
<div class="box">
  <div class="el-col el-col-4" style="padding: 5px;padding-left: 0px;">
    <el-input v-model="parmValue" placeholder="关键词检索"></el-input>
  </div>
  <div class="el-col el-col-4" style="padding: 5px;">
    <el-select v-model="orderStatus" style="width:100%" clearable placeholder="订单状态">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
  <div class="el-col el-col-8" style="padding: 5px;width:400px;padding-left: 0px;">
    <el-date-picker
      v-model="datePicker"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  </div>
  <div class="el-col el-col-4" style="padding: 5px;width: 168px;">
    <el-button type="primary" plain @click="searchList">查询</el-button>
    <el-button type="primary" @click="pageJump" plain>下单</el-button>
  </div>
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%;">
    <el-table-column
      prop="orderNo"
      label="订单号"
      align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名称"
      show-overflow-tooltip
      align="center">
    </el-table-column>
    <el-table-column
      prop="deliveryPhone"
      align="center"
      show-overflow-tooltip
      label="订单手机号">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      show-overflow-tooltip
      label="下单时间">
    </el-table-column>
    <el-table-column
      prop="address"
      show-overflow-tooltip
      align="center"
      label="订单状态">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      show-overflow-tooltip
      label="订单金额">
    </el-table-column>
    <el-table-column
      prop="address"
      show-overflow-tooltip
      align="center"
      label="订单药品">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button @click="ordersdetailbyid(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="Pagination" style="text-align: left;margin-top: 10px;" v-show="count>0">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</div>
</template>

<script>
import {
  ordersfindinfos,
  ordersdetailbyid
} from '@/api/getData';
import {
  getStore
} from '@/config/mUtils';

export default {
  data() {
    return {
      parmValue: '',
      count: 0,
      currentPage: 1,
      currentPageSize: 10,
      tableData: [],
      options: [{
        value: '1',
        label: '待审核'
      }, {
        value: '2',
        label: '待完成'
      }, {
        value: '3',
        label: '已完成'
      }, {
        value: '4',
        label: '无效'
      }],
      orderStatus: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      datePicker: ''
    };
  },
  mounted() {
    this.initData(1, 10);
  },
  methods: {
    async ordersdetailbyid(row) {
      let res = await ordersdetailbyid(row.orderId);
      console.log(res);
    },
    searchList() {
      this.initData(this.currentPage, this.currentPageSize);
    },
    async initData(pageNo, pageSize) {
      let res = await ordersfindinfos({
        'pageSize': pageSize,
        'pageNo': pageNo,
        'parmValue': this.parmValue,
        'userId': getStore('userId'),
        'orderStatus': this.orderStatus,
        'datePicker': this.datePicker
      });
      console.log(res);
      console.log(this.datePicker);
      if (res.code === 0) {
        this.tableData = res.data;
        this.count = res.totalSize;
      }
    },
    handleSizeChange(val) {
      this.currentPageSize = val;
      this.currentPage = 1;
      this.initData(this.currentPage, this.currentPageSize);
    },
    handleCurrentChange(val) {
      this.initData(val, this.currentPageSize);
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
    },
    pageJump() {
      this.$router.push('onlineSingleOrder');
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    padding: 20px;
}
</style>
