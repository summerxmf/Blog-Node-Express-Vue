const { login, regist } = require('../controller/user')
const { user } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method
  // regist
  if (method === 'POST' && req.path === '/api/user/regist') {
    const { email, password } = req.body
    return regist(email, password).then((data) => {
      if (data && data.id > -1) {
        return new SuccessModel(data)
      }
      // when email has been registed
      if (data && data.id === -1) {
        return new ErrorModel('This email has been registed!')
      }
      return new ErrorModel('Regist failed')
    })
  }

  // login
  if (method === 'POST' && req.path === '/api/user/login') {
    // const { email, password } = req.query
    const { email, password } = req.body
    return login(email, password).then((data) => {
      console.log('data', data)
      if (data.id) {
        // if login successed
        // cookie
        // res.setHeader(
        //   'Set-Cookie',
        //   `username=${username};path=/; httpOnly;expires=${getCookieExpires()}`
        // )
        // 设置session
        req.session.authorId = data.id
        req.session.email = data.email
        req.session.authorName = data.name
        console.log('session setting, req.session is', req.session)
        // 同步到redis
        // set(req.sessionId, req.session)  //这个地方有问题
        return new SuccessModel(req.session)
      } else {
        return new ErrorModel('login failed')
      }
    })
    // if (login) {
    //   return new SuccessModel('login successfully')
    // } else {
    //   return new ErrorModel('login failed')
    // }
  }
  // 登录验证
  if (method === 'GET' && req.path === '/api/user/login-test') {
    console.log('eq.session in test', req.session)
    if (req.session.userId) {
      return Promise.resolve(
        new SuccessModel({
          id: req.session.userId,
          username: req.session.userName,
          email: req.session.email,
        })
      )
    }
    return Promise.resolve(new ErrorModel('havent login'))
  }
}
module.exports = handleUserRouter
