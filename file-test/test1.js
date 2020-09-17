const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err)
  } else {
    console.log(data.toString())
  }
})
// 写入文件
const content = 'This is new content \n'
const opt = {
  flag: 'a', // 写入的内容是append还是rewrite 'w'
}
fs.writeFile(fileName, content, opt, (err) => {
  if (err) {
    console.error(err)
  }
})

// 判断文件是否存在
fs.exists(fileName, (exitst) => {
  console.log('exist', exitst) // true or false
})


