const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', (err) => {
  console.error(err)
})

// test
redisClient.set('myname', 'zhangsan2', redis.print)
redisClient.get('myname', (err, val) => {
  if (err) {
    console.error(err)
  } else {
    console.log('val', val)
  }
  // exit
  redisClient.quit()
})
