import { expect } from 'chai';
import request from 'supertest';
import app from '../../../server';
import db from '../../models';
import { insertSeedData, firstUserToken, secondUserToken }
  from '../helpers/seedData';

describe('To do before running test', () => {
  before((done) => {
    db.sequelize.sync({ force: true })
    .then(() => {
      insertSeedData();
      done();
    });
  });

  describe('Create Group Endpoint', () => {
    it('should allow registered user create a new group', (done) => {
      request(app)
        .post('/api/v1/group')
        .set('authorization', firstUserToken)
        .send({
          name: 'Awesome Rockstars',
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.equal(201);
          expect(res.body).to.have.all.deep.keys('message', 'group');
          expect(res.body.group.id).to.equal(2);
          expect(res.body.group.name).to.equal('Awesome Rockstars');
          expect(res.body.message).to.equal('Group Created Successfully');
          done();
        });
    });

    it('should not create group with the same name', (done) => {
      request(app)
        .post('/api/v1/group')
        .set('authorization', firstUserToken)
        .send({
          name: 'Awesome Rockstars',
        })
        .end((err, res) => {
          expect(res.body.message)
          .to.equal('Group name exists already. Please use another one.');
          done();
        });
    });

    it('should not create group if group name is not provided', (done) => {
      request(app)
        .post('/api/v1/group')
        .set('authorization', firstUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Group name is required');
          done();
        });
    });

    it('should add user creating the group to the group member\'s list',
     (done) => {
       request(app)
        .get('/api/v1/group/1/users')
        .set('authorization', firstUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].email).to.equal('raphaelumoh@gmail.com');
          expect(res.body[0].username).to.equal('raphael');
          setTimeout(done, 8000);
        });
     });

    it('should not allow unregistered user to create new group', (done) => {
      request(app)
        .post('/api/v1/group')
        .set('Accept', 'application/json')
        .send({
          name: 'Awesome Rockstars',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to
            .equal('No token provided so we can\'t authenticate you.');
          done();
        });
    });
  });

  describe('EDIT GROUP NAME API - /api/v1/group/:groupId', () => {
    it('should allow group name be changed', (done) => {
      request(app)
        .put('/api/v1/group/2')
        .set('authorization', firstUserToken)
        .send({
          name: 'Ravenclaw',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.all.deep.keys('message', 'group');
          expect(res.body.group.name).to.equal('Ravenclaw');
          expect(res.body.message).to.equal('Group updated successfully');
          done();
        });
    });

    it('should not allow group name be changed to a name that already exists',
     (done) => {
       request(app)
        .put('/api/v1/group/1')
        .set('authorization', firstUserToken)
        .send({
          name: 'Gryffindor',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to
            .equal('Group name exists already. Please use another one.');
          done();
        });
     });

    it('should not allow unregistered user to change group name', (done) => {
      request(app)
        .put('/api/v1/group/4')
        .set('Accept', 'application/json')
        .send({
          name: 'Imagine Dragons',
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to
            .equal('No token provided so we can\'t authenticate you.');
          done();
        });
    });

    it('should ensure new name is provided for the group', (done) => {
      request(app)
        .put('/api/v1/group/4')
        .set('authorization', firstUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Group name not provided');
          done();
        });
    });

    it('should not change name of group that doesn\'t exist', (done) => {
      request(app)
        .put('/api/v1/group/167')
        .set('authorization', firstUserToken)
        .send({
          name: 'Imagine Dragons',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });

    it('should not allow user not in the group to edit the group\'s name',
     (done) => {
       request(app)
        .put('/api/v1/group/1')
        .set('authorization', secondUserToken)
        .send({
          name: 'Imagine Dragons',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You don\'t belong to this group');
          done();
        });
     });
  });

  describe('GET GROUP', () => {
    it('should get group details', (done) => {
      request(app)
        .get('/api/v1/group/1')
        .set('authorization', firstUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.equal(1);
          expect(res.body.name).to.equal('Gryffindor');
          done();
        });
    });

    it('should not get details of group that doesn\'t exist', (done) => {
      request(app)
        .get('/api/v1/group/500')
        .set('authorization', firstUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });

    it('should not allow unregistered user to get group details', (done) => {
      request(app)
        .get('/api/v1/group/5')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to
            .equal('No token provided so we can\'t authenticate you.');
          done();
        });
    });
  });

  describe('ADD USER TO GROUP API ', () => {
    it('allows registered user in a group add another user to the group',
     (done) => {
       request(app)
        .post('/api/v1/group/2/user')
        .set('authorization', firstUserToken)
        .send({
          userId: 4,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User Added Successfully');
          done();
        });
     });

    it('should not allow adding a new user to a group that doesn\'t exist',
     (done) => {
       request(app)
        .post('/api/v1/group/88/user')
        .set('authorization', firstUserToken)
        .send({
          userId: 2,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
     });

    it('should not allow adding unregistered user to a group', (done) => {
      request(app)
        .post('/api/v1/group/2/user')
        .set('authorization', firstUserToken)
        .send({
          userId: 54,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('User Does Not Exist');
          done();
        });
    });

    it('should not allow a user to be added twice in a group', (done) => {
      request(app)
        .post('/api/v1/group/2/user')
        .set('authorization', firstUserToken)
        .send({
          userId: 4
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to
            .equal('User Already Exists In This Group');
          done();
        });
    });
  });

  describe('LIST GROUP\'S USERS', () => {
    it('should list users of a group that exists', (done) => {
      request(app)
        .get('/api/v1/group/2/users')
        .set('authorization', firstUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.equal('raphaelumoh@gmail.com');
          expect(res.body[1].username).to.equal('recover2');
          done();
        });
    });

    it('should not list users of group that doesn\'t exist', (done) => {
      request(app)
        .get('/api/v1/group/56/users')
        .set('authorization', firstUserToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Does Not Exist');
          done();
        });
    });
  });
});
