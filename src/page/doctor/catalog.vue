<template lang="html">
  <div class="box">

  </div>
</template>

<script>
import {
  getStore,
  setStore
} from '@/config/mUtils'
import axios from 'axios';

export default {
  data() {
    return {
      content: ''
    }
  },
  created() {
    // this.init()
  },
  mounted() {

  },
  methods: {
    goback() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
}
</style>
