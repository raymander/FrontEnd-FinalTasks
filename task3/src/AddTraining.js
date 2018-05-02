import React from 'react';
import SkyLight from 'react-skylight';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

class AddTraining extends React.Component {
  constructor(props) {
      super(props);
      this.state = {activity: '', duration: '',  date: '', customer: '', open: false};
  }

  handleChange = (event) => {
      this.setState(
          {[event.target.name]: event.target.value}
      );
  }

  handleSubmit = (event) => {
      event.preventDefault();
      var newTraining = {activity: this.state.activity, duration: this.state.duration, date: this.state.date, customer: this.state.customer};
      this.props.addTraining(newTraining);
      this.props.loadTrainings();
      this.refs.simpleDialog.hide();
      this.setState({
        open: true,
      })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {

    const addTrainingDialog = {
      width: '70%',
      height: '450px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <SkyLight
          dialogStyles={addTrainingDialog}
          hideOnOverlayClicked ref="simpleDialog"
        >
              <div className="card" style={{"width": "95%"}}>
                <div className="card-body">
                  <h5 className="card-title">New training</h5>
                  <form>
                      <div className="form-group">
                          <input type="text" placeholder="Activity" className="form-control" name="activity" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group">
                          <input type="text" placeholder="Duration" className="form-control" name="duration" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group">
                          <input type="date" placeholder="Date" className="form-control" name="date" onChange={this.handleChange}/>
                      </div>
                      <div className="form-group">
                          <input type="text" placeholder="Customer" className="form-control" name="customer" onChange={this.handleChange}/>
                      </div>

                      <div className="form-group">
                          <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                      </div>
                  </form>
                </div>
              </div>
        </SkyLight>
        <div className="col-md-2">
            <RaisedButton
              label="New training"
              style={{margin: 15}}
              onClick={() => this.refs.simpleDialog.show()}
              primary= {true}
            />
        </div>
        <div>
          <Snackbar
            open={this.state.open}
            message="New training added"
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
            />
        </div>
      </div>
    );
  }
}

export default AddTraining;
