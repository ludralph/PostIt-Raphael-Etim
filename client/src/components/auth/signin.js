import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, fields: { email, password }} = this.props;

    return (
      
<header id="home-section">
<div className="dark-overlay">
  <div className="home-inner">
  <div className="container" id="">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6">
            <div className="card card-form">
              <div className="card-body">
              <h3 className="text-center">Sign in</h3>
                  <p  className="text-center">Please fill your details to sign in</p>
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="md-form">
                  <input {...email} type="email" placeholder="email" className="form-control" />
                  {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="md-form">
                  <input {...password} type="password" placeholder="password" className="form-control" />
                  {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
              </form>
              </div>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
    </div>
  </div>
</div>
</header>
      
    );
  }
}
function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, actions)(Signin);
