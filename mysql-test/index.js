const mysql = require('mysql')
//  创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '000520',
  port: '3306',
  database: 'myblog',
})
// 开始连接
con.connect()

// 执行sql语句
// const sql = 'select * from users'
const sql = 'select * from blogs'
// const sql = 'update users set username="zhangsan" where username="lisi"'
// const sql =
//   "INSERT INTO Blogs (title, content, createtime, author) VALUES ('titleC', 'contentC',1596600320534, 'zhangsan')"
con.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result)
})
// 关闭连接，结束进程
con.end()
