const jwt = require('jsonwebtoken');
const sekrit = process.env.APP_SECRET || 'temp secret';

module.exports = {
  sign (user){
    return new Promise((resolve, reject)=>{
      jwt.sign({
        id: user.id,
        roles: user.roles
      }, sekrit, {expiresIn: '30 days'}, (err, token)=>{
        if (err) return reject(err);
        resolve({token, id: user._id});
      });
    });
  },

  verify (token){
    return new Promise((resolve, reject)=>{
      jwt.verify(token, sekrit, (err, payload)=>{
        if (err) return reject(err);
        resolve(payload);
      });
    });
  }
};
