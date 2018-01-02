<template lang="html">
  <div class="box">
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
      <el-form-item label="手机号">
        <el-input v-model="sizeForm.phone" style="width: 75%;" :maxlength="11"></el-input>
        <el-button type="primary" plain @click="searchUserByPhone">查询</el-button>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="sizeForm.name" :maxlength="15" style="width: 75%;"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="sizeForm.age" :maxlength="3" style="width: 75%;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="sizeForm.sex" :label="1">男</el-radio>
        <el-radio v-model="sizeForm.sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="sizeForm.address" :maxlength="30" style="width: 75%;"></el-input>
      </el-form-item>
      <el-form-item label="症状">
        <el-input :maxlength="100"
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="sizeForm.symptoms">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="adress" v-if="userSearched.userName">
      <el-card class="box-card">
        <ul class="card-ul">
          <li>
            <span>姓名：</span><span v-text="userSearched.userName"></span>
          </li>
          <li>
            <span>年龄：</span><span v-text="userSearched.age"></span>
          </li>
          <li>
            <span>性别：</span><span v-text="userSearched.sex===1?'男':'女'"></span>
          </li>
          <li>
            <span>手机：</span><span v-text="userSearched.phone"></span>
          </li>
          <li v-for="(item, index) in addressList" :key="index">
            <span>详细地址：</span><span v-text="item.detailAddress"></span>
            <el-radio v-model="addressSelect" :label="index">选择</el-radio>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="clearfix"></div>
    <div class="drugsSearch">
      <h4>推荐用药：</h4>
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-cascader style="width:100%;" placeholder="检索分类"
          :options="selectList" v-model="cateIdList"
          @active-item-change="handleItemChange"
          :props="props"
          clearable
        ></el-cascader>
      </div>
      <div class="el-col el-col-6" style="margin: 15px;">
        <el-input placeholder="关键词检索" v-model="parmValue" :maxlength="18" class="input-with-select">
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" stripe border style="width: 100%;" ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="src"
          label="商品图片"
          show-overflow-tooltip
          align="center">
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
      <div class="chufang" v-show="chufshow">
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
        <span>药品总价：</span><span>{{totalPrice | money('元')}}</span>
        <!--  v-text="totalPrice | mymoneyFilter('元')" -->
        <div class="el-col el-col-24" style="text-align: center;">
          <el-button type="success" size="medium" round @click="onSubmit(true)">确认下单</el-button>
          <el-button type="warning" size="medium" round @click="onSubmit(false)">取消</el-button>
        </div>
      </div>
    </div>
    <!-- <reg :dialogShowOrHide="dialogDegShowOrHide" :sizeForm="sizeForm" :selectedGoods="selectedGoods" :imageUrl="imageUrl"
    :phone="sizeForm.phone" @dialog="onDialogRegChange"></reg>     -->
    <downorder :downifShow="dialogDegShowOrHide" :sizeForm="sizeForm" :selectedGoods="selectedGoods" :imageUrl="imageUrl" @dialog="onDialogRegChange"></downorder>
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="bigImgSrc"></big-img>
    <detailmodel :dialogShowOrHide="dialogShowOrHide"
    :selectTable="selectTable" @myevent="onResultChange" @dialog="onDialogChange"></detailmodel>
</div>
</template>

<script>
import {
  findinfoself,
  findinfosbypid,
  getinfoself,
  getuserinfo,
  // send,
  // findaddress,
  getsign
} from '@/api/getData';
import {
  removeForIndex
} from '@/config/mUtils';
import {
  baseUrl,
  baseImgPath
} from '@/config/env';
import BigImg from '@/common/BigImg';
import detailModel from '@/page/popup/detailModel';
import reg from '@/page/popup/reg';
import downorder from '@/page/popup/downOrder';

export default {
  data() {
    return {
      selectTable: [],
      baseUrl,
      baseImgPath,
      goodsTypeList: ['处方药', '非处方药', '其他'],
      totalPrice: 0,
      imageUrl: '',
      input5: '',
      smsCode: '',
      dialogShowOrHide: false,
      dialogDegShowOrHide: false,
      count: 0,
      showImg: false,
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
      chufshow: false,
      addressSelect: '',
      addressList: [],
      sizeForm: {
        name: '',
        age: '',
        sex: 1,
        phone: '',
        address: '',
        symptoms: ''
      },
      dataFileName: '',
      dataObject: {},
      userSearched: {},
      outerVisible: false,
      innerVisible: false
    };
  },
  mounted() {
    // 获取三级分类
    this.findinfosbypid();
    this.initData(this.currentPage, this.currentPageSize);
    // this.initGetSign();
    // setInterval(() => {
    //   this.initGetSign();
    // }, 4000);
  },
  methods: {
    async searchUserByPhone() {
      if (!this.sizeForm.phone) {
        this.$message.error('请先填写手机号！');
      } else {
        if (!(/^1[34578]\d{9}$/.test(this.sizeForm.phone))) {
          this.$message.error('手机号格式不正确！');
          return false;
        }
        let res = await getuserinfo(this.sizeForm.phone);
        if (res.data !== null) {
          this.userSearched = res.data;
          this.sizeForm.name = this.userSearched.userName;
          this.sizeForm.age = this.userSearched.age;
          this.sizeForm.sex = this.userSearched.sex;
          this.sizeForm.phone = this.userSearched.phone;
          // 查询用户的详细地址
          // let resAddress = await findaddress(res.data.userId);
          // if (resAddress.data.length > 0) {
          //   this.addressList = resAddress.data[0].detailAddress;
          // } else {
          //   this.addressList = [];
          // }
        } else {
          // this.$message.error('该用户不是药到了会员,请自行填写用户信息！');
          this.$notify.error({
            title: '该用户不是药到了会员',
            message: '请自行填写用户信息,下单后自动注册为药到了会员！'
          });
        }
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
    async initGetSign() {
      const res = await getsign();
      var oDate = new Date(); // 实例一个时间对象；
      var yearSec = '' + oDate.getFullYear() + (oDate.getMonth() + 1) + oDate.getDate() + oDate.getHours() + oDate.getMinutes() + oDate.getSeconds();
      var rand = '';
      for (let i = 0; i < 3; i++) {
        var r = Math.floor(Math.random() * 10);
        rand += r;
      }
      this.dataFileName = 'dev/doctor/' + yearSec + rand + '.jpg';
      this.dataObject = { // 多个参数
        'key': this.dataFileName,
        'policy': res.data.policy,
        'OSSAccessKeyId': res.data.accessid,
        'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
        'signature': res.data.signature
      };
      return true;
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
      if (res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].count = 1;
        }
      }
      this.tableData = res.data;
      this.count = res.totalSize;
    },
    uploadImg(res, file) { // up, file, info   /res, file
      if (file.status === 'success') {
        this.imageUrl = 'https://zhydl.oss-cn-beijing.aliyuncs.com/' + this.dataFileName;
        console.info(this.imageUrl);
      } else {
        this.$message.error('上传图片失败！');
      }
    },
    async beforeImgUpload(file) {
      // "jpg,gif,png,bmp"
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isJPG) {
        let arr = this.dataFileName.split('.');
        this.dataFileName = arr[0] + '.jpg';
      }
      if (isPNG) {
        let arr = this.dataFileName.split('.');
        this.dataFileName = arr[0] + '.png';
      }
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false;
      }
      let res = await this.initGetSign();
      if (res) {
        // "jpg,gif,png,bmp"
        // const isJPG = file.type === 'image/jpeg';
        // const isPNG = file.type === 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        //
        // if (isJPG) {
        //   let arr = this.dataFileName.split('.');
        //   this.dataFileName = arr[0] + '.jpg';
        // }
        // if (isPNG) {
        //   let arr = this.dataFileName.split('.');
        //   this.dataFileName = arr[0] + '.png';
        // }
        // if (!isJPG && !isPNG) {
        //   this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return (isJPG || isPNG) && isLt2M;
      } else {
        return false;
      }
    },
    async onSubmit(boolean) {
      if (boolean) {
        console.log('确认下单');
        if (!this.sizeForm.phone) {
          this.$message.error('手机号是必填项！');
          return false;
        }
        if (!this.sizeForm.symptoms) {
          this.$message.error('症状是必填项！');
          return false;
        }
        if (!(/^1[34578]\d{9}$/.test(this.sizeForm.phone))) {
          this.$message.error('手机号格式不正确！');
          return false;
        }
        if (this.selectedGoods.length === 0) {
          this.$message.error('请选择药品！');
          return false;
        }
        if (this.chufshow) {
          if (this.imageUrl !== '') {
            if (this.selectedGoods.length > 0 && this.sizeForm.name !== '' && this.sizeForm.phone !== '' && this.sizeForm.address !== '') {
              this.dialogDegShowOrHide = true;
            } else {
              this.$notify.error({
                title: '亲,您信息填写不太完整哦！',
                message: '姓名年龄性别住址都要填写'
              });
            }
          } else {
            this.$notify.error({
              title: '亲,您的商品里有处方药！',
              message: '请上传处方单'
            });
          }
        } else {
          if (this.selectedGoods.length > 0 && this.sizeForm.name !== '' && this.sizeForm.phone !== '' && this.sizeForm.address !== '') {
            this.dialogDegShowOrHide = true;
          } else {
            this.$notify.error({
              title: '亲,您信息填写不太完整哦！',
              message: '姓名年龄性别住址都要填写'
            });
          }
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
    },
    onDialogRegChange(val) {
      this.dialogDegShowOrHide = val; // 4
      this.toggleSelection(false);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
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
    },
    clickImg(src) {
      this.showImg = true;
      // 获取当前图片地址
      this.bigImgSrc = src;
    },
    viewImg() {
      this.showImg = false;
    }
  },
  components: {
    'big-img': BigImg,
    reg,
    downorder,
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
