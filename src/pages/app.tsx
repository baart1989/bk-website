import Home from '../app/home';
import Login from '../app/login';
import PrivateRoute from '../components/private-route';
import React from 'react';
import { Router } from '@reach/router';

const App = () => (
  <Router>
    <PrivateRoute path="/app/home/" component={Home} />
    <Login path="/app/login" />
  </Router>
);

export default App;
