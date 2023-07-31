module.exports = {
  beforeEach: (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:5000/#/login')
      .waitForElementVisible('body')
      .setValue('input#username', 'testuser')
      .setValue('input#password', 'userpassword')
      .click('button#login');
  },
  'user can create a group': (client) => {
    client
      .url('http://localhost:5000/#/messageboard')
      .waitForElementPresent('.welcome-page')
      .click('a.modal-trigger')
      .setValue('input#name', 'ran')
      .click('.modal-footer')
      .assert.containsText('span#name-error', 'Group Name is too short'
      + ' (min of 5 characters')
      .clearValue('input#name')
      .setValue('input#name', 'Random')
      .click('button#save-group')
      .pause(1000)
      .assert.elementPresent('a#random')
      .end();
  },
  'user can edit a group name': (client) => {
    client
      .url('http://localhost:5000/#/messageboard')
      .waitForElementVisible('a#random')
      .click('a#random')
      .assert.urlContains('http://localhost:5000/#/messageboard/group')
      .click('a#edit-group')
      .waitForElementVisible('.modal-content')
      .setValue('input#name', ' Group')
      .click('button#save-group')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'Group updated successfully')
      .assert.containsText('a#random-group', 'Random Group')
      .end();
  },
  'user can add another user to a group': (client) => {
    client
      .url('http://localhost:5000/#/messageboard')
      .waitForElementVisible('a#random-group')
      .click('a#random-group')
      .click('a#add-user')
      .assert.urlContains('members')
      .assert.containsText('.group-members ul > :first-child', 'testuser')
      .setValue('input#search', 'anotheruser')
      .click('button#search')
      .waitForElementVisible('ul#search-results')
      .click('a.non-members')
      .waitForElementVisible('.toast-message')
      .assert.containsText('.toast-message', 'User Added Successfully')
      .assert.containsText('.group-members ul > :nth-child(2)', 'anotheruser')
      .end();
  }
};
