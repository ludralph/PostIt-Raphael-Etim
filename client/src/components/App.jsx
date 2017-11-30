import React, { Component } from 'react';


class App extends Component {
  render () {
    return (
      <div>
      console.log(this.props.children)
        {this.props.children}
      </div>
    )
  }
}

export default App;