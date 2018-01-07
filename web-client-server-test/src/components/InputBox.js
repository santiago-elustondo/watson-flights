import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../actions/conversationActions'
import './InputBox.css';

class InputBox extends Component {

  constructor(){
    super();
    this.state = { txt: '' };
  }

  render() {
    const { sendMsg } = this.props
    const handleKeyPress = (key) => {
      if (key === 'Enter') sendMsg(this.state.txt)
    }
    return (
      <div>
        <input
          onKeyPress={e => handleKeyPress(e.key)}
          onChange={e => this.setState({ txt: e.target.value })}>
        </input>
        <button onClick={() => sendMsg(this.state.txt)}> send </button>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    sendMsg: (txt) => dispatch(sendMsg(txt))
  })
)(InputBox)
