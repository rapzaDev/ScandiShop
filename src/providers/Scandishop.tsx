import React, { PureComponent } from 'react';

import { ApolloProvider } from '@apollo/client';
import { client } from '../services/apollo/client';

import { Provider as ReduxProvider} from 'react-redux';
import store from '../services/redux/store';

import { Router as Routes } from '../routes';

class ScandiShop extends PureComponent {
  
    render () {

      return (
        <ApolloProvider client={client} >
          <ReduxProvider store={store}>
            <Routes /> 
          </ReduxProvider>
        </ApolloProvider>
      )

    }

}

export default ScandiShop;