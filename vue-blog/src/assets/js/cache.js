import storage from './storage'

const prefix = 'blog'
const suffix = 'key'
// const STORE_KEY = `${prefix}-storeinfo-${suffix}`

const USERINFO_KEY = `${prefix}-userinfo-${suffix}`

const FAVORITE_KEY = `${prefix}-favorite-${suffix}`

export function setUserInfo(info) {
  storage.set(USERINFO_KEY, info)
}
export function getUserInfo() {
  return storage.get(USERINFO_KEY)
}

export function saveFavorite(blogId) {
  let blogs = storage.get(FAVORITE_KEY)
  console.log(blogs)

  const index = blogs.findIndex((id) => {
    return id === blogId
  })
  console.log(index)
  if (index < 0) {
    blogs.push(blogId)
  } else {
    blogs.splice(index, 1)
  }

  storage.set(FAVORITE_KEY, blogs)
  return blogs
}
export function setFavorite(arr) {
  storage.set(FAVORITE_KEY, arr)
}

export function getFavorite() {
  return storage.get(FAVORITE_KEY)
}
