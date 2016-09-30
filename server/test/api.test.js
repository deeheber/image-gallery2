const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;
chai.use(chaiHttp);

const connection = require('../setup-mongoose');
const app = require('../app');

describe('api end to end', ()=>{
  // clears out the db
  before(done => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  const request = chai.request(app);

  const testUser = {
    email: 'testuseremail@email.com',
    username: 'testUser',
    password: 'abc'
  };

  let token = '';

  describe('User creation/auth', ()=>{

    it('creates a new user and generates a token', done=>{
      request.post('/api/signup')
        .send(testUser)
        .then(res => {
          testUser._id = res.body.auth.id;
          token = res.body.auth.token;

          assert.ok(res.body.auth.id);
          assert.ok(res.body.auth.token);
          done();
        })
        .catch(done);
    });

    it('permits signin with correct username/password', done=>{
      request.post('/api/signin')
        .send({ username: testUser.username, password: testUser.password })
        .then(res => {
          
          assert.ok(res.body.auth.id);
          assert.ok(res.body.auth.token);
          done();
        })
        .catch(done);
    });

    it('errors on signin with incorrect username', done=>{
      request.post('/api/signin')
        .send({ username: 'fake user', password: testUser.password })
        .then(res => done('status should not be 200'))
        .catch(res=>{
          assert.equal(res.status, 400);
          done();
        })
        .catch(done);
    });

    it('errors with incorrect password', done=>{
      request.post('/api/signin')
        .send({ username: testUser.username, password: 'fake password' })
        .then(res => done('status should not be 200'))
        .catch(res=>{
          assert.equal(res.status, 400);
          done();
        })
        .catch(done);
    });

    it('errors when signing up using a username that exists in the system', done=>{
      request.post('/api/signup')
        .send({ email: 'testemail@email.com', username: 'testUser', password: '123'})
        .then(res => done('status should not be 200'))
        .catch(res=>{
          assert.equal(res.status, 500);
          done();
        })
        .catch(done);
    });

  });

  // describe('album CRUD', ()=>{

  // });

  // describe('image CRUD', ()=>{

  // });

  // closes db connection
  after(done=> {
    connection.close();
    done();
  });

});