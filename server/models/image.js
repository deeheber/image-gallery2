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


image.statics.findByUser = function (userId) {
  return this.find({user: userId})
    .sort({createdAt: -1})
    .then(images => {
      //if (!images) throw {status: 400, message: 'No images found.'};
      return images;
    });
};

module.exports = mongoose.model('Image', image);
