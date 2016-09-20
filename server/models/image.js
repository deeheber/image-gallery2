const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const image = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps: true});

module.exports = mongoose.model('Image', image);
