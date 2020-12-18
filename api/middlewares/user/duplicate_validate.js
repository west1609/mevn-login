const { omit } = require('lodash')
const { ValidationError, errorHandler } = require('../../utils/errors')
const User = require('../../models/user_schema')

const duplicateValidate = async (req, res, next) => {
  try {
    let user = { ...req.body }

    // if user has id
    const userId = req.params.id
    if (userId) {
      user = omit(user, ['username'])
    }

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
  duplicateValidate,
}
