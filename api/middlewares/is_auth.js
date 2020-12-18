const jwt = require('jsonwebtoken')
const { errorHandler, UnauthorizedError } = require('../utils/errors')

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (accessToken == null) throw new UnauthorizedError('UnauthorizedError')

    req.accessToken = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_KEY,
      {
        algorithms: ['HS256'],
      }
    )

    next()
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  isAuth,
}
