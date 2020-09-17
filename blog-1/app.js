const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/log')
const { rejects } = require('assert')

// get expiry time of cookie
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  console.log('d.toGMTString', d.toGMTString())
  return d.toGMTString()
}

// session 数据
const SESSION_DATA = {}

// 用于处理post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      console.log('header not json')
      resolve({})
      return
    }
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      console.log('postData..', postData)
      resolve(JSON.parse(postData))
    })
  })
}
const serverHandle = (req, res) => {
  // 记录 access log
  access(
    `${req.method} -- ${req.url} -- ${req.headers['user-agent']}--${Date.now()}`
  )
  // 设置返回格式JSON
  res.setHeader('Content-Type', 'application/json')
  // get path
  const url = req.url
  req.path = url.split('?')[0]

  // get query
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2;k3=v3
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })
  // console.log('req.cookie is', req.cookie)

  // 解析 session
  let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    } else {
      console.log('SESSION_DATA[userId]', SESSION_DATA[userId])
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  // 处理postData
  getPostData(req).then((postData) => {
    req.body = postData
    console.log('postData', postData)
    // 处理blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userId};path=/; httpOnly;expires=${getCookieExpires()}`
          )
        }
        res.end(JSON.stringify(blogData)) // stringify 把JSON对象转换成字符串
      })
      return
    }

    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(JSON.stringify(blogData)) // stringify 把JSON对象转换成字符串
    //   return
    // }

    // 处理user 路由
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(JSON.stringify(userData))
    //   return
    // }
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userId};path=/; httpOnly;expires=${getCookieExpires()}`
          )
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    // not found router, return 404
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
