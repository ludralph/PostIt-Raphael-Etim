import expect from 'expect';
import supertest from 'supertest';
import Users from '../models/user';
import Group from '../models/group';
import UsersGroup from '../models/usersgroup';
import Messages from '../models/message';
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
      Users.create({ name: 'Ralph', username: 'Ralph', email: 'ralph@gmail.com', password: 'ralph' })
        .then((user) => {
          if (user) {
            expect('Ralph').toBe(user.dataValues.username);
            expect('ralph@gmail.com').toBe(user.dataValues.email);
          }
          done();
        }).catch((err) => { done(err); });
    });
  }, 10000);
});

