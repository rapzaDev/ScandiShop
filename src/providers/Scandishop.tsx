import { ApolloProvider } from '@apollo/client';
import React, { PureComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { Router as Routes } from '../routes';
import { client } from '../services/apollo/client';
import store from '../services/redux/store';

class ScandiShop extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={store}>
          <Routes />
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}

export default ScandiShop;
