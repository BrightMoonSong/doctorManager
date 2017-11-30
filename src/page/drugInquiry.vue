<template lang="html">
  <div class="box">
    <div class="el-col el-col-6" style="margin: 15px;">
      <el-cascader style="width:100%;" placeholder="检索分类" :options="options2" v-model="selectedOptions3"></el-cascader>
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
        prop="src"
        label="商品图片"
        show-overflow-tooltip
        align="center">
        <template slot-scope="scope">
          <img :src="scope.row.src" @click="clickImg(scope.row.src)" alt="..." width="50">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        show-overflow-tooltip
        label="商品名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        show-overflow-tooltip
        label="商品分类">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        show-overflow-tooltip
        label="商品售价">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        show-overflow-tooltip
        label="商品库存">
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        show-overflow-tooltip
        label="商品规格">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
      </el-pagination>
    </div>
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="bigImgSrc"></big-img>
    <detailmodel :dialogShowOrHide="dialogShowOrHide" :selectTable="selectTable" @myevent="onResultChange" @dialog="onDialogChange"></detailmodel>
  </div>
</template>

<script>
import {
  prov
} from '@/api/getData';
import BigImg from '@/common/BigImg';
import detailModel from '@/page/popup/detailModel';

export default {
  data() {
    return {
      input5: '',
      dialogShowOrHide: false,
      selectTable: [],
      select: '',
      showImg: false,
      bigImgSrc: '',
      tableData: [],
      options2: [],
      count: 4,
      currentPage: 1,
      currentPageSize: 10,
      selectedOptions3: []
    };
  },
  mounted() {
    this.provincialCity();
    this.initData();
  },
  methods: {
    clickImg(src) {
      this.showImg = true;
      // 获取当前图片地址
      this.bigImgSrc = src;
    },
    viewImg() {
      this.showImg = false;
    },
    initData() {
      console.log('---++++');
      this.tableData = [{
        src: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        src: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        src: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        src: 'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }];
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
    },
    handleClick(row, index) {
      this.selectTable = row;
      this.dialogShowOrHide = true;
      console.log(this.selectTable, this.dialogShowOrHide);
      console.log(row, index);
    },
    onResultChange(val) {
      this.dialogShowOrHide = val; // 4
    },
    onDialogChange(val) {
      this.dialogShowOrHide = val; // 4
    }
  },
  components: {
    'big-img': BigImg,
    'detailmodel': detailModel
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
.box {
    padding: 20px;
}
</style>
