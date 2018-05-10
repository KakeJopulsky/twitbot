import React from 'React';
import Tweet from '../Tweet/Tweet.jsx';
import Login from '../Login/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Login />
      </div>
    );
  };
}

export default App;
