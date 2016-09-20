const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const album = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, {timestamps: true});

album.statics.findByUser = function (userId) {
  return this.find({user: userId})
    //.sort({createdAt: -1})
    .then(albums => {
      //if (!albums) throw {status: 400, message: 'No albums found.'};
      return albums;
    });
};

module.exports = mongoose.model('Album', album);
