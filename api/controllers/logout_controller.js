const { errorHandler } = require('../utils/errors')

const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken')
    res.status(200).json({
      status: 200,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  logout,
}
