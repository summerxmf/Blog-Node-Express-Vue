<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24" />
    <p class="desc">{{ title }}</p>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: 'loading...'
    }
  },
  methods: {
    setText(value) {
      this.loadingText = value
    }
  }
}
</script>
<style lang="scss" scoped>
.loading {
  overflow: hidden;
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: 12px;
  }
}
</style>
