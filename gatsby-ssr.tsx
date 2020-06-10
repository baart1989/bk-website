// import './src/styles/toastify.css';
import 'react-toastify/dist/ReactToastify.css';
import './src/style/index.css';

import { ContextProviderComponent } from './src/shop/provider';
import React from 'react';

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

export const wrapPageElement = ({ element }) => {
  return <ContextProviderComponent>{element}</ContextProviderComponent>;
};