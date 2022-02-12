import React, { PureComponent } from "react";

import { 
    BrowserRouter,
    Routes,
    Route
 } from 'react-router-dom';

 import { Home } from '../pages/Home/Home';

class Router extends PureComponent {

    render() {

        return (
            <BrowserRouter>
                <Routes>
                    <Route index element={ <Home /> } />
                </Routes>
            </BrowserRouter>
        );

    }

};

export { Router };