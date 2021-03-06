import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import { firstUserToken } from '../helpers/seedData';
import { transporter } from '../../../server/utils/nodemailer';

describe('Signup Endpoint', () => {
  it('should create a new user and return a token if signup is successful',
    (done) => {
      request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'ludralph',
        email: 'ludralph@gmail.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.all.deep.keys('message', 'user', 'token');
        expect(res.body.user.name).to.equal('ludralph');
        expect(res.body.user.email).to.equal('ludralph@gmail.com');
        done();
      });
    });

  it('should require username before signup.', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        email: 'raphaelumoh@gmail.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Username is required');
        done();
      });
  });

  it('should require password before signup.', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'raphael',
        email: 'raphaelumoh@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Password is required');
        done();
      });
  });

  it('should require email before signup.', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'raphael',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email is required');
        done();
      });
  });

  it('should not create user with the same username.', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'raphael123',
        email: 'raphaelumoh@gmail.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to
        .equal('Email taken already. Please use another one.');
        done();
      });
  });

  it('should not create user with the same email address.', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'raphael',
        email: 'raphaelumoh@gmail.com',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to
        .equal('Username taken already. Please use another one.');
        done();
      });
  });

  it('should not create user with an invalid email address.', (done) => {
    request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send({
        username: 'user123',
        email: 'user',
        password: 'user1234',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Email is Invalid');
        done();
      });
  });
});

describe('Signin Endpoint ', () => {
  it('should allow existing user to sign in and return a token', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send({
        username: 'raphael',
        password: 'password123',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.deep.keys('message', 'user', 'token');
        expect(res.body.user.name).to.equal('raphael');
        expect(res.body.user.email).to.equal('raphaelumoh@gmail.com');
        done();
      });
  });

  it('should require username and password before signin', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send({
        username: '',
        password: '',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to
        .equal('Please provide a username and password');
        done();
      });
  });

  it('should not signin if username does not exist', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send({
        username: 'anonymous',
        password: 'user12345',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('User not found');
        done();
      });
  });

  it('should not signin if password is incorrect', (done) => {
    request(app)
      .post('/api/v1/signin')
      .set('Accept', 'application/json')
      .send({
        username: 'raphael',
        password: 'pasword123',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Password is incorrect');
        done();
      });
  });
});

describe('FORGOT PASSWORD ', () => {
  it('should send a mail if email address exists in the database', (done) => {
    transporter.sendMail = () => Promise.resolve(1);
    request(app)
      .put('/api/v1/forgotpassword')
      .set('Accept', 'application/json')
      .send({
        email: 'raphaelumoh@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('An email has been sent to raphaelumoh@gmail.com with further instructions.');
        done();
      });
  });

  it('should  not send forgot password email if a network error occurs',
   (done) => {
     transporter.sendMail = () => Promise.reject(1);
     request(app)
      .put('/api/v1/forgotpassword')
      .set('Accept', 'application/json')
      .send({
        email: 'raphaelumoh@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.message).to
        .equal('An error occured. Please try again.');
        done();
      });
   });

  it('should not send a mail if email address does not exist in the database',
   (done) => {
     request(app)
      .put('/api/v1/forgotpassword')
      .set('Accept', 'application/json')
      .send({
        email: 'randomuser@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This email does not exist');
        done();
      });
   });
});

describe('Reset Password Endpoint ', () => {
  it('should reset password if password token is associated with a user id',
   (done) => {
     transporter.sendMail = () => Promise.resolve(1);
     request(app)
      .put('/api/v1/resetpassword/0agwAvILWEVS5xDlaTODlIImxZ5NpHBUxzDiwa2kExG7AnzK6G')
      .set('Accept', 'application/json')
      .send({
        password: 'goodrecover',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Password Reset Successful');
        done();
      });
   });

  it('should not reset user password if a network error occurs', (done) => {
    transporter.sendMail = () => Promise.reject(1);
    request(app)
      .put('/api/v1/resetpassword/2QVwcHW9OyX6SAKsJhXEgemhgqA7qHjaRCmhJ3gf0re8tSBM3X')
      .set('Accept', 'application/json')
      .send({
        password: 'networkunrecover',
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.message).to
        .equal('An error occured. Please try again.');
        done();
      });
  });

  it(`should not reset password if password token is not associated 
    with a user id`,
    (done) => {
      request(app)
      .put('/api/v1/resetpassword/justareallyreallyrandomstring')
      .set('Accept', 'application/json')
      .send({
        password: 'goodluck101',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to
        .equal('Password Reset Token is Invalid or has Expired');
        done();
      });
    });

  it('should not reset user password if a new password is not provided',
   (done) => {
     request(app)
      .put(`/api/v1/resetpassword/0agwAvILWEVS5xDlaTODlIImxZ5NpHBUxzDiwa2kExG7AnzK6G`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to
        .equal('Please provide a new password for your account');
        done();
      });
   });
});

describe('SEARCH USER', () => {
  it('should return array of users if any is found', (done) => {
    request(app)
      .get('/api/v1/search/users?searchTerm=ra&group=1&limit=3&offset=0')
      .set('authorization', firstUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.deep.keys('users', 'pagination');
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[0].username).to.equal('ludralph');
        expect(res.body.pagination).to.deep
        .include({ page: 1, pageCount: 1, pageSize: 1, totalCount: 1 });
        done();
      });
  });

  it('should search even if limit and offset not included in query', (done) => {
    request(app)
      .get('/api/v1/search/users?searchTerm=a&group=1')
      .set('authorization', firstUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.all.deep.keys('users', 'pagination');
        done();
      });
  });

  it('should not allow unregistered user to search for other users', (done) => {
    request(app)
      .get('/api/v1/search/users?q=a&group=2&limit=1&offset=0')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to
        .equal('No token provided so we can\'t authenticate you.');
        done();
      });
  });

  it('should not find any user if search query doesn\'t match any user',
   (done) => {
     request(app)
      .get('/api/v1/search/users?q=blah&group=1&limit=1&offset=0')
      .set('authorization', firstUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('No users found');
        done();
      });
   });

  it('should not search if group is not specified', (done) => {
    request(app)
      .get('/api/v1/search/users?q=t&limit=1&offset=0')
      .set('authorization', firstUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Group Not Specified');
        done();
      });
  });
});

describe('List user\'s groups endpoint ', () => {
  it('should list group user belongs to', (done) => {
    request(app)
      .get('/api/v1/user/1/groups')
      .set('authorization', firstUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should not list if user doesn\'t exist', (done) => {
    request(app)
      .get('/api/v1/user/54/groups')
      .set('authorization', firstUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User Does Not Exist');
        done();
      });
  });

  it('should return 404 if user does not belong to any group', (done) => {
    request(app)
      .get('/api/v1/user/3/groups')
      .set('authorization', firstUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('You don\'t belong to any group.');
        done();
      });
  });
});
