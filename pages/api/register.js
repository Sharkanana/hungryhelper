
const mongoose = require('mongoose');

//Register
export default function(req, res) {

  const User = mongoose.model('user');

  if (!req.username || !req.password || !req.email) {
    res.json({success: false, msg: 'Please enter all required fields.'});
  }
  else {
    let newUser = new User({
      username: req.username,
      email: req.email,
      password: req.password
    });

    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
}