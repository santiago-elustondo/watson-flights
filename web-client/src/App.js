import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// ...
import InputBox from './components/InputBox'
import MessageHistory from './components/MessageHistory'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>watson-flights</h2>
        </div>
        <div className="App-content">
          <MessageHistory/>
          <InputBox/>
        </div>
      </div>
    );
  }
}

export default App;
