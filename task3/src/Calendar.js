import React, { Component } from 'react';
import './App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
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
        title: trainings[i].activity,
        start:new Date (moment(trainings[i].date).format('MM/DD/YYYY')),
        end: new Date (moment(trainings[i].date).format('MM/DD/YYYY')),
        desc:trainings[i].customer.firstname+' '+ trainings[i].customer.lastname +', '+ trainings[i].duration + ' minutes',
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
          <header className="List-header">
            <h1 className="List-title">Calendar</h1>
          </header>
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
