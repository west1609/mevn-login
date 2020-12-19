const multer = require('multer')
const { errorHandler } = require('../utils/errors')

const upload = multer({
  dest: './static/images/avatars',
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
})

const uploadAvatar = (req, res, next) => {
  try {
    if (req.file) req.body.avatar = req.file.path.split('\\').slice(1).join('/')

    next()
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  upload,
  uploadAvatar,
}
