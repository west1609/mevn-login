const express = require('express')

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user_controller')

const { userValidate } = require('../middlewares/user/user_validate')

const { emptyValidate } = require('../middlewares/user/empty_validate')

const { duplicateValidate } = require('../middlewares/user/duplicate_validate')

const { existValidate } = require('../middlewares/user/exist_validate')

const { isAuth } = require('../middlewares/is_auth')

const { upload, uploadAvatar } = require('../middlewares/upload_avatar')

const router = express.Router()

router
  .post(
    '/',
    upload.single('avatar'),
    uploadAvatar,
    emptyValidate,
    existValidate,
    userValidate,
    createUser
  )
  .get('/', isAuth, getUsers)
  .get('/:id', existValidate, getUserById)
  .patch(
    '/:id',
    upload.single('avatar'),
    uploadAvatar,
    emptyValidate,
    duplicateValidate,
    userValidate,
    updateUser
  )
  .delete('/:id', existValidate, deleteUser)

module.exports = router
