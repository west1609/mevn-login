const jwt = require('jsonwebtoken')
const User = require('../models/user_schema')
const { getHashedString } = require('../utils')

const { UnauthorizedError, errorHandler } = require('../utils/errors')

const login = async (req, res) => {
  try {
    const userReq = { ...req.body }

    const userData = await User.findOne({
      username: new RegExp(`^${userReq.username}$`, 'i'),
    })

    // compare password
    const { salt } = userData
    const { hashedString } = getHashedString(userReq.password, salt)

    const isValidPassword = hashedString === userData.password

    if (!isValidPassword)
      throw new UnauthorizedError('Username or password is incorrect')

    const resUserData = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      avatar: userData.avatar,
    }

    // Generate Access Token
    const secretKey = process.env.ACCESS_TOKEN_KEY

    const accessToken = jwt.sign(
      {
        data: resUserData,
      },
      secretKey,
      { expiresIn: 60 * 1 },
      { algorithm: 'HS256' }
    )

    // Set Refresh Token to browser cookie
    const secretRefreshKey = process.env.REFRESH_TOKEN_KEY

    const refreshToken = jwt.sign(
      {
        data: resUserData,
      },
      secretRefreshKey,
      { expiresIn: 60 * 60 * 24 * 30 },
      { algorithm: 'HS256' }
    )

    const options = {
      maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after a month
      httpOnly: true, // The cookie only accessible by the web server,
      secure: process.env.NODE_ENV === 'production',
    }

    res.cookie('refreshToken', refreshToken, options)
    res.status(200).json({
      status: 200,
      accessToken,
      user: resUserData,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  login,
}
