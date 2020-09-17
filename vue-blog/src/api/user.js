import axios from 'axios'

const regist = (email, password) => {
  return axios({
    method: 'post',
    url: '/api/user/regist',
    data: {
      email,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      console.log(res)
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

const login = (email, password) => {
  return axios({
    method: 'post',
    url: '/api/user/login',
    data: {
      email,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data')
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res)
    })
}

const isLogin = () => {
  return axios
    .get('/api/user/isLogin')
    .then((res) => {
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data')
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res)
    })
}

const updateUser = (username, email, file) => {
  let params = new FormData()
  params.append('username', username)
  params.append('email', email)
  params.append('avatar', file, file.name)

  return axios({
    method: 'post',
    url: '/api/user/update',
    data: params,
    headers: {
      'Content-type': 'multipart/form-data',
    },
    anync: true,
    contentType: false,
    processData: false,
  })
    .then((res) => {
      console.log('res in update', res)
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data')
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res)
    })
}

const deleteFavorite = (blogId) => {
  return axios({
    method: 'post',
    url: '/api/user/deleteFavorite',
    data: {
      blogId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
    anync: true,
    contentType: false,
    processData: false,
  })
    .then((res) => {
      console.log('res in update', res)
      if (res && res.data) {
        return res.data
      }
      throw new Error('Failed to get the data')
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
    .then((res) => {
      return Promise.resolve(res)
    })
}

export { regist, login, isLogin, updateUser, deleteFavorite }
