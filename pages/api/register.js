
const users = require('../../models/users');

//Register
export default async function(req, res) {

  await new Promise(resolve => {

    const body = req.body;

    if (!body.username || !body.password || !body.email) {
      res.json({success: false, msg: 'Please enter all required fields.'});
      resolve();
    }
    else {

      users.findOne({username: body.username}, (err, doc) => {

        if(doc) {
          res.json({success: false, msg: 'Username already in use.'});
          resolve();
        }
        else {
          users.findOne({email: body.email}, (err, doc) => {

            if(doc) {
              res.json({success: false, msg: 'Email already in use.'});
              resolve();
            }
            else {

              users.create({
                username: body.username,
                email: body.email,
                password: body.password
              }, function (err) {

                if (err) {
                  res.json({success: false, msg: 'Error saving user.'});
                }

                res.json({success: true, msg: 'Successfully created new user.'});

                resolve();
              });
            }
          });
        }
      });
    }
  });
}