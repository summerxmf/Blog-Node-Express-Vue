<template>
  <div class="dropdown" @click.stop="handleClick">
    <div class="dropdown-toggle">
      <slot name="dropdownToggle"></slot>
    </div>
    <transition name="dropdown-layer">
      <div class="dropdown-layer" v-show="isShow">
        <slot name="dropdownLayer"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'myDropDown',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    handleClick() {
      if (this.isShow) {
        // this.hide()
        this.$emit('hide')
      } else {
        this.show()
      }
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 720px) {
  .dropdown {
    position: relative;
    box-sizing: border-box;
    &-toggle {
      position: relative;
      z-index: 1;
    }
    &-layer {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 2;
      &-enter-active,
      &-leave-active {
        transition: all 0.5s;
      }
      &-enter,
      &-leave-to {
        height: 0;
        opacity: 0;
        visibility: hidden;
      }
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
