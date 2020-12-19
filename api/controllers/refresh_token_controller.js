const jwt = require('jsonwebtoken')

const { errorHandler } = require('../utils/errors')

const refreshToken = async (req, res) => {
  try {
    const oldRefreshToken = await jwt.verify(
      req.cookies.refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      {
        algorithms: ['HS256'],
      }
    )
    const reqUserData = oldRefreshToken.data

    // Set JWT Token
    const secretKey = process.env.ACCESS_TOKEN_KEY

    const accessToken = await jwt.sign(
      {
        data: reqUserData,
      },
      secretKey,
      { expiresIn: 60 * 1 },
      { algorithm: 'HS256' }
    )

    // Set Refresh Token to browser cookie
    const secretRefreshKey = process.env.REFRESH_TOKEN_KEY

    const refreshToken = jwt.sign(
      {
        data: reqUserData,
      },
      secretRefreshKey,
      { expiresIn: 60 * 60 * 24 * 30 },
      { algorithm: 'HS256' }
    )

    const options = {
      maxAge: 1000 * 60 * 60 * 24 * 30, // // would expire after a month
      httpOnly: true, // The cookie only accessible by the web server
      secure: process.env.NODE_ENV === 'production',
    }

    res.cookie('refreshToken', refreshToken, options)

    res.status(200).json({
      status: 200,
      accessToken,
      user: reqUserData,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  refreshToken,
}
