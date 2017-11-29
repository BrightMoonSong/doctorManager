<template lang="html">
<div class="box">
  <div class="el-col el-col-4" style="margin: 15px;">
    <el-input v-model="input1" placeholder="按订单号检索"></el-input>
  </div>
  <div class="el-col el-col-4" style="margin: 15px;">
    <el-input v-model="input2" placeholder="按手机号检索"></el-input>
  </div>
  <div class="el-col el-col-4" style="margin: 15px;">
    <el-input v-model="input3" placeholder="按姓名检索"></el-input>
  </div>
  <div class="el-col el-col-4" style="margin: 15px;">
    <el-select v-model="value" clearable placeholder="订单状态">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
  <div class="el-col el-col-8" style="margin: 15px;">
    <el-date-picker
      v-model="value4"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  </div>
  <div class="el-col el-col-4" style="margin: 15px;">
    <el-button type="primary" plain>查询</el-button>
  </div>
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%;">
    <el-table-column
      prop="date"
      label="订单号"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="订单姓名"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="订单手机号">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="下单时间">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="订单状态">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="订单金额">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="佣金">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="Pagination" style="text-align: left;margin-top: 10px;">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      count: 20,
      input2: '',
      input3: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      options: [{
        value: '1',
        label: '交通银行'
      }, {
        value: '2',
        label: '工商银行'
      }, {
        value: '3',
        label: '建设银行'
      }, {
        value: '4',
        label: '中国银行'
      }, {
        value: '5',
        label: '北京银行'
      }],
      value: '5',
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
      value4: ''
    };
  },
  methods: {
    // async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
    async initData(pageNo, pageSize) {
      try {
        // mapi/carmodel/carmodels
        // /mapi/log/find?pageNo=1&pageSize=10&userToken=6c542f95393&formToken=ea1323e9-d1f5949&funcId=559
        // const countData = await this.$http.get('/mapi/log/find?pageNo=' + pageNo + '&pageSize=' + pageSize).then((response) => {
        //   response = response.body;
        //   return response;
        // });
        const countData = await this.$http.get('/mapi/carmodel/carmodels?pageNo=' + pageNo + '&pageSize=' + pageSize).then((response) => {
          response = response.body;
          return response;
        });
        this.city = {
          'name': '北京',
          'id': '1'
        };
        if (countData.code === 0) {
          this.Orders = countData.data;
          this.count = countData.totalSize;
        } else {
          throw new Error('获取数据失败');
        }
        this.getOrders();
      } catch (err) {
        console.log('获取数据失败', err);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPageSize = val;
      this.currentPage = 1;
      this.initData(this.currentPage, this.currentPageSize);
    },
    handleCurrentChange(val) {
      console.log(`第 ${val} 页`);
      this.initData(val, this.currentPageSize);
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getOrders();
    },
    async getOrders() {
      this.tableData.push({
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    padding: 20px;
}
</style>
