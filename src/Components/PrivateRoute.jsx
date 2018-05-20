import React from 'react';
import axios from 'axios';

axios.get('/isLoggedIn')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })

const PrivateRoute = ( { component: Component } ) => (
  <Route render={() => (
    
  )}
);

export default PrivateRoute;