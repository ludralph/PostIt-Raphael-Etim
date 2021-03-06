import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import configureStore from './store/configureStore';
import routes from './routes';
import { loginSuccess } from './actions/authActions';
import setAuthorizationToken from './utils/setAuthorizationToken';
import './sass/style.scss';

const store = configureStore();
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(loginSuccess(jwt.decode(localStorage.jwtToken).user));
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);

