<template>
  <div class="blog-list">
    <ul>
      <li v-for="(blog, index) in blogs" :key="blog.id" class="item">
        <div class="item-title" @click="selectItem(blog)">
          {{ blog.title }}
        </div>
        <div class="item-content">
          <p>{{ blog.content }}</p>
        </div>
        <div class="item-user">
          <div class="left">
            <img :src="avatarSrc(blog)" alt="" />
            <span>{{ blog.username }}</span>
          </div>
          <div class="right">
            <i class="iconfont icon-scan" v-if="!isLogin" @click.stop="goLogin">
            </i>
            <i
              v-else
              class="iconfont"
              :class="[blog.isFavorite ? 'icon-msg' : 'icon-scan']"
              @click.stop="toggleFavorite(blog, index)"
              :ref="'icon' + index"
            >
            </i>
            <span>{{ blog.collection_num }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import { getList } from 'api/blog'
// import { mapActions } from 'vuex'
// import Loading from 'base/loading/loading'
// import NoResult from 'base/noResult'
export default {
  name: 'BlogList',
  data() {
    return {}
  },

  props: {
    isLogin: {
      style: Boolean,
      default: false,
    },
    blogs: {
      style: Array,
      default: () => {
        return []
      },
    },
  },

  methods: {
    // isFavorite(blogId) {
    //   const index = this.favoriteList.indexOf(blogId)
    //   return index > -1
    // },
    avatarSrc(blog) {
      return 'http://127.0.0.1:3000/avatars/' + blog.avatar
    },
    // selectBlog(blog) {
    //   // storage.set(CURRENTBLOG_KEY, blog)
    //   // this.$router.push({ path: `/blog/${blog.id}`})
    //   // open in a new window
    //   let routerUrl = this.$router.resolve({
    //     path: `/blog/${blog.id}`,
    //   })
    //   window.open(routerUrl.href, '_blank')
    // },
    // toggleFavorite(blog) {
    //   if (!this.isLogin) {
    //     this.$router.push({
    //       name: 'login',
    //     })
    //     return
    //   }
    //   const blogId = blog.id
    //   if (this.isFavorite(blogId)) {
    //     this.deleteFromFavoriteList(blogId)
    //   } else {
    //     this.addToFavoriteList(blogId)
    //   }
    // },
    getFavoriteIcon(blog) {
      if (blog.isFavorite) {
        return 'icon-msg'
      }
      return 'icon-scan'
    },

    // ...mapActions(['addToFavoriteList', 'deleteFromFavoriteList']),

    selectItem(blog) {
      this.$emit('selectItem', blog)
    },
    toggleFavorite(blog, index) {
      this.$emit('toggleFavorite', blog, index)
    },
    goLogin() {
      this.$emit('goLogin')
    },

    // ...mapActions(['addToFavoriteList', 'deleteFromFavoriteList']),
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .blog-list {
    width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }

    .item {
      width: 100%;
      padding: 15px 0 10px;
      border-bottom: 1px solid #575757;
      &:last-child {
        border-bottom: none;
      }
      &-title {
        font-size: 18px;
        font-weight: 600;
        &:hover {
          cursor: pointer;
        }
      }
      &-content {
        width: 100%;
        line-height: 20px;
        margin: 5px 0;
        color: #575757;
        @include multiline-ellipsis(3);
      }
      &-user {
        width: 100%;
        height: 30px;
        @include flex-between();
        .left {
          @include flex-start();
          img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-right: 5px;
          }
          span {
            font-size: 14px;
            color: #575757;
            user-select: none;
          }
        }
        .right {
          @include flex-end();
          .iconfont {
            font-size: 18px;
            margin-right: 5px;
            &:hover {
              cursor: pointer;
              color: #00a1d6;
            }
          }
          span {
            font-size: 14px;
            color: #575757;
            user-select: none;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
