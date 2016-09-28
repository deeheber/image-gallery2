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

    // it('permits signin with correct username/password', ()=>{

    // });

    // it('errors with incorrect username', ()=>{

    // });

    // it('errors with incorrect password', ()=>{

    // });

    // it('errors when signing up using an email that exists in the system', ()=>{

    // });

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