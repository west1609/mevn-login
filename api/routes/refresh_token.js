const express = require('express')

const { refreshToken } = require('../controllers/refresh_token_controller')

const router = express.Router()

router.get('/', refreshToken)

module.exports = router
