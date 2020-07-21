import 'react-toastify/dist/ReactToastify.min.css';
import './src/style/index.css';

import Layout from './src/components/layout';
import React from 'react';

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;
