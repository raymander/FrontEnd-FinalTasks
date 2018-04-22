import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.css';

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

//rendering with React Table
  render() {
    return (
      <div className="App-body">
        <header className="List-header">
          <h1 className="List-title">Our customers</h1>
        </header>
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

export default Customerlist;
