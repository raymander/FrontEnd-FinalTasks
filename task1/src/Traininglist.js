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
                  Header: "Date",
                  accessor: "date",
                },
                {
                  id: "customerName",
                  Header: "Customer",
                  accessor: "customer.lastname",
                }
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
