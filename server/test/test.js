/* eslint linebreak-style: ['error', 'windows']*/

'esversion: 6';

import expect from 'expect';
import supertest from 'supertest';
import Users from '../models/users';
import Group from '../models/group';
import GroupMembers from '../models/groupMembers';
import Messages from '../models/messages';
import index from '../index';


const request = supertest(index);


// TESTING all the models used in the application
// TESTING all the models used in the application
describe('Model test suite', () => {
  beforeEach((done) => {
    Users.destroy({ where: {} }, { truncate: true }).then((destroyed) => {
      if (destroyed) {
        console.log('Done deleting');
      }
      done();
    });
  });
  it('I should be able to create a new user with this model', (done) => {
    Users.sync({ force: true }).then(() => {
      Users.create({ name: 'Ralph', username: 'Ralp', email: 'ralph@gmail.com', password: 'hellotest' })
        .then((user) => {
          if (user) {
            expect('Ralph').toBe(user.dataValues.username);
            expect('raphael@gmail.com').toBe(user.dataValues.email);
          }
          done();
        }).catch((err) => { done(err); });
    });
  }, 10000);
  it('I should be able to create a new group with this model', (done) => {
    Group.sync({ force: true }).then(() => {
      Group.create({ groupName: 'Man United', description: 'Class of 2015', userId: 1 })
        .then((group) => {
          expect('Zikites').toNotBe('Zike');
          expect('Class of 2015').toBe(group.dataValues.description);
          expect(group.dataValues.userId.toString()).toBe('1');
          done();
        });
    }).catch((err) => { done(err); });
  }, 10000);
  it('I should be able to add users to group I created', (done) => {
    GroupMembers.sync({ force: true }).then(() => {
      GroupMembers.create({ userId: 1, admin: 1, groupId: 1 })
        .then((members) => {
          expect(members.dataValues.userId.toString()).toBe('1');
          expect(members.dataValues.admin.toString()).toBe('1');
          expect(members.dataValues.groupId.toString()).toBe('1');
          done();
        });
    }).catch((err) => {
      done(err);
    });
  }, 10000);
  it('I should be able to post message to groups with this model', (done) => {
    Messages.sync({ force: true }).then(() => {
      Messages.create({ message: 'I knew it will happened', userId: 1, groupId: 1 })
        .then((message) => {
          expect(message.dataValues.message).toBe('I knew it will happened');
          expect(message.dataValues.userId.toString()).toBe('1');
          expect(message.dataValues.groupId.toString()).toBe('1');
          done();
        });
    }).catch((err) => { done(err); });
  }, 10000);
});


describe('ROUTE TESTING ', () => {
  beforeEach((done) => {
    Users.destroy({ where: {} }, { truncate: true }).then((destroyed) => {
      if (destroyed) {
        console.log('Done deleting');
      }
      done();
    });
  });
  describe('SIGNUP', () => {
    it('Should not be able to create a new account without any field', (done) => {
      request.post('/api/signup')
        .send({ username: 'Kenet', email: 'jyyyu@gmail.com', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('name, username, email and password fields are required').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account without any empty input fields', (done) => {
      request.post('/api/signup')
        .send({ name: 'Eze', username: '', email: 'jyyyu@gmail.com', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('name, username, email, and password fields needs not be empty ').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should be able to create a new account', (done) => {
      request.post('/api/signup')
        .send({ name: 'Eze', username: 'Kenet', email: 'jyyyu@gmail.com', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('success').toBe(res.body.status);
          expect('Account created').toBe(res.body.message);
          expect('Jane').toNotBe(res.body.data.name);
          expect('Kenet').toBe(res.body.data.username);
          done(err);
        });
    }, 10000);
    it('Should not be able to create account with existing records', (done) => {
      request.post('/api/signup')
        .send({ name: 'Eze', username: 'Kenet', email: 'jyyyu@gmail.com', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('Record exists already').toBe(res.body.message);
          done(err);
        });
    }, 10000);
  });
  describe('SIGNIN AND PERFORM OPERATIONS', () => {
    let userId;
    let token;
    let groupId;
    it('Should not be able to login with a missing field', (done) => {
      request.post('/api/signin')
        .send({ password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('Username and password fields are required').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to login with empty input fields', (done) => {
      request.post('/api/signin')
        .send({ username: '', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('Username or password field must not be empty').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should be able to login to account created', (done) => {
      request.post('/api/signin')
        .send({ username: 'Kenet', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          token = res.body.token;
          userId = res.body.data.id;
          expect(res.body.status).toBe('Success');
          expect(res.body.data.username).toBe('Kenet');
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
    it('Should not be able to create group with missing fields', (done) => {
      request.post('/api/group')
      .set('x-access-token', token)
      .send({ description: 'Full stack with js', userId })
      .expect(200)
      .end((err, res) => {
        expect('groupName, description and userId fields are required').toBe(res.body.message);
        done();
      });
    }, 16000);
    it('Should not be able to create group with empty input fields', (done) => {
      request.post('/api/group')
      .set('x-access-token', token)
      .send({ groupName: '', description: 'Full stack with js', userId })
      .expect(200)
      .end((err, res) => {
        expect('groupName, description, and userId fields should not be empty').toBe(res.body.message);
        done();
      });
    }, 16000);
    it('Should be able to create group by registered user', (done) => {
      request.post('/api/group')
      .set('x-access-token', token)
      .send({ groupName: 'Andela21', description: 'Full stack with js', userId })
      .expect(200)
      .end((err, res) => {
        groupId = res.body.data.id;
        expect('success').toBe(res.body.status);
        expect('Group Created').toBe(res.body.message);
        done();
      });
    }, 16000);
    it('Should not be able to create group with same groupName', (done) => {
      request.post('/api/group')
      .set('x-access-token', token)
      .send({ groupName: 'Andela21', description: 'Full stack with js', userId })
      .expect(200)
      .end((err, res) => {
        expect('Invalid input. groupName exists already or userId does not exist').toBe(res.body.status);
        done();
      });
    }, 16000);
    it('Should not be able to add a user with missing input fields', (done) => {
      request.post(`/api/group/${groupId}/user`)
      .set('x-access-token', token)
      .send({ userId })
      .expect(200)
      .end((err, res) => {
        expect('userId and admin fields are required').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should not be able to add a user with empty input fields', (done) => {
      request.post(`/api/group/${groupId}/user`)
      .set('x-access-token', token)
      .send({ admin: '', userId })
      .expect(200)
      .end((err, res) => {
        expect('userId and admin fields should not be empty').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should be able to add a user to groups', (done) => {
      request.post(`/api/group/${groupId}/user`)
      .set('x-access-token', token)
      .send({ admin: 1, userId })
      .expect(200)
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('User added').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should not be able to post message with missing input fields', (done) => {
      request.post(`/api/group/${groupId}/messages`)
      .set('x-access-token', token)
      .expect(200)
      .send({ priority: 'Normal', userId })
      .end((err, res) => {
        expect('message, priority and userId fields are required').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should not be able to post message with empty input fields', (done) => {
      request.post(`/api/group/${groupId}/messages`)
      .set('x-access-token', token)
      .expect(200)
      .send({ message: '', priority: 'Normal', userId })
      .end((err, res) => {
        expect('message, priority and userId need not be empty').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should be able to post message to created group', (done) => {
      request.post(`/api/group/${groupId}/messages`)
      .set('x-access-token', token)
      .expect(200)
      .send({ message: 'Its working', priority: 'Normal', userId })
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('Message sent').toBe(res.body.message);
        expect(userId).toBe(res.body.data.userId);
        expect('Normal').toBe(res.body.data.priority);
        expect('Its working').toBe(res.body.data.message);
        done();
      });
    }, 10000);
    it('Should be able to post another message to group', (done) => {
      request.post(`/api/group/${groupId}/messages`)
      .set('x-access-token', token)
      .expect(200)
      .send({ message: 'Its pretty cool we consider React in this project', priority: 'Normal', userId })
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('Message sent').toBe(res.body.message);
        expect(userId).toBe(res.body.data.userId);
        expect('Normal').toBe(res.body.data.priority);
        expect('Its pretty cool we consider React in this project').toBe(res.body.data.message);
        done();
      });
    }, 10000);
    it('Should be able to get messages in a particular group', (done) => {
      request.get(`/api/group/${groupId}/messages`)
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        expect('Its working').toBe(res.body.data[0].message);
        expect('Its pretty cool we consider React in this project').toBe(res.body.data[1].message);
        expect('Normal').toBe(res.body.data[0].priority);
        expect(groupId).toBe(res.body.data[0].groupId);
        expect(userId).toBe(res.body.data[0].userId);
        done();
      });
    }, 1000);
  });
});
