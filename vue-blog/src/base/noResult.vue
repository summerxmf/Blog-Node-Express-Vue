<template>
  <div class="noResult">
    <img src="~assets/img/noneResult.png" alt="" />
    <img src="~assets/img/404Bgc.png" alt="" />
  </div>
</template>
<script>
export default {
  name: 'NoResult',

  methods: {}
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 720px) {
  .noResult {
    padding: 5px 3%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    img:nth-child(1) {
      width: 100%;
    }
    img:nth-child(2) {
      height: 200px;
    }
  }
}
@media screen and (max-width: 719px) {
}
</style>
