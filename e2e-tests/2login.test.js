module.exports = {
  beforeEach: (client) => {
    client
      .resizeWindow(1280, 800);
  },
  'user can\'t signin without a username and password': (client) => {
    client
      .url('http://localhost:5000/#/login')
      .waitForElementVisible('body')
      .click('button#login')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Please provide a username'
      + ' and password')
      .waitForElementNotPresent('.toast-message')
      .setValue('input#username', 'testuser')
      .click('button#login')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Please provide a username'
      + ' and password')
      .end();
  },
  'user can\'t signin with wrong credentials': (client) => {
    client
      .url('http://localhost:5000/#/login')
      .waitForElementVisible('body')
      .setValue('input#username', 'testuser')
      .setValue('input#password', 'test')
      .click('button#login')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Password is incorrect')
      .end();
  },
  'user can signin with valid credentials and logout': (client) => {
    client
      .url('http://localhost:5000/#/login')
      .waitForElementVisible('body')
      .setValue('input#username', 'testuser')
      .setValue('input#password', 'userpassword')
      .click('button#login')
      .waitForElementPresent('.welcome-page')
      .assert.urlEquals('http://localhost:5000/#/messageboard')
      .click('a#logout-button')
      .assert.urlEquals('http://localhost:5000/#/login')
      .end();
  },
  'user can\'t access messageboard without being authenticated': (client) => {
    client
      .url('http://localhost:5000/#/messageboard')
      .assert.urlEquals('http://localhost:5000/#/login')
      .end();
  }
};
