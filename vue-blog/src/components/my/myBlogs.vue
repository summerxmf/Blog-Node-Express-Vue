<template>
  <div class="blogs">
    <my-nav class="myNav" navClass="sideBar" :showBlogs="false"></my-nav>
    <section class="main">
      <div class="blogListWrapper">
        <div class="loading-container" v-show="isLoading">
          <loading></loading>
        </div>
        <no-result v-show="noResult"></no-result>
        <blog-list :blogs="blogList" @select="selectBlog"></blog-list>
      </div>
    </section>
  </div>
</template>
<script>
import { getList } from 'api/blog'
import MyNav from 'base/nav'
import BlogList from 'components/blogList'
import Loading from 'base/loading/loading'
import NoResult from 'base/noResult'
export default {
  name: 'MyBlog',
  data() {
    return {
      blogList: []
    }
  },
  created() {
    this.$emit('changeTile', 'My Blogs')
    this.getBlogList()
    this.username = this.$store.state.username
  },
  methods: {
    getBlogList() {
      this.isLoading = true
      this.noResult = false
      getList(this.username).then((res) => {
        if (res && res.errno === 0) {
          this.blogList = res.data
        } else {
          this.blogList = []
          this.noResult = true
        }
        this.isLoading = false
      })
    },

    selectBlog() {}
  },
  components: {
    MyNav,
    BlogList,
    Loading,
    NoResult
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .blogs {
    width: 100%;
    height: 100%;
    display: flex;
    .main {
      flex: 1;
      background-color: $background-color;
      // box-shadow: 1px 0 5px rgba($color: #000000, $alpha: 0.2);
      padding: 20px 20px 50px;
      background-color: white;
      margin-left: 10px;
      .blogListWrapper {
        width: 94%;
        height: 100%;
        padding: 5px 3%;
        background-color: white;
        overflow: hidden;
        overflow-y: auto;
        .loading-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
