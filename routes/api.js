const express = require ('express');
const router = express.Router();
const Todo = require('../models/todo');
const passport = require('passport');
require('../config/passport')(passport);

router.get('/todos', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  Todo.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/todos', passport.authenticate('jwt'), (req, res, next) => {

  let token = getToken(req.headers);

  if (token) {

    if (req.body.action) {
      Todo.create(req.body)
        .then(data => res.json(data))
        .catch(next)
    } else {
      res.json({
        error: "The input field is empty"
      })
    }
  }
  else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/todos/:id', passport.authenticate('jwt'), (req, res, next) => {

  let token = getToken(req.headers);

  if (token) {

    Todo.findOneAndDelete({"_id": req.params.id})
      .then(data => res.json(data))
      .catch(next)
  }
  else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// helper function to grab jwt token from requests
getToken = function (headers) {
  if (headers && headers.authorization) {
    let parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;