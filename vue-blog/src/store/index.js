import Vue from 'vue'
import Vuex from 'vuex'
import { isLogin } from 'api/user'
import storage from 'assets/js/session'

import { USERINFO_KEY, FAVORITE_KEY } from '../config'
import { addFavorite, deleteFavorite } from 'api/user'
import { getFavorite } from 'assets/js/cache'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    hasLogin: false,
    userId: '',
    username: '',
    email: '',
    avatar: '',
    favoriteList: getFavorite(),
  },
  mutations: {
    setHasLogin(state, hasLogin) {
      state.hasLogin = hasLogin
    },
    setUserInfo(state, userInfo) {
      state.userId = userInfo.userId
      state.username = userInfo.username
      state.email = userInfo.email
      state.avatar = userInfo.avatar
    },
    setFavoriteList(state, favoriteList) {
      state.favoriteList = favoriteList
    },
  },
  actions: {
    validate({ commit }) {
      {
        return isLogin().then((res) => {
          // when user haven't login
          console.log('res', res)
          if (res.errno === 0) {
            const userInfo = res.data
            commit('setUserInfo', userInfo)
            storage.set(USERINFO_KEY, userInfo)
            return Promise.resolve()
          }
          return Promise.reject(res)
        })
      }
    },
    addToFavoriteList({ commit, state }, blogId) {
      console.log('state favorite', state.favoriteList)
      addFavorite(blogId).then((res) => {
        console.log('res in store', res)
        if (res.code === 0) {
          const favoriteList = res.data
          commit('setFavoriteList', favoriteList)
          console.log('state favorite', state.favoriteList)
          storage.set(FAVORITE_KEY, favoriteList)
        }
      })
    },
    deleteFromFavoriteList({ commit }, blogId) {
      deleteFavorite(blogId).then((res) => {
        if (res.code === 0) {
          const favoriteList = res.data
          commit('setFavoriteList', favoriteList)
          storage.set(FAVORITE_KEY, favoriteList)
        }
      })
    },
  },
})
