const express = require('express')

const { login } = require('../controllers/login_controller')

const { emptyValidate } = require('../middlewares/login/empty_validate')

const { existValidate } = require('../middlewares/login/exist_validate')

const router = express.Router()

router.post('/', emptyValidate, existValidate, login)

module.exports = router
