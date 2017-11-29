<template lang="html">
  <div class="box">
    <div class="el-col el-col-6" style="margin: 15px;">
      <el-cascader style="width:100%;" :options="options2" v-model="selectedOptions3"></el-cascader>
    </div>
    <div class="el-col el-col-6" style="margin: 15px;">
      <el-input placeholder="按名称检索" v-model="input5" class="input-with-select">
        <!-- <el-select v-model="select" clearable slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select> -->
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%;">
      <el-table-column
        prop="date"
        label="日期"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="地址">
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
import {
  prov
} from '@/api/getData';
export default {
  data() {
    return {
      input5: '',
      select: '',
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
      options2: [],
      selectedOptions3: ['北京市', '北京市', '朝阳区']
    };
  },
  methods: {
    async provincialCity() {
      const res = await prov();
      console.log(res);
      let arr = [];
      res.data.forEach(function(item, index) {
        let value = {
          value: item.name,
          label: item.name,
          children: []
        };
        item.city.forEach(function(val, i) {
          let obj = {
            value: val.name,
            label: val.name,
            children: []
          };
          val.area.forEach(function(v, m) {
            let o = {
              value: v,
              label: v
            };
            obj.children.push(o);
          });
          value.children.push(obj);
        });
        arr.push(value);
      });
      this.options2 = arr;
    }
  },
  mounted() {
    this.provincialCity();
  }
};
</script>

<style lang="scss" scoped>
.el-select .el-input {
   width: 130px;
 }
 .input-with-select .el-input-group__prepend {
   background-color: #fff;
 }
 .box{
   padding: 20px;
 }
</style>
