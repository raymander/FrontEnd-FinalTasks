import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { firebaseAuth } from '../config';
import SkyLight from 'react-skylight';
import Customerlist from '../Customerlist'

class Bar extends Component {

  logout = () => {
    return firebaseAuth().signOut()
  };

  render() {
    var addNew = this.props.addNew;
    return (
      <div>
        <AppBar
          title={this.props.title}
          titleStyle={{textAlign: 'center'}}
          iconElementRight={<FlatButton
                              label="SIGN OUT"
                              onClick={() => { this.logout(); }}
                            />}
          style = {{backgroundColor: '#00ace6', zIndex: 1}}
        />
      </div>
    );
  }
}

export default Bar;
