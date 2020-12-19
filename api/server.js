// Importing required modules
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { init } = require('./helpers/db/mongodb.js')

init()
const app = express()

// Configure middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Defining route middleware
app.use('/users', require('./routes/users'))
app.use('/auth/login', require('./routes/login'))
app.use('/auth/logout', require('./routes/logout'))
app.use('/auth/refresh_token', require('./routes/refresh_token'))

// Listening to port
// app.listen(port)

export default {
  handler: app,
  path: '/api/',
}
