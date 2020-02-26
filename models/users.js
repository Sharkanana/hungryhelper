const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//create schema for users
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username field is required']
  },
  email: {
    type: String,
    required: [true, 'Email field is required']
  },
  password: {
    type: String,
    required: [true, 'Password field is required']
  },
  location: {
    type: String
  }
});

UserSchema.pre('save', function (next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

//create model for user
module.exports = users = mongoose.models.users || mongoose.model('users', UserSchema);