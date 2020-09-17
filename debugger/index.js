const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query,
  }
  // 返回
  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})
// const server = http.createServer((req, res) => {
//     // res.writeHead(200, {'content-type': 'text/html'})
//     console.log(req.method)
//     const url = req.url
//     console.log('url...', url)
//     // console.log('req...', req)
//     req.query = querystring.parse(url.split('?')[1])
//     res.end(JSON.stringify(req.query))
//     // res.end('<h1>hello world</h1>')
// })

// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     console.log('content-type', req.headers['content-type'])
//     let postData = ''
//     req.on('data', (chunk) => {
//       postData += chunk.toString()
//     })
//     req.on('end', () => {
//       console.log('pos'+postData)
//       res.end('hello world')
//     })
//   }
// })
server.listen(3000, () => {
  console.log('listening on 3000 prot')
})
