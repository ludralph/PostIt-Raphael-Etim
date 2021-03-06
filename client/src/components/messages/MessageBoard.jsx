import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Messages from './Messages';
import GroupMember from './GroupMember';
import WelcomePage from './WelcomePage';
import Footer from './Footer';
import CreateGroupModal from './CreateGroupModal';
import { logout } from '../../actions/authActions';
import { getUserGroups, editGroupOff } from '../../actions/groupActions';

/**
 * MessageBoard component
 * @class MessageBoard
 * @extends {React.Component}
 */
export class MessageBoard extends React.Component {

  /**
   * Creates an instance of MessageBoard
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.editGroupOff = this.editGroupOff.bind(this);
  }

  /**
   * lifecycle method invoked before component mounts
   * @returns {void} no return value
   */
  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getUserGroups(this.props.auth.currentUser.id);
    }
   
  }

  /**
   * lifecycle method invoked when component mounts
   * @returns {void} no return value
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('select').material_select();
  }

  /**
   * changes edit group status to false
   * @param {object} event
   * @returns {void} no return value
   */
  editGroupOff(event) {
    event.preventDefault();
    this.props.editGroupOff();
  }

  /**
   * handles user logout
   * @param {object} event
   * @returns {void} no return value
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }

   /**
   * Renders the component
   * @returns {JSX} jsx representation of the component
   */
  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <Redirect to='/login' />
      );
    }
    return (
      <div className="message-board bg-color">
        <TopNav logout={this.logout} />
        <div className="row">

          <SideNav
            groups={this.props.groups}
            edit={this.editGroupOff}
          />
          <CreateGroupModal />

          <main>
            <Route
              exact path={`${this.props.match.url}`}
              component={WelcomePage}
            />

            <Route
              path={`${this.props.match.url}/group/:id/messages`}
              component={Messages}
            />

            <Route
              path={`${this.props.match.url}/group/:id/members`}
              component={GroupMember}
            />
          </main>

        </div>
        <Footer />
      </div>
    );
  }
}

MessageBoard.propTypes = {
  auth: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  editGroupOff: PropTypes.func.isRequired
};

/**
 * Maps state to props
 * @param {object} state
 * @returns {object} contains sections of the redux store
 */
const mapStateToProps = state => ({
  auth: state.auth,
  groups: state.groups
});

/**
 * Maps dispatch to props
 * @param {function} dispatch
 * @returns {object} actions to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  getUserGroups,
  editGroupOff
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
