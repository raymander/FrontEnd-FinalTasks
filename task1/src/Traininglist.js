import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Traininglist extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.loadTrainings();
  }

  //getting API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData.content,
      });
    })
  }

// rendering with React Table
  render() {
    return (
      <div className="App-body">

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
