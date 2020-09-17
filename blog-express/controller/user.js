const xss = require('xss')
const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const regist = (email, password) => {
  email = escape(xss(email))
  password = escape(genPassword(password))
  const name = escape(email.slice(0, email.indexOf('@')))
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
  const sql = `select id, email, name, avatar, blog_num, collection from users
   where email=${email} and password=${password}`
  return exec(sql).then((rows) => {
    return rows[0] || {}
  })
  // if (username === 'molly' && password === '123') {
  //   return true
  // }
  // return false
}
const updateUser = (id, userData = {}) => {
  const username = escape(xss(userData.username))
  const email = escape(xss(userData.email))
  const avatar = escape(userData.avatar)
  const sql = `update users set name=${username}, email=${email}, avatar=N${avatar} where id=${id};`
  console.log('........', sql)
  return exec(sql).then((updateData) => {
    console.log('updateData is ', updateData)
    return updateData.affectedRows > 0
  })
}

const updateCollection = (userId, collection) => {
  collection = collection.join('|')
  const sql = `UPDATE users SET collection='${collection}' WHERE id = ${userId}`
  return exec(sql)   
    .then((updateData) => {
      return [updateData.affectedRows > 0]
    })
}

module.exports = {
  regist,
  login,
  updateUser,
  updateCollection,
}
