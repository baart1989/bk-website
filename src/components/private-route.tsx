import { Choose } from 'react-frontend-common';
import React from 'react';
import { Redirect } from '@reach/router';
import { isLoggedIn } from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Choose>
      <Choose.When condition={!isLoggedIn()}>
        <Redirect to="/app/login/" noThrow={true} />
      </Choose.When>
      <Choose.Otherwise>
        <Component {...rest} />
      </Choose.Otherwise>
    </Choose>
  );
};

export default PrivateRoute;
