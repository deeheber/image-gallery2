const Album = require( '../models/album' );
const assert = require( 'chai' ).assert;

describe('Album Model', ()=>{

  it('errors with no album title', done=>{
    let album = new Album();
    album.validate(err=>{
      if(!err) done('album title is required');
      else done();
    });
  });

  it('creates a new album', done=>{
    let album = new Album({title: 'Title'});
    assert.equal(album.title, 'Title');
    done();
  });

});