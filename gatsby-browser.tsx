import 'react-toastify/dist/ReactToastify.min.css';
import './src/style/index.css';

import { AlertProviderComponent } from './src/hooks/useAlert';
import Api from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import { ContextProviderComponent } from './src/shop/provider';
import Layout from './src/components/layout';
import React from 'react';
import { awsConfig } from './aws-exports';
import { setUser } from './src/utils/auth';

Auth.configure(awsConfig);
Api.configure(awsConfig);

export const wrapPageElement = ({ element }) => (
  <ContextProviderComponent>
    <AlertProviderComponent>
      <Layout>{element}</Layout>
    </AlertProviderComponent>
  </ContextProviderComponent>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const onRouteUpdate = async (state: any, page: any, pages: any) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const userInfo = {
      ...user.attributes,
      username: user.username,
    };
    setUser(userInfo);
  } catch (error) {
    console.error('onRouteUpdate: ', error);
    window.localStorage.setItem('gatsbyUser', null);
  }
};
