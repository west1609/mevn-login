const { omit } = require('lodash')
const User = require('../models/user_schema')
const { getHashedString } = require('../utils')
const {
  errorHandler,
  ValidationError,
  NotFoundError,
} = require('../utils/errors')

const createUser = async (req, res) => {
  try {
    let userReq = req.body

    const { hashedString, salt } = getHashedString(userReq.password)

    userReq = {
      ...userReq,
      salt,
      password: hashedString,
    }

    const userData = await User.create(userReq)

    res.status(201).json({
      status: 201,
      user: userData,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json({
      status: 200,
      users,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const userData = await User.findById(userId)

    if (!userData) throw new NotFoundError('User not found')

    res.status(200).json({
      status: 200,
      user: userData,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

const updateUser = async (req, res) => {
  try {
    let userReq = omit(req.body, ['username'])

    const userData = await User.findById(req.params.id)
    if (!userData) throw new NotFoundError('User not found')

    if (userReq.password) {
      const oldPassword = userData.password
      const oldSalt = userData.salt
      const newPassword = userReq.password
      // compare password
      const { hashedString } = getHashedString(newPassword, oldSalt)

      const isSamePassword = hashedString === oldPassword
      if (isSamePassword)
        throw new ValidationError('Please try using a new password')

      const newHashedPassword = getHashedString(newPassword)

      userReq = {
        ...userReq,
        password: newHashedPassword.hashedString,
        salt: newHashedPassword.salt,
      }
    }

    // if user does not update avatar
    if (!req.file) {
      userReq.avatar = userData.avatar
    }

    const updatedUserData = await User.findByIdAndUpdate(
      req.params.id,
      userReq,
      {
        useFindAndModify: false,
        new: true,
      }
    )

    res.status(200).json({
      status: 200,
      user: updatedUserData,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const userReq = await User.findById(userId)

    if (!userReq) throw new NotFoundError('User not found')

    const userData = await User.findByIdAndDelete(userId)

    res.status(200).json({
      status: 200,
      user: userData,
    })
  } catch (err) {
    errorHandler(err, res)
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
