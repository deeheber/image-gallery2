const express = require('express');
const bodyParser = require('body-parser').json();
const Album = require('../models/album');
const Image = require('../models/image');
const router = express.Router();

module.exports = router

  .get('/', (req, res, next)=>{
    Album.find()
      .then(albums=>res.send(albums))
      .catch(next);
  })

  // GET single album object by id
  .get('/:id', (req, res, next)=>{
    Album.findById(req.params.id)
      .then(album=>res.send(album))
      .catch(next);
  })

  // GET album name and containing images
  .get('/:id/content', (req, res, next)=>{
    return Promise.all([
      Album.findById(req.params.id),
      Image.find({album: req.params.id})
    ])
    .then(albumContents=>res.send(albumContents))
    .catch(next);
  })

  .post('/', bodyParser, (req, res, next)=>{
    new Album(req.body).save()
      .then(saved=>res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next)=>{
    Album.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updated=>res.send(updated))
      .catch(next);
  })

  //TODO: function to make sure the album exists
  .delete('/:id', (req, res, next)=>{
    //remove all images in the album
    Image.find({album: req.params.id}).remove()
      .then(()=>{
        //delete the album
        return Album.findByIdAndRemove(req.params.id);
      })
      .then(deleted=>res.send(deleted))
      .catch(next);
  });
