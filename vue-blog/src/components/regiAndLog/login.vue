<template>
  <div class="login">
    <input type="text" placeholder="Email Address" v-model="email" />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
      maxLength="6"
    />
    <button @click="login">Sign in</button>
  </div>
</template>
<script>
import { login } from 'api/user'
import { setUserInfo, setFavorite } from 'assets/js/cache'
export default {
  name: '',
  data() {
    return {
      // email: '',
      // password: '',
      // comtempory
      email: 'summer@hotmail.com',
      password: '123456',
    }
  },

  methods: {
    login() {
      const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailReg.test(this.email)) {
        this.$swal({
          title: 'Wrong email address',
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
        return
      }
      if (this.email.trim() == '' || this.password.trim() == '') {
        this.$swal({
          title: 'Empty username or password',
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
        return
      }
      const reg = /^[0-9]+$/
      if (this.password.length < 6 || !reg.test(this.password)) {
        this.$swal({
          title: 'Wrong password',
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
        return
      }
      login(this.email, this.password).then((res) => {
        console.log('res', res)
        if (res && res.errno === 0) {
          // 假设favorite list不和数据库相关

          // this.$store.commit('setFavoriteList', res.data.collection)
          setUserInfo(res.data)
          setFavorite(res.data.collection)
          this.$router.go(-1)
          return
        }
        this.$swal({
          title: 'Wrong username or password',
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .login {
    @include flex-center(column);
    input {
      width: 60%;
      height: 40px;
      padding: 0 5%;
      border-radius: 5px;
      margin-bottom: 20px;
      background-color: rgba(255, 255, 255, 0.4);
      color: #575757;
      &:nth-child(2) {
        margin-bottom: 5px;
      }
      &::placeholder {
        color: #575757;
      }
    }
    button {
      width: 40%;
      height: 40px;
      margin-top: 20px;
      border-radius: 5px;
      border: none;
      outline: none;
      background-color: rgba(255, 255, 255, 0.4);
      color: #2c3e50;
      font-size: 16px;
      font-weight: bold;
      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
