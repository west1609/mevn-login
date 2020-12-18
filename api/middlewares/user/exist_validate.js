const { ValidationError, errorHandler } = require('../../utils/errors')
const User = require('../../models/user_schema')

const existValidate = async (req, res, next) => {
  try {
    const user = req.body

    // if exists/invalid
    const isExistedUsername = await User.exists({ username: user.username })

    const isExistedEmail = await User.exists({ email: user.email })

    if (isExistedUsername)
      throw new ValidationError('Username is already existed')
    else if (isExistedEmail)
      throw new ValidationError('Email is already existed')

    next()
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  existValidate,
}
