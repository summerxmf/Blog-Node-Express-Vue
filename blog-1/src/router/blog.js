const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

// 统一的登录验证函数
const loginCheck = (req) => {
  if (!req.session.authorId) {
    return Promise.resolve(new ErrorModel("haven't logon"))
  }
}
const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // get blog list
  if (method === 'GET' && req.path === '/api/blog/list') {
    // const { username, password } = req.body
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // return new SuccessModel(listData)
    return getList(author, keyword).then((listData) => {
      return new SuccessModel(listData)
    })
  }
  // get blog detail
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return getDetail(id).then((data) => {
      //this data is an array
      return new SuccessModel(data[0])
    })
    // const data = getDetail(id)
    // return new SuccessModel(data)
  }

  // creat a blog
  if (method === 'POST' && req.path === '/api/blog/new') {
    // 登录验证
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }

    req.body.authorId = req.session.authorId
    console.log('50 req.body: ', req.body)
    return newBlog(req.body).then((data) => {
      return new SuccessModel(data)
    })
    // const data = newBlog(req.body)
    // return new SuccessModel(data)
  }

  // update a blog
  if (method === 'POST' && req.path === '/api/blog/update') {
    // 登录验证
    loginCheck(req).then((result) => {
      if (result) {
        return result
      }
    })
    return updateBlog(id, req.body).then((value) => {
      if (value) {
        return new SuccessModel()
      } else {
        return new ErrorModel('updating failed')
      }
    })
  }

  // delete a blog
  if (method === 'POST' && req.path === '/api/blog/del') {
    // 登录验证
    loginCheck(req).then((result) => {
      if (result) {
        return result
      }
    })
    // const author = 'zhangsan' // 假数据
    const author = req.session.username
    return delBlog(id, author).then((value) => {
      if (value) {
        return new SuccessModel()
      } else {
        return new ErrorModel('deleting failed')
      }
    })
    // const result = delBlog(id)
  }
}
module.exports = handleBlogRouter
