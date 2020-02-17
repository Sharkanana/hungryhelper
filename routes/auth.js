const mongoose = require('mongoose');
const passport = require('passport');
const settings = require('../config/settings');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
require('../config/passport')(passport);

//Register
router.post('/register', function(req, res) {

  let body = req.body;

  if (!body.username || !body.password || !body.email) {
    res.json({success: false, msg: 'Please enter all required fields.'});
  }
  else {
    let newUser = new User({
      username: body.username,
      email: body.email,
      password: body.password
    });

    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

//Login
router.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    }
    else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          let token = jwt.sign(user.toJSON(), settings.secret);

          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        }
        else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

module.exports = router;