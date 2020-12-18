const mongoose = require('mongoose')

const init = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(() => {
      process.exit(1)
    })
  mongoose.connection.on('open', () => {})
}

mongoose.Promise = global.Promise

module.exports = {
  init,
}
