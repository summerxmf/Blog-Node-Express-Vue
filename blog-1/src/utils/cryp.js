const crypto = require('crypto')

// SECRET KEY
const SECRET_KEY = 'Wjioln_9707#'

// md5
/*
An MD5 hash is created by taking a string of an any length and encoding it into a 128-bit fingerprint. 
Encoding the same string using the MD5 algorithm will always result in the same 128-bit hash output. 
MD5 hashes are commonly used with smaller strings when storing passwords, credit card numbers 
or other sensitive data in databases such as the popular MySQL. This tool provides a quick and easy way 
to encode an MD5 hash from a simple string of up to 256 characters in length.
*/
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}
// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}
// const result = genPassword('123456')
// console.log(result)

module.exports = {
  genPassword,
}
