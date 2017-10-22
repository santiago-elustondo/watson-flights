import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Grid, Row, Col } from 'react-flexbox-grid';

// ...
import InputBox from './components/InputBox'
import MessageHistory from './components/MessageHistory'
import FlightRows from './components/FlightRows'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>watson-flights</h2>
        </div>
        <div className="App-content">
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <FlightRows/>
              </Col>
              <Col xs={6} style={{background:'gray'}}>
                <MessageHistory/>
                <InputBox/>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
