const { isEmpty, isNull, isUndefined } = require('lodash')
const { ValidationError, errorHandler } = require('../../utils/errors')

const emptyValidate = (req, res, next) => {
  try {
    const user = req.body

    // if empty body
    if (isEmpty(user) || !user.username || !user.password)
      throw new ValidationError('username, password are required')

    // if 1 of properties is falsy
    let hasEmptyVal = false
    Object.keys(user).forEach((k) => {
      if (isNull(user[k]) || isUndefined(user[k]) || user[k] === '') {
        hasEmptyVal = {
          name: k,
        }
      }
    })
    if (hasEmptyVal)
      throw new ValidationError(`${hasEmptyVal.name} is required`)

    next()
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  emptyValidate,
}
