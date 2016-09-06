const express = require('express');
const app = module.exports = express();
const morgan = require('morgan');
const images = require('./routes/images');
const albums = require('./routes/albums');
const auth = require('./routes/auth');
const ensureAuth = require('./ensureAuth');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

//TODO: export this function into a seperate file
app.use((req, res, next)=>{
  const url = '*';
  res.header('Access-Control-Allow-Origin', url);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//TODO organize auth related files in their own folder
app.use('/api', auth);
app.use('/api/images', /*ensureAuth,*/ images);
app.use('/api/albums', /*ensureAuth,*/ albums);

// eslint-disable-next-line
app.use((err, req, res, next)=>{
  res.status(err.code || 500)
    .send({
      error: err.error || err.message || err
    });
});
