import React, { Component } from 'react';
import './App.css';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Our customers</h1>
        </header>
        <Customerlist />
        <header className="App-header">
          <h1 className="App-title">Our trainings</h1>
        </header>
        <Traininglist />
      </div>
    );
  }
}

export default App;
