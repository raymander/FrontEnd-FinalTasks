import React, { Component } from 'react';
import ReactTable from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-table/react-table.css';
import './App.css';
import AddCustomer from './AddCustomer';

class Customerlist extends Component {
  state = { customers: [] };

  componentDidMount() {
    this.loadCustomers();
  }

//getting API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        customers: responseData.content,
      });
    })
  }

  // Create new customer
  addCustomer(customer) {
    fetch('https://customerrest.herokuapp.com/api/customers',
    {   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

  // Delete customer
  onDelete = (idLink) => {
        confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                fetch(idLink, {method: 'DELETE'})
                .then(res => this.loadCustomers())
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
//rendering with React Table
  render() {
    return (
      <div className="App-body">
        <header className="List-header">
          <h1 className="List-title">Our customers</h1>
        </header>
        <div className="row">
          <AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
        </div>
        <ReactTable
          defaultPageSize={10}
          pageSizeOptions={[5,10,15,20]}
          data={this.state.customers}
          columns={[
            {
              columns: [
                {
                  accessor: "_links.self.href",
                  show: false
                },
                {
                  Header: "First name",
                  accessor: "firstname",
                },
                {
                  Header: "Last name",
                  accessor: "lastname",
                },
                {
                  Header: "Email",
                  accessor: "email",
                },
                {
                  Header: "Phone",
                  accessor: "phone",
                },
                {
                  Header: "Address",
                  accessor: "streetaddress",
                },
                {
                  Header: "Postcode",
                  accessor: "postcode",
                },
                {
                  Header: "City",
                  accessor: "city",
                },
                {
                  id: 'button',
                  sortable: false,
                  filterable: false,
                  width: 100,
                  accessor: 'links[0].href',
                  Cell: ({value}) => (<button className="btn btn-danger" onClick={()=>{this.onDelete(value)}}>Delete</button>)
                }
              ]
            }
          ]}
          filterable
          className="-highlight" >
        </ReactTable>
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default Customerlist;
