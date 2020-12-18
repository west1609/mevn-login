const { ValidationError, errorHandler } = require('../../utils/errors')

const userValidate = async (req, res, next) => {
  try {
    const user = req.body

    const isValidUsername = user.username
      ? /^[a-z0-9_-]{3,16}$/.test(user.username)
      : true
    const isValidEmail = user.email
      ? /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(user.email)
      : true
    const isValidPassword = user.password
      ? /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(
          user.password
        )
      : true

    if (!isValidEmail) throw new ValidationError('Email is invalid')
    else if (!isValidPassword)
      throw new ValidationError(
        'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long'
      )
    else if (!isValidUsername) {
      throw new ValidationError(
        'Username may include _ and – having a length of 3 to 16 characters'
      )
    }

    next()
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  userValidate,
}
