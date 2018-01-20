<template lang="html">
  <el-dialog title="支付" top="5vh" width="630px" :visible.sync="myshowqr">
    <div class="body-code">
      <div class="payOrder">
        <div class="left">
          <span>订单编号：</span><span>{{orderNo}}</span>
        </div>
        <div class="right">
          <span>应付金额：</span><span class="big-font">{{orderMoney | money('元')}}</span>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="imgPay">
        <div class="left">
          <img class="imgl" src="./dui.png" alt=""><span class="spLeft">微信支付</span>
          <img class="tuijian" src="./tuijian.png" alt="">
          <span class="light">亿万用户的选择，更快更安全</span>
        </div>
        <div class="right">
          <span>支付：</span><span class="big-font">{{orderMoney | money('元')}}</span>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="payCode">
        <img class="qrcode" v-if="base" v-lodimg="'data:image/jpg;base64,'+base" />
        <img class="qrcode" style="width:70px;padding:40px" v-if="!base" v-lodimg="loding" />
        <br />
        <img src="./info.png" class="info" alt="">
      </div>
    </div>
  </el-dialog>
</template>

<script>
import loding from '@/page/paycode/loadding.gif';
import {
  getpaycode,
  ordersdetailbyid,
  getpaystatus
} from '@/api/getData';

export default {
  props: ['orderId', 'showqr'],
  data() {
    return {
      loding: loding,
      base: '',
      orderNo: '',
      orderMoney: 0,
      myshowqr: this.showqr,
      intervalid1: ''
    };
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      if (this.orderId === '' || this.orderId === null) {
        this.myshowqr = false;
      }
      this.paycode();
      this.intervalid1 = setInterval(() => {
        this.paystatus();
      }, 4000);
    },
    async initOrderPrice() {
      let res = await ordersdetailbyid(this.orderId);
      if (res.code === 0) {
        if (res.data) {
          this.orderNo = res.data.orderNo;
          this.orderMoney = res.data.orderMoney;
        }
      }
    },
    async paycode() {
      if (this.orderId === '' || this.orderId === null) {
        this.myshowqr = false;
      }
      let res = await getpaycode(this.orderId);
      if (res.data) {
        this.base = res.data;
      } else {
        this.$message({
          message: '订单状态错误！',
          type: 'error'
        });
        this.myshowqr = false;
      }
    },
    async paystatus() {
      if (this.orderId === '' || this.orderId === null) {
        this.myshowqr = false;
      }
      let res = await getpaystatus(this.orderId);
      if (res) {
        this.myshowqr = false;
        this.$message({
          message: '恭喜您，支付成功！',
          type: 'success'
        });
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalid1);
  },
  watch: {
    showqr: function(val, oldVal) { // 2
      this.myshowqr = val;
      if (val) {
        this.base = '';
        this.orderNo = '';
        this.orderMoney = 0;
        this.init();
        this.initOrderPrice();
      } else {
        clearInterval(this.intervalid1);
      }
    },
    myshowqr(val, oldVal) { // 3
      if (oldVal) {
        if (!val) {
          this.$emit('dialog', val);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.big-font {
    font-size: 16px;
    font-weight: 700;
}
.body-code {
    width: 100%;
    height: 100%;
    margin-top: -20px;
    .payOrder {
        padding: 20px;
        background-color: #ccc;
        .left {
            float: left;
        }
        .right {
            float: right;
        }
    }
    .imgPay {
        padding: 10px;
        margin: 20px 20px 0;
        border: 1px solid #ccc;
        .left {
            float: left;
            span {
                line-height: 35px;
                &.light {
                    color: #ccc;
                    font-size: 12px;
                }
            }
            .spLeft {
                float: left;
                margin-left: 5px;
            }
            img {
                width: 40px;
                float: left;
                &.tuijian {
                    margin: 9px;
                }
            }
        }
        .right {
            float: right;
            span {
                line-height: 35px;
            }
        }
    }
    .payCode {
        text-align: center;
        .qrcode {
            width: 300px;
            min-height: 70px;
        }
        .info {
            margin-top: -28px;
            width: 225px;
        }
    }
}
</style>
