import React, { Component } from 'react';
import './App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Bar from './uiComponents/Bar'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
  static muiName = 'FlatButton';

  constructor(props) {
    super(props);
    this.state = {trainings: [], events: []};
  }

  componentWillMount() {
    this.loadTrainings()
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData,
      });
      this.createEvents();
  });
  }

  createEvents() {
    let {trainings} = this.state
    var eventsArr = []
    for (let i = 0; i < trainings.length; i++) {
      let event = {
        id: i,
        title: trainings[i].activity +', '+ trainings[i].duration + ' minutes',
        start:new Date (moment(trainings[i].date).format('MM/DD/YYYY')),
        end: new Date (moment(trainings[i].date).format('MM/DD/YYYY')),
        desc:trainings[i].customer.firstname+' '+ trainings[i].customer.lastname,
      }
      eventsArr.push(event);
    }
    this.setState({events: eventsArr})
  }

  render() {
    if (this.state.events.length === 0) {
      return null
    } else {
      return (
        <div className="App-body">
          <Bar
           title = 'Calendar'
          />
          <div>
          <BigCalendar
             className="calendar"
             events={this.state.events}
             defaultDate={new Date()}
          />
          </div>
        </div>
      );
    }
  }
}

export default Calendar;
