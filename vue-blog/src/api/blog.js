import axios from 'axios'

const getList = (username = '', keywords = '') => {
  // const data = {
  //   keyword,
  // }
  return axios({
    method: 'get',
    url: '/api/blog/list',
    params: {
      username,
      keywords,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // console.log('res', keyword)
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data!')
    })
    .catch((err) => {
      // catch error first before send data to front end
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res) // res could be undefined or data
    })
}

const getDetail = (id) => {
  return axios({
    method: 'get',
    url: '/api/blog/detail',
    params: {
      id,
    },
  })
    .then((res) => {
      // console.log('res', keyword)
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data!')
    })
    .catch((err) => {
      // catch error first before send data to front end
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res) // res could be undefined or data
    })
}
// don't need to put userId into data, for secure, let backend get userId from session - cookie
const addNew = (title, content, keywords) => {
  return axios({
    method: 'post',
    url: '/api/blog/new',
    data: {
      title,
      content,
      keywords,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data!')
    })
    .catch((err) => {
      // catch error first before send data to front end
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res) // res could be undefined or data
    })
}
// keep a params for the future development
const getFavorites = (keywords = '') => {
  // const data = {
  //   keyword,
  // }
  return axios({
    method: 'get',
    url: '/api/blog/favorites',
    params: {
      keywords,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // console.log('res', res)
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data!')
    })
    .catch((err) => {
      // catch error first before send data to front end
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res) // res could be undefined or data
    })
}

const updateFavorite = (blogId, isFavorite) => {
  return axios({
    method: 'get',
    url: '/api/blog/updateFavorite',
    params: {
      blogId,
      isFavorite,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      // res -> collection_num
      console.log('res', res)
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data!')
    })
    .catch((err) => {
      // catch error first before send data to front end
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res) // res could be undefined or data
    })
}

export { getList, getDetail, addNew, getFavorites, updateFavorite }
