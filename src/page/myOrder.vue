<template lang="html">
<div class="box">
  <div class="el-col el-col-4" style="padding: 5px;padding-left: 0px;">
    <el-input v-model="parmValue" :maxlength="18" placeholder="关键词检索"></el-input>
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
    <el-date-picker :editable="false"
      v-model="datePicker"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  </div>
  <div class="el-col el-col-4" style="padding: 5px;width: 190px;">
    <!-- <el-button type="primary" plain @click="searchList">查询</el-button> -->
    <el-button type="primary" @click="searchList" icon="el-icon-search">搜索</el-button>
    <el-button type="success" style="margin-left:0;" @click="pageJump">下单</el-button>
  </div>
  <div class="el-col el-col-4" style="margin: 5px;width: 85px;float:right;">
    <el-button type="primary" style="float:right;" @click="searchList">刷新</el-button>
  </div>
  <el-table
    :data="tableData"
    stripe
    v-loading="loading"
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
      prop="orderMoney"
      align="center"
      show-overflow-tooltip
      label="订单金额">
    </el-table-column>
    <el-table-column
      prop="createTimeStr"
      align="center"
      show-overflow-tooltip
      label="下单时间">
    </el-table-column>
    <el-table-column
      show-overflow-tooltip
      align="center"
      label="订单状态">
      <template slot-scope="scope">
        <span v-text="funStatus(scope.row.orderStatus)"></span>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button @click="ordersdetailbyid(scope.row)" type="text" size="small">查看</el-button>
        <el-button v-show="scope.row.orderStatus===2" @click="payJump(scope.row.orderId)" type="text" size="small">去支付</el-button>
        <el-button @click="cancelOrder(scope.row.orderId)" type="text" size="small" v-if="0<scope.row.orderStatus&&scope.row.orderStatus<3">取消订单</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="Pagination" style="text-align: left;margin-top: 10px;" v-show="count>0">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
  <orderdetail :downifShow="dialogDegShowOrHide" :orderId="orderId" @dialog="onDialogRegChange"></orderdetail>
  <dialogqrcode :showqr="dialogqrshow" :orderId="orderId" @dialog="onDialogqr"></dialogqrcode>
</div>
</template>

<script>
import {
  ordersfindinfos,
  ordercancel
} from '@/api/getData';
import {
  getStore
  // setStore
} from '@/config/mUtils';
import orderdetail from '@/page/popup/orderDetail';
import dialogqrcode from '@/page/paycode/dialogqrcode';

export default {
  data() {
    return {
      orderId: 0,
      loading: true,
      parmValue: '',
      count: 0,
      dialogqrshow: false,
      currentPage: 1,
      currentPageSize: 10,
      tableData: [],
      dialogDegShowOrHide: false,
      options: [{
        value: '1',
        label: '全部订单'
      }, {
        value: '2',
        label: '待审核'
      }, {
        value: '3',
        label: '待付款'
      }, {
        value: '5',
        label: '已完成'
      }, {
        value: '6',
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
    this.initData(this.currentPage, this.currentPageSize);
  },
  components: {
    orderdetail,
    dialogqrcode
  },
  methods: {
    async downOrderNext(orderId) {
      let res = await ordercancel(orderId);
      // console.log(res);
      this.currentPage = 1;
      this.currentPageSize = 10;
      if (res.code === 1) {
        this.initData(this.currentPage, this.currentPageSize);
      }
    },
    async cancelOrder(orderId) {
      await this.$confirm('确定要取消订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.downOrderNext(orderId);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    payJump(orderId) {
      // setStore('orderId', orderId);
      // this.$router.push('/qrcode');
      this.orderId = orderId;
      this.dialogqrshow = true;
    },
    onDialogqr(val) {
      this.dialogqrshow = val; // 4
      this.initData(this.currentPage, this.currentPageSize);
    },
    onDialogRegChange(val) {
      this.dialogDegShowOrHide = val; // 4
    },
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
    ordersdetailbyid(row) {
      this.dialogDegShowOrHide = true;
      this.orderId = row.orderId;
      // console.log(this.orderId);
    },
    searchList() {
      this.initData(this.currentPage, this.currentPageSize);
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
    async initData(pageNo, pageSize) {
      this.loading = true;
      let res;
      if (this.datePicker instanceof Array) {
        res = await ordersfindinfos({
          'minTime': this.datePicker[0] ? this.dateFtt('yyyy-MM-dd hh:mm:ss', this.datePicker[0]) : '',
          'maxTime': this.datePicker[1] ? this.dateFtt('yyyy-MM-dd hh:mm:ss', this.datePicker[1]) : '',
          'pageSize': pageSize,
          'pageNo': pageNo,
          'parmValue': this.parmValue,
          'userId': getStore('userId'),
          'orderStatus': this.orderStatus
        });
      } else {
        res = await ordersfindinfos({
          'minTime': '',
          'maxTime': '',
          'pageSize': pageSize,
          'pageNo': pageNo,
          'parmValue': this.parmValue,
          'userId': getStore('userId'),
          'orderStatus': this.orderStatus
        });
      }
      if (res.code === 0) {
        this.tableData = res.data;
        this.count = res.totalSize;
      }
      this.loading = false;
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
