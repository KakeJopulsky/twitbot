import React from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment'

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
  }

  handleDate(date) {
    let UTCdate = Date.parse(date._d);
    this.setState({ date: UTCdate });
  }

  render() {
    return (
      <div>
        <p>Tweet Component</p>
        <input type="text" value={this.state.message} onChange={this.handleChange}></input>
        <input type="submit" onClick={this.handleClick}></input>
        <Datetime onChange={this.handleDate}/>
      </div>
    );
  }
}

export default Tweet;
