var express = require('express')
var router = express.Router()
const loginCheck = require('../middleware/loginCheck')

const {
  getList,
  getFavorites,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
  updateCollectionNum
} = require('../controller/blog')

const {updateCollection} = require('../controller/user')

const { updateUserCollection } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

router.get('/list', (req, res, next) => {
  const username = req.query.username || ''
  const keywords = req.query.keywords || ''

  getList(username, keywords)
    .catch((err) => {
      console.err(err)
    })
    .then((data) => {
      if (data.length > 0) {
        res.json(new SuccessModel(data))
      }
      res.json(new ErrorModel())
    })
})

router.get('/detail', (req, res, next) => {
  console.log('req.id', req.query.id)
  return getDetail(req.query.id)
    .catch((err) => {
      console.err(err)
    })
    .then((data) => {
      if (data.length > 0) {
        res.json(new SuccessModel(data[0]))
      }
      res.json(new ErrorModel())
    })
})
router.post('/new', loginCheck, (req, res, next) => {
  req.body.userId = req.session.userId

  console.log('req.body...', req.body)
  return newBlog(req.body)
    .catch((err) => {
      console.err(err)
    })
    .then((data) => {
      res.json(new SuccessModel(data))
    })
})
router.post('/update', loginCheck, (req, res, next) => {
  req.body.userId = req.session.userId
})

router.get('/favorites', (req, res, next) => {
  const keywords = req.query.keywords
  const userId = req.session.userId
  // console.log('...userId ', userId)
  return getFavorites(userId, keywords)
    .catch((err) => {
      console.err(err)
    })
    .then((data) => {
      console.log('.....data, ', data)
      if (data.length > 0) {
        res.json(new SuccessModel(data))
      }
      res.json(new ErrorModel())
    })
})
router.get('/updateFavorite', (req, res, next) => {
  const userId = req.session.userId
  const blogId = req.query.blogId
  const collection = req.session.collection
  // assume this blogId is not in collection column of users
  let hasFavorite = false
  const index = collection.findIndex((id) => {
    return blogId === id
  })
  //  if this blogId has been in collecion column of users
  if (index > -1) {
    hasFavorite = true
    collection.splice(index, 1)
  } else {
    collection.push(blogId)  }

  // userId => String
  // collection => Array   init=> []
  return updateCollection(userId, collection)
    .then((data) => {
      if (data) {
        return updateCollectionNum(blogId, hasFavorite)
      } else {
        return Promise.reject()
      }
    })
    .then((data) => {
      if (data) {
        req.session.collection = collection
        console.log('......143 req.session.collection', req.session.collection)
        res.json(new SuccessModel(req.session))
      }
      res.json(new ErrorModel())
    })
})

router.get('/updateFavorite', (req, res, next) => {
  const userId = req.session.userId
  const blogId = req.query.blogId

  updateUserCollection(userId, blogId).then((data) => {
    console.log('.....res', data)
    if (!data[0]) {
      res.json(new ErrorModel())
    }
    // res[1] =>  add like to subs like
    updateCollectionNum(blogId, data[1]).then((data) => {
      if (data) {
        console.log('......res in blog routers', data)
        res.json(new SuccessModel(data[0]))
      }
      res.json(new ErrorModel())
    })
  })
})

module.exports = router
