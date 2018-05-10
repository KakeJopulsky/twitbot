import React from 'react';

class Tweet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  postTweet(message) {

  }

  handleChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <p>Tweet Component</p>
        <input type="text" value={this.state.message} onChange={this.handleChange}></input>
        <input type="submit"></input>
      </div>
    );
  }
}

export default Tweet;
