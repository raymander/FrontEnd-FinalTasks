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

  componentDidMount() {
    this.loadTrainings()
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData.content,
      });
      this.createEvents();
  });
  }

  createEvents = () => {
    let {trainings} = this.state
    var eventsArr = []
    for (let i = 0; i < trainings.length; i++) {
      let event = {}
      let date = new Date(trainings[i].date)
      let day = date.getDate();
      let month = date.getMonth() +1;
      let year = date.getFullYear();
      console.log(year, month, day)
      event = {
        id: i,
        title: trainings[i].activity,
        start: 'new Date('+year+', '+month+', '+day+')',
        desc: trainings[i].duration + ' minutes'
      }
      eventsArr.push(event);
    }
    this.setState({events: eventsArr})
    console.log(this.state.events)
  }

  render() {
    return (
      <div className="App-body">
        <header className="List-header">
          <h1 className="List-title">Calendar</h1>
        </header>
        <div>
        <BigCalendar
           className="calendar"
           events={this.state.events}
        />
        </div>
      </div>
    );
  }
}
  export default Calendar;
