const Image = require( '../models/image' );
const assert = require( 'chai' ).assert;

describe('Image Model', ()=>{

  it('creates a new image', done=>{
    let image = new Image({title: 'title', description: 'desc', link: 'url'});
    assert.equal(image.title, 'title');
    assert.equal(image.description, 'desc');
    assert.equal(image.link, 'url');
    done();
  });

  it('errors with no image title', done=>{
    let image = new Image();
    image.validate(err=>{
      if(!err) done('image title is required');
      else done();
    });
  });

  it('errors with no image description', done=>{
    let image = new Image();
    image.validate(err=>{
      if(!err) done('image description is required');
      else done();
    });
  });

  it('errors with no image link', done=>{
    let image = new Image();
    image.validate(err=>{
      if(!err) done('image link is required');
      else done();
    });
  });

});