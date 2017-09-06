import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <header id="home-section">
        <div className="dark-overlay">
          <div className="home-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 d-none d-lg-block">
                  <h1 className="display-4">Send <strong>Messages</strong> to whoever, whenever</h1>
                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="p-4 align-self-end">
                      Create groups and determine who gets added to your groups
                        </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="p-4 align-self-end">
                      In-App Notifications to notify you when you get a new message
                        </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start">
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="p-4 align-self-end">
                      Messages are sent based on priority levels
                        </div>
                  </div>

                </div>
                <div className="col-lg-4">
                  <div className="card bg-primary text-center card-form">
                    <div className="card-body">
                      <h3>Sign Up Today</h3>
                      <p>Please fill out this form to register</p>
                      <form action="" onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Log In </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Login.propTypes = {

}

export default Login