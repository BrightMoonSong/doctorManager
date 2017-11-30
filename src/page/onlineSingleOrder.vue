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
          <li v-for="(item, index) in addressList" :key="index">
            <span>详细地址：</span><span v-text="item"></span>
            <el-radio v-model="addressSelect" :label="index">选择</el-radio>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="clearfix"></div>
    <div class="drugsSearch">
      <h4>推荐用药：</h4>
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-cascader style="width:100%;" :options="options2" v-model="selectedOptions3"></el-cascader>
      </div>
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-input placeholder="按名称检索" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" stripe border style="width: 100%;" ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="商品名称" show-overflow-tooltip align="center"></el-table-column>
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
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;position:relative;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="currentPageSize" layout="total, sizes, prev, pager, next, jumper" :total="count">
        </el-pagination>
        <div style="position:absolute;top:0;right:0;">
          <el-button type="success" size="mini" @click="toggleSelection(true)">确认选择</el-button>
          <el-button type="warning" size="mini" @click="toggleSelection(false)">取消选择</el-button>
        </div>
      </div>
    </div>
    <div class="selectedGoods">
      <h4>已选药品：</h4>
      <el-table :data="selectedGoods" stripe border style="width: 100%;">
        <el-table-column prop="date" label="商品名称" show-overflow-tooltip align="center"></el-table-column>
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
        <el-table-column label="购买数量" align="center" width="150" prop="num">
          <template slot-scope="scope">
            <el-input-number size="mini" :step="1" :min="1" :max="100" v-model="scope.row.num"></el-input-number>
          </template>
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="chufang">
        <span>上传手写处方：</span>
        <el-upload
          class="avatar-uploader"
          action="https://zhydl.oss-cn-beijing.aliyuncs.com"
          :show-file-list="false"
          :data="dataObject"
          name="file"
          :on-success="uploadImg"
          :before-upload="beforeImgUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="drugsTotal">
        <span>药品总价：</span><span v-text="totalPrice+'元'"></span>
        <div class="el-col el-col-24" style="text-align: center;">
          <el-button type="success" size="medium" round @click="toggleSelection(true)">确认下单</el-button>
          <el-button type="warning" size="medium" round @click="toggleSelection(false)">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  prov,
  getsign
} from '@/api/getData';
import {
  baseUrl,
  baseImgPath
} from '@/config/env';

export default {
  data() {
    return {
      baseUrl,
      baseImgPath,
      totalPrice: 117,
      imageUrl: '',
      input5: '',
      count: 7,
      currentPage: 1,
      currentPageSize: 10,
      options2: [],
      selectedOptions3: [],
      selectedGoods: [],
      tableData: [],
      textarea2: '',
      multipleSelection: [],
      addressSelect: '',
      addressList: [],
      sizeForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dataFileName: '',
      dataObject: {}
    };
  },
  mounted() {
    this.provincialCity();
    this.initData();
  },
  methods: {
    async initData() {
      this.addressList = [
        '山东省青岛市市北区人民路15号',
        '山东省青岛市市北区人民路16号',
        '山东省青岛市市北区人民路17号',
        '山东省青岛市市北区人民路18号'
      ];
      let array = [{
        date: '2016-05-03',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎5',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎6',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 1518 弄'
      }];
      for (let i = 0; i < array.length; i++) {
        array[i].num = 1;
      }
      this.tableData = array;
      const res = await getsign();
      console.log(res);

      var oDate = new Date(); // 实例一个时间对象；
      var yearSec = '' + oDate.getFullYear() + (oDate.getMonth() + 1) + oDate.getDate() + oDate.getHours() + oDate.getMinutes() + oDate.getSeconds();
      var rand = '';
      for (let i = 0; i < 3; i++) {
        var r = Math.floor(Math.random() * 10);
        rand += r;
      }
      this.dataFileName = 'dev/carmodel/' + yearSec + rand + '.jpg';
      this.dataObject = { // 多个参数
        'key': this.dataFileName,
        'policy': res.data.policy,
        'OSSAccessKeyId': res.data.accessid,
        'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
        'signature': res.data.signature
      };
    },
    uploadImg(res, file) { // up, file, info   /res, file
      console.log(res);
      console.log(file);
      if (file.status === 'success') {
        this.imageUrl = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
        console.log(this.imageUrl);
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    beforeImgUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      console.log(file);
      return isJPG && isLt2M;
    },
    onSubmit() {
      console.log('submit!');
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    toggleSelection(or) {
      if (or) {
        if (this.multipleSelection.length > 0) {
          this.selectedGoods = [];
          this.multipleSelection.forEach((val, index) => {
            this.selectedGoods.push(val);
          });
        }
      } else {
        this.$refs['multipleTable'].clearSelection();
      }
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

<style lang="scss">
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

.chufang,
.drugsSearch,
.drugsTotal,
.selectedGoods {
    padding-top: 20px;
    margin-top: 20px;
    border-top: 1px #000 solid;
}
.drugsTotal {
    margin-bottom: 30px;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    margin-top: 10px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
</style>
