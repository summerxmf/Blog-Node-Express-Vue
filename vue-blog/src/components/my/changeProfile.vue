<template>
  <div class="changeInfo">
    <div class="container">
      <div class="avatar">
        <label for="avatar">
          <img :src="avatarSrc" alt="" />
          <input
            type="file"
            name="avatar"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="onchangeImg"
          />
        </label>
        <p class="tip">
          {{ tip }}
        </p>
      </div>
      <div class="info">
        <input autocompelte="off" type="text" v-model="username" />
        <input autocompelte="off" type="text" v-model="email" />
      </div>
    </div>
    <button class="btn" @click="save">Save</button>
    <!-- overlayer -->
    <img-cropper ref="cropper" @changed="changed"></img-cropper>
  </div>
</template>
<script>
import ImgCropper from 'base/imgCropper'
import { updateUser } from 'api/user'
import { USERINFO_KEY } from '@/config'
import session from 'assets/js/session'
export default {
  name: 'ChangeProfile',
  data() {
    return {
      personalPhoto: true,
      // file: '',
      // imgStr: '',
      tip: 'Click the avatar to change ( <= 2M )',
      avatarSrc: this.$store.state.avatar,
      username: this.$store.state.username,
      email: this.$store.state.email,
      uploadFile: '', // 裁剪后的文件
    }
  },
  methods: {
    onchangeImg(e) {
      this.tip = 'Click the avatar to change ( <= 2M )'
      const file = e.target.files[0]
      // this.option.img = file
      const imgSize = file.size
      if (imgSize <= 2 * 1024 * 1024) {
        // get img in blob
        // const imgBlob = URL.createObjectURL(file)
        // this.changeImg(imgStr)
        // this.fileInfo = file
        // console.log(imgStr)
        this.$refs.cropper.show(file)
        // var fr = new FileReader()
        // fr.readAsDataURL(file) // 读出 base64
        // fr.onloadend = (e) => {
        //   // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        //   this.imgUrl = e.target.result
        //   console.log(this.imgUrl)
        //   // this.avatar = dataURL
        // }
      } else {
        console.log('File size is big than 200kb')
        this.tip = 'The picure size is too big'
      }
    },

    changed(file) {
      this.uploadFile = file
      // File => Blob
      this.avatarSrc = URL.createObjectURL(file)
    },

    save() {
      updateUser(this.username, this.email, this.uploadFile).then((res) => {
        console.log(res)
        if (res && res.errno === 0) {
          const { userId, username, email, avatar } = res.data
          this.$store.commit('setUserInfo', { userId, username, email, avatar })
          session.set(USERINFO_KEY, { userId, username, email, avatar })
          this.$router.push({ path: '/myProfile' })
        }
      })
    },
    backToHome() {
      this.$router.push({ path: '/' })
    },
  },
  components: {
    ImgCropper,
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
@media screen and (min-width: 720px) {
  .changeInfo {
    // background-color: $background-color;
    box-shadow: 1px 0 5px rgba($color: #000000, $alpha: 0.2);
    padding: 20px 20px 50px;
    background-color: white;
    margin-top: 50px;
    border-radius: 3px;
    text-align: center;
    .container {
      width: 80%;
      margin: 120px auto 0;
      background-color: white;
      border-radius: 20px;
      position: relative;
      margin-top: 50px;
      padding: 0 0 50px;
      box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
      .avatar {
        @include flex-center(column);
        label {
          width: 80px;
          height: 80px;
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            margin-bottom: 8px;
            box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
            &:hover {
              cursor: pointer;
            }
          }
          input {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            opacity: 0;
          }
        }
        .tip {
          margin-top: 50px;
          font-size: 14px;
          color: #575757;
          font-weight: bold;
        }
      }
      .info {
        width: 80%;
        margin: 50px auto 0;

        text-align: center;
        input {
          width: 60%;
          min-width: 410px;
          margin: 10px auto 20px;
          padding: 10px;
          color: #575757;
          border: 1px solid #575757;
          display: flex;
        }
      }
    }
    .btn {
      padding: 10px 20px;
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
@media screen and (max-width: 719px) {
}
</style>
