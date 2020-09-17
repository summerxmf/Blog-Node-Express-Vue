<template>
  <div class="nav">
    <ul :class="navClass">
      <li v-show="showProfile" @click.stop="goProfile">
        <i class="iconfont icon-personal"></i>
        <span>My profile</span>
      </li>
      <li v-show="showBlogs" @click.stop="goMyBlogs">
        <i class="iconfont icon-personal"></i>
        <span>My blogs</span>
      </li>
      <li v-show="showFavorites" @click.stop="goFavorites">
        <i class="iconfont icon-personal"></i>
        <span>My favorites</span>
      </li>
      <li v-show="showAdd" @click.stop="goAdd">
        <i class="iconfont icon-personal"></i>
        <span>Add a blog</span>
      </li>
      <li @click.stop="signOut">
        <i class="iconfont icon-personal"></i>
        <span>Sign out</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  data() {
    return {}
  },
  props: {
    navClass: {
      style: String,
      validator: (value) => {
        return ['menu', 'sideBar'].indexOf(value) !== -1
      },
    },
    showProfile: {
      type: Boolean,
      default: true,
    },
    showBlogs: {
      type: Boolean,
      default: true,
    },
    showFavorites: {
      type: Boolean,
      default: true,
    },
    showAdd: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goProfile() {
      this.$emit('select')
      this.$router.push({ name: 'myProfile' })
    },
    goMyBlogs() {
      this.$emit('select')
      this.$router.push({ name: 'myBlogs' })
    },
    goFavorites() {
      this.$emit('select')
      this.$router.push({ name: 'myFavorites' })
    },
    goAdd() {
      this.$emit('select')
      this.$router.push({ name: 'addBlog' })
    },
    signOut() {
      this.$emit('select')
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .nav {
    background-color: white;
    .sideBar {
      li {
        white-space: nowrap;
        padding: 20px 10px;
        font-size: 18px;
        &:hover {
          background-color: rgb(240, 240, 240);
        }
        .iconfont {
          margin-right: 8px;
        }
      }
    }
    .menu {
      background-color: #fff;
      border: 1px solid #cdd0d4;
      box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      li {
        white-space: nowrap;
        padding: 12px;
        color: #575757;
        @include flex-start();
        &:hover {
          background-color: rgb(240, 240, 240);
        }
        .iconfont {
          margin-right: 5px;
        }
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
