import React from 'react';
import axios from 'axios';

class Tweet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  handleClick() {
    axios.post('/post', { message: this.state.message })
      .then(() => {
        console.log('Posted successfully');
      });
  }

  render() {
    return (
      <div>
        <p>Tweet Component</p>
        <input type="text" value={this.state.message} onChange={this.handleChange}></input>
        <input type="submit" onClick={this.handleClick}></input>
      </div>
    );
  }
}

export default Tweet;
