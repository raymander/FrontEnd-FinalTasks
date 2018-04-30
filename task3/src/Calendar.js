import React, { Component } from 'react';
import './App.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import events from './events'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App-body">
        <header className="List-header">
          <h1 className="List-title">Calendar</h1>
        </header>
        <div>
          <BigCalendar
            className="Calendar"
            events={events}
          />
        </div>
      </div>
    );
  }
}
  export default Calendar;
