const xss = require('xss')
const { exec, escape } = require('../db/mysql')
const SERVERRESOURCE = 'http://127.0.0.1:3000/avatars/'

const getList = (username, keyword) => {
  let sql = `SELECT b.id as id, b.title as title, b.content as content, b.createtime as createtime, b.collection_num as collection_num ,u.name as username, u.avatar as avatar FROM blogs b LEFT JOIN users u ON b.user_id=u.id WHERE 1=1 `
  if (username) {
    sql += `and u.name='${username}' `
  }
  if (keyword) {
    sql += `and b.title like '%${keyword}%' `
  }
  sql += `order by b.createtime desc;`

  console.log('sql...', sql)
  return exec(sql)
  /**
    先返回假数据（格式是正确的）
    return [
      {
        id: 1,
        title: 'title A',
        content: 'content A',
        createTime: 1596283162207,
        author: 'Mike',
      },
      {
        id: 2,
        title: 'title B',
        content: 'content B',
        createTime: 1596283286922,
        author: 'Macdonald',
      },
      {
        id: 1,
        title: 'title C',
        content: 'content C',
        createTime: 1596283352812,
        author: 'Donald',
      },
    ]
*/
}

const getDetail = (id) => {
  let sql = `SELECT b.id as id, b.title as title, b.content as content, b.createtime as createtime, b.collection_num as collection_num ,u.name as author FROM blogs b LEFT JOIN users u ON b.user_id=u.id WHERE b.id=${id} `
  sql += `order by createtime desc;`
  console.log(exec(sql))
  return exec(sql)
}

const getFavorites = (userId, keyword) => {
  let sql1 = `SELECT collection FROM users WHERE id = ${userId}`
  let sql = `SELECT b.id as id, b.title as title, b.content as content, b.createtime as createtime, b.collection_num as collection_num ,u.name as username, u.avatar as avatar FROM blogs b LEFT JOIN users u ON b.user_id=u.id WHERE `
  return exec(sql1)
    .then((ret) => {
      console.log('.....ret', ret[0].collection)
      let collection = ret[0].collection
      if (!collection) {
        sql += `1!=1`
        return sql
      }
      console.log('....test')
      const blogIds = collection.split('|')
      console.log(blogIds)
      sql += `b.id IN (`
      for (let i = 0; i < blogIds.length - 1; i++) {
        const id = parseInt(blogIds[i])
        sql += `${id}, `
      }
      sql += `${parseInt(blogIds[blogIds.length - 1])}) `
      if (keyword) {
        keyword = escape(keyword)
        sql += `and b.title like '%'${keyword}'%' `
      }
      sql += `order by b.createtime desc;`
      return sql
    })
    .then((sql) => {
      return exec(sql)
    })
}

const newBlog = (blogData = {}) => {
  // blogData => {title, content, keywords, userId}
  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  const userId = escape(blogData.userId)
  const keywords = xss(escape(blogData.keywords))
  const createTime = Date.now()

  const sql = `INSERT INTO blogs (title, content, user_id, keywords, createtime) 
    values (${title}, ${content}, ${userId},${keywords}, ${createTime})`
  console.log('sql: add', sql)
  return exec(sql).then((insertData) => {
    console.log('insert data is ', insertData)
    return {
      id: insertData.insertId,
    }
  })
  // console.log('blog data...', blogData)
  // return {
  //   id: 3,
  // }
}

const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性
  // id 就是要更新blog的
  console.log(blogData)
  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  const sql = `update blogs set title=${title}, content=${content} where id=${id};`
  return exec(sql).then((updateData) => {
    return updateData.affectedRows > 0
  })
}

const updateCollectionNum = (id, addOrSub) => {
  let sql = `UPDATE blogs SET collection_num=collection_num `
  if (addOrSub) {
    sql += `-1 `
  } else {
    sql += `+1 `
  }
  sql += `WHERE id = ${id}`
  return exec(sql).then((updateData) => {
    return updateData.affectedRows > 0
  })
}

const delBlog = (id, author) => {
  // id 就是要删除blog的id
  const sql = `delete from blogs where id = ${id} and author='${author}'`
  return exec(sql).then((deleteData) => {
    console.log('deleteData ', deleteData)
    return deleteData.affectedRows > 0
  })
  // console.log('delete blog', id)
  // return true
}

module.exports = {
  getList,
  getDetail,
  getFavorites,
  newBlog,
  updateBlog,
  updateCollectionNum,
  delBlog,
}
