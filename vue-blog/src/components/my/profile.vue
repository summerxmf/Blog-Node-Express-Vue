<template>
  <div class="profile">
    <my-nav class="myNav" navClass="sideBar" :showProfile="false"></my-nav>
    <section class="main">
      <div class="content">
        <div class="avatar">
          <img :src="avatar" alt="avatar" />
          <span>{{ username }}</span>
        </div>
        <div class="info">
          <p>
            <span>Username</span>
            <span>: </span>
            <span>{{ username }}</span>
          </p>
          <p>
            <span>Email</span>
            <span>: </span>
            <span>{{ email }}</span>
          </p>
        </div>
      </div>
      <button class="btn" @click="goChange">
        Go to change
      </button>

      <!-- <router-view></router-view> -->
    </section>
  </div>
</template>
<script>
import MyNav from 'base/nav'
export default {
  name: 'Profile',
  data() {
    return {
      user: {
        username: this.$store.state.username,
        email: this.$store.state.email,
        avatar: this.$store.state.avatar,
      },
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.hasLogin
    },
    username() {
      return this.$store.state.username
    },
    email() {
      return this.$store.state.email
    },
    avatar() {
      return this.$store.state.avatar
    },
  },
  created() {
    this.$emit('changeTile', 'My profile')
  },
  methods: {
    // logout and delete the user info in localstorage
    goChange() {
      this.$router.push({ name: 'changeProfile' })
    },
  },
  components: {
    MyNav,
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .profile {
    display: flex;
    .main {
      flex: 1;
      background-color: $background-color;
      // box-shadow: 1px 0 5px rgba($color: #000000, $alpha: 0.2);
      padding: 20px 20px 50px;
      background-color: white;
      margin-left: 10px;
      text-align: center;
      .content {
        width: 90%;
        // height: 350px;
        margin: 0 auto;
        background-color: white;
        border-radius: 20px;
        position: relative;
        margin-top: 50px;
        padding: 0 0 50px;
        box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
        .avatar {
          @include flex-center(column);
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 20px;
          color: #575757;
          font-weight: bold;
          img {
            width: 80px;
            height: 100%;
            border-radius: 50%;
            margin-bottom: 8px;
            box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
          }
        }
        .info {
          width: 80%;
          margin: 0 auto;
          padding: 120px 0 0;
          text-align: center;
          p {
            width: 90%;
            margin: 10px auto 20px;
            padding: 10px;
            color: #575757;
            border: 1px solid #575757;
            display: flex;
            justify-content: center;
            user-select: none;
            span {
              margin-right: 5px;
              &:first-child {
                display: inline-block;
                width: 25%;
                text-align: right;
              }
              &:last-child {
                display: inline-block;
                width: 75%;
                text-align: left;
                margin-right: 0;
                @include ellipsis();
              }
            }
          }
        }
      }
      .btn {
        padding: 10px;
        border: 1px solid #575757;
        border-radius: 3px;
        color: #575757;
        margin: 30px auto 0;
        &:hover {
          background-color: #7e7c7c;
          border: 1px solid #7e7c7c;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
