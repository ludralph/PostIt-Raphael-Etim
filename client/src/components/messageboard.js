import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageBoard extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>{this.props.message}
        <div className="list-group">
    <a href="#" className="list-group-item active">
        Cras justo odio
    </a>
    <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
    <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
    <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
    <a href="#" className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(MessageBoard);
