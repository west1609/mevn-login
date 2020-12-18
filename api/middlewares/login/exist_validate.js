const { NotFoundError, errorHandler } = require('../../utils/errors')
const User = require('../../models/user_schema')

const existValidate = async (req, res, next) => {
  try {
    const user = req.body

    // check if user exists
    const isExistedUser = await User.exists({ username: user.username })

    if (!isExistedUser) throw new NotFoundError('User not found')

    next()
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  existValidate,
}
