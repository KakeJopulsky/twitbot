import React, { Component } from 'React';
import Tweet from './Tweet.jsx';
import Login from './Login.jsx';
//import PrivateRoute from './PrivateRoute.jsx';
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
      <Router>
        <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* <li>
            <Link to="/tweet">Tweet</Link>
          </li> */}
        </ul>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/tweet" component={Tweet} />
        </Switch>
          </div>
      </Router>
    );
  };
}

export default App;
