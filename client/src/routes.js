
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignupPage from './components/auth/SignupPage';
import LoginPage from './components/auth/LoginPage';
import Messageboard from './components/messages/MessageBoard';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';

export default (
  <div>
    <Switch>
      <Route exact path="/" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/messageboard" component={Messageboard} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/resetpassword/:token" component={ResetPassword} />
    </Switch>
  </div>
);