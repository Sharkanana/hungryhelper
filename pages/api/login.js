const users = require('../../models/users');
const passport = require('passport');
const settings = require('../../config/settings');
const jwt = require('jsonwebtoken');
require('../../config/passport')(passport);

export default async function(req, res) {

  await new Promise(resolve => {

    const body = req.body;

    users.findOne({
      username: body.username
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            let token = jwt.sign(user.toJSON(), settings.secret);

            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token, user: user});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }

      resolve();
    });

  });
}