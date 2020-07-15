import AdminHome from '../admin/home';
import Login from '../app/login';
import PrivateRoute from '../components/private-route';
import React from 'react';
import { Router } from '@reach/router';
import UserEvents from '../calendar/user-events';

const App = () => (
  <Router>
    <PrivateRoute path="/app/home/" component={UserEvents} />
    <PrivateRoute path="/app/admin/" isAdminPath={true} component={AdminHome} />
    <Login path="/app/login" />
  </Router>
);

export default App;
