import React, { PureComponent } from "react";

import { 
    BrowserRouter,
    Routes,
    Route
 } from 'react-router-dom';

import { store } from '../store';
import { Provider as ReduxProvider} from 'react-redux';

 import { Home } from '../pages/Home/Home';

class Router extends PureComponent {

    render() {

        return (
            <BrowserRouter>
                <ReduxProvider store={store}>
                    <Routes>
                        <Route index element={ <Home /> } />
                    </Routes>
                </ReduxProvider>
            </BrowserRouter>
        );

    }

};

export { Router };