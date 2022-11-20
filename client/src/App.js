import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers';

class App extends Component {
  render() {
    return (
      <div className="App Test">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Express Starterr test</h1>
        </header>
        <Customers />
      </div>
    );
  }
}

export default App;
