import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <a href="/auth/twitter/login"> Login using twitter </a>
      </div>
    )
  }
}

export default Login;
