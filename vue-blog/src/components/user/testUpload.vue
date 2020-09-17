<template>
  <section class="main">
      <div class="container">
        <div class="avatar">
          <label for="userAvatar">
            <input
              ref="fileInput"
              type="file"
              name="userAvatar"
              accept="image/*"
              @change="onchangeImg"
              class="file-upload"
            />
            <img :src="avatar" alt="" class="img-avatar" />
            <p class="tip">
              The maximum file size is 200kb
              <span class="error">{{ errorStr }}</span>
            </p>

            <!-- <img :src="avatar" alt="avatar" />
            <input
              type="file"
              name="userAvatar"
              ref="userAvatar"
              class="file"
              @change="clipImg"
            /> -->
            <!-- <p v-text="username"></p> -->
          </label>
        </div>
        <div class="info">
          <input autocompelte="off" type="text" v-model="username" />
          <input autocompelte="off" type="text" v-model="email" />
        </div>
      </div>
      <div class="btn-save" @click="save">Save</div>
      <!-- test -->
      <!-- <div class="user-header">
        <input
          type="file"
          name="image"
          accept="image/*"
          @change="onchangeImgFun"
          class="header-upload-btn user-header-com"
        />
        <img alt="" :src="imgStr" class="user-header-img user-header-com" />
        <p class="tip">
          图片限制50kb <span class="error">{{ errorStr }}</span>
        </p>
      </div> -->
      <!-- test -->
    </section>
</template>
<script>
export default {
  name: '',
  methods: {
    great() {

    }
  }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 720px) {
}
@media screen and (max-width: 719px) {
}
</style>
