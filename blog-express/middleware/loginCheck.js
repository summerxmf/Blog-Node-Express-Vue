const { ErrorModel } = require('../model/resModel')
module.exports = (req, res, next) => {
  if (req.session.userId) {
    next()
  } else {
    res.json(new ErrorModel('havent login'))
  }
}
