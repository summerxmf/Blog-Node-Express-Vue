const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `SELECT b.id as id, b.title as title, b.content as content, b.createtime as createtime, b.collection_num as collection_num ,u.name as author  FROM blogs b LEFT JOIN users u ON b.user_id=u.id WHERE 1=1 `
  if (author) {
    sql += `and u.name='${author}' `
  }
  if (keyword) {
    sql += `and b.title like '%${keyword}%' `
  }
  sql += `order by b.createtime desc;`
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

const newBlog = (blogData = {}) => {
  // blogData => {title, content, keywords, authorId}
  const title = xss(escape(blogData.title))
  const content = xss(escape(blogData.content))
  const userId = escape(blogData.authorId)
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
  // if (title) {
  //   sql += `, title='${title}' `
  // }
  // if (content) {
  //   sql += `, content='${content}' `
  // }

  return exec(sql).then((updateData) => {
    console.log('updateData is ', updateData)
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
  newBlog,
  updateBlog,
  delBlog,
}
