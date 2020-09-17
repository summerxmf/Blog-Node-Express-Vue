<template>
  <div class="my">
    <my-header :title="title"></my-header>
    <div class="main">
      <router-view @changeTile="changeTitle"></router-view>
    </div>
  </div>
</template>
<script>
import MyHeader from './header'
export default {
  name: 'My',
  data() {
    return {
      title: '',
    }
  },
  methods: {
    changeTitle(item) {
      console.log(item)
      this.title = item
    },
  },

  components: {
    MyHeader,
  },
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 720px) {
  .my {
    width: 100vw;
    height: 100vh;
    background-color: rgb(240, 240, 240);
    .main {
      width: 80%;
      height: calc(100% - 90px);
      margin: 1px auto 0;
      overflow: hidden;
      z-index: 0;
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
