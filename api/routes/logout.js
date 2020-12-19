const express = require('express')

const { logout } = require('../controllers/logout_controller')

const router = express.Router()

router.post('/', logout)

module.exports = router
