import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

import AddTraining from './AddTraining';


class TrainingList extends Component {
  state = { trainings: []};

  componentDidMount() {
    this.loadTrainings();
  }

  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        trainings: responseData,
      });
  });
  }

  //add training
    addTraining(training) {
      fetch('https://customerrest.herokuapp.com/api/trainings/',
      {   method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(training)
      })
      .then(res => this.loadTrainings())
      .catch(err => console.error(err))
    }


  // delete training
  onDelClick = (idLink) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick:() => {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${idLink}`, {method: 'DELETE'})
          .then(res => this.loadTrainings())
          .catch(err => console.error(err))

          toast.success("Delete succeed", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          }
        },
        {
          label: 'No',
        }
      ]
    })
  }

  render() {
    return(
    <div className="App-body">
    <div className="row">
      <AddTraining
        addTraining={this.addTraining}
        loadTrainings={this.loadTrainings}
      />
      </div>
      <ReactTable data={this.state.trainings}
        columns={[
          {
            Header: 'Activity',
            accessor: 'activity'
          },
          {
            Header: 'Duration',
            accessor: 'duration'
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
          {
            id: 'button',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value}) => (<button className="btn btn-danger" onClick={()=>{this.onDelClick(value)}}>Delete</button>)
          }
        ]}

        filterable
        className="-highlight" >
      </ReactTable>

    </div>
);
  }
}
export default TrainingList;
