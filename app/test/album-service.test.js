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

  it('GETs all albums', done=>{
    const albums = ['test', 'test1', 'test2'];

    $httpBackend
      .expectGET( '/api/albums' )
      .respond(albums);

    albumService.getAll()
      .then(allAlbums=>{
        assert.deepEqual(allAlbums, albums);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

  it('POSTs a new album', done=>{
    const newAlbum = {title: 'Title'};
    const mockResponse = {__v: 0, title: 'Title'};

    $httpBackend
      .expectPOST('/api/albums', newAlbum)
      .respond(mockResponse);

    albumService.add(newAlbum)
      .then(addedAlbum=>{
        assert.deepEqual(addedAlbum, mockResponse);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

});
