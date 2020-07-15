import { getCurrentUser, isLoggedIn } from '../utils/auth';

import React from 'react';
import { Redirect } from '@reach/router';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const user = isLoggedIn() ? getCurrentUser() : undefined;
  const { isAdminPath = false } = rest;

  if (!user) {
    return <Redirect to="/app/login/" noThrow={true} />;
  }

  if (isAdminPath && !user.isAdmin) {
    return <Redirect to="/" noThrow={true} />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
