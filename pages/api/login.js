const mongoose = require('mongoose');
const passport = require('passport');
const settings = require('../../config/settings');
const jwt = require('jsonwebtoken');
require('../../config/passport')(passport);

export default async function(req, res) {

  await new Promise(resolve => {

    const User = mongoose.model('user');

    User.findOne({
      username: req.username
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            let token = jwt.sign(user.toJSON(), settings.secret);

            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }

      resolve();
    });

  });
}