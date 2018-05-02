import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.css';

class Traininglist extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
  }

  //getting API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData,
      });
    })
  }

// rendering with React Table
  render() {
    return (
      <div className="App-body">
        <header className="List-header">
          <h1 className="List-title">Our trainings</h1>
        </header>
        <ReactTable
        defaultPageSize={10}
        pageSizeOptions={[5,10,15,20]}
        data={this.state.trainings}
        columns={[
            {
              columns: [
                {
                  accessor: "_links.self.href",
                  show: false
                },
                {
                  Header: "Activity",
                  accessor: "activity",
                },
                {
                  Header: "Duration",
                  accessor: "duration",
                },
                {
                  id: 'date',
                  Header: "Date",
                  accessor: d => {
                  let date = new Date(d.date)
                  let day = date.getDate();
                  let month = date.getMonth() +1;
                  let year = date.getFullYear();
                  date = (new Date(year, month, day)).toISOString().split('T')[0]
                  return date
                  }
                },
                {
                  id: "customerName",
                  Header: "Customer",
                  accessor: d => {
                  if (d.customer != null) {
                  return d.customer.firstname + ' ' + d.customer.lastname
                  } else return (d.customer)
                  }
                },
              ]
            }
          ]}
          filterable
          className="-highlight" >
        </ReactTable>
      </div>
    );
  }
}

export default Traininglist;
