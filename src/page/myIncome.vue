<template lang="html">
<div class="box">
  <el-tabs type="border-card" @tab-click="tabClickT">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 订单收益</span>
      <div class="el-col el-col-4" style="padding: 5px;padding-left: 0px;">
        <el-input v-model="parmValue" :maxlength="18" placeholder="关键词检索"></el-input>
      </div>
      <div class="el-col el-col-8" style="padding: 5px;padding-left: 0px;width:220px;">
        <el-date-picker
          v-model="month" :editable="false"
          type="month" :clearable="false"
          placeholder="选择时间">
        </el-date-picker>
      </div>
      <div class="el-col el-col-4" style="padding: 5px;width:72px;">
        <!-- <el-button type="primary" plain>查询</el-button> -->
        <el-button type="primary" @click="searchList" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="el-col el-col-4" style="margin: 5px;width: 85px;float:right;">
        <el-button type="primary" style="float:right;" @click="searchList">刷新</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        v-loading="loading1"
        border
        style="width: 100%;">
        <el-table-column
          prop="orderNo"
          label="订单号"
          align="center"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="患者电话"
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
          align="center"
          show-overflow-tooltip
          label="订单状态">
          <template slot-scope="scope">
            <span v-text="statusList[scope.row.orderStatus]"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTimeStr"
          align="center"
          show-overflow-tooltip
          label="下单时间">
        </el-table-column>
        <el-table-column
          prop="completeTimeStr"
          align="center"
          show-overflow-tooltip
          label="收货时间">
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="结算状态">
          <template slot-scope="scope">
            <span v-text="jiesuanStatus[scope.row.status-1]"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="settlementTimeStr"
          align="center"
          show-overflow-tooltip
          label="结算时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination style="display: inline-block;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
        </el-pagination>
        <span style="float: right;margin-right:30px;">{{totalOrderMoney}}元</span>
        <span style="float: right;">当月有效订单金额：</span>
        <span v-if="monthContrast==monthContrast2" style="float: right;margin-right:30px;">{{getincomeData}}元</span>
        <span v-if="monthContrast==monthContrast2" style="float: right;">当月预计收益：</span>
      </div>
      <orderdetail :downifShow="dialogDegShowOrHide" :orderId="orderId" @dialog="onDialogRegChange"></orderdetail>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-tickets"></i> 推广注册收益</span>
      <div class="el-col el-col-4" style="padding: 5px;padding-left: 0px;">
        <el-input v-model="parmValue2" :maxlength="18" placeholder="关键词检索"></el-input>
      </div>
      <div class="el-col el-col-8" style="padding: 5px;padding-left: 0px;width:220px;">
        <el-date-picker
          v-model="yearMonth2" :editable="false"
          type="month" :clearable="false"
          placeholder="选择时间">
        </el-date-picker>
      </div>
      <div class="el-col el-col-4" style="padding: 5px;width:72px;">
        <!-- <el-button type="primary" plain>查询</el-button> -->
        <el-button type="primary" @click="searchList2" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="el-col el-col-4" style="margin: 5px;width: 85px;float:right;">
        <el-button type="primary" style="float:right;" @click="searchList2">刷新</el-button>
      </div>
      <el-table
        :data="tableData2"
        stripe
        v-loading="loading2"
        border
        style="width: 100%;">
        <el-table-column
          prop="doctorName"
          label="姓名"
          align="center"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="doctorPhone"
          label="手机号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="settlementMoney"
          align="center"
          show-overflow-tooltip
          label="收益">
        </el-table-column>
        <el-table-column
          prop="createTimeStr"
          align="center"
          show-overflow-tooltip
          label="通过审核时间">
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="结算状态">
          <template slot-scope="scope">
            <span v-text="jiesuanStatus[scope.row.status-1]"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="settlementTimeStr"
          align="center"
          show-overflow-tooltip
          label="结算时间">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination style="display: inline-block;" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize2" layout="total, sizes, prev, pager, next, jumper" :total="count2">
        </el-pagination>
        <span style="float: right;margin-right:30px;">{{count2}}人</span>
        <span style="float: right;">当月推广人数：</span>
        <span style="float: right;margin-right:30px;">{{totalOrderMoney2}}元</span>
        <span style="float: right;">当月推广收益：</span>
      </div>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-tickets"></i> 推广订单收益</span>
      <div class="el-col el-col-4" style="padding: 5px;padding-left: 0px;">
        <el-input v-model="parmValue3" :maxlength="18" placeholder="关键词检索"></el-input>
      </div>
      <div class="el-col el-col-8" style="padding: 5px;padding-left: 0px;width:220px;">
        <el-date-picker
          v-model="yearMonth3" :editable="false"
          type="month" :clearable="false"
          placeholder="选择时间">
        </el-date-picker>
      </div>
      <div class="el-col el-col-4" style="padding: 5px;width:72px;">
        <!-- <el-button type="primary" plain>查询</el-button> -->
        <el-button type="primary" @click="searchList3" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="el-col el-col-4" style="margin: 5px;width: 85px;float:right;">
        <el-button type="primary" style="float:right;" @click="searchList3">刷新</el-button>
      </div>
      <el-table
        :data="tableData3"
        stripe
        v-loading="loading3"
        border
        style="width: 100%;">
        <el-table-column
          prop="doctorName"
          label="姓名"
          align="center"
          show-overflow-tooltip
          width="180">
        </el-table-column>
        <el-table-column
          prop="doctorPhone"
          label="手机号"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="settlementMoney"
          align="center"
          show-overflow-tooltip
          label="订单金额">
        </el-table-column>
        <el-table-column
          prop="prop"
          align="center"
          show-overflow-tooltip
          label="收益比例">
        </el-table-column>
        <el-table-column
          prop="income"
          align="center"
          show-overflow-tooltip
          label="收益">
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          label="结算状态">
          <template slot-scope="scope">
            <span v-text="jiesuanStatus[scope.row.status-1]"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="settlementTimeStr"
          align="center"
          show-overflow-tooltip
          label="结算时间">
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination style="display: inline-block;" @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="currentPage3" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize3" layout="total, sizes, prev, pager, next, jumper" :total="count3">
        </el-pagination>
        <span style="float: right;margin-right:30px;">{{totalIncome3}}元</span>
        <span style="float: right;">当月推广订单收益：</span>
        <span style="float: right;margin-right:30px;">{{totalOrderMoney3}}元</span>
        <span style="float: right;">当月推广订单总金额：</span>
      </div>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import {
  doctorprofitinfos,
  recommendorders,
  getincome,
  recommendinfos
} from '@/api/getData';
import orderdetail from '@/page/popup/orderDetail';

export default {
  data() {
    return {
      loading1: true,
      loading2: true,
      loading3: true,
      parmValue: '',
      parmValue2: '',
      parmValue3: '',
      count: 0,
      count2: 0,
      count3: 0,
      orderId: 0,
      dialogDegShowOrHide: false,
      statusList: ['无效', '待审核', '待付款', '待完成', '待完成', '已完成', '已完成'],
      jiesuanStatus: ['未结算', '已结算'],
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPageSize: 10,
      currentPageSize2: 10,
      currentPageSize3: 10,
      tableData: [],
      tableData2: [],
      tableData3: [],
      totalOrderMoney: 0,
      totalOrderMoney2: 0,
      totalOrderMoney3: 0,
      totalIncome3: '',
      month: '',
      monthContrast: '',
      monthContrast2: '',
      yearMonth2: '',
      getincomeData: '',
      yearMonth3: ''
    };
  },
  components: {
    orderdetail
  },
  mounted() {
    let date = new Date();
    this.month = date;
    this.monthContrast = this.dateFtt('yyyy', date) + '-' + this.dateFtt('MM', date);
    this.yearMonth2 = date;
    this.yearMonth3 = date;
    this.initData(this.currentPage, this.currentPageSize);
    // this.initData2(this.currentPage2, this.currentPageSize2);
    // this.initData3(this.currentPage3, this.currentPageSize3);
  },
  methods: {
    tabClickT(targetName) {
      // console.log(targetName.index);
      // console.log(typeof targetName.index);
      switch (targetName.index) {
        case '0':
          this.searchList();
          break;
        case '1':
          this.searchList2();
          break;
        case '2':
          this.searchList3();
          break;
        default:
          console.log(targetName.index);
      }
    },
    onDialogRegChange(val) {
      this.dialogDegShowOrHide = val; // 4
    },
    handleClick(row) { // 详情
      this.dialogDegShowOrHide = true;
      this.orderId = row.orderId;
    },
    searchList() {
      this.initData(this.currentPage, this.currentPageSize);
      // this.getincome();
    },
    searchList2() {
      this.initData2(this.currentPage2, this.currentPageSize2);
    },
    searchList3() {
      this.initData3(this.currentPage3, this.currentPageSize3);
    },
    async getincome() {
      let res = await getincome();
      if (res.code === 0) {
        this.getincomeData = res.data;
      }
    },
    async initData(pageNo, pageSize) {
      this.loading1 = true;
      let obj = {
        'parmValue': this.parmValue,
        'year': this.month ? this.dateFtt('yyyy', this.month) : '',
        'month': this.month ? this.dateFtt('MM', this.month) : '',
        'pageSize': pageSize,
        'pageNo': pageNo
      };
      let res = await doctorprofitinfos(obj);
      this.monthContrast2 = obj.year + '-' + obj.month;
      if (res.code === 0) {
        this.tableData = res.data.orders;
        this.totalOrderMoney = res.data.totalOrderMoney ? res.data.totalOrderMoney : 0;
        this.count = res.totalSize;
      }
      if (this.monthContrast2 === this.monthContrast) {
        this.getincome();
      }
      this.loading1 = false;
    },
    async initData2(pageNo, pageSize) {
      this.loading2 = true;
      let res = await recommendinfos({
        'parmValue': this.parmValue2,
        'year': this.yearMonth2 ? this.dateFtt('yyyy', this.yearMonth2) : '',
        'month': this.yearMonth2 ? this.dateFtt('MM', this.yearMonth2) : '',
        'pageSize': pageSize,
        'pageNo': pageNo
      });
      if (res.code === 0) {
        this.tableData2 = res.data.list;
        this.totalOrderMoney2 = res.data.money ? res.data.money : 0;
        this.count2 = res.totalSize;
      }
      this.loading2 = false;
    },
    async initData3(pageNo, pageSize) {
      this.loading3 = true;
      let res = await recommendorders({
        'parmValue': this.parmValue3,
        'year': this.yearMonth3 ? this.dateFtt('yyyy', this.yearMonth3) : '',
        'month': this.yearMonth3 ? this.dateFtt('MM', this.yearMonth3) : '',
        'pageSize': pageSize,
        'pageNo': pageNo
      });
      if (res.code === 0) {
        this.tableData3 = res.data.orders;
        this.totalOrderMoney3 = res.data.totalOrderMoney ? res.data.totalOrderMoney : 0;
        this.totalIncome3 = res.data.totalIncome ? res.data.totalIncome : 0;
        this.count3 = res.totalSize;
      }
      this.loading3 = false;
    },
    dateFtt(fmt, date) {
      // this.datePicker[0] ? this.dateFtt('yyyy-MM-dd hh:mm:ss', this.datePicker[0]) : '',
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
    handleSizeChange2(val) {
      this.currentPageSize2 = val;
      this.currentPage2 = 1;
      this.initData2(this.currentPage2, this.currentPageSize2);
    },
    handleCurrentChange2(val) {
      this.initData2(val, this.currentPageSize2);
      this.currentPage2 = val;
      this.offset = (val - 1) * this.limit;
    },
    handleSizeChange3(val) {
      this.currentPageSize3 = val;
      this.currentPage3 = 1;
      this.initData3(this.currentPage3, this.currentPageSize3);
    },
    handleCurrentChange3(val) {
      this.initData3(val, this.currentPageSize3);
      this.currentPage3 = val;
      this.offset = (val - 1) * this.limit;
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    padding: 20px;
}
.el-select {
    width: 100%;
}
</style>
