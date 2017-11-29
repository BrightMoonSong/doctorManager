<template lang="html">
  <div class="">
    <button type="button" @click="start('start1234344')" name="button">startstart</button>
  </div>
</template>

<script>
export default {
  methods: {
    start(val) {
      this.$emit('myevent', val);
    }
  },
  mounted() {
    this.$on('parson', function(val) {
      console.log('son+++' + val);
    });
  }
};
</script>

<style lang="css">
</style>
