const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const mailOptions = (to, bcc, subject, html) => ({
  from: ' PostIt <postitapp.ralph@gmail.com>',
  to,
  bcc,
  subject,
  html,
});

const forgotPasswordMail = (url, passwordToken) => (
  `
  <div style="background:#005cb2; width: 100%; height:20%">
  <h2 style="color:#fff; padding:20px; text-align: center">PostIt Forgot Password</h2>
</div>
  <div>
  <p style="font-size:20px;">You are receiving this because you have
  requested the reset of the password for your account.
    <br>
  Please click on the link below or paste it into your
  browser to complete the processs.
    <br>
  Please note that the link is valid for 1 hour only.
    <br>
  http://${url}/#/resetpassword/${passwordToken}
    <br>
  If you did not request this, please ignore this
  email and your password will remain unchanged.
  </p>
  </div>
  <div style="background:#005cb2; width: 100%; height:20%">
  <h2 style="color:#fff; padding:20px; text-align: center">PostIt Team</h2>
</div>`
);

const resetPasswordMail = (username, url) => (
  `
  <div style="background:#005cb2; width: 100%; height:20%">
  <h2 style="color:#fff; padding:20px; text-align: center">PostIt Reset Password</h2>
</div>
  <div>
  <p style="font-size:20px;">Hello ${username},
    <br>
  Your password has been successfully changed.
    <br>
  Click <a href='http://${url}/#/login'>here</a> 
  to login
  </p>
  </div>
  <div style="background:#005cb2; width: 100%; height:20%">
  <h2 style="color:#fff; padding:20px; text-align: center">PostIt Team</h2>
</div>`
);

const msgPriorityMail = (username, groupname, url) => (
  `
    <div style="background:#005cb2; width: 100%; height:20%">
      <h2 style="color:#fff; padding:20px; text-align: center">PostIt Messaging</h2>
    </div>
    <div>
    <p style="font-size:20px;">Hi there,
      <br>
    <strong>${username}</strong> 
    just posted a new message on Group: ${groupname}
      <br>
    Login <a href='http://${url}/#/login'>here</a>
    to view your messages.
    </p>
    </div>
    <div style="background:#005cb2; width: 100%; height:20%">
    <h2 style="color:#fff; padding:20px; text-align: center">PostIt Team</h2>
  </div>
  `
);

export {
  transporter, mailOptions, forgotPasswordMail,
  resetPasswordMail, msgPriorityMail
};
