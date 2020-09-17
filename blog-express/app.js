var createError = require('http-errors')
var express = require('express')
var path = require('path')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

var blogRouter = require('./routes/blog')
var userRouter = require('./routes/user')

var app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

const ENV = process.env.NODE_ENV

//'dev' 'combined' ... => github.com/express/morgan
if (ENV != 'production') {
  app.use(
    logger('dev', {
      stream: process.stdout, //default
    })
  )
} else {
  // 线上环境
  const logFilePath = path.resolve(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFilePath, {
    flags: 'a',
  })
  app.use(
    logger('combined', {
      stream: writeStream,
    })
  )
}
app.use(
  //'dev' 'combined' ... => github.com/express/morgan
  logger('combined', {
    stream: process.stdout, //default
  })
)
app.use(express.json()) // getPostData
app.use(express.urlencoded({ extended: false })) // getPostData
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient,
})
app.use(
  session({
    secret: 'Wjiol#1236_',
    cookie: {
      // path: '/', // default setting
      // httpOnly: true, // default setting
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: sessionStore,
  })
)

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'dev' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
