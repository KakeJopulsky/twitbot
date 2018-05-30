import React from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Tweet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      date: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleClick() {
    axios.post('/post', { message: this.state.message, time: this.state.date })
      .then(() => {
        console.log('Posted successfully');
      });
    this.setState({
      message: '',
    });
  }

  handleDate(date) {
    let UTCdate = Date.parse(date._d);
    this.setState({ date: UTCdate });
  }

  render() {
    return (
      <div className="tweet-component">
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Enter a tweet</ControlLabel>
          <FormControl bsSize="large" componentClass="textarea" placeholder="..." value={this.state.message} onChange={this.handleChange} />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.handleClick}>Tweet</Button>
        <Datetime onChange={this.handleDate}/>
      </div>
    );
  }
}

export default Tweet;
