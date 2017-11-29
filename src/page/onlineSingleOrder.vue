<template lang="html">
  <div class="box">
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="姓名">
        <el-input v-model="sizeForm.name" style="width: 75%;"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="sizeForm.age" style="width: 75%;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="sizeForm.sex" label="1">男</el-radio>
        <el-radio v-model="sizeForm.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="sizeForm.age" style="width: 75%;"></el-input>
        <el-button type="primary" plain>查询</el-button>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="sizeForm.address" style="width: 75%;"></el-input>
      </el-form-item>
      <el-form-item label="症状">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea2">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="adress">
      <el-card class="box-card">
        <ul class="card-ul">
          <li>
            <span>姓名：</span><span>张三</span>
          </li>
          <li>
            <span>年龄：</span><span>56</span>
          </li>
          <li>
            <span>性别：</span><span>男</span>
          </li>
          <li>
            <span>手机：</span><span>136010998789</span>
          </li>
          <li v-for="(item, index) in addressList" :key="o">
            <span>详细地址：</span><span v-text="item"></span>
            <el-radio v-model="addressSelect" :label="index">选择</el-radio>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="drugsSearch">
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-cascader style="width:100%;" :options="options2" v-model="selectedOptions3"></el-cascader>
      </div>
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-input placeholder="按名称检索" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="商品名称"
          show-overflow-tooltip
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品分类"
          show-overflow-tooltip
          align="center">
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
          label="商品规格"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
            <!-- <el-checkbox @change="changeChec($)">选择</el-checkbox> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      textarea2: '',
      multipleSelection: [],
      addressSelect: '',
      addressList: [
        '山东省青岛市市北区人民路15号',
        '山东省青岛市市北区人民路16号',
        '山东省青岛市市北区人民路17号',
        '山东省青岛市市北区人民路18号'
      ],
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    }
  }
  // ,
  // watch: {
  //   addressSelect(newV, oldV) {
  //     if (newV || newV === 0) {
  //       this.sizeForm.address = this.addressList[newV];
  //     }
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.box {
    padding: 20px;
    .el-form {
        width: 53%;
        float: left;
    }
    .adress {
        width: 45%;
        float: right;
    }
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}
.clearfix:after,
.clearfix:before {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

.box-card {
    width: 100%;
}
.card-ul > li {
    padding: 5px;
}
</style>
