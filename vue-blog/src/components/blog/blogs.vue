<template>
  <div class="list" @click="hideLayer">
    <div v-title>Blog</div>
    <!-- header -->
    <header>
      <div class="leftHead">
        <img src="~assets/img/logo.png" alt="logo" />
        <p>BLOG</p>
      </div>
      <div class="centerHead">
        <search-box @search="search"></search-box>
      </div>
      <div class="rightHead">
        <button class="add">Add a blog</button>
        <drop-down class="user-menu" v-if="isLogin" ref="dropDown">
          <div class="menu-toggle" slot="dropdownToggle">
            <img :src="avatar" />
            <i class="iconfont icon-more"></i>
          </div>
          <my-nav
            navClass="menu"
            :showAdd="false"
            @select="hideLayer"
            slot="dropdownLayer"
          ></my-nav>
        </drop-down>
        <div class="login" @click.stop="goLogin" v-else>Login / Regist</div>
        <!-- <router-link to="/my"> -->
      </div>
    </header>
    <!-- main content -->
    <section class="main">
      <ul class="tags">
        <li v-for="(tag, index) in tags" :key="index" @click="tagSearch(index)">
          {{ tag }}
        </li>
      </ul>
      <div class="content">
        <my-swiper class="banner" :loop="true" :key="bannerList.length">
          <div
            class="swiper-slide"
            v-for="(banner, index) in bannerList"
            :key="index"
          >
            <img :src="banner" class="bannerImg" />
          </div>
        </my-swiper>
        <div class="blogListWrapper">
          <div class="loading-container" v-show="isLoading">
            <loading></loading>
          </div>
          <blog-list
            :blogs="blogList"
            :isLogin="isLogin"
            @selectItem="selectBlog"
            @goLogin="goLogin"
            @toggleFavorite="toggleFavorite"
          ></blog-list>
          <no-result v-show="noResult"></no-result>
        </div>
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>
<script>
import { getList } from 'api/blog'
// import { addFavorite, deleteFavorite } from 'api/user'
import { updateFavorite } from 'api/blog'
import Loading from 'base/loading/loading'
import NoResult from 'base/noResult'
import MySwiper from 'base/mySwiper'
import SearchBox from 'base/searchBox'
import DropDown from 'base/dropDown'
import MyNav from 'base/nav'
import BlogList from 'components/blogList'
import {
  getUserInfo,
  getFavorite,
  setUserInfo,
  setFavorite,
} from 'assets/js/cache'
export default {
  name: 'list',
  data() {
    return {
      tags: ['Python', 'JS', 'PHP', 'HTML', 'CSS', 'Vue.js'],
      bannerList: [],
      blogList: [],
      // userinfo
      isLogin: false,
      username: '',
      avatar: '',
      favoriteList: [],
      isShow: false,
      isLoading: true,
      noResult: false,
    }
  },
  created() {
    // get userInfo from localstorage
    const userInfo = getUserInfo()
    console.log(userInfo)
    if (!userInfo) {
      this.username = 'Anonym'
      this.avatar = require('assets/avatars/default.jpg')
    } else {
      this.isLogin = true
      this.username = userInfo.username
      this.avatar = userInfo.avatar
      this.favoriteList = getFavorite()
      console.log('this.favoriteList', this.favoriteList)
    }
    // init banner
    this.bannerList = [
      require('assets/img/banner3.jpg'),
      require('assets/img/banner2.jpg'),
    ]
    // init blogList
    this.getBlogList()
  },

  methods: {
    toggleFavorite(blog, index) {
      let isFavorite = blog.isFavorite
      updateFavorite(blog.id, isFavorite).then((res) => {
        console.log(res)
        if (res && res.errno === 0) {
          setUserInfo(res.data)
          setFavorite(res.data.collection)
          this.favoriteList = res.data.collection
          this.$set(this.blogList, index, {
            id: blog.id,
            title: blog.title,
            username: blog.username,
            avatar: blog.avatar,
            content: blog.content,
            createtime: blog.createtime,
            collection_num: isFavorite
              ? blog.collection_num - 1
              : blog.collection_num + 1,
            isFavorite: !isFavorite,
          })
        }
      })
    },
    
    getBlogList(keywords = '') {
      this.isLoading = true
      this.noResult = false
      getList('', keywords).then((res) => {
        if (res && res.errno === 0) {
          this.blogList = res.data
          for (let i = 0; i < this.blogList.length; i++) {
            const blog = this.blogList[i]
            if (this.isFavorite(blog.id)) {
              this.blogList[i].isFavorite = true
            } else {
              this.blogList[i].isFavorite = false
            }
          }
        } else {
          this.blogList = []
          this.noResult = true
        }
        this.isLoading = false
        console.log('this.blogList', this.blogList)
      })
    },

    isFavorite(blogId) {
      const index = this.favoriteList.indexOf(blogId)
      return index > -1
    },

    tagSearch(index) {
      this.search(this.tags[index])
    },
    search(query) {
      this.getBlogList(query)
    },

    hideLayer() {
      console.log('all clicked')
      this.$refs.dropDown && this.$refs.dropDown.hide()
    },
    goLogin() {
      this.$router.push({
        name: 'login',
      })
    },

    selectBlog(blog) {
      // storage.set(CURRENTBLOG_KEY, blog)
      // this.$router.push({ path: `/blog/${blog.id}`})
      // open in a new window
      let routerUrl = this.$router.resolve({
        path: `/blog/${blog.id}`,
      })
      window.open(routerUrl.href, '_blank')
    },
  },
  components: {
    BlogList,
    NoResult,
    MySwiper,
    SearchBox,
    DropDown,
    Loading,
    MyNav,
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .list {
    width: 100vw;
    height: 100vh;
    background-color: rgb(240, 240, 240);
    header {
      width: 80%;
      height: 60px;
      background-color: white;
      @include flex-between();
      padding: 0 10%;
      box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);

      .leftHead {
        width: 10%;
        height: 100%;
        min-width: 100px;
        font-size: 20px;
        @include flex-start();
        img {
          height: 30px;
          margin-right: 10px;
        }
      }
      .centerHead {
        flex: 1;
        height: 100%;
        @include flex-end();
        .searchBox {
          width: 96%;
          height: 36px;
          margin: 12px 0;
        }
      }
      .rightHead {
        height: 80%;
        margin-left: 20px;
        @include flex-end();

        .add {
          height: 26px;
          @include flex-center();
          padding: 0 10px;
          background-color: #00a1d6;
          color: white;
          border-radius: 5px;
          font-size: 14px;
          margin-right: 25px;
          &:hover {
            cursor: pointer;
          }
        }
        .user-menu {
          height: 100%;
          .menu-toggle {
            @include flex-center();
            &:hover {
              color: #cdd0d4;
            }
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
        }
        .login {
          height: 100%;
          @include flex-center(column);
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .main {
      width: 80%;
      height: calc(100% - 90px);
      margin: 1px auto 0;
      display: flex;
      justify-content: space-between;
      box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      z-index: 0;
      .tags {
        width: 10%;
        height: 100%;
        background-color: white;
        li {
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          @include ellipsis();
          &:hover {
            cursor: pointer;
            background-color: rgb(240, 240, 240);
          }
        }
      }
      .content {
        width: calc(90% - 15px);
        height: 100%;
        z-index: 0;
        .banner {
          width: 100%;
          height: 100px;
          margin-bottom: 10px;
          .bannerImg {
            z-index: 0;
            width: 100%;
            height: 100%;
          }
        }
        .blogListWrapper {
          position: relative;
          width: 94%;
          height: calc(100% - 120px);
          padding: 5px 3%;
          background-color: white;
          overflow: hidden;
          overflow-y: auto;
          .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
