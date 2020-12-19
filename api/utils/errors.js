class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
    this.data = {
      status: 400,
      type: 'ValidationError',
      message,
      timestamp: JSON.stringify(Date.now()),
    }
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnauthorizedError'
    this.data = {
      status: 401,
      type: 'UnauthorizedError',
      message,
      timestamp: JSON.stringify(Date.now()),
    }
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequestError'
    this.data = {
      status: 400,
      type: 'BadRequestError',
      message: 'Invalid request',
      timestamp: JSON.stringify(Date.now()),
    }
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InternalServerError'
    this.data = {
      status: 500,
      type: 'ServerError',
      message: 'InternalServerError',
      timestamp: JSON.stringify(Date.now()),
    }
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
    this.data = {
      status: 500,
      type: 'NotFoundError',
      message,
      timestamp: JSON.stringify(Date.now()),
    }
  }
}

function errorHandler(err, res) {
  switch (true) {
    case err.name === 'NotFoundError':
      break
    case err.name === 'BadRequestError':
      // bad request error
      break
    case err.name === 'ValidationError':
      // mongoose validation error
      break
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      break
    case err.name === 'TokenExpiredError':
    case err.name === 'JsonWebTokenError':
      err = new UnauthorizedError('Unauthorized')
      break
    default:
      err = new ServerError()
  }
  const statusCode = err.data.status
  err.data
    ? res.status(statusCode).json(err.data)
    : res.status(statusCode).json(err)
}

module.exports = {
  ValidationError,
  BadRequestError,
  ServerError,
  NotFoundError,
  UnauthorizedError,
  errorHandler,
}
