const express = require('express');
const app = module.exports = express();
const morgan = require('morgan');
const images = require('../routes/images');
const albums = require('../routes/albums');
const auth = require('../routes/auth');
const ensureAuth = require('./ensureAuth');
const cors = require('./cors')('*');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(cors);

// api routes
app.use('/api', auth);
app.use('/api/images', ensureAuth, images);
app.use('/api/albums', ensureAuth, albums);

// eslint-disable-next-line
app.use((err, req, res, next)=>{
  res.status(err.code || 500)
    .send({
      error: err.error || err.message || err
    });
});
