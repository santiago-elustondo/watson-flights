import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../actions/conversationActions'
import './InputBox.css';

class InputBox extends Component {
  render(){
    const { sendMsg } = this.props
    return (
      <div>
        <input onChange={(event) => this.setState({ txt: event.target.value})}></input>
        <button onClick={() => sendMsg(this.state.txt)}> send </button>
      </div>
    )
  }
}

// is this a container?
// action bindings should only be in containers (using bindActionCreators)
export default connect(
  state => ({}),
  dispatch => ({
    sendMsg: (txt) => dispatch(sendMsg(txt))
  })
)(InputBox)
