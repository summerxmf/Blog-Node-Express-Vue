<template>
  <div class="addBlog">
    <div v-title>Blog / Add Blog</div>
    <header>
      <div class="leftHead">
        <img src="~assets/img/logo.png" alt="Logo" />
        <p>BLOG / Add Blog</p>
      </div>
      <div class="rightHead">
        <p class="back" @click="goBack">Back to home</p>
        <p class="publish" @click="publish">Publish</p>
      </div>
    </header>
    <section class="main">
      <div class="container">
        <input
          type="text"
          placeholder="Title"
          v-model="blogTitle"
          ref="blogTitle"
        />
        <textarea v-model="blogContent" placeholder="Content"></textarea>
        <input
          type="text"
          placeholder="Key Words (Seperate with space)"
          v-model="blogKeywords"
        />
      </div>
    </section>
  </div>
</template>
<script>
// import { USERINFO_KEY } from '@/config'
// import storage from 'assets/js/storage'
import { addNew } from 'api/blog'
export default {
  name: 'addBlog',
  data() {
    return {
      blogTitle: '',
      blogContent: '',
      blogKeywords: '',
    }
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'blogs',
      })
    },
    publish() {
      addNew(this.blogTitle, this.blogContent, this.blogKeywords).then(
        (res) => {
          console.log('res in add', res)
          if (res && res.errno === 0) {
            this.$swal({
              title: 'The blog has been published',
              icon: 'success',
              button: false,
              timer: 1000,
            })
            this.reset()
            return
          }
          // verification login from backend
          if (res && res.errno === -1) {
            this.$swal({
              title: 'Please sign in first',
              icon: 'error',
              button: false,
              timer: 1000,
            })
            this.$router.push({ name: 'login' })
            return
          }
          this.$swal({
            title: 'failed',
            icon: 'error',
            button: false,
            timer: 1000,
          })
          this.reset()
        }
      )
    },
    reset() {
      this.blogTitle = ''
      this.blogContent = ''
      this.blogKeywords = ''
      this.$refs.blogTitle.focus()
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.addBlog {
  width: 100vw;
  height: 100vh;
  background-color: rgb(240, 240, 240);
}

@media screen and (min-width: 720px) {
  header {
    width: 80%;
    height: 60px;
    background-color: white;
    @include flex-between();
    padding: 0 10%;
    position: fixed;
    left: 0;
    top: 0;
    box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
    .leftHead {
      width: 40%;
      height: 100%;
      min-width: 100px;
      font-size: 20px;
      @include flex-start();
      img {
        height: 30px;
        margin-right: 10px;
      }
    }
    .rightHead {
      height: 30px;
      @include flex-end();
      .back {
        height: 32px;
        line-height: 32px;
        text-align: center;
        padding: 0 10px;
        background-color: #00a1d6;
        color: white;
        border-radius: 5px;
        font-size: 15px;
        margin-right: 15px;
        &:hover {
          cursor: pointer;
        }
      }
      .publish {
        width: 80px;
        height: 30px;
        border: 1px solid #575757;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
        }
      }
    }
  }
  .main {
    width: 80%;
    height: calc(100vh - 90px);
    margin: 120px auto 0;
    .container {
      height: calc(100% - 170px);
      box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
      background-color: white;
      border-radius: 10px;
      padding: 20px;

      input:nth-child(1) {
        width: 100%;
        font-size: 22px;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid #6d6b6b;
        margin-bottom: 10px;
      }
      input:nth-of-type(2) {
        width: 100%;
        height: 30px;
        font-size: 13px;
        border-top: 1px solid #6d6b6b;
        margin-top: 10px;
      }
      textarea {
        display: block;
        resize: none;
        width: 100%;
        height: calc(100% - 90px);
        border: none;
        font-size: 15px;
        line-height: 20px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 719px) {
}
</style>
