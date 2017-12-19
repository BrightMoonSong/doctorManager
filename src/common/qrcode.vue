<template>
<!-- 过渡动画 -->
<transition name="fade">
  <canvas id="canvas"></canvas>
</transition>
</template>
<script>
import QRCode from 'qrcode';

export default {
  props: ['Website'],
  watch: {
    Website: function(val, oldVal) {
      console.log(val, oldVal);
      if (val) {
        this.useqrcode();
      }
    }
  },
  mounted() {
    this.useqrcode();
  },
  methods: {
    useqrcode() {
      var canvas = document.getElementById('canvas');
      QRCode.toCanvas(canvas, this.Website, function(error) {
        if (error) {
          console.log('二维码生成出错');
          console.error(error);
        } else {
          console.log('success!');
        }
      });
    }
  }
};
</script>
<style scoped>
/*动画*/

.fade-enter-active,
.fade-leave-active {
  transition: all .2s linear;
  transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}
</style>
