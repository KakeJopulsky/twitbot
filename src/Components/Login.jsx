import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.checkLoggedIn.bind(this);
  }

  checkLoggedIn = () => {
    console.log('hey');
  }

  render() {
    return (
      <div>
        <a href="/auth/twitter/login" onClick={this.checkLoggedIn}> Login using twitter </a>
      </div>
    )
  }
}

export default Login;
