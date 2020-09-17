import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import 'assets/scss/index.scss'

import VueSweetalert2 from 'vue-sweetalert2'

// import fastclick from 'fastclick';

Vue.use(VueSweetalert2)

// fastclick.attach(document.body);
Vue.config.productionTip = false

Vue.directive('title', {
  inserted(el) {
    document.title = el.innerText
    el.remove()
  },
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
