const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
const multer = require('multer')
const cacheFolder = 'public/images'

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
  console.log('req.file', req.file)
  next()
})
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', (req, res, next) => {
  console.log('')
  next()
})
const upload = multer({ dest: cacheFolder })
app.post('/api/user/upload-avatar', upload.single('file'), (req, res, next) => {
  const file = req.file

  console.log('文件类型：%s', file.mimetype)
  console.log('原始文件名：%s', file.originalname)
  console.log('文件大小：%s', file.size)
  console.log('文件保存路径：%s', file.path)

  res.json({ ret_code: '0' })

  //   let userDirPath = cacheFolder + 'Img'
  //   if (!fs.existsSync(userDirPath)) {
  //     fs.mkdirSync(userDirPath)
  //   }
  //   let form = new formidable.IncomingForm()
  //   form.encoding = 'utf-8'
  //   form.uploadDir = userDirPath //设置上传目录
  //   form.keepExtensions = true //保留后缀
  //   form.maxFieldsSize = 2 * 1024 * 1024 //文件大小
  //   form.type = true
  //   form.parse(req, (err, fields, files) => {
  //     console.log('files', files)
  //     console.log('fields', fields)
  //     if (err) {
  //       return res.json(err)
  //     }
  //     let extName = '' //后缀名
  //     switch (files.file.type) {
  //       case 'image/pjpeg':
  //         extName = 'jpg'
  //         break
  //       case 'image/jpeg':
  //         extName = 'jpg'
  //         break
  //       case 'image/png':
  //         extName = 'png'
  //         break
  //       case 'image/x-png':
  //         extName = 'png'
  //         break
  //     }
  //     if (extName.length === 0) {
  //       return res.json({
  //         msg: '只支持png和jpg格式图片',
  //       })
  //     } else {
  //       let avatarName = '/' + Date.now() + '.' + extName
  //       let newPath = form.uploadDir + avatarName
  //       fs.renameSync(files.file.path, newPath) //重命名
  //       console.log(newPath)
  //       //更新表
  //       return res.json({
  //         newPath,
  //       })
  //     }
  //   })
})

// app.get('/api', (req, res, next) => {
//   console.log('')
//   next()
// })

// app.post('/api', (req, res, next) => {
//   console.log('')
//   next()
// })

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
