import React, { PureComponent } from 'react';

import { Router } from './routes';

import { MyBagContextProvider } from './contexts/MyBagContext';

class App extends PureComponent {
  
    render () {

      return (
        <MyBagContextProvider>
            <Router />
        </MyBagContextProvider>
      );

    }

}

export default App;
