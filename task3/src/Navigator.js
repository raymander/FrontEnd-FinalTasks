import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { firebaseAuth } from './config';

class Navigator extends Component {
  logout = () => {
    return firebaseAuth().signOut()
  }

  render() {
    let logLink = null;
    if (this.props.isAuthenticated)
      logLink = <Link className="nav-link" onClick={this.logout} to="/login">Logout</Link>;
    else
      logLink = <Link className="nav-link" to="/login">Login</Link>;

    return (
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <Link class="navbar-brand"to="/">My GymPage</Link>
          </div>
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <Link class="nav-link"to="/customers">Customers</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link"to="/trainings">Trainings</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link"to="/calendar">Calendar</Link>
              </li>
              <li class="nav-item">
                {logLink}
              </li>
            </ul>
        </div>
      </nav>
    );
  }
}

export default Navigator;
