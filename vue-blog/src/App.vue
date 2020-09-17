<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import session from 'assets/js/session'
import { STORE_KEY } from './config'

export default {
  name: 'App',
  created() {
    // when page fist loaded, replace state of store with what save in sessionsession
    if (session.get(STORE_KEY)) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, session.get(STORE_KEY))
      )
    }
    // when page refresh save state in store at sessionsession
    window.addEventListener('beforeunload', () => {
      session.set(STORE_KEY, this.$store.state)
    })
  },
}
</script>
