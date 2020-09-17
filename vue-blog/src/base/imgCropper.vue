<template>
  <transition name="overplayer">
    <div class="overlayer" v-show="showOverlayer">
      <div class="wrapper">
        <div class="cropper-content">
          <div class="cropper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixedBox="option.fixedBox"
            ></vueCropper>
          </div>
          <!-- <div
            class="show-preview"
            :style="{
              width: previews.w + 'px',
              height: previews.h + 'px',
              overflow: 'hidden',
              margin: '5px',
            }"
          >
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div> -->
        </div>
        <!-- <p class="info">{{ errStr }}</p> -->
        <div class="footer-btn">
          <!-- <label class="btn" for="uploads">Selcet New</label>
          <input
            type="file"
            id="uploads"
            name="userAvatar"
            style="position:absolute; clip:rect(0 0 0 0);"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="onchangeImg"
          /> -->
          <button class="btn" @click="changeScale(1)">+</button>
          <button class="btn" @click="changeScale(-1)">-</button>
          <button class="btn" @click="rotateLeft">↺</button>
          <button class="btn" @click="rotateRight">↻</button>
          <button class="btn" @click="cancel">Cancel</button>
          <button class="btn" @click="finish">Save</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
// https://github.com/xyxiao001/vue-cropper
import { VueCropper } from 'vue-cropper'

export default {
  name: 'ImgCropper',
  components: { VueCropper },

  data() {
    return {
      showOverlayer: false,
      fileInfo: null,
      option: {
        img: '',
        size: 1,
        full: false, //输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true,
      },
    }
  },

  methods: {
    show(file) {
      this.fileInfo = file
      this.showOverlayer = true
      this.changeImg(file)
    },
    changeImg(file) {
      const imgBlob = URL.createObjectURL(file)
      this.option.img = imgBlob
    },
    hide() {
      this.fileInfo = null
      this.showOverlayer = false
    },
    cancel() {
      this.hide()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },

    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        //  file in blob
        console.log(data)
        // Blob => File
        const file = new File([data], this.fileInfo.name, { type: data.type })
        // console.log(file)
        this.$emit('changed', file)
        this.hide()
      })
    },
  },
}
</script>
<style lang="scss">
@import '~assets/scss/mixins';
.overlayer-enter-active,
.overlayer-leave-active {
  transition: all 0.3s;
}
.overlayer-enter,
.overlayer-leave-to {
  transform: translate3d(100%, 0, 0);
}
.overlayer {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
  @include flex-center();
  // padding: 30px 30px;
  .wrapper {
    // position: relative;
    @include flex-center(column);
    width: 80%;
    background-color: white;
    border-radius: 20px;
    box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.2);
    padding: 50px;
    .btn-back {
      margin-bottom: 30px;
    }
    .cropper-content {
      // @include flex-center();
      .cropper {
        width: 350px;
        height: 300px;
      }
      // .show-preview {
      //   flex: 1;
      //   .preview {
      //     overflow: hidden;
      //     border-radius: 50%;
      //     border: 1px solid #cccccc;
      //     background: #cccccc;
      //     margin-left: 40px;
      //   }
      // }
    }
    .info {
      color: #00a1d6;
    }
    .footer-btn {
      margin-top: 30px;
    }
    .btn {
      line-height: 1;
      margin-right: 10px;
      white-space: nowrap;
      text-align: center;
      box-sizing: border-box;
      transition: 0.1s;
      font-weight: 500;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #00a1d6;
      border-color: #00a1d6;
      cursor: pointer;
      &:hover {
        cursor: pointer;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
