<template>
  <div class="header">
    <div class="leftHead">
      <img src="~assets/img/logo.png" alt="Logo" />
      <p>BLOG / {{ title }}</p>
    </div>
    <div class="rightHead">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'base-header',
  props: {
    title: {
      style: String,
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .header {
    height: 60px;
    width: 80%;
    background-color: white;
    @include flex-between();
    padding: 0 10%;
    box-shadow: 1px 0 5px rgba($color: #000000, $alpha: 0.2);
    .leftHead {
      width: 40%;
      height: 100%;
      min-width: 100px;
      font-size: 20px;
      @include flex-start();
      img {
        height: 30px;
        margin-right: 10px;
      }
    }
    .rightHead {
      height: 30px;
      line-height: 30px;
      text-align: center;
      @include flex-end();
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
