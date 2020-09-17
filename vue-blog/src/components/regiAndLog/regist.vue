<template>
  <div class="regist">
    <input
      type="text"
      placeholder="Email address"
      v-model="email"
      ref="email"
    />
    <input
      type="password"
      placeholder="Password"
      maxlength="6"
      v-model="password"
    />
    <div class="note">
      <div class="dot"></div>
      <p>Your email address will be used for username</p>
    </div>
    <button @click="registFun">Join now</button>
  </div>
</template>

<script>
import { regist } from 'api/user'

export default {
  name: 'regist',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    reset() {
      this.email = ''
      this.password = ''
      this.$refs.email.focus()
    },
    registFun() {
      const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      if (!emailReg.test(this.email)) {
        this.$swal({
          title: 'Wrong email address',
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
        this.reset()
        return
      }
      if (this.email.trim() == '' || this.password.trim() == '') {
        this.$swal({
          title: 'Empty username or password',
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
        this.reset()
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
        this.reset()
        return
      }
      regist(this.email, this.password).then((res) => {
        if (res && res.errno === 0) {
          // this.$swal({
          //   title: 'Regist successfull',
          //   icon: 'success',
          //   timer: 1000,
          // })
          this.$router.push({
            path: '/login',
          })
          return
        }
        if (res && res.errno === -1) {
          this.$swal({
            title: res.message,
            icon: 'error',
            buttons: false,
            timer: 1000,
          })
          this.reset()
          return
        }
        this.$swal({
          title: 'Please regist once more',
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
        this.reset()
        return
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .regist {
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
      background-color: rgba(255, 255, 255, 0.4);
      color: #2c3e50;
      font-size: 16px;
      font-weight: bold;
      &:hover {
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
    .note {
      // width: 80%;
      line-height: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .dot {
        width: 8px;
        height: 8px;
        background-color: rgb(112, 177, 38);
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
