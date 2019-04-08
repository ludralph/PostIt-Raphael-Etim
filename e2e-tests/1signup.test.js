module.exports = {
  beforeEach: (client) => {
    client
      .resizeWindow(1280, 800);
  },
  'user can\'t signup with invalid credentials': (client) => {
    client
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .setValue('input#email', 'testuser')
      .setValue('input#username', 'tes')
      .setValue('input#password', 'myPassword')
      .setValue('input#confirmpassword', 'mypassword')
      .click('button#create-account')
      .waitForElementVisible('span')
      .assert.containsText('#email-error', 'Email is Invalid')
      .assert.containsText('#username-error', 'Username is too short'
      + ' (min of 5 characters).')
      .assert.containsText('#confirmpassword-error', 'Passwords do not match')
      .end();
  },
  'user can signup successfully with valid credentials':
    (client) => {
      client
        .url('http://localhost:5000')
        .waitForElementVisible('body')
        .setValue('input#email', 'testuser@gmail.com')
        .setValue('input#username', 'testuser')
        .setValue('input#password', 'userpassword')
        .setValue('input#confirmpassword', 'userpassword')
        .click('button#create-account')
        .waitForElementPresent('.welcome-page')
        .assert.urlEquals('http://localhost:5000/#/messageboard')
        .end();
    },
  'user can logout after signing up': (client) => {
    client
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .setValue('input#email', 'anotheruser@gmail.com')
      .setValue('input#username', 'anotheruser')
      .setValue('input#password', 'userpassword')
      .setValue('input#confirmpassword', 'userpassword')
      .click('button#create-account')
      .waitForElementPresent('.welcome-page')
      .assert.urlEquals('http://localhost:5000/#/messageboard')
      .click('a#logout-button')
      .assert.urlEquals('http://localhost:5000/#/login')
      .end();
  },
  'user can\'t signup with already existing email': (client) => {
    client
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .setValue('input#email', 'testuser@gmail.com')
      .setValue('input#username', 'testuser001')
      .setValue('input#password', 'testuser')
      .setValue('input#confirmpassword', 'testuser')
      .click('button#create-account')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Email taken already.'
      + ' Please use another one')
      .end();
  },
  'user can\'t signup with already existing username': (client) => {
    client
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .setValue('input#email', 'testuser1@gmail.com')
      .setValue('input#username', 'testuser')
      .setValue('input#password', 'testuser')
      .setValue('input#confirmpassword', 'testuser')
      .click('button#create-account')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Username taken already.'
      + ' Please use another one')
      .end();
  }
};
