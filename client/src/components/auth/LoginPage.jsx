import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import TopNav from '../messages/TopNav'
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import { login } from '../../actions/authActions';

/**
 * LoginPage Component
 * @class LoginPage
 * @extends {React.Component}
 */
export class LoginPage extends React.Component {

  /**
   * Creates an instance of LoginPage
   * @param {object} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles change event for input fields
   * @param {object} event
   * @returns {void} no return value
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Handles login form submission
   * @param {object} event
   * @returns {void} no return value
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state)
      .then(() => {
        if (this.props.isAuthenticated) {
          toastr.success('Welcome Back');
        }
      });
  }

  /**
   * Renders the component
   * @returns {JSX} jsx representation of the component
   */
  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to='/messageboard' />
      );
    }

    return (
      <div>
        <TopNav />
        <div className="login blue darken-3">
          <div className="container">
            <div className="row top-space">
              <div className="col s12 m3 l3">
      
              </div>
              <div className="col s12 m6 l6 login-form">
                <form className="white col s12 z-depth-5">
                  <h6 className="center-align link">
                    New to Post-It?
                  <Link to="/"> Create Account</Link>
                  </h6>
                  <div className="divider"></div>
                  <TextInput
                    icon="account_circle"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    label="Username"
                  />
                  <TextInput
                    icon="lock"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    label="Password"
                  />
                  <div className="row  center-align">
                    <Button
                      className="btn waves-effect waves-light blue darken-2"
                      onClick={this.handleSubmit}
                      text="login"
                    />
                  </div>
                  <div className="row  right-align">
                    <h6 className="link">
                      <Link to="/forgotpassword" className="black-text">
                        Forgot Password?
                      </Link>
                    </h6>
                  </div>
                </form>
              </div>
              <div className="col s12 m3 l3"> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

/**
 * Maps state to props
 * @param {object} state
 * @returns {object} contains sections of the redux store
 */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * @returns {object} actions to be dispatched 
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ login },
    dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);