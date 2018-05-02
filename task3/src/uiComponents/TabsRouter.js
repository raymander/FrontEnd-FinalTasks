import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Customerlist from '../Customerlist';
import Traininglist from '../Traininglist';
import Login from '../Login';
import Calendar from '../Calendar';
import { firebaseAuth } from '../config';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';

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

const styles = {
  tab: {
    fontSize: 18,
    paddingTop: 12,
    marginBottom: 10,
    fontWeight: 400,
  },
};

class TabsRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: '', user: null, isAuthenticated : false, userEmail: ''
    };
   this.handleChange = this.handleChange.bind(this);
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

  handleChange = (tabSelected) => {
    this.setState({
      tabSelected: tabSelected,
    });
   this.props.history.push(tabSelected);
  };

  render() {

    return (
      <Tabs
        value={this.state.tabSelected}
        onChange={this.handleChange}
        inkBarStyle={{background: 'blue'}}
        centered
      >
        <Tab label="Customers" value="/customers" style = {styles.tab}>
          <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/customers" component={Customerlist} />
        </Tab>
        <Tab label="Trainings" value="/trainings" style = {styles.tab}>
          <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/trainings" component={Traininglist} />
        </Tab>
        <Tab label="Calendar" value="/calendar" style = {styles.tab}>
          <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/calendar" component={Calendar} />
        </Tab>
      </Tabs>
    )
  };
}
export default withRouter(TabsRouter);
