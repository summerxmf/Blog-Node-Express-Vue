const xss = require('xss')
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp.js')

const regist = (email, password) => {
  const name = xss(escape(email.slice(0, email.indexOf('@'))))
  email = xss(escape(email))
  password = escape(genPassword(password))
  const sql1 = `SELECT id FROM USERS WHERE email=${email}`
  return exec(sql1).then((data) => {
    console.log('data...', data)
    if (data.length > 0) {
      return {
        id: -1,
      }
    }
    const sql2 = `INSERT INTO USERS (email, password, name) VALUES (${email}, ${password}, ${name})`
    console.log('sql', sql2)
    return exec(sql2).then((insertData) => {
      return {
        id: insertData.insertId,
      }
    })
  })
}
const login = (email, password) => {
  email = xss(escape(email))
  // 生成加密密码
  password = escape(genPassword(password))
  const sql = `select id, email, name from users
   where email=${email} and password=${password}`
  return exec(sql).then((rows) => {
    return rows[0] || {}
  })
  // if (username === 'molly' && password === '123') {
  //   return true
  // }
  // return false
}

module.exports = {
  regist,
  login,
}
