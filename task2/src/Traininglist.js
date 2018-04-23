import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
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

  // Delete training
  onDelete = (idLink) => {
        confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              console.log('dfs')
                fetch('https://customerrest.herokuapp.com/api/gettrainings/' + idLink, {method: 'DELETE'})
                .then(res => this.loadTrainings())
                .catch(err => console.error(err))

                toast.success("Delete succeed", {
                  position: toast.POSITION.BOTTOM_LEFT
                });
                console.log('ops')
            }
          },
          {
            label: 'No',
          }
        ]
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
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: '_links.self.href',
                  Cell: (props) => (
                    <button className="btn btn-danger" onClick={this.onDelete.bind(this,props.value)}>
                      Delete
                    </button>)
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
