<template lang="html">
  <div id="apps">
    <button type="button" @click="par('parpar')" name="button">parpar</button>
    <zhe @myevent="add($event)"></zhe>
  </div>
</template>

<script>
import zhe from './test-event';
export default {
  methods: {
    add(e) {
      console.log('add');
      console.log(e);
    },
    par(val) {
      console.log('par');
      this.$emit('parson', val);
    }
  },
  components: {
    zhe
  }
};
</script>

<style lang="css">
</style>
