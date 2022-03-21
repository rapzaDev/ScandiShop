import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CartPage from '../pages/CartPage';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';

class Router extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <CategoryPage location={props.location.pathname} />
            )}
          />
          <Route
            path="/product/:id"
            render={(props) => (
              <ProductPage
                location={props.location.pathname}
                ID={props.match.params.id}
              />
            )}
          />
          <Route
            path="/cart"
            render={(props) => <CartPage location={props.location.pathname} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export { Router };
