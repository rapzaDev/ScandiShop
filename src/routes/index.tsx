import React, { PureComponent } from "react";

import { 
    BrowserRouter,
    Routes,
    Route
 } from 'react-router-dom';

import CategoryPage  from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

class Router extends PureComponent {

    render() {

        return (
            <BrowserRouter>
                <Routes>
                    <Route index element={ <CategoryPage  /> } />
                    <Route path="/product" element={ <ProductPage /> } />
                    <Route path="/cart" element={ <CartPage /> } />
                </Routes>
            </BrowserRouter>
        );

    }

};

export { Router };