<template>
  <b-header class="header" :title="title">
    <button @click.stop="goHome" class="btn-home">Back to home</button>
  </b-header>
</template>
<script>
import BHeader from 'base/myHeader'
export default {
  name: 'MyHeader',
  props: {
    title: {
      style: String,
    },
  },
  methods: {
    goHome() {
      this.$router.push('/blogs')
    },
  },
  components: {
    BHeader,
  },
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 720px) {
  .header {
    .btn-home {
      padding: 10px;
      background-color: #00a1d6;
      color: white;
      border-radius: 5px;
      font-size: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
