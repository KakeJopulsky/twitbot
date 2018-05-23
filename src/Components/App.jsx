import React, { Component } from 'React';
import Tweet from './Tweet.jsx';
import Login from './Login.jsx';
import { PageHeader, Jumbotron } from 'react-bootstrap';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  

  render() {
    return (
      <div className="container-fluid">
  
        <Router>
          <div>
            <Link to="/" className="login-text"><small>Login</small></Link>
            <Link to="/tweet"><small>Tweet</small></Link>
            <Route exact path="/" component={Login} />
            <Route exact path="/tweet" component={Tweet} />
          </div>
        </Router>
  
      </div>
    );
  }
}

export default App;
