<template>
  <div class="searchBox">
    <img src="~assets/img/searchLogo.png" alt="logo" />
    <input ref="input" type="text" v-model="query" :placeholder="placeholder" />
    <i class="iconfont icon-close" @click="reset" v-show="query"></i>
  </div>
</template>
<script>
import { debounce } from 'assets/js/util'
export default {
  name: 'mySearchBox',
  props: {
    placeholder: {
      type: String,
      default: 'Javascipt tutorial',
    },
  },
  data() {
    return {
      query: '',
    }
  },
  
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    clear() {
      this.query = ''
    },
    reset() {
      this.clear()
      this.focus()
    },
  },
  watch: {
    query: debounce(function() {
      this.$emit('search', this.query)
    }),
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.searchBox {
  padding: 0 1%;
  border: 1px solid grey;
  @include flex-start();
  img {
    height: 30px;
    &:hover {
      cursor: pointer;
    }
  }
  input {
    flex: 1;
    // width: calc(100%-40px);
    height: 100%;
    padding: 0 10px;
  }
}
@media screen and (min-width: 720px) {
}
@media screen and (max-width: 719px) {
}
</style>
