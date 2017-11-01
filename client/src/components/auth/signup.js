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
    const { handleSubmit, fields: {name, username, email, password}} = this.props;

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
                        <fieldset className="md-form">
                          <input className="form-control" placeholder="Your Name" {...name} type="text" />
                        </fieldset>
                        {name.touched && name.error && <span className="error">{name.error}</span>}
                        <fieldset className="md-form">
                          <input className="form-control" {...username} placeholder="Username" type="text" />
                          {username.touched && username.error && <span className="error">{username.error}</span>}
                        </fieldset>
                        <fieldset className="md-form">
                          <input className="form-control" placeholder="Email" id="form-1" {...email} type="email" />
                          {email.touched && email.error && <span className="error">{email.error}</span>}
                        </fieldset>
                        <fieldset className="md-form">
                          <input className="form-control" placeholder="Password" {...password} type="password" />
                          {password.touched && password.error && <span className="error">{password.error}</span>}
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

  if (!formProps.name) {
    errors.fullName = 'Please enter your Name';
  }
  if (!formProps.username) {
    errors.userName = 'Please enter your Username';
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
  fields: ['name','username','email', 'password'],
  validate
}, mapStateToProps, actions)(Signup);


