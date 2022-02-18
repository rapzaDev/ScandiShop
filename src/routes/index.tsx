import React, { PureComponent } from "react";

import { 
    BrowserRouter,
    Routes,
    Route
 } from 'react-router-dom';

import { store } from '../store';
import { Provider as ReduxProvider} from 'react-redux';

import { CategoryPage } from '../pages/CategoryPage';
import { ProductPage } from '../pages/ProductPage';

class Router extends PureComponent {

    render() {

        return (
            <BrowserRouter>
                <ReduxProvider store={store}>
                    <Routes>
                        <Route index element={ <CategoryPage /> } />
                        <Route path="/product" element={ <ProductPage /> } />
                    </Routes>
                </ReduxProvider>
            </BrowserRouter>
        );

    }

};

export { Router };