import React, { Component } from 'React';
import Tweet from './Tweet.jsx';
import Login from './Login.jsx';
import Footer from './Footer.jsx';
import Queue from './Queue.jsx';
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
      <div>
      <div className="container">
  
        <Router>
          <div className="row">
            <div className="links">
              <Link to="/" className="login-text"><small>Login</small></Link>
              <Link to="/tweet"><small>Tweet</small></Link>
              <Link to="/queue" className="queue-text"><small>Queue</small></Link>
            </div>
            <Route exact path="/" component={Login} />
            <Route exact path="/tweet" component={Tweet} />
            <Route exact path="/queue" component={Queue} />
          </div>
        </Router>
      </div>
      <Footer />
      </div>
    );
  }
}

export default App;
