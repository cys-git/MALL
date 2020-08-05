<template>
  <div class="stars">
    <!-- 从1开始 -->
    <img
      @click="$emit('change',x)"
      v-for="x in 5"
      :src="require('../assets/img/star-'+(x<=score?'on':'off')+'.png')"
      :key="x"
      alt
    />
    <span>{{score}}.0</span>
  </div>
</template>

<script>
export default {
  name: "Star",
  props: { score: { type: Number, required: true } },
  data() {
    return {};
  },
  // watch: {
  //   score: function (newValue) {
  //     console.log(newValue);
  //   },
  // },
};
</script>

<style>
</style>