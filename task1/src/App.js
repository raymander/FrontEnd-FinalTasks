import React, { Component } from 'react';
import './App.css';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Navigator from './Navigator';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Our gym</h1>
      </header>
      <BrowserRouter>
        <div>
          <Navigator />
           <Switch>
              <Route path="/trainings" component={Traininglist} />
              <Route path="/customers" component={Customerlist} />
           </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
