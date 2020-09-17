<template>
  <div class="blogDetail">
    <div v-title>Blog / Blog Detail</div>
    <b-header title="Blog Detail"></b-header>
    <section class="main">
      <p class="topTitle" v-cloak>{{ blog.title }}</p>
      <textarea
        class="content"
        v-cloak
        disabled
        v-model="blog.content"
      ></textarea>
      <div class="blogInfo">
        <img src="~assets/img/heartR.png" alt="" />
        <p v-cloak>{{ blog.collection_num }}</p>
      </div>
    </section>
  </div>
</template>
<script>
import { CURRENTBLOG_KEY } from '@/config'
import storage from 'assets/js/storage'
import { getDetail } from 'api/blog'
import BHeader from 'base/myHeader'
export default {
  name: 'blogDetail',
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
    }
  },
  created() {
    this.getBlog()
  },
  methods: {
    getBlog() {
      const curBlog = storage.get(CURRENTBLOG_KEY)
      if (this.id === curBlog.id) {
        // if users get into detail through '/blog'
        this.blog = curBlog
      } else {
        // if directly enter the url
        getDetail(this.id).then((res) => {
          if (res.errno === 0) {
            this.blog = res.data
          }
        })
      }
    },
    goBack() {
      this.$router.push({
        name: 'blog',
      })
    },
  },
  components: {
    BHeader,
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.blogDetail {
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: $background-color;

  .header {
    width: 80%;
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
  }
  .main {
    width: 80%;
    height: calc(100% - 90px);
    margin: 75px auto 0;
    box-shadow: 1px 0 5px rgba($color: #000000, $alpha: 0.2);
    box-sizing: border-box;
    padding: 20px;
    background-color: white;
    .topTitle {
      font-size: 22px;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .content {
      width: 100%;
      height: calc(100% - 70px);
      line-height: 24px;
      overflow-y: auto;
      background: none;
      resize: none;
      font-size: 15px;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .blogInfo {
      margin-top: 15px;
      width: 100%;
      height: 20px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      p {
        height: 20px;
        padding: 0 8px;
        line-height: 20px;
        text-align: center;
        border-radius: 5px;
        background-color: rgba(#000000, 0.15);
        font-size: 14px;
      }
    }
  }
}
@media screen and (min-width: 720px) {
}
@media screen and (max-width: 719px) {
}
</style>
