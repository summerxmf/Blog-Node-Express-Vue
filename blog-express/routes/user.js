var express = require('express')
var router = express.Router()
const path = require('path')
const fs = require('fs')
const {
  login,
  regist,
  updateUser,
  updateCollection,
} = require('../controller/user')
const { updateCollectionNum } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const multer = require('multer')
// const loginCheck = require('../middleware/loginCheck')
const app = require('../app')
const { restart } = require('nodemon')

router.post('/regist', (req, res, next) => {
  const { email, password } = req.body
  return regist(email, password)
    .catch((err) => {
      res.json(new ErrorModel('Regist failed'))
    })
    .then((data) => {
      // when email has been registed
      if (data.id === -1) {
        res.json(new ErrorModel('This email has been registed!'))
      } else {
        res.json(new SuccessModel(data))
      }
    })
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  return login(email, password).then((data) => {
    // if login successed
    if (data.id) {
      // cookie
      // res.setHeader(
      //   'Set-Cookie',
      //   `username=${username};path=/; httpOnly;expires=${getCookieExpires()}`
      // )
      // set session
      // req.session.user = {
      //   userId: data.id,
      //   email: data.email,
      //   username: data.name,
      //   avatar: 'http://127.0.0.1:3000/avatars/' + data.avatar,
      //   blogNum: data.blog_num,
      //   collection: collection,
      // }
      req.session.userId = data.id
      req.session.email = data.email
      req.session.username = data.name
      req.session.avatar = 'http://127.0.0.1:3000/avatars/' + data.avatar
      req.session.blogNum = data.blog_num
      const collection = data.collection
      req.session.collection = collection == '' ? [] : collection.split('|')
      res.json(new SuccessModel(req.session))
    } else {
      res.json(new ErrorModel('login failed'))
    }
  })
})
// for router guard
router.get('/isLogin', (req, res, next) => {
  console.log('req.sesseiong is : ...', req.session)
  if (req.session.user) {
    res.json(new SuccessModel(req.session))
  } else {
    res.json(new ErrorModel('not'))
  }
})

const dir = path.resolve(__dirname, '../public/avatars')
const storage = multer.diskStorage({
  // file path
  destination: function (req, avatar, cb) {
    console.log('.....avatar', avatar)
    cb(null, './public/avatars')
  },
  // file name
  filename: function (req, avatar, cb) {
    cb(null, Date.now() + '-' + avatar.originalname)
  },
})
const upload = multer({ storage })

router.post('/update', upload.single('avatar'), (req, res, next) => {
  /* avatar is an object
   {
     fieldname: 'avatar,
     originalname: '***',
     encoding: '7bit',
     mimetype: 'image/png',
     destination: './public/avatars,
     filename: '******',
     path: 'public\\avatars\\****',
     size: ****
   }
  */
  const avatar = req.file
  if (!avatar) {
    res.json(new ErrorModel())
  }
  const userId = req.session.userId
  const { username, email } = req.body
  req.body.avatar = avatar.filename
  return updateUser(userId, req.body).then((data) => {
    if (data) {
      const filename = avatar.filename
      const url = 'http://127.0.0.1:3000/avatars/' + filename
      req.session.username = username
      req.session.email = email
      req.session.avatar = url
      res.json(new SuccessModel(req.session))
    }
    res.json(new ErrorModel())
  })
})


router.post('/deleteFavorite', (req, res, next) => {
  const userId = req.session.userId
  const blogId = req.body.blogId
  let collection = req.session.collection
  collection.splice(collection.indexOf(blogId), 1)
  return updateCollection(userId, collection)
    .then((data) => {
      if (data) {
        return updateCollectionNum(blogId, false)
      } else {
        return Promise.reject()
      }
    })
    .then((data) => {
      if (data) {
        req.session.collection = collection
        console.log('......163 req.session.collection', req.session.collection)
        res.json(new SuccessModel(req.session.collection))
      }
      res.json(new ErrorModel())
    })
})

router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json({
      errno: 0,
      msg: 'test seccess' + req.session.username,
    })
    return
  }
  res.json({
    errno: -1,
    msg: 'test failed',
  })
})

module.exports = router
