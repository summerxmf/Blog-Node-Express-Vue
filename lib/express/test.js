const express = require('./like-express.js')

const app = express()

app.use((req, res, next) => {
  console.log('request start...', req.method, req.url)
  next()
})
app.use((req, res, next) => {
  // 假设在处理cookie
  req.cookie = {
    userId: 'abc123',
  }
  next()
})

app.use((req, res, next) => {
  // 假设处理post data
  // 异步
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200,
    }
    next()
  })
})
app.use('/api', (req, res, next) => {
  console.log('use api')
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get api')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post api')
  next()
})
app.use('/api/blog', (req, res, next) => {
  console.log('use api/blog')
  next()
})

app.get('/api/blog', (req, res, next) => {
  console.log('get api/blog')
  next()
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
