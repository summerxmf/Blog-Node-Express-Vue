const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')  // 关键代码
}
// 生成write stream
function createWriteStream(fileName) {
  const fullName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullName, {
    flags: 'a',
  })
  return writeStream
}

const accessWriteStream = createWriteStream('access.log')

// 写访问日志
function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access,
}
