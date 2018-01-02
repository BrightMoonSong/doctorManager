<template lang="html">
  <div class="box">
    <div class="el-col el-col-24" style="margin: 15px;">
      <span>您当前的可用信用额度为：</span><span>{{totalCredit | money('元')}}</span>
      <el-button type="success" size="medium" @click="goPurchase()">下单采购</el-button>
    </div>
    <div class="el-col el-col-6" style="margin: 15px;">
      <el-cascader style="width:100%;" placeholder="检索分类" :maxlength="18"
        :options="selectList" v-model="cateIdList"
        @active-item-change="handleItemChange"
        :props="props"
        clearable
      ></el-cascader>
    </div>
    <div class="el-col el-col-6" style="margin: 15px;">
      <el-input placeholder="关键词检索" v-model="parmValue" class="input-with-select">
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="tableData"
      stripe border style="width: 100%;">
      <el-table-column
        prop="src" label="商品图片"
        show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <img :src="scope.row.masterImg" @click="clickImg(scope.row.masterImg)" alt="..." width="50">
        </template>
      </el-table-column>
      <el-table-column
        prop="name1"
        show-overflow-tooltip
        label="商品名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name2"
        align="center"
        show-overflow-tooltip
        label="商品简介">
      </el-table-column>
      <el-table-column
        prop="salesPrice"
        align="center"
        show-overflow-tooltip
        label="商品售价">
      </el-table-column>
      <el-table-column
        prop="stock"
        align="center"
        show-overflow-tooltip
        label="商品库存">
      </el-table-column>
      <el-table-column
        prop="specification"
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
  findinfoself,
  getinfoself,
  getinfo,
  findinfosbypid
} from '@/api/getData';
import BigImg from '@/common/BigImg';
import detailModel from '@/page/popup/detailModel';

export default {
  data() {
    return {
      dialogShowOrHide: false,
      selectTable: [],
      select: '',
      showImg: false,
      totalCredit: '',
      bigImgSrc: '',
      tableData: [],
      count: 0,
      currentPage: 1,
      currentPageSize: 10,
      selectList: [],
      props: {
        value: 'value',
        children: 'children'
      },
      cateIdList: [],
      categoryId: '',
      parmValue: ''
    };
  },
  mounted() {
    // 获取三级分类
    this.findinfosbypid();
    this.doctorInfo();
    this.initData(1, 10);
  },
  methods: {
    async doctorInfo() {
      let res = await getinfo();
      if (res.code === 0) {
        this.totalCredit = res.data.credits;
      }
    },
    goPurchase() {
      this.$router.push('purchase');
    },
    search() {
      if (this.cateIdList.length === 3) {
        this.categoryId = this.cateIdList[2];
      }
      this.initData(1, 10);
    },
    async handleItemChange(val) {
      if (val.length === 3) {
        return;
      }
      let res = await findinfosbypid(val[val.length - 1]);
      if (val.length === 1) {
        let index = 0;
        this.selectList.forEach((v, i) => {
          if (v.value === val[val.length - 1]) {
            index = i;
          }
        });
        this.selectList[index].children = [];
        res.data.forEach(m => {
          let obj = {
            value: m.cateId,
            label: m.cateName,
            children: []
          };
          this.selectList[index].children.push(obj);
        });
      } else if (val.length === 2) {
        let index = 0;
        let index1 = 0;
        this.selectList.forEach((v, i) => {
          if (v.value === val[0]) {
            index = i;
          }
        });
        this.selectList[index].children.forEach((m, n) => {
          if (m.value === val[1]) {
            index1 = n;
          }
        });
        this.selectList[index].children[index1].children = [];
        res.data.forEach(val => {
          let obj = {
            value: val.cateId,
            label: val.cateName
          };
          this.selectList[index].children[index1].children.push(obj);
        });
      }
    },
    async findinfosbypid() {
      let res = await findinfosbypid(0);
      this.selectList = [];
      res.data.forEach(val => {
        let obj = {
          value: val.cateId,
          label: val.cateName,
          children: []
        };
        this.selectList.push(obj);
      });
    },
    clickImg(src) {
      this.showImg = true;
      // 获取当前图片地址
      this.bigImgSrc = src;
    },
    viewImg() {
      this.showImg = false;
    },
    async initData(pageNo, pageSize) {
      if (this.cateIdList.length === 0) {
        this.categoryId = '';
      }
      let res = await findinfoself({
        'pageSize': pageSize,
        'pageNo': pageNo,
        'parmValue': this.parmValue,
        'categoryId': this.categoryId
      });
      this.tableData = res.data;
      this.count = res.totalSize;
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
    async handleClick(row, index) {
      let res = await getinfoself(row.goodsId);
      console.log(res);
      if (res.code === 0) {
        this.selectTable = res.data;
        this.dialogShowOrHide = true;
      }
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
