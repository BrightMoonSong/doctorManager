<template lang="html">
  <div class="box">
    <div class="drugsSearch" style="border-top:0;margin-top:0;padding-top:0;">
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-cascader style="width:100%;" placeholder="检索分类"
          :options="selectList" v-model="cateIdList"
          @active-item-change="handleItemChange"
          :props="props"
          clearable
        ></el-cascader>
      </div>
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-input placeholder="关键词检索" :maxlength="18" v-model="parmValue" class="input-with-select">
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="el-col el-col-4" style="margin: 15px;width: 85px;float:right;">
        <el-button type="primary" style="float:right;" @click="search">刷新</el-button>
      </div>
      <el-table :data="tableData" stripe border style="width: 100%;" ref="multipleTable"
        v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="src"
          label="商品图片"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <img v-bigimg="scope.row.masterImg" :src="scope.row.masterImg" @click="clickImg(scope.row.masterImg)" alt="..." width="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="name1"
          show-overflow-tooltip
          label="商品名称"
          align="center">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="商品类型"
          align="center">
          <template slot-scope="scope">
            <span>{{goodsTypeList[scope.row.goodsType-1]}}</span>
          </template>
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
        <el-table-column
          prop="src"
          label="商品图片"
          show-overflow-tooltip
          align="center">
          <template slot-scope="scope">
            <img v-bigimg="scope.row.masterImg" :src="scope.row.masterImg" @click="clickImg(scope.row.masterImg)" alt="..." width="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="name1"
          show-overflow-tooltip
          label="商品名称"
          align="center">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="商品类型"
          align="center">
          <template slot-scope="scope">
            <span>{{goodsTypeList[scope.row.goodsType-1]}}</span>
          </template>
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
          label="商品个数"
          align="center"
          show-overflow-tooltip
          width="150">
          <template slot-scope="scope">
            <el-input-number size="mini" :min="1" :max="scope.row.stock" v-model="scope.row.count"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="deleteRow(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="drugsTotal">
        <span class="el-col el-col-5" style="text-align: right;line-height:40px;">您当前的可用信用额度为：</span>
        <span class="el-col el-col-5" style="text-align: left;line-height:40px;">{{totalCredit | money('元')}}</span><br /><br />
        <span class="el-col el-col-5" style="text-align: right;line-height:40px;">已选药品的总价为：</span>
        <span class="el-col el-col-5" style="text-align: left;line-height:40px;">{{totalPrice | money('元')}}</span><br /><br />
      </div>
      <div class="drugsTotal">
        <span class="el-col el-col-5" style="text-align: right;line-height:40px;">收货人：</span>
        <el-input style="width:50%;" v-model="receiveObj.receiveName" :maxlength="15" placeholder="请输入收货人姓名"></el-input><br /><br />
        <span class="el-col el-col-5" style="text-align: right;line-height:40px;">联系方式：</span>
        <el-input style="width:50%;" v-model="receiveObj.receivePhone" :maxlength="11" placeholder="请输入联系方式"></el-input><br /><br />
        <span class="el-col el-col-5" style="text-align: right;line-height:40px;">收货地址：</span>
        <el-input style="width:50%;" v-model="receiveObj.receiveAddress" :maxlength="35" placeholder="请输入收货地址"></el-input><br /><br />
        <span class="el-col el-col-5" style="text-align: right;line-height:40px;">留言：</span>
        <el-input style="width:50%;" v-model="receiveObj.remark" :maxlength="55" placeholder="请输入备注信息"></el-input><br /><br />
        <div class="el-col el-col-24" style="text-align: center;">
          <el-button type="success" size="medium" round @click="onSubmit(true)">确认下单</el-button>
          <el-button type="warning" size="medium" round @click="onSubmit(false)">取消</el-button>
        </div>
      </div>
    </div>
    <detailmodel :dialogShowOrHide="dialogShowOrHide" :selectTable="selectTable" @myevent="onResultChange" @dialog="onDialogChange"></detailmodel>
</div>
</template>

<script>
import {
  findinfos,
  getinfo,
  findareabypid,
  findinfosbypid,
  getinfoforgoods,
  cartsubmitself
} from '@/api/getData';
import {
  removeForIndex
} from '@/config/mUtils';
import {
  baseUrl,
  baseImgPath
} from '@/config/env';
import detailModel from '@/page/popup/detailModel';

export default {
  data() {
    return {
      selectTable: [],
      baseUrl,
      goodsTypeList: ['处方药', '非处方药', '其他'],
      receiveObj: {},
      baseImgPath,
      totalPrice: 0,
      imageUrl: '',
      input5: '',
      smsCode: '',
      dialogShowOrHide: false,
      loading: true,
      dialogDegShowOrHide: false,
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
      parmValue: '',
      selectedGoods: [],
      tableData: [],
      multipleSelection: [],
      addressSelect: '',
      addressList: [],
      dataFileName: '',
      totalCredit: 0,
      dataObject: {},
      userSearched: {},
      areaList: {
        province: '',
        city: '',
        district: ''
      },
      outerVisible: false,
      innerVisible: false
    };
  },
  mounted() {
    // 获取三级分类
    this.findinfosbypid();
    this.initData(this.currentPage, this.currentPageSize);
    this.doctorInfo();
  },
  methods: {
    async areaName(id, comId, n, m) {
      let res = await findareabypid(id);
      if (res.code >= 0) {
        res.data.forEach(val => {
          if (val.areaId === comId) {
            switch (n) {
              case 1:
                this.areaList.province = val.name;
                break;
              case 2:
                this.areaList.city = val.name;
                break;
              default:
                this.areaList.district = val.name;
                let str = this.areaList.province + this.areaList.city + this.areaList.district + m;
                this.$set(this.receiveObj, 'receiveAddress', str);
            }
          }
        });
      }
    },
    async doctorInfo() {
      let res = await getinfo();
      if (res.code === 0) {
        this.receiveObj.receiveName = res.data.doctorName;
        this.receiveObj.receivePhone = res.data.phone;
        // this.receiveObj.receiveAddress = res.data.addressDetail;
        this.areaName(0, res.data.province, 1);
        this.areaName(res.data.province, res.data.city, 2);
        this.areaName(res.data.city, res.data.district, 3, res.data.addressDetail);
        this.totalCredit = res.data.credits;
      }
    },
    search() {
      if (this.cateIdList.length === 3) {
        this.categoryId = this.cateIdList[2];
      }
      this.initData(this.currentPage, this.currentPageSize);
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
        res.data.forEach(val => {
          let obj = {
            value: val.cateId,
            label: val.cateName,
            children: []
          };
          this.selectList[0].children.push(obj);
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
    async initData(pageNo, pageSize) {
      this.loading = true;
      if (this.cateIdList.length === 0) {
        this.categoryId = '';
      }
      let res = await findinfos({
        'pageSize': pageSize,
        'pageNo': pageNo,
        'parmValue': this.parmValue,
        'categoryId': this.categoryId
      });
      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].count = 1;
        }
      }
      this.tableData = res.data;
      this.count = res.totalSize;
      this.loading = false;
    },
    async downOrderNext() {
      let obj = {
        'goodsList': JSON.parse(JSON.stringify(this.selectedGoods)),
        'receiveAddress': this.receiveObj.receiveAddress,
        'receiveName': this.receiveObj.receiveName,
        'receivePhone': this.receiveObj.receivePhone,
        'remark': this.receiveObj.remark
      };
      obj.goodsList.forEach(val => {
        val.goodsImg = val.masterImg;
        val.price = val.salesPrice;
        val.goodsName = val.name1;
      });
      let res = await cartsubmitself(obj);
      console.log('false');
      this.twoSub = false;
      if (res.code === 1) {
        this.$router.push('/stockorder');
      }
    },
    async onSubmit(boolean) {
      if (boolean) {
        if (this.selectedGoods.length === 0) {
          this.$notify.error({
            title: '亲,您还没有选择药品哦',
            message: '请点击表格前面的小方框并确认选择'
          });
          return false;
        }
        if (this.receiveObj.receiveAddress && this.receiveObj.receiveName && this.receiveObj.receivePhone) {
          if (!(/^1[0-9]\d{9}$/.test(this.receiveObj.receivePhone))) {
            this.$message.error('手机号格式不正确！');
            return false;
          }
          await this.$confirm('请仔细核对信息，确定提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.twoSub) {
              this.$notify.error({
                title: '请勿重复提交',
                message: ''
              });
              return;
            }
            this.twoSub = true;
            this.downOrderNext();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        } else {
          this.$message.error('收货人姓名、联系方式、收货地址缺一不可！');
        }
      } else {
        // 取消下单
        this.toggleSelection(false);
        this.multipleSelection = [];
        this.selectedGoods = [];
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
    async handleClick(row, index) {
      let res = await getinfoforgoods(row.goodsId);
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
    },
    onDialogRegChange(val) {
      this.dialogDegShowOrHide = val; // 4
      this.toggleSelection(false);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val);
    },
    toggleSelection(or) {
      if (or) {
        // 药品类型：1：处方药   2：非处方    3：其它 goodsType
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach((val, index) => {
            let a = 1;
            this.selectedGoods.forEach((m, i) => {
              if (m.goodsId === val.goodsId) {
                a = 2;
              }
            });
            if (a === 1) {
              this.selectedGoods.push(val);
            }
          });
        } else {
          this.$notify.error({
            title: '亲,您还没有选择药品哦',
            message: '请点击表格前面的小方框选择药品'
          });
        }
      } else {
        this.$refs['multipleTable'].clearSelection();
      }
    },
    deleteRow(scope) {
      this.selectedGoods[scope.$index].count = 1;
      this.selectedGoods = removeForIndex(this.selectedGoods, scope.$index);
    }
  },
  components: {
    'detailmodel': detailModel
  },
  watch: {
    selectedGoods: {
      handler: function(val, oldval) {
        if (val.length > 0) {
          let price = 0;
          val.forEach(value => {
            price += value.salesPrice * value.count;
          });
          this.totalPrice = price;
        } else {
          this.totalPrice = 0;
        }
        let biaoji = 0;
        this.selectedGoods.forEach((val, index) => {
          if (val.goodsType === 1) {
            biaoji = 1;
          }
        });
        if (biaoji === 1) {
          this.chufshow = true;
        } else {
          this.chufshow = false;
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    },
    addressSelect: function(val, oldVal) {
      this.sizeForm.address = this.addressList[val].detailAddress;
    }
  }
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
