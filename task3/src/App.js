import React, { Component } from 'react';
import './App.css';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Navigator from './Navigator';
import Login from './Login';
import { firebaseAuth } from './config';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null, isAuthenticated : false};
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });
      }
      else {
        this.setState({ user: null, isAuthenticated: false });
      }
    });
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Our gym</h1>
      </header>
      <BrowserRouter>
        <div>
          <Navigator isAuthenticated={this.state.isAuthenticated} />
           <Switch>
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/trainings" component={Traininglist} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={Customerlist} />
              <Route path="/login" component={Login} />
           </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
