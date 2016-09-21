/* globals angular, chai */

const {assert} = chai;

describe('album service', ()=>{
  let $httpBackend = null, albumService = null;

  beforeEach(
      angular.mock.module('services', {apiUrl: '/api'})
  );

  beforeEach(angular.mock.inject((_albumService_, _$httpBackend_)=>{
    $httpBackend = _$httpBackend_;
    albumService = _albumService_;
  }));

  afterEach(()=>{
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('Retrives a users albums', done=>{
    const albums = ['test', 'test1', 'test2'];
    const userId = '123';

    $httpBackend
      .expectGET( `/api/albums/${userId}` )
      .respond(albums);

    albumService.getByUser(userId)
      .then(allAlbums=>{
        assert.deepEqual(allAlbums, albums);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('POSTs a new album', done=>{
    const newAlbum = {title: 'Title', user: '123'};
    const mockResponse = {__v: 0, title: 'Title', user: '123'};
    const userId = '123';

    $httpBackend
      .expectPOST(`/api/albums/${userId}`, newAlbum)
      .respond(mockResponse);

    albumService.add(newAlbum)
      .then(addedAlbum=>{
        assert.deepEqual(addedAlbum, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('DELETEs an album', done=>{
    const album = {_id: '123', title: 'Title'};
    const mockResponse = {__v: 0, title: 'Title'};

    $httpBackend
      .expectDELETE(`/api/albums/${album._id}`)
      .respond(mockResponse);

    albumService.remove(album._id)
      .then(removedAlbum=>{
        assert.deepEqual(removedAlbum, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('Updates an album', done=>{
    const albumToUpdate = {_id: '123', title: 'Updated'};
    const mockResponse = {__v: 0, title: 'Updated'};
    const albumId = albumToUpdate._id;

    $httpBackend
      .expectPUT(`/api/albums/${albumId}`, albumToUpdate)
      .respond(mockResponse);

    albumService.update(albumToUpdate)
      .then(updatedAlbum=>{
        assert.deepEqual(updatedAlbum, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

});
