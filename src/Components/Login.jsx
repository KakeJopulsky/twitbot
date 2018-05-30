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
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  

  render() {
    return (
      <div className="login-button">
        <Button bsStyle="primary" bsSize="large" href='/auth/twitter/login' block>Login to Twitter</Button>
      </div>
    );
  }
}

export default Login;
