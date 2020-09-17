<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
export default {
  name: 'mySwiper',
  data() {
    return {
      mySwiper: {},
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    console.log('swiper mounted')
    this.mySwiper = new Swiper('.swiper-container', {
      loop: this.loop,
      autoplay: this.autoPlay,
      autoplayDisableOnInteraction: true,
      pagination: '.swiper-pagination',
    })
  },
  updated() {
    console.log('swiper updated')
  },
}
</script>
<style lang="scss" scoped>
// @media screen and (min-width: 720px) {
// }
// @media screen and (max-width: 719px) {
// }

</style>
