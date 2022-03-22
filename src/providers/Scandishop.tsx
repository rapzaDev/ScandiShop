import { ApolloProvider } from '@apollo/client';
import React, { PureComponent } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Router as Routes } from '../routes';
import { client } from '../services/apollo/client';
import STORE from '../services/redux/store';

class ScandiShop extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <ReduxProvider store={STORE.store}>
          <PersistGate loading={null} persistor={STORE.persistor}>
            <Routes />
          </PersistGate>
        </ReduxProvider>
      </ApolloProvider>
    );
  }
}

export default ScandiShop;
