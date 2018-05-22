import React from 'react';
import axios from 'axios';
import { Button, ButtonToolbar } from 'react-bootstrap';

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

  login = () => {
    axios.get('/auth/twitter/login')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  render() {
    return (
      <div className="well">
        <Button bsStyle="primary" bsSize="large" href='/auth/twitter/login' block>Login to Twitter</Button>
        {/* <a href="/auth/twitter/login" onClick={this.login}> Login using twitter </a>
        <a onClick={this.login}> Login using twitter </a> */}
      </div>
    )
  }
}

export default Login;
