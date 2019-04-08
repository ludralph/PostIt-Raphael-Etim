module.exports = {
  'user can post a message to a group': (client) => {
    client
      .resizeWindow(1280, 800)
      .url('http://localhost:5000/#/login')
      .waitForElementVisible('body', 1000)
      .setValue('input#username', 'testuser')
      .setValue('input#password', 'userpassword')
      .click('button#login')
      .waitForElementVisible('.welcome-page')
      .assert.urlEquals('http://localhost:5000/#/messageboard')
      .waitForElementVisible('a#random-group')
      .click('a#random-group')
      .setValue('textarea#message', 'My first Message')
      .setValue('select#message-priority', 'Normal')
      .click('button#send')
      .waitForElementVisible('.single-msg')
      .assert.containsText('.msg-heading', 'testuser')
      .assert.containsText('.single-msg div > :nth-child(3)',
        'My first Message')
      .end();
  }
};
