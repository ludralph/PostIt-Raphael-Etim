import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
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
    const { handleSubmit, fields: {fullName, email, password}} = this.props;

    return (
      <header id="home-section">
      <div className="dark-overlay">
        <div className="home-inner">
        <div className="container">
              <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6">
                  <div className="card  card-form">
                    <div className="card-body">
                        <h3 className="text-center">Register</h3>
                      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <fieldset className="form-group">
                          <label>Full Name</label>
                          <input className="form-control" {...fullName} type="text" />
                          {fullName.touched && fullName.error && <div className="error">{fullName.error}</div>}
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Email:</label>
                          <input className="form-control" {...email} type="email" />
                          {email.touched && email.error && <div className="error">{email.error}</div>}
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Password:</label>
                          <input className="form-control" {...password} type="password" />
                          {password.touched && password.error && <div className="error">{password.error}</div>}
                        </fieldset>
                        {this.renderAlert()}
                        <button action="submit" className="btn btn-primary">Sign up!</button>
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

  if (!formProps.fullName) {
    errors.fullName = 'Please enter your Name';
  }

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
  form: 'signup',
  fields: ['fullName','email', 'password'],
  validate
}, mapStateToProps, actions)(Signup);


