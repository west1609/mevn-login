const multer = require('multer')
const { errorHandler, ValidationError } = require('../utils/errors')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './static/images/avatars')
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
})

const uploadAvatar = (req, res, next) => {
  try {
    if (!req.file) {
      // set default avatar if user does not upload any
      req.body.avatar = 'images/avatars/avatar-1608548431500'
      return next()
    }
    // FILE SIZE ERROR
    else if (req.code === 'LIMIT_FILE_SIZE') {
      throw new ValidationError('Avatar: max file size allowed is 3MB!')
    }

    // INVALID FILE TYPE
    else if (
      req.file.mimetype !== 'image/png' &&
      req.file.mimetype !== 'image/jpeg'
    ) {
      throw new ValidationError('Avatar: only JPEG, PNG files are allowed')
    }

    req.body.avatar = `images/avatars/${req.file.filename}`
    next()
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  upload,
  uploadAvatar,
}
