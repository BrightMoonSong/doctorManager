<template lang="html">
<div class="body-code">
  <span>正在加急审核中，请稍等....</span>
  <el-button type="success" size="medium" round @click="goback()">返回</el-button>
</div>
</template>

<script>
import {
  ordersdetailbyid
} from '@/api/getData';
import {
  removeStore,
  getStore,
  setStore
} from '@/config/mUtils';

export default {
  data() {
    return {
      orderId: '',
      intervalid1: ''
    };
  },
  mounted() {
    this.orderId = getStore('orderId');
    removeStore('orderId');
    if (this.orderId === '' || this.orderId === null) {
      this.$router.push('myOrder');
    }
    this.intervalid1 = setInterval(() => {
      this.paystatus();
    }, 4000);
  },
  methods: {
    goback() {
      this.$router.push('onlineSingleOrder');
    },
    async paystatus() {
      if (this.orderId === '' || this.orderId === null) {
        this.$router.push('myOrder');
      }
      let res = await ordersdetailbyid(this.orderId);
      if (res.data.orderStatus === 2) {
        setStore('orderId', this.orderId);
        this.$router.push('/qrcode');
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalid1);
  }
};
</script>

<style lang="scss" scoped>
.body-code {
    width: 100%;
    text-align: center;
    padding-top: 17%;
}
</style>
