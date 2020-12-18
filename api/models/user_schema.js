const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username field is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email field is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'password field is required'],
    },
    avatar: {
      type: String,
      required: [true, 'avatar field is required'],
    },
    salt: {
      type: String,
      required: [true, 'salt field is required'],
    },
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    // remove these props when object is serialized
    delete ret._id
    delete ret.salt
    delete ret.password
  },
})

module.exports = model('users', userSchema)
