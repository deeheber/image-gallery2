const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require( '../models/user' );
const token = require( '../token' );
const ensureAuth = require( '../ensureAuth' );

router.post('/signup', jsonParser, (req, res)=>{
  const {username, password} = req.body;
  delete req.body.password;

  if(!username){
    return res.status(400).json({
      msg: 'No username',
      reason: 'Don\'t forget to include a username'
    });
  }

  if(!password){
    return res.status(400).json({
      msg: 'No password',
      reason: 'Don\'t forget to include a password'
    });
  }

  User.findOne({username})
    .then(existing=>{
      if(existing){
        return res.status(500).json({
          msg: 'Invalid username',
          reason: 'Username already exists'
        });
      }

      const user = new User(req.body);
      user.generateHash(password);
      return user.save()
      .then(user=>token.sign(user))
      .then(token =>res.json({token}));

    })
    .catch(err=>{
      res.status(500).json({
        msg: 'There was an error processing your request',
        reason: err
      });
    });
});

router.post('/signin', jsonParser, (req, res)=>{
  const {username, password} = req.body;
  delete req.body;

  User.findOne({username})
    .then(user=>{
      if(!user){
        return res.status(400).json({
          msg: 'No username',
          reason: 'Please include a username'
        });
      }

      if(!password){
        return res.status(400).json({
          msg: 'No password',
          reason: 'Please include a password'
        });
      }

      if (!user.compareHash(password)){
        return res.status(400).json({
          msg: 'Usernmane or password is incorrect',
          reason: 'Usernmane or password is incorrect'
        });
      }

      token.sign(user).then(token=>res.json({token}));
    })
    .catch(err=>{
      res.status(500).json({
        msg: 'There was an error with the server or database',
        reason: err
      });
    });
});

router.get('/verify', ensureAuth, (req, res)=>{
  res.status(200).send({success: true});
});

module.exports = router;
