<template>
  <div class="user">
    <div v-title>Sign in / Regist</div>
    <div class="content">
      <div class="bar">
        <ul>
          <router-link tag="li" to="/login">
            <span>Sign in</span>
          </router-link>
          <router-link tag="li" to="/regist">
            <span>Join now</span>
          </router-link>
        </ul>
      </div>
      <div class="comWrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RegAndLog',
  data() {
    return {
      // comName: 'Login',
      // isLogActive: true,
      // isRegActive: false,
    }
  },
  // methods: {
  //   selectLogin() {
  //     this.comName = 'Login'
  //     this.isLogActive = true
  //     this.isRegActive = false
  //   },
  //   selectRegist() {
  //     this.comName = 'Regist'
  //     this.isLogActive = false
  //     this.isRegActive = true
  //   },
  // },
  // components: {
  //   Regist,
  //   Login,
  // },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .user {
    width: 100vw;
    height: 100vh;
    background-image: url('~assets/img/bgc.jpg');
    background-size: cover;
    @include flex-center();
    .content {
      width: 380px;
      // height: 300px;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 10px;
      padding-bottom: 30px;
      .bar {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid rgba(128, 128, 128, 0.8);
        @include flex-center();
        ul {
          width: 50%;
          height: 100%;
          @include flex-between();
          li {
            height: 100%;
            width: 50%;
            @include flex-center(); // padding: 0 10px;
            font-size: 18px;
            font-weight: bold;
          }
          .router-link-active {
            color: rgba(0, 0, 0, 0.9);
            font-size: 19px;
            border-bottom: 2px solid rgba(0, 0, 0, 0.9);
          }
        }
      }
      .comWrapper {
        width: 380px;
        // height: 200px;
        margin: 20px auto 0 auto;
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
