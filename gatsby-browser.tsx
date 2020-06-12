import 'react-toastify/dist/ReactToastify.min.css';
import './src/style/index.css';

import { AlertProviderComponent } from './src/hooks/useAlert';
import { ContextProviderComponent } from './src/shop/provider';
import Layout from './src/components/layout';
import React from 'react';

export const wrapPageElement = ({ element }) => (
  <ContextProviderComponent>
    <AlertProviderComponent>
      <Layout>{element}</Layout>
    </AlertProviderComponent>
  </ContextProviderComponent>
);
