/* globals angular, chai */

const {assert} = chai;

describe('image service', ()=>{
  let $httpBackend = null, imageService = null;

  beforeEach(
      angular.mock.module('services', {apiUrl: '/api'})
  );

  beforeEach(angular.mock.inject((_imageService_, _$httpBackend_)=>{
    $httpBackend = _$httpBackend_;
    imageService = _imageService_;
  }));

  afterEach(()=>{
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('GETs all images with a specific album id', done=>{
    const images = ['test', 'test1', 'test2'];
    const albumId = '123';

    $httpBackend
      .expectGET('/api/albums/123/content')
      .respond(images);

    imageService.getAlbumContent(albumId)
      .then(allImages=>{
        assert.deepEqual(allImages, images);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('POSTs a new image', done=>{
    const newImage = {title: 'Title', description: 'Description', link: 'bomb.com'};
    const mockResponse = {__v: 0, title: 'Title', description: 'Description', link: 'bomb.com'};
    const userId = '123';

    $httpBackend
      .expectPOST(`/api/images/${userId}`, newImage)
      .respond(mockResponse);

    imageService.add(newImage, userId)
      .then(addedImage=>{
        assert.deepEqual(addedImage, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('removes an image', done=>{
    const imageToDelete = {_id: '123', title: 'Title', description: 'Description', link: 'bomb.com'};
    const mockResponse = {__v: 0, title: 'Title', description: 'Description', link: 'bomb.com'};

    $httpBackend
      .expectDELETE(`/api/images/${imageToDelete._id}`)
      .respond(mockResponse);

    imageService.remove(imageToDelete)
      .then(deletedImage=>{
        assert.deepEqual(deletedImage, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('Updates an image', done=>{
    const imageToUpdate = {_id: '123', title: 'Updated'};
    const mockResponse = {__v: 0, title: 'Updated'};
    const imageId = imageToUpdate._id;

    $httpBackend
      .expectPUT(`/api/images/${imageId}`, imageToUpdate)
      .respond(mockResponse);

    imageService.update(imageToUpdate)
      .then(updatedImage=>{
        assert.deepEqual(updatedImage, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });
});
