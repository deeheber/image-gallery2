const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
chai.use(chaiHttp);

const connection = require('../setup-mongoose');
const app = require('../app');

describe('api end to end', ()=>{
  // clears out the db
  before(done=>{
    const drop = ()=>connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  const request = chai.request(app);

  const testUser = {
    email: 'testuseremail@email.com',
    username: 'testUser',
    password: 'abc'
  };

  const testAlbum = {
    title: 'This is a test album'
  };

  const testImage = {
    title: 'test',
    description: 'desc',
    link: 'www.somthing.com'
  };

  let token = '';

  describe('User creation/auth', ()=>{

    it('creates a new user and generates a token', done=>{
      request.post('/api/signup')
        .send(testUser)
        .then(res=>{
          testUser._id = res.body.auth.id;

          assert.ok(res.body.auth.id);
          assert.ok(res.body.auth.token);
          done();
        })
        .catch(done);
    });

    it('permits signin with correct username/password', done=>{
      request.post('/api/signin')
        .send({ username: testUser.username, password: testUser.password })
        .then(res=>{
          token = res.body.auth.token;
          
          assert.ok(res.body.auth.id);
          assert.ok(res.body.auth.token);
          done();
        })
        .catch(done);
    });

    it('errors on signin with incorrect username', done=>{
      request.post('/api/signin')
        .send({ username: 'fake user', password: testUser.password })
        .then(()=> done('status should not be 200'))
        .catch(res=>{
          assert.equal(res.status, 400);
          done();
        })
        .catch(done);
    });

    it('errors with incorrect password', done=>{
      request.post('/api/signin')
        .send({ username: testUser.username, password: 'fake password' })
        .then(()=> done('status should not be 200'))
        .catch(res=>{
          assert.equal(res.status, 400);
          done();
        })
        .catch(done);
    });

    it('errors when signing up using a username that exists in the system', done=>{
      request.post('/api/signup')
        .send({ email: 'testemail@email.com', username: 'testUser', password: '123'})
        .then(()=> done('status should not be 200'))
        .catch(res=>{
          assert.equal(res.status, 500);
          done();
        })
        .catch(done);
    });

    describe('album CRUD', ()=>{

      it('adds an album', done=>{
        request.post(`/api/albums/${testUser._id}`)
          .set({Authorization: token})
          .send(testAlbum)
          .then(res=>{
            testAlbum.__v = 0;
            testAlbum.updatedAt = res.body.updatedAt;
            testAlbum.createdAt = res.body.createdAt;
            testAlbum._id = res.body._id;
            testAlbum.user = res.body.user;

            assert.equal(res.body.user, testUser._id);
            assert.equal(res.body.title, testAlbum.title);
            done();
          })
          .catch(done);
      });

      it('lists albums owned by testUser', done=>{
        request.get(`/api/albums/${testUser._id}`)
          .set({Authorization: token})
          .then(res=>{
            assert.deepEqual(res.body[0], testAlbum);
            done();
          })
          .catch(done);
      });

      it('updates the album name', done=>{
        request.put(`/api/albums/${testAlbum._id}`)
          .set({Authorization: token})
          .send({title: 'Updated title'})
          .then(res=>{
            console.log(res.body.title);
            assert.equal(res.body.title, 'Updated title');
            done();
          })
          .catch(done);
      });

      it('deletes the album', done=>{
        request.delete(`/api/albums/${testAlbum._id}`)
          .set({Authorization: token})
          .then(res=>{
            assert.equal(res.body._id, testAlbum._id);
            done();
          })
          .catch(done);
      });

    });

    describe('image create/update/delete', ()=>{

      it('creates a new image', done=>{
        request.post(`/api/images/${testUser._id}`)
          .set({Authorization: token})
          .send(testImage)
          .then(res=>{
            testImage._id = res.body._id;
            testImage.user = res.body.user;
            testImage.updatedAt = res.body.updatedAt;
            testImage.createdAt = res.body.createdAt;
            testImage.__v = 0;
  
            assert.deepEqual(res.body, testImage);
            done();
          })
          .catch(done);
      });

      it('updates testImage title', done=>{
        request.put(`/api/images/${testImage._id}`)
          .set({Authorization: token})
          .send({title: 'hello world'})
          .then(res=>{
            testImage.title = res.body.title;
            assert.equal(res.body.title, 'hello world');
            done();
          })
          .catch(done);
      });

      it('deletes testImage', done=>{
        request.delete(`/api/images/${testImage._id}`)
          .set({Authorization: token})
          .then(res=>{
            assert.equal(res.body.title, testImage.title);
            assert.equal(res.body.description, testImage.description);
            assert.equal(res.body.link, testImage.link);
            done();
          })
          .catch(done);
      });
      
    });

  });

  // closes db connection
  after(done=> {
    connection.close();
    done();
  });

});