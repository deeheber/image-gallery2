/* globals angular, chai */

const {assert} = chai;

describe('update image form', ()=>{

  beforeEach(angular.mock.module('components'));

  let $component;
  beforeEach(angular.mock.inject($componentController=>{
    $component = $componentController;
  }));

  it('initializes with an empty image', ()=>{
    const component = $component('addImageForm');
    assert.deepEqual(component.image, {});
  });

  it('passes form data to update function', ()=>{
    let imageUpdate = null;
    const update = image=>{
      imageUpdate = image;
    };
    const info = {_id: '123', title: 'title', description: 'description', link: 'link', album: '123'};

    const component = $component('updateImageForm', null, {update, info});
    component.image.title = 'test1';

    component.submit();
    assert.deepEqual(imageUpdate, {title: 'test1', _id: '123', album: '123'});
  });

  it('errors when form is empty', ()=>{
    const info = {_id: '123', title: 'title'};

    const component = $component('updateImageForm', null, {info});
    component.image.title = '';
    component.image.description = '';
    component.image.link = '';

    component.submit();
    assert.equal(component.isInvalid, true);
  });

  it('errors when same title is added to form', ()=>{
    const info = {_id: '123', title: 'stuff', description: '1', link: '2'};

    const component = $component('updateImageForm', null, {info});
    component.image.title = 'stuff';

    component.submit();
    assert.equal(component.isInvalid, true);
  });

});
