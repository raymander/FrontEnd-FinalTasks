import React, { Component } from 'react';
import './App.css';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Navigator from './Navigator';
import Login from './Login';
import Calendar from './Calendar';
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
    this.state = {user: null, isAuthenticated : false, userEmail: ''};
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true, userEmail: user.email });
        console.log('ok')
      }
      else {
        this.setState({ user: null, isAuthenticated: false });
        console.log('not ok')
      }
    });
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Our gym</h1>
      </header>
      { this.state.isAuthenticated ? (
          <div className="welcome">
            <h3 className="Welcome-msg">Welcome {this.state.userEmail}! </h3>
          </div>
        ) : (
          <div className="welcome">
            <h3 className="Welcome-msg">Please sign in or create a new account </h3>
          </div>
        )
      }
      <BrowserRouter>
        <div>
          <Navigator isAuthenticated={this.state.isAuthenticated} />
           <Switch>
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/trainings" component={Traininglist} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={Customerlist} />
              <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={Calendar} />
              <Route path="/login" component={Login} />
           </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
