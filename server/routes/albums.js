const express = require('express');
const bodyParser = require('body-parser').json();
const Album = require('../models/album');
const Image = require('../models/image');
const router = express.Router();

module.exports = router

// Lists out the users albums
  .get('/:userId', (req, res, next)=>{
    Album.findByUser(req.params.userId)
      .then(albums=>res.send(albums))
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

  .post('/:userId', bodyParser, (req, res, next)=>{
    req.body.user = req.params.userId;
    new Album(req.body).save()
      .then(saved=>res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next)=>{
    Album.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
      .then(updated=>res.send(updated))
      .catch(next);
  })

  .delete('/:id', (req, res, next)=>{
    Image.find({album: req.params.id}).remove()
      .then(()=>{
        return Album.findByIdAndRemove(req.params.id);
      })
      .then(deleted=>res.send(deleted))
      .catch(next);
  });
