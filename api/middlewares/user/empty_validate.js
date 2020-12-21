const { isEmpty, isNull, isUndefined } = require('lodash')
const {
  ValidationError,
  BadRequestError,
  errorHandler,
} = require('../../utils/errors')

const emptyValidate = async (req, res, next) => {
  try {
    const user = req.body

    // if empty body
    if ((!req.params.id && isEmpty(user)) || (req.params.id && isEmpty(user)))
      throw new BadRequestError()
    else if (
      (!req.params.id && !user.avatar) ||
      (!req.params.id &&
        (!user.username || !user.email || !user.password || !user.avatar))
    ) {
      throw new ValidationError('All the fields are required')
    }

    let hasEmptyVal = false

    // if 1 of properties is falsy
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
