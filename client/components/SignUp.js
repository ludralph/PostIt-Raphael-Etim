import React from 'react';                                                                                    
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      fullname:'',
      username:'',
      email: '',
      password:''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    console.log(this.state);
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
                              placeholder="Enter Full Name"
                              name="fullname"
                              value={this.state.fullname}
                              onChange={this.onChange} 
                              />
                            </div>
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
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="email"
                                name="email"
                                value={this.state.email}
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
                                  onChange ={this.onChange}
                                  />
                              </div>
                                <button 
                                type="submit"
                                 className="btn btn-outline-dark btn-block ">Sign Up </button>
                                 <a className="btn btn-outline-primary btn-block">Click here to Login </a>
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
   SignUp.propTypes ={

   }
// function mapStateToProps(state, ownProps){
//   return {
//     signup:state.data
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp;