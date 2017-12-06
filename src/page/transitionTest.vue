<style lang="css">

.bounce-enter-active {
    animation: bounce-in .5s;
}

.bounce-leave-active {
    animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

.imgTest {
    position: absolute;
    left: 16.67%;
    top:11%;
    width: 20%;
}

.posrela {
    /* position: relative; */
}

.bbb {
    animation: mymove 1s;
}

@keyframes mymove {
  0% {
      left: 16.67%;
      top:11%;
      width: 0%;
      border-radius: 0%;
  }
  100% {
    left: 93%;
    top:20px;
    border-radius: 50%;
    width: 4%;
  }
}
</style>

<template lang="html">

<div id="example-2">
    <button @click="show = !show">Toggle show</button>
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false" name="bounce">
        <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
    </transition>
    <el-button type="warning" @click="imgClick">图片按钮</el-button>
    <transition name="bounce">
        <p v-show="showImg" class="posrela">
            <img class="imgTest" v-bind:class="[activeClass]" :src="imgSrc" alt="">
        </p>
    </transition>
</div>

</template>

<script>
import src from '@/assets/1.jpg';
export default {
  data() {
    return {
      show: false,
      showImg: false,
      activeClass: '',
      imgSrc: src
    };
  },
  methods: {
    beforeEnter: function(el) {
      console.log(el);
    },
    enter: function(el, done) {
      console.log(el, done);
    },
    leave: function(el, done) {
      console.log(el, done);
    },
    imgClick() {
      this.showImg = !this.showImg;
      setTimeout(() => {
        if (this.showImg) {
          this.activeClass = 'bbb';
        }
      }, 1000);
    }
  }
};
</script>
